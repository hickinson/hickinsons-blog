import React from 'react';
import { Link } from 'gatsby';

const ResponsiveLink = ({ text, IconComponent, route }) => {
    return (
        <Link
            to={route}
            className="text-[0.98rem] font-medium text-site-muted no-underline transition-colors duration-200 hover:text-site-text"
        >
            <span className="hidden min-[501px]:inline">{text}</span>
            <IconComponent className="h-[1.02rem] w-[1.02rem] min-[501px]:hidden" />
        </Link>
    );
};

export default ResponsiveLink;
