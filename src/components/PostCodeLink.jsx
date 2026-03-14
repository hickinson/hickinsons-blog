import React from 'react';

const PostCodeLink = ({ frontmatter }) => {
    if (!frontmatter) return null;

    const { post_date, code_url, post_latest_update } = frontmatter;

    if (!code_url) return null;

    let text = 'View source code for this page';

    if (code_url.includes('observablehq.com')) {
        text = 'Live edit this notebook';
    }

    return (
        <p className="mb-8 text-sm leading-7 text-site-muted">
            Originally posted: {post_date}.
            {post_latest_update && ` Last updated: ${post_latest_update}.`}{' '}
            {text}{' '}
            <a
                href={code_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                here
            </a>.
        </p>
    );
};

export default PostCodeLink;