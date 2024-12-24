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
    
    console.log("Error loading products:", error);
    return { products: [], totalResults: 0 };
  }
}

export default function Page() {
  // useSearchParams is a hook that allows you to read the current URL's search parameters.
  // It returns a ReadonlyURLSearchParams object, which is a collection of key-value pairs representing the search parameters.
  // Each call to useSearchParams returns a new object, so it should not be called in a loop or condition.
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    // This is a two case scenario, First is when the user normally navigates to the /products page
    // Second is when the user clicks on a prodcut result on the home page and is redirected to the
    // page with the search query. Both cases are handled here gracefully here. :)
    searchParams.get("search") || ""
  );
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products based on the current searchQuery and page
  const loadProducts = async () => {
    if (isLoading || !hasMore) return;
    console.log("loadProducts triggered");
    setIsLoading(true);
    const { products: newProducts, totalResults } = await fetchProducts(
      searchQuery,
      page
    );
    console.log("Fetched products:", newProducts);
    setProducts((prev) => [...prev, ...newProducts]);
    setTotalResults(totalResults);
    setHasMore(newProducts.length > 0);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  // Handle search query change
  useEffect(() => {
    console.log("useEffect for searchQuery triggered");
    setProducts([]);
    setPage(1);
    setHasMore(true);
    loadProducts();
  }, [searchQuery]);

  // Infinite scroll implementation using IntersectionObserver with debounce
useEffect(() => {
  let debounceTimeout: NodeJS.Timeout | null = null;
  //  modern way to efficiently detect when an element enters or exits the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        // Apply debounce to prevent rapid calls
        if (!debounceTimeout) {
          debounceTimeout = setTimeout(() => {
            console.log(  
              "loadProducts triggered from IntersectionObserver's useEffect"
            );
            loadProducts();
            debounceTimeout = null; // Reset timeout after execution
          }, 300); // Adjust debounce delay as needed
        }
      }
    },
    { threshold: 0.1 }
  );

  const target = document.querySelector("#infinite-scroll-trigger");
  if (target) observer.observe(target);

  // Cleanup observer and debounce timeout
  return () => {
    observer.disconnect();
    if (debounceTimeout) clearTimeout(debounceTimeout);
  };
}, [isLoading, hasMore]); // Add necessary dependencies


  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      {/* Search Component */}
      <div className="my-6 w-full">
        <SearchComponent
          onSearch={(value) => setSearchQuery(value)}
          initialValue={searchQuery}
        />
      </div>
      {/* Total Results */}
      <p className="text-left mb-4 w-full">{totalResults} results for your search</p>
      {/* Product List */}
      <div className="flex flex-wrap gap-5 justify-center w-full">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      {/* Loading Indicator */}
      {isLoading && <p className="text-center text-2xl text-gray-700 mt-6">Loading...</p>}
      {/* Infinite Scroll Trigger */}
      <div id="infinite-scroll-trigger" className="bg-blue-gray-00 w-full" style={{ height: "20px" }} />
    </div>
  );
}
