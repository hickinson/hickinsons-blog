import React from 'react';

const extractText = node => {
    if (node === null || node === undefined || typeof node === 'boolean') {
        return '';
    }
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(extractText).join('');
    }
    if (React.isValidElement(node)) {
        return extractText(node.props?.children);
    }
    return '';
};

const generateId = str => {
    if (typeof str !== 'string') {
        console.error('generateId received non-string argument:', str);
        return '';
    }
    return str.toLowerCase().replace(/\s+/g, '-');
};

const AnchorHeader = ({ children, tag: Tag }) => {
    const id = generateId(extractText(children));
    return (
        <div className="relative group">
            <Tag id={id}>
                <a href={`#${id}`} className="flex items-start text-current">
                    <span
                        className="invisible group-hover:visible pr-1 absolute"
                        style={{ left: '-1em' }}
                    >
                        #
                    </span>
                    {children}
                </a>
            </Tag>
        </div>
    );
};

export default AnchorHeader;
