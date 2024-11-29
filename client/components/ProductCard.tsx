import Image from "next/image";
import React, { useState } from "react";
import RatingStar from "./RatingStars";
import BasicSelect from "./Select";
import Link from "next/link";

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  quantityAvailable: number;
  seller: string;
  volumeSize: string;
}

export default function ProductCard({
  _id,
  name,
  image,
  rating,
  reviews,
  price,
  originalPrice,
  discount,
  quantityAvailable,
  seller,
  volumeSize,
}: ProductProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking the button
    
    // Get existing cart items from localStorage
    const existingCart = localStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === _id);

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += selectedQuantity;
    } else {
      // Add new item if it doesn't exist
      cartItems.push({
        id: _id,
        name,
        price,
        quantity: selectedQuantity,
        volumeSize,
        image,
        seller,
      });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Optional: Add some user feedback
    alert('Item added to cart!');
  };

  return (
    <Link href={`/products/${_id}`}>
      <div className="flex flex-col gap-2 rounded-xl border border-black w-[250px] h-fit pb-4 bg-blue-gray-00 transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={name}
            layout="fill" // Makes the image fill its parent container
            objectFit="cover" // Ensures proportional scaling (no stretching)
            objectPosition="center" // Centers the image within the container
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="px-3 flex flex-col gap-3">
          <p className="text-xl text-center">{name}</p>
          <div className="flex gap-2">
            <RatingStar value={rating} />
            <span className="text-xs">on {reviews} Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">₹{price}</p>
            <p className="text-xs line-through text-gray-500 font-semibold">
              ₹{originalPrice}
            </p>
            <p className="text-xs text-green-500 font-bold">{discount}% off</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="">Quantity</p>
            <BasicSelect maxQuantity={quantityAvailable} />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#FFA500] text-white py-2 rounded-md hover:bg-[#FF8C00] hover:opacity-90 transition-all">
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#D0BD80] text-white py-2 rounded-md hover:bg-[#C5AE72] hover:opacity-90 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
