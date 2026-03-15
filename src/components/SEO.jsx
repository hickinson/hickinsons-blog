import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const makeAbsoluteUrl = (siteUrl, value) => {
    if (!value) return siteUrl;
    if (/^https?:\/\//i.test(value)) return value;
    return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

export const SEO = ({ frontmatter = {}, pathname = '' }) => {
    const {
        title: siteTitle,
        description: siteDescription,
        image: defaultImage,
        siteUrl,
        twitterUsername,
    } = useSiteMetadata();

    const rawTitle = frontmatter.title || siteTitle;
    const isHomePage =
        !frontmatter.title || rawTitle.toLowerCase() === siteTitle.toLowerCase();

    const pageTitle = isHomePage ? siteTitle : `${rawTitle} | ${siteTitle}`;
    const description = frontmatter.description || siteDescription;

    const image = makeAbsoluteUrl(siteUrl, frontmatter.image || defaultImage);
    const url = pathname ? `${siteUrl}${pathname}` : siteUrl;

    const isArticle =
        frontmatter.post_category &&
        frontmatter.post_category !== 'non_blog_post' &&
        !!frontmatter.title;

    const robots = frontmatter.noindex ? 'noindex,nofollow' : 'index,follow';

    return (
        <>
            <html lang="en" />
            <title>{pageTitle}</title>

            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />

            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={isArticle ? 'article' : 'website'} />

            {isArticle && frontmatter.post_date && (
                <meta
                    property="article:published_time"
                    content={frontmatter.post_date}
                />
            )}

            {isArticle && frontmatter.post_latest_update && (
                <meta
                    property="article:modified_time"
                    content={frontmatter.post_latest_update}
                />
            )}

            {frontmatter.post_category &&
                frontmatter.post_category !== 'non_blog_post' && (
                    <meta
                        property="article:section"
                        content={frontmatter.post_category}
                    />
                )}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {twitterUsername && (
                <>
                    <meta name="twitter:site" content={twitterUsername} />
                    <meta name="twitter:creator" content={twitterUsername} />
                </>
            )}

            {frontmatter.stylesheet && (
                <link
                    rel="stylesheet"
                    type="text/css"
                    href={`/styles/${frontmatter.stylesheet}`}
                />
            )}
        </>
    );
};