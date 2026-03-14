import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
    return (
        <footer className="border-t border-site-border py-8">
            <div className="flex flex-col items-center gap-3 text-center">
                <Link
                    to="/"
                    className="text-sm font-medium text-site-muted no-underline hover:text-site-text"
                >
                    Back home
                </Link>

                <p className="max-w-2xl text-sm leading-7 text-site-muted mb-0">
                    This site is built with{' '}
                    <a href="https://gatsbyjs.org">Gatsby</a> and{' '}
                    <a href="https://mdxjs.com">MDX</a>. Source code{' '}
                    <a href="https://github.com/hickinson/hickinsons-blog">
                        here
                    </a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;