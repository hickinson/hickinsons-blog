import React from 'react';
import Header from './Header';
import Footer from './Footer';

export function Layout({ children, pageContext, className }) {
    return (
        <>
            <div
                className={
                    className
                        ? className
                        : 'text-base mx-auto w-full max-w-3xl px-6'
                }
            >
                <Header />
                <div>{children}</div>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
