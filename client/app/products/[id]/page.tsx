import RatingStar from "@/components/RatingStars";
import Image from "next/image";
import React from "react";

// ... existing imports ...

export default function page() {
  return (
    <div>
      <div className="bg-blue-gray-400 mx-60 flex justify-evenly mt-7">
        <div className="w-[40%] bg-black">
          <Image
            src={"/productGhee1.jpg"}
            className="w-full h-[26rem]"
            alt={""}
            width={350}
            height={100}
          />
        </div>

        <div className="w-[40%] bg-brown-500">
          <p className="text-2xl font-semibold">A2 Desi Cow Ghee</p>
          <div className="flex gap-2">
            <RatingStar /> <span className="text-sm">on 1221 Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">₹897</p>
            <p className="text-xs line-through text-gray-500 font-semibold">
              ₹999
            </p>
            <p className="text-xs text-green-500 font-bold">17% off</p>
          </div>

          {/* Size Options */}
          <div className="mt-4">
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
          <div className="mt-4 flex gap-4">
            <button className="bg-yellow-500 text-white px-4 py-2">Buy Now</button>
            <button className="bg-gray-300 text-black px-4 py-2">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}