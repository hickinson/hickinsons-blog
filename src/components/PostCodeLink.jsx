import React from 'react';
import formatDisplayDate from '../utils/formatDisplayDate';

const formatCategory = category => {
    if (!category || category === 'non_blog_post') return null;

    const labels = {
        data: 'Data',
        leadership: 'Leadership',
        systems: 'Systems',
        building: 'Building',
        projects: 'Projects',
        life: 'Life',
        notes: 'Notes',
        other: 'Other',
        probabilistic_linkage: 'Other',
        quotes_links: 'Notes',
    };

    return labels[category] || category;
};

const PostCodeLink = ({ frontmatter }) => {
    if (!frontmatter) return null;

    const {
        title,
        post_date,
        code_url,
        post_latest_update,
        post_category,
    } = frontmatter;

    const categoryLabel = formatCategory(post_category);
    const retrospective = Boolean(frontmatter.retrospective);
    const firstPublished = frontmatter.first_published || post_date || null;

    return (
        <header className="mb-10 md:mb-12">
            {categoryLabel && (
                <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-site-muted">
                    {categoryLabel}
                </p>
            )}

            {title && (
                <h1 className="mb-4 max-w-reading">
                    {title}
                </h1>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-site-muted">
                {post_date && <span>{formatDisplayDate(post_date)}</span>}
                {post_latest_update && <span>Updated {post_latest_update}</span>}
            </div>

            {retrospective && post_date && (
                <p className="mt-4 mb-0 max-w-reading text-sm leading-6 text-site-muted">
                    Written retrospectively and placed in the sequence for{' '}
                    {formatDisplayDate(post_date)}.
                    {firstPublished && (
                        <>
                            {' '}First published{' '}
                            {formatDisplayDate(firstPublished)}.
                        </>
                    )}
                </p>
            )}

            {code_url && (
                <p className="mt-5 mb-0 text-sm leading-7 text-site-muted">
                    {code_url.includes('observablehq.com')
                        ? 'Live edit this notebook'
                        : 'View source code for this page'}{' '}
                    <a
                        href={code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>.
                </p>
            )}
        </header>
    );
};

export default PostCodeLink;
