import React from 'react';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import QuotesLinks from '../components/linkblog/QuotesLinks';
import { SEO } from '../components/SEO';

const CommonplacePage = () => {
    return (
        <Layout>
            <Section>
                <div className="max-w-[46rem] pt-4 md:pt-6">
                    <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-site-muted">
                        Commonplace
                    </p>
                    <h1 className="mb-5">Things I want to remember</h1>
                    <p className="max-w-reading text-[1.08rem] leading-[1.9] text-site-muted mb-4">
                        Things I’ve read, heard, saved and want to remember.
                    </p>
                    <p className="max-w-reading text-site-muted mb-8">
                        These are not finished essays. They are sources, observations and questions that caught my attention, with a note about why I kept them.
                    </p>
                    <QuotesLinks />
                </div>
            </Section>
        </Layout>
    );
};

export default CommonplacePage;

export const Head = props => (
    <SEO
        frontmatter={{
            title: 'Commonplace',
            description: 'Things I’ve read, heard, saved and want to remember.',
            post_category: 'non_blog_post',
        }}
        pathname={props?.location?.pathname || ''}
    />
);
