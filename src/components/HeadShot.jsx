import React from 'react';
import profilePic from '../images/headshot.jpg';

const HeadShot = () => {
    return (
        <div className="mb-8">
            <div className="h-40 w-40 overflow-hidden rounded-full border border-site-border bg-white shadow-soft">
                <img
                    src={profilePic}
                    alt="Phil Hickinson"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

export default HeadShot;