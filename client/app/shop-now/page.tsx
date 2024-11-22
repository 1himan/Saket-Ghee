import ProductCard from "@/components/ProductCard";
import SearchComponent from "@/components/SearchComponent";
import React from "react";

export default function page() {
  return (
    <div>
      <SearchComponent />
      <div className="flex flex-wrap gap-4 bg-gray-00 mx-24 justify-evenly mb-7">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
