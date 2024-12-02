//client/app/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchComponent from "@/components/SearchComponent";
import { useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

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
    // after succesfull getting the data from the server we can return this to
    // our fetchedProducts variable.
    // But I don't understand one thing that - why are we using res.json here?
    // I mean .json() - what does this method do exactly and by do we need it?
    return res.json();
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export default function Page() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize search from URL parameter
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity
      image: product.image,
      seller: "Saket Ghee" // You might want to make this dynamic too
    };

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!');
  };

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
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4">
      {/* Search bar with proper spacing and visibility */}
      <div className="my-6">
        <SearchComponent 
          onSearch={(value) => setSearchQuery(value)} 
          initialValue={searchQuery}
        />
      </div>

      {isLoading && <p className="text-center">Loading...</p>}
      
      <div className="bg-blue-gray-00 justify-center flex flex-wrap gap-4 bg-gray-00 mb-7">
        <div className="bg-blue-gray-00 flex flex-wrap gap-5 w-[90%]">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
