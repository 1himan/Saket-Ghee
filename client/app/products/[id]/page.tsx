"use client";

import { useState } from "react";
import RatingStar from "@/components/RatingStars";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [
    "/products/ghee3.jpg",
    "/products/ghee3.jpg",
    "/products/ghee3.jpg",
    "/products/ghee3.jpg",
    "https://www.youtube.com/embed/o2FqU2f6DRc",
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoClick = () => {
    setSelectedImageIndex(images.length - 1);
    setIsModalOpen(true);
  };

  // New function to handle overlay clicks
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Add useEffect to handle body scroll
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div>
      {/* Main Content */}
      <div className="bg-white mx-60 flex justify-evenly mt-7">
        <div className="w-[40%]">
          <Image
            src={"/products/ghee2.jpg"}
            className="w-full h-[26rem] object-cover"
            alt={"Saket Ghee"}
            width={350}
            height={100}
          />
          {/* Small Images */}
          <div className="flex gap-2 mt-4 justify-evenly">
            {images.slice(0, -1).map((src, index) => (
              <Image
                key={index}
                src={src}
                className="w-16 h-16 object-cover cursor-pointer"
                alt={`Small Image ${index + 1}`}
                width={64}
                height={64}
                onClick={() => handleImageClick(index)}
              />
            ))}
            {/* Video Thumbnail */}
            <button
              onClick={handleVideoClick}
              className="w-16 h-16 bg-gray-200 flex items-center justify-center"
            >
              ▶️
            </button>
          </div>
        </div>
        <div className="w-[40%] bg-blue-gray-00">
          <p className="text-2xl font-semibold mb-2">A2 Desi Cow Ghee</p>
          <div className="flex items-center gap-2">
            <RatingStar /> <span className="text-sm">on 1221 reviews</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-lg font-bold">₹897</p>
            <p className="text-sm line-through text-gray-500">₹999</p>
            <p className="text-sm text-green-500 font-bold">17% off</p>
          </div>
          {/* Size Options */}
          <div className="mt-3">
            <p className="text-sm font-semibold">Size:</p>
            <div className="flex gap-2 mt-2">
              <button className="border px-2 py-1">2 litre</button>
              <button className="border px-2 py-1">1 litre</button>
              <button className="border px-2 py-1">750 gm</button>
              <button className="border px-2 py-1">500 gm</button>
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm font-semibold">Quantity:</p>
            <button className="border px-2">-</button>
            <span className="px-2">1</span>
            <button className="border px-2">+</button>
          </div>
          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-4">
            <button className="bg-[#FFA500] text-white px-4 py-2 mr-28 rounded-md">
              Buy Now
            </button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded-md mr-28">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Image Carousel Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-4 rounded-md w-[800px] relative">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800">
                Close
              </button>
              <span className="text-gray-600">
                {selectedImageIndex + 1} of {images.length}
              </span>
            </div>
            <Carousel 
              selectedItem={selectedImageIndex} 
              showThumbs={false}
              showStatus={false}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                return (
                  <span
                    className={`inline-block w-2 h-2 mx-1 rounded-full ${
                      isSelected ? 'bg-[#00584B]' : 'bg-gray-300'
                    }`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                  ></span>
                );
              }}
            >
              {images.map((src, index) => (
                <div key={index}>
                  {index === images.length - 1 ? (
                    <iframe
                      width="100%"
                      height="450"
                      src={src}
                      title="Product Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`Carousel Image ${index + 1}`}
                      className="max-h-[450px] object-contain"
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
      <div className="bg-white mx-60 mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">More About this Product</h2>
        <div className="text-gray-700">
          <p className="mb-4">
            Here is some placeholder/dummy text you can use under the "More
            About this Product" section:
          </p>
          <p className="mb-4">
            A2 Desi Cow Ghee is a premium-quality, 100% natural product sourced
            from grass-fed desi cows. Handcrafted using the traditional Bilona
            method, this ghee is rich in essential nutrients, vitamins, and
            healthy fats that enhance immunity and overall well-being.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Rich in Nutrients: Packed with Omega-3 fatty acids, Vitamin A, and
              antioxidants.
            </li>
            <li>
              Digestive Health: Aids digestion and improves gut health with its
              natural enzymes.
            </li>
            <li>
              Authentic Taste: Traditional method ensures an authentic, earthy
              flavor.
            </li>
            <li>
              Versatile Usage: Perfect for cooking, baking, or as a spread.
              Ideal for boosting the nutritional value of your meals.
            </li>
            <li>
              Purity Guaranteed: Free from artificial additives, preservatives,
              and chemicals.
            </li>
          </ul>
          <p>
            Embrace the essence of traditional goodness with every spoonful of
            our A2 Desi Cow Ghee. Experience the difference today!
          </p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white mx-60 mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {/* Individual Review Card */}
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Image
              src="/himan.png"
              alt="Customer Avatar"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <div className="flex items-center gap-2 my-1">
                <RatingStar rating={5} />
                <span className="text-sm text-gray-500">2 months ago</span>
              </div>
              <p className="text-gray-700">
                I've been using this A2 Desi Cow Ghee for the past 3 months and
                I'm absolutely impressed with its quality. The authentic taste
                and aroma remind me of the homemade ghee my grandmother used to
                make. It's perfect for my daily cooking and I've noticed a
                significant improvement in the taste of my dishes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Image
              src="/indudidi.png"
              alt="Customer Avatar"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">Rajesh Patel</h3>
              <div className="flex items-center gap-2 my-1">
                <RatingStar rating={4} />
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-700">
                Being health conscious, I was looking for pure A2 ghee, and this
                product exceeded my expectations. The traditional Bilona method
                of preparation really makes a difference. The golden color and
                rich texture are exactly what you'd expect from premium quality
                ghee. Great for both cooking and medicinal purposes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Image
              src="/indudidi.png"
              alt="Customer Avatar"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">Priya Sharma</h3>
              <div className="flex items-center gap-2 my-1">
                <RatingStar rating={5} />
                <span className="text-sm text-gray-500">3 weeks ago</span>
              </div>
              <p className="text-gray-700">
                The purity of this ghee is unmatched! I use it for my morning
                ritual of golden milk and it has made a noticeable difference in
                my digestion. The packaging is excellent and keeps the ghee
                fresh. A bit pricey compared to regular ghee, but the quality
                justifies the cost. Will definitely purchase again!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
