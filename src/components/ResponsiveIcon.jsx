import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

const ResponsiveLink = ({ text, IconComponent, route }) => {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);

            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    if (windowWidth === null) return null;

    return (
        <Link
            to={route}
            className="text-[0.98rem] font-medium text-site-muted no-underline transition-colors duration-200 hover:text-site-text"
        >
            {windowWidth > 500 ? (
                text
            ) : (
                <IconComponent className="h-[1.02rem] w-[1.02rem]" />
            )}
        </Link>
    );
};

export default ResponsiveLink;