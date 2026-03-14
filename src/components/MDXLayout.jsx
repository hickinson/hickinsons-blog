import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Layout from './Layout';
import PostInfo from './PostCodeLink';
import CodeBlock from './CodeBlock';
import AnchorHeader from './AnchorHeader';

const components = {
    pre: props => <div {...props}></div>,
    code: CodeBlock,
    h1: props => <AnchorHeader tag="h1" {...props} />,
    h2: props => <AnchorHeader tag="h2" {...props} />,
    h3: props => <AnchorHeader tag="h3" {...props} />,
};

export function MDXLayout({ children, pageContext }) {
    const { frontmatter } = pageContext;

    return (
        <Layout>
            <div className="mx-auto max-w-reading py-6 md:py-10">
                <MDXProvider components={components}>
                    <PostInfo frontmatter={frontmatter} />
                    <article
                        key={typeof window === 'undefined' ? 'server' : 'client'}
                        id="mdx-container-div"
                        className="mdx-content"
                    >
                        {children}
                    </article>
                </MDXProvider>
            </div>
        </Layout>
    );
}

export function MDXLayoutWide({ children, pageContext }) {
    const { frontmatter } = pageContext;

    return (
        <Layout className="mx-auto w-full max-w-screen-xl px-5 sm:px-6 lg:px-8">
            <MDXProvider components={components}>
                <PostInfo frontmatter={frontmatter} />
                <div id="mdx-container-div" className="mdx-content">
                    {children}
                </div>
            </MDXProvider>
        </Layout>
    );
}

export function MDXLayoutFull({ children, pageContext }) {
    const { frontmatter } = pageContext;

    return (
        <Layout className="w-full px-4">
            <MDXProvider components={components}>
                <PostInfo frontmatter={frontmatter} />
                <div id="mdx-container-div" className="mdx-content w-full max-w-none">
                    {children}
                </div>
            </MDXProvider>
        </Layout>
    );
}

export default MDXLayout;