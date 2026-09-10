import React, { useState, useMemo, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import QuoteCard from './QuoteCard';
import LinkCard from './LinkCard';

const contentTypes = ['Quote', 'Link', 'Podcast', 'GitHub'];

const themeDefinitions = [
  {
    name: 'AI',
    tags: ['ai', 'agent', 'agents', 'agentic', 'agentic-ai', 'llm', 'llms', 'generative-ai', 'machine-learning', 'automation'],
  },
  {
    name: 'Data',
    tags: ['data', 'metadata', 'analytics', 'metrics', 'dashboard', 'dashboards', 'data-governance', 'data-modeling', 'data-modelling', 'data-models', 'data-products', 'semantic-model', 'power-bi', 'fabric'],
  },
  {
    name: 'Systems',
    tags: ['systems', 'systems-thinking', 'architecture', 'technology', 'digital', 'software', 'legacy', 'platform', 'platforms', 'platform-thinking', 'cloud', 'local-first', 'infrastructure', 'api', 'apis', 'interoperability', 'standards', 'open-standards', 'security', 'sovereignty', 'control'],
  },
  {
    name: 'Organisations',
    tags: ['organisation', 'organisations', 'organization', 'organizations', 'governance', 'leadership', 'strategy', 'capability', 'capabilities', 'incentives', 'transformation', 'procurement', 'service', 'services', 'service-design', 'work', 'management', 'business', 'value', 'operating-model', 'decision-making', 'economics', 'people'],
  },
  {
    name: 'Public service',
    tags: ['public-service', 'public-services', 'public-sector', 'local-government', 'local-gov', 'government', 'council', 'councils', 'lgr'],
  },
  {
    name: 'Knowledge',
    tags: ['knowledge', 'memory', 'meaning', 'language', 'definitions', 'thinking', 'learning', 'research', 'evidence', 'science', 'mental-models', 'writing', 'information', 'judgement', 'provenance', 'epistemology', 'explanation', 'explanations'],
  },
  {
    name: 'Building',
    tags: ['building', 'engineering', 'design', 'delivery', 'product', 'development', 'code', 'coding', 'open-source', 'experimentation', 'making'],
  },
  {
    name: 'Culture',
    tags: ['culture', 'music', 'politics', 'religion', 'society', 'relationships', 'identity', 'creativity', 'joy', 'community'],
  },
  {
    name: 'Life',
    tags: ['life', 'family', 'history', 'place', 'health', 'consciousness', 'ambition', 'career', 'parenting', 'ageing', 'personal-development', 'travel', 'sport', 'psychedelics', 'meditation'],
  },
];

const normaliseTag = tag => tag
  .trim()
  .toLowerCase()
  .replace(/[\s_]+/g, '-');

const getThemes = tags => {
  const normalisedTags = new Set((tags || []).map(normaliseTag));

  return themeDefinitions
    .filter(theme => theme.tags.some(tag => normalisedTags.has(tag)))
    .map(theme => theme.name);
};

const getDisplayType = type => {
  if (!type) return '';
  if (type.toLowerCase() === 'github') return 'GitHub';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const getIsoDateOnly = dateString => {
  if (!dateString) return null;
  return dateString.substring(0, 10);
};

const QuotesLinks = () => {
  const [selectedTypes, setSelectedTypes] = useState(new Set(contentTypes));
  const [selectedThemes, setSelectedThemes] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const typesParam = params.get('types');
    const themesParam = params.get('themes') || params.get('tags');
    const dateParam = params.get('date');

    setSelectedTypes(
      typesParam ? new Set(typesParam.split(',')) : new Set(contentTypes)
    );
    setSelectedThemes(
      themesParam ? new Set(themesParam.split(',')) : new Set()
    );
    setSelectedDate(
      dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : null
    );
  }, []);

  const updateURL = (types, themes, date) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();

    if (!(contentTypes.every(type => types.has(type)))) {
      if (types.size > 0) params.set('types', Array.from(types).join(','));
    }

    if (themes.size > 0) params.set('themes', Array.from(themes).join(','));
    if (date) params.set('date', date);

    const search = params.toString();
    navigate(
      `${window.location.pathname}${search ? '?' + search : ''}`,
      { replace: true }
    );
  };

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/links_quotes_markdown/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          html
          frontmatter {
            type
            title
            author
            attributionStatus
            attributionTo
            url
            slug
            date
            tags
          }
        }
      }
    }
  `);

  const allThemes = useMemo(() => {
    const themesInUse = new Set();
    data.allMarkdownRemark.nodes.forEach(node => {
      getThemes(node.frontmatter.tags).forEach(theme => themesInUse.add(theme));
    });

    return themeDefinitions
      .map(theme => theme.name)
      .filter(theme => themesInUse.has(theme));
  }, [data]);

  const toggleType = type => {
    setSelectedTypes(previous => {
      const next = new Set(previous);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      if (next.size === 0) next.add(type);
      updateURL(next, selectedThemes, selectedDate);
      return next;
    });
  };

  const toggleTheme = theme => {
    setSelectedThemes(previous => {
      const next = new Set(previous);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      updateURL(selectedTypes, next, selectedDate);
      return next;
    });
  };

  const selectDate = date => {
    const nextDate = date ? getIsoDateOnly(date) : null;
    setSelectedDate(nextDate);
    updateURL(selectedTypes, selectedThemes, nextDate);
  };

  const filteredNodes = data.allMarkdownRemark.nodes.filter(node => {
    if (!node.frontmatter?.type) return false;

    const displayType = getDisplayType(node.frontmatter.type);
    const nodeThemes = getThemes(node.frontmatter.tags);
    const typeMatches = selectedTypes.has(displayType);
    const themeMatches = selectedThemes.size === 0
      || nodeThemes.some(theme => selectedThemes.has(theme));
    const dateMatches = !selectedDate
      || getIsoDateOnly(node.frontmatter.date) === selectedDate;

    return typeMatches && themeMatches && dateMatches;
  });

  const renderContent = node => {
    const cardProps = {
      frontmatter: {
        ...node.frontmatter,
        tags: getThemes(node.frontmatter.tags),
      },
      html: node.html,
      onDateClick: selectDate,
    };

    return node.frontmatter.type?.toLowerCase() === 'quote'
      ? <QuoteCard {...cardProps} />
      : <LinkCard {...cardProps} />;
  };

  const buttonClassName = active => [
    'rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors duration-150',
    active
      ? 'border-site-text bg-site-text text-site-bg'
      : 'border-site-border bg-site-bg text-site-muted hover:text-site-text',
  ].join(' ');

  return (
    <div className="space-y-6">
      <div className="rounded-soft border border-site-border bg-site-surface px-4 py-4 md:px-5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="mr-1 text-sm font-medium text-site-muted">Type</span>
            {contentTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={selectedTypes.has(type)}
                className={buttonClassName(selectedTypes.has(type))}
              >
                {type}
              </button>
            ))}
          </div>

          {allThemes.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="mr-1 text-sm font-medium text-site-muted">Theme</span>
              {allThemes.map(theme => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggleTheme(theme)}
                  aria-pressed={selectedThemes.has(theme)}
                  className={buttonClassName(selectedThemes.has(theme))}
                >
                  {theme}
                </button>
              ))}
            </div>
          )}

          {selectedDate && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-site-muted">
              <span>Saved on {selectedDate}</span>
              <button
                type="button"
                onClick={() => selectDate(null)}
                className="font-semibold text-site-text underline underline-offset-4"
              >
                Clear date
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredNodes.length > 0 ? (
        <div>
          {filteredNodes.map((node, index) => (
            <div
              key={`${node.frontmatter.url || node.frontmatter.title}-${index}`}
              id={node.frontmatter.slug || undefined}
            >
              {renderContent(node)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-site-muted">No items match the current filters.</p>
      )}
    </div>
  );
};

export default QuotesLinks;
