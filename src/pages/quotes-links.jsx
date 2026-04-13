import React from 'react';
import QuotesLinks from '../components/linkblog/QuotesLinks';
import { SEO } from '../components/SEO';

const QuotesLinksPage = ({ location }) => {
    return <QuotesLinks location={location} />;
};

export default QuotesLinksPage;

export const Head = (props) => (
    <SEO
        frontmatter={{
            title: 'Quotes and links',
            description:
                'Collected quotes, links, and podcast notes on data, systems, AI, and building.',
            post_category: 'non_blog_post',
        }}
        pathname={props?.location?.pathname || ''}
    />
);
