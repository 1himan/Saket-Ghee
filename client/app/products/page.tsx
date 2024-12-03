"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchComponent from "@/components/SearchComponent";
import { useSearchParams } from "next/navigation";

// Define the Product type
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

// Function to fetch products from the server
async function fetchProducts(
  searchQuery = "",
  page = 1,
  limit = 20
): Promise<{ products: Product[]; totalResults: number }> {
  try {
    const res = await fetch(
      `http://localhost:5000/products?search=${searchQuery}&page=${page}&limit=${limit}`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    // Return the JSON response which includes both products and totalResults
    return res.json(); // { products: [...], totalResults: 200 }
  } catch (error) {
    console.error("Error loading products:", error);
    return { products: [], totalResults: 0 };
  }
}

export default function Page() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products based on the current searchQuery and page
  const loadProducts = async () => {
    if (isLoading || !hasMore) return; // Prevent duplicate fetch calls

    setIsLoading(true);
    const { products: newProducts, totalResults } = await fetchProducts(
      searchQuery,
      page
    );

    setProducts((prev) => [...prev, ...newProducts]); // Append new products to the current list
    setTotalResults(totalResults); // Update total results count
    setHasMore(newProducts.length > 0); // Check if more products are available
    setPage((prev) => prev + 1); // Increment the page number
    setIsLoading(false);
  };

  // Handle search query change
  useEffect(() => {
    setProducts([]); // Clear the product list
    setPage(1); // Reset page to 1
    setHasMore(true); // Allow fetching new results
    loadProducts(); // Load products for the new search query
  }, [searchQuery]);

  // Infinite scroll implementation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadProducts(); // Fetch the next set of products when the trigger is visible
        }
      },
      { threshold: 1.0 }
    );

    const target = document.querySelector("#infinite-scroll-trigger");
    if (target) observer.observe(target);

    return () => observer.disconnect(); // Clean up the observer
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Search Component */}
      <div className="my-6">
        <SearchComponent
          onSearch={(value) => setSearchQuery(value)}
          initialValue={searchQuery}
        />
      </div>

      {/* Total Results */}
      <p className="text-left mb-4">{totalResults} results for your search</p>

      {/* Product List */}
      <div className="flex flex-wrap gap-5 px-16">
        {products.map((product,index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && <p className="text-center mt-6">Loading...</p>}

      {/* Infinite Scroll Trigger */}
      <div id="infinite-scroll-trigger" style={{ height: "20px" }} />
    </div>
  );
}
