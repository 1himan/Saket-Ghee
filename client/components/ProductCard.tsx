import Image from "next/image";
import React from "react";
import RatingStar from "./RatingStars";
import BasicSelect from "./Select";

export default function ProductCard() {
  return (
    <div className="flex rounded-xl flex-col gap-2 bg-blue-gray-00 border border-black w-[250px] h-fit pb-4">
      <Image
        src={"/productGhee.png"}
        alt={""}
        width={250}
        height={100}
        style={{ width: "100%", height: "auto" }}
      />
      <div className=" bg-blue-gray-00 px-3 flex flex-col gap-3">
        <p className="text-xl text-center">Product Name</p>
        <div className="flex gap-2">
          <RatingStar /> <span className="text-xs">on 1221 Reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">₹897</p>
          <p className="text-xs line-through text-gray-500 font-semibold">
            ₹999
          </p>
          <p className="text-xs text-green-500 font-bold">17% off</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="">Quantity</p>
          <BasicSelect />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#FFA500] text-white py-2 rounded-md hover:opacity-90">
            Buy Now
          </button>
          <button className="flex-1 bg-[#D0BD80] text-white py-2 rounded-md hover:opacity-90">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
