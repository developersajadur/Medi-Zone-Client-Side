"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Sample slider data
const sliderData = [
  {
    imageUrl: "https://res.cloudinary.com/devsajadurrahman/image/upload/v1738846301/rayhggs4vmebeeit1p7z.jpg",
    title: "RideVibes",
    description:
      "Our Bicycle Shop is a place where you can find everything you need for your adventure.",
    link: "/bicycles",
  },
  {
    imageUrl: "https://res.cloudinary.com/devsajadurrahman/image/upload/v1738846301/d0bjjrghancmad7kkxlc.jpg",
    title: "Adventure Awaits",
    description:
      "Explore our collection of bikes designed for every kind of adventure.",
    link: "/bicycles",
  },
  {
    imageUrl: "https://res.cloudinary.com/devsajadurrahman/image/upload/v1738846302/rcx0s42ypxmttnr3rdba.jpg",
    title: "Find Your Perfect Ride",
    description:
      "From mountain bikes to road bikes, we have it all. Find your perfect match today.",
    link: "/bicycles",
  },
];

const HomeHeroSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Pagination, Autoplay]}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          height: 250, // Smaller height on mobile
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
          height: 350, // Taller height on tablets
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 30,
          height: 400, // Even taller height on larger screens
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 40,
          height: 450, // Larger height for large screens
        },
      }}
      className="mySwiper w-full h-full"
    >
      {sliderData.map((slide, index) => (
        <SwiperSlide
          key={index}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 2, 17, 0.7) 0%, rgba(7, 2, 17, 0.00) 60%), url(${slide.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
          className="w-full flex justify-center items-center rounded-md"
        >
          <div className="w-full h-full flex flex-col items-center rounded-md justify-center px-8 bg-black bg-opacity-40">
            <div className="">
              <h1 className="text-white text-2xl md:text-3xl font-semibold">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-4">
                {slide.description}
              </p>
              <Link href={slide.link}>
                <Button className="bg-primary text-white text-base font-medium">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeHeroSlider;
