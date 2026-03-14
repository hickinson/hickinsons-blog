import React from 'react';
import Header from './Header';
import Footer from './Footer';

export function Layout({ children, className }) {
    return (
        <div className="min-h-screen bg-site-bg text-site-text">
            <div
                className={
                    className
                        ? className
                        : 'mx-auto w-full max-w-layout px-5 sm:px-6 lg:px-8'
                }
            >
                <Header />
                <main className="pb-16">{children}</main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;