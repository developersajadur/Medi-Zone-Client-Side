
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode })  => {
    return (
        <div>
            <header>
                <Navbar/>
            </header>
             <main className="min-h-screen">{children}</main>
        </div>
    );
};

export default CommonLayout;