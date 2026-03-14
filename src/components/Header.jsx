import React from 'react';
import { Link } from 'gatsby';
import {
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaHome,
    FaInfoCircle,
} from 'react-icons/fa';

import ResponsiveLink from './ResponsiveIcon';
import '../styles/shimmer.css';

const iconLinkClassName =
    'text-site-muted hover:text-site-text transition-colors duration-200';

const Header = () => {
    return (
        <header className="pt-5 pb-4">
            <div className="flex items-center justify-between gap-4">
                <Link
                    to="/"
                    className="font-mono text-[0.98rem] font-semibold tracking-[-0.03em] text-site-text no-underline"
                    aria-label="Go to homepage"
                >
                    <span className="shimmer-text">&gt;hickinsons</span>
                </Link>

                <nav
                    className="flex items-center gap-3 sm:gap-4"
                    aria-label="Primary"
                >
                    <ResponsiveLink
                        text="Home"
                        IconComponent={FaHome}
                        route="/"
                    />
                    <ResponsiveLink
                        text="About"
                        IconComponent={FaInfoCircle}
                        route="/about"
                    />

                    <a
                        href="https://twitter.com/hickinsons"
                        className={iconLinkClassName}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X / Twitter"
                    >
                        <FaTwitter className="h-[1rem] w-[1rem]" />
                    </a>

                    <a
                        href="https://github.com/hickinson"
                        className={iconLinkClassName}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="h-[1rem] w-[1rem]" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/hickinsons/"
                        className={iconLinkClassName}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="h-[1rem] w-[1rem]" />
                    </a>
                </nav>
            </div>

            <div className="mt-4 border-b border-site-border" />
        </header>
    );
};

export default Header;