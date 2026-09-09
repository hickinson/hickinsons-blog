import React, { useEffect, useState } from 'react';

const headshotContext = require.context(
    '../images/headshots',
    false,
    /\.(png|jpe?g|webp)$/i
);

const portraits = headshotContext
    .keys()
    .sort()
    .map((key) => {
        const asset = headshotContext(key);
        return asset?.default || asset;
    });

const HeadShot = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

        updateMotionPreference();
        mediaQuery.addEventListener?.('change', updateMotionPreference);

        return () => {
            mediaQuery.removeEventListener?.('change', updateMotionPreference);
        };
    }, []);

    useEffect(() => {
        if (portraits.length < 2 || reduceMotion) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setCurrentIndex((index) => (index + 1) % portraits.length);
        }, 7500);

        return () => window.clearInterval(interval);
    }, [reduceMotion]);

    if (portraits.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-site-border bg-white shadow-soft">
                {portraits.map((portrait, index) => (
                    <img
                        key={portrait}
                        src={portrait}
                        alt="Phil Hickinson"
                        aria-hidden={index === currentIndex ? undefined : true}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeadShot;
