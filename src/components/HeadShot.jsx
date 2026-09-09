import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const ROTATION_INTERVAL_MS = 8000;

const HeadShot = () => {
    const data = useStaticQuery(graphql`
        query HeadShotImages {
            allFile(
                filter: {
                    sourceInstanceName: { eq: "images" }
                    relativeDirectory: { eq: "headshots" }
                }
                sort: { name: ASC }
            ) {
                nodes {
                    id
                    name
                    publicURL
                }
            }
        }
    `);

    const headshots = data.allFile.nodes;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (headshots.length <= 1) {
            return undefined;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            setCurrentIndex((index) => (index + 1) % headshots.length);
        }, ROTATION_INTERVAL_MS);

        return () => window.clearInterval(intervalId);
    }, [headshots.length]);

    if (headshots.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-site-border bg-white shadow-soft">
                {headshots.map((headshot, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <img
                            key={headshot.id}
                            src={headshot.publicURL}
                            alt={isActive ? 'Phil Hickinson' : ''}
                            aria-hidden={!isActive}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                                isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HeadShot;
