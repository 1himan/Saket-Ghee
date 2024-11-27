import Image from "next/image";
import React from "react";
import RatingStar from "./RatingStars";
import BasicSelect from "./Select";
import Link from "next/link";

export default function ProductCard() {
  return (
    <Link href={`/products/1`}>
      <div className="flex flex-col gap-2 rounded-xl border border-black w-[250px] h-fit pb-4 bg-blue-gray-00 transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="overflow-hidden rounded-t-xl">
        <Image
          src={"/products/ghee1.png"}
          alt={""}
          width={250}
          height={100}
          style={{ width: "100%", height: "auto" }}
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="px-3 flex flex-col gap-3">
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
          <button className="flex-1 bg-[#FFA500] text-white py-2 rounded-md hover:bg-[#FF8C00] hover:opacity-90 transition-all">
            Buy Now
          </button>
          <button className="flex-1 bg-[#D0BD80] text-white py-2 rounded-md hover:bg-[#C5AE72] hover:opacity-90 transition-all">
            Add to Cart
          </button>
        </div>
      </div>
      </div>
    </Link>
  );
}
