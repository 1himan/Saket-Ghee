//client/app/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchComponent from "@/components/SearchComponent";

interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  quantityAvailable: number;
}

async function fetchProducts(searchQuery = ""): Promise<Product[]> {
  try {
    const res = await fetch(
      `http://localhost:5000/products?search=${searchQuery}`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products whenever the search query changes
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts(searchQuery);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      loadProducts();
    }, 300); // Debounce API calls by 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div>
      <SearchComponent onSearch={(value) => setSearchQuery(value)} />
      {isLoading && <p className="text-center">Loading...</p>}
      <div className="flex flex-wrap gap-4 bg-gray-00 mx-24 justify-evenly mb-7">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}
