"use client";

import { HomeCarousel } from "@/components/Carousel";
import Footer from "@/components/Footer";
import { CarouselDefault } from "@/components/MiniCarousel";
import ProductContainer from "@/components/ProductContainer";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="w-[100vw] bg-slate-00 relative">
      <HomeCarousel />
      <p className="text-xl text-center my-7">Our Harvest Picks</p>
      <ProductContainer />
      <hr className="mx-[15vw] my-10" />
      <p className="text-2xl text-center">Welcome To Saket Ghee</p>
      <p className="text-gray-700 w-[60vw] mx-auto text-center mt-2">
        Your Trusted Source for Fresh, Authentic Products. We bring you pure,
        unadulterated ghee, honey, and dairy straight from the heart of India’s
        farms. Sourced directly from local farmers, every product is crafted
        with care, free from chemicals, and true to traditional methods.
        Experience the taste of authenticity and the goodness of nature,
        delivered from our farms to your home.
      </p>
      <div className="flex justify-evenly mt-7">
        <CarouselDefault delay={3000} />
        <CarouselDefault delay={4000} />
        <CarouselDefault delay={5000} />
      </div>
      <div className="mt-10 w-full">
        <div
          className="relative w-full h-0"
          style={{ paddingBottom: "40%" }} // Adjusted for a shorter height
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <hr className="mx-[15vw] my-10" />
      <p className="text-2xl font-semibold text-gray-700 text-center  ">
        What are Customers Are Saying About Us
      </p>
      <div className="flex justify-evenly mt-7">
        <div className="w-[35vw] h-72 bg-yellow-50 rounded-md flex items-center p-7 gap-4">
          <Image
            src={"/himan.png"}
            alt="himan"
            width={200}
            height={100}
            className="rounded-md"
          />
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Himanshu - North Delhi</p>
            <p className="text-gray-700">
              I was skeptical at first, but the quality of these products is
              outstanding. Knowing they come directly from farmers makes it even
              better. Truly fresh and worth every penny!
            </p>
          </div>
        </div>{" "}
        <div className="w-[35vw] h-72 bg-yellow-50 rounded-md flex items-center p-7 gap-4">
          <Image
            src={"/indudidi.png"}
            alt="indudidi.png"
            width={200}
            height={100}
            className="rounded-md"
          />
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Indu Mahore - South Delhi
            </p>
            <p className="text-gray-700">
              I’ve been searching for pure, chemical-free ghee for so long, and
              I finally found it here. The taste and quality are just like
              homemade! Highly recommended!
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
