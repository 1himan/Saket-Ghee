"use client";

import HomeCarousel from "@/components/Carousel";
import { CarouselDefault } from "@/components/MiniCarousel";
import ProductContainer from "@/components/ProductContainer";
import React from "react";

export default function Home() {
  return (
    <div className="w-[100vw] bg-slate-00 relative">
      <HomeCarousel />
      <p className="text-xl text-center my-7">Our Harvest Picks</p>
      <ProductContainer />
      <hr className="mx-[15vw] my-10" />
      <p className="text-2xl text-center">Welcome To Saket Ghee</p>
      <p className="text-gray-500 w-[60vw] mx-auto text-center mt-2">
        Your Trusted Source for Fresh, Authentic Products.We bring you pure,
        unadulterated ghee, honey, and dairy straight from the heart of India’s
        farms. Sourced directly from local farmers, every product is crafted
        with care, free from chemicals, and true to traditional methods.
        Experience the taste of authenticity and the goodness of nature,
        delivered from our farms to your home.
      </p>
      <div className="relative h-[400px] w-full">
        <CarouselDefault />
      </div>
    </div>
  );
}


// Carousel website to use
// https://www.material-tailwind.com/docs/react/carousel
// https://tw-elements.com/docs/react/components/carousel/

// or probably search for best carousel libraries on the internet without any error
// and stronger community supportx
