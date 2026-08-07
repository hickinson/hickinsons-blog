import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const MDX_DIR = path.resolve('src/mdx');
const ALLOWED_CATEGORIES = new Set([
  'work',
  'technology',
  'ideas',
  'life',
  'non_blog_post',
]);

const softArg = process.argv.find(arg => arg.startsWith('--soft='));
const softFiles = new Set(
  (softArg ? softArg.slice('--soft='.length) : '')
    .split(',')
    .map(value => value.trim().replaceAll('\\', '/'))
    .filter(Boolean)
);
const auditAll = process.argv.includes('--audit-all');

const errors = [];
const warnings = [];

const stripQuotes = value => {
  if (!value) return '';
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseFrontmatter = (content, relativePath) => {
  if (!content.startsWith('---')) {
    errors.push(`${relativePath}: missing opening frontmatter delimiter`);
    return { frontmatter: {}, body: content };
  }

  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    errors.push(`${relativePath}: invalid or unterminated frontmatter`);
    return { frontmatter: {}, body: content };
  }

  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!field) continue;
    frontmatter[field[1]] = stripQuotes(field[2]);
  }

  return {
    frontmatter,
    body: content.slice(match[0].length),
  };
};

const isIsoDate = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const countWords = text =>
  text
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\p{L}\p{N}'’-]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const proseParagraphs = body =>
  body
    .split(/\r?\n\s*\r?\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .filter(p => !p.startsWith('#'))
    .filter(p => !p.startsWith('import '))
    .filter(p => !p.startsWith('export '))
    .filter(p => !p.startsWith('<'))
    .filter(p => !p.startsWith('!['))
    .filter(p => !p.startsWith('- '))
    .filter(p => !p.startsWith('* '))
    .filter(p => !p.startsWith('```'))
    .filter(p => p !== '---');

const sentenceCount = paragraph => {
  const matches = paragraph.match(/[.!?](?:["'’”)]|\s|$)/g);
  return matches ? matches.length : 1;
};

const addSoftWarnings = (relativePath, body) => {
  const paragraphs = proseParagraphs(body);
  if (paragraphs.length < 4) return;

  const singleSentence = paragraphs.filter(p => sentenceCount(p) <= 1);
  const ratio = singleSentence.length / paragraphs.length;
  if (ratio > 0.4) {
    warnings.push(
      `${relativePath}: ${Math.round(ratio * 100)}% of prose paragraphs appear to contain one sentence; check that fragmentation is deliberate.`
    );
  }

  let longestSingleRun = 0;
  let currentRun = 0;
  for (const paragraph of paragraphs) {
    if (sentenceCount(paragraph) <= 1) {
      currentRun += 1;
      longestSingleRun = Math.max(longestSingleRun, currentRun);
    } else {
      currentRun = 0;
    }
  }
  if (longestSingleRun >= 3) {
    warnings.push(
      `${relativePath}: ${longestSingleRun} consecutive single-sentence prose paragraphs detected; check the rhythm rather than changing it mechanically.`
    );
  }

  const headings = (body.match(/^#{2,4}\s+/gm) || []).length;
  const words = countWords(body);
  if (headings >= 5 && words < 1600) {
    warnings.push(
      `${relativePath}: ${headings} section headings in roughly ${words} words; check whether the piece is being over-structured.`
    );
  }

  const questionLines = body
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.endsWith('?'));
  if (questionLines.length >= 5) {
    warnings.push(
      `${relativePath}: ${questionLines.length} question-ending lines detected; check whether rhetorical questions are carrying too much of the structure.`
    );
  }

  const ticCount = (body.match(/\bThat (?:distinction )?matters\.?/gi) || []).length;
  if (ticCount >= 2) {
    warnings.push(
      `${relativePath}: repeated “That matters” phrasing detected; keep it only where the emphasis earns it.`
    );
  }
};

const entries = (await readdir(MDX_DIR, { withFileTypes: true }))
  .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
  .map(entry => entry.name)
  .sort();

for (const filename of entries) {
  const absolutePath = path.join(MDX_DIR, filename);
  const relativePath = path.posix.join('src/mdx', filename);
  const content = await readFile(absolutePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content, relativePath);

  if (!frontmatter.title) {
    errors.push(`${relativePath}: missing title`);
  }

  if (!frontmatter.post_category) {
    errors.push(`${relativePath}: missing post_category`);
  } else if (!ALLOWED_CATEGORIES.has(frontmatter.post_category)) {
    errors.push(
      `${relativePath}: post_category must be one of work, technology, ideas, life or non_blog_post (found “${frontmatter.post_category}”).`
    );
  }

  const isBlogPost = frontmatter.post_category !== 'non_blog_post';
  if (isBlogPost) {
    if (!frontmatter.post_date) {
      errors.push(`${relativePath}: missing post_date`);
    } else if (!isIsoDate(frontmatter.post_date)) {
      errors.push(`${relativePath}: post_date must use YYYY-MM-DD`);
    }

    if (!frontmatter.description) {
      errors.push(`${relativePath}: missing description`);
    }
  } else if (frontmatter.post_date && !isIsoDate(frontmatter.post_date)) {
    errors.push(`${relativePath}: post_date must use YYYY-MM-DD when present`);
  }

  if (frontmatter.first_published && !isIsoDate(frontmatter.first_published)) {
    errors.push(`${relativePath}: first_published must use YYYY-MM-DD`);
  }

  if (frontmatter.retrospective === 'true' && !frontmatter.first_published) {
    errors.push(`${relativePath}: retrospective posts require first_published`);
  }

  if (frontmatter.first_published && frontmatter.retrospective !== 'true') {
    warnings.push(
      `${relativePath}: first_published is present without retrospective: true; confirm that publication metadata is intentional.`
    );
  }

  if (isBlogPost && (auditAll || softFiles.has(relativePath))) {
    addSoftWarnings(relativePath, body);
  }
}

if (warnings.length > 0) {
  console.log('\nEditorial warnings (review prompts, not failures):');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.error('\nEditorial hard-gate failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`\nEditorial check passed for ${entries.length} MDX files.`);
if (!auditAll && softFiles.size === 0) {
  console.log('Soft style warnings were not requested. Use --audit-all to review the full corpus.');
}
