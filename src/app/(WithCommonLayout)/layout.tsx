
import Navbar from '@/components/shared/Navbar';
import TopNavbar from '@/components/shared/TopNavBar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode })  => {
    return (
        <div>
            <header>
                <TopNavbar/>
                <Navbar/>
            </header>
             <main className="min-h-screen">{children}</main>
        </div>
    );
};

export default CommonLayout;