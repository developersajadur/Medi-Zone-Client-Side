import HomeHeroSection from '@/components/modules/home/HomeHeroSection';
import HomeProducts from '@/components/modules/home/HomeProducts';
import React from 'react';

const HomePage = () => {
    return (
        <div className='px-2 md:px-8 lg:px-10 mt-5 lg:mt-10 mb:5 lg:mb-10'>
            <HomeHeroSection/>
            <HomeProducts/>
        </div>
    );
};

export default HomePage;