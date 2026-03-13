import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

export const SEO = ({ frontmatter = {} }) => {
    const {
        title: defaultTitle,
        description: defaultDescription,
        image,
        siteUrl,
        twitterUsername,
    } = useSiteMetadata();

    const seo = {
        title: frontmatter.title || defaultTitle,
        description: frontmatter.description || defaultDescription,
        image: `${siteUrl}${frontmatter.image || image}`,
        url: `${siteUrl}${frontmatter.pathname || ``}`,
        twitterUsername,
        ...frontmatter,
    };

    const stylesheetLink = frontmatter.stylesheet;
    const pageTitle =
        typeof seo.title === 'string' ? seo.title : String(seo.title || defaultTitle);

    return (
        <>
            <title key="title">{pageTitle}</title>
            <meta key="description" name="description" content={seo.description} />
            <meta key="image" name="image" content={seo.image} />
            {stylesheetLink && (
                <link
                    key="stylesheet"
                    rel="stylesheet"
                    type="text/css"
                    href={`/styles/${stylesheetLink}`}
                />
            )}
        </>
    );
};