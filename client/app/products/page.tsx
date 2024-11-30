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
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products whenever the search query changes
  useEffect(
    () => {
      // the entire function(1)
      const loadProducts = async () => {
        // function(2) - this is an asynchronous function, since it might take
        // time for the data to be loaded from the server, whilest doing so
        // all of the code in this is paused since the next peices of code
        // depends on the fetched data

        // here loading becomes a true virtue
        setIsLoading(true);

        // and here the main thing, the await keyword stop the execution of all the
        // function calls around it and the rest of the code INSIDE OF THE laodProducts
        // function is only executed when the fetchProdcuts is resolved or its done
        // executing its task - right?
        // but what if we didn't used the await keyword or some asynchronous feature
        // available in js? - This code still should've executed in the same manner right?
        // since javascript is a single threaded language the next line won't be executed up
        // untill the first one is done right?
        // So what's the point of using that asyc and await keywords?
        const fetchedProducts = await fetchProducts(searchQuery);

        // setting the products after the await call, because setting products
        // depends on the fetchProducts
        setProducts(fetchedProducts);

        // now loading is set to false once the data is loaded and set
        setIsLoading(false);
        // function(2)
      };

      const debounceTimer = setTimeout(() => {
        loadProducts();
      }, 300); // Debounce API calls by 300ms

      return () => clearTimeout(debounceTimer);
      
      // now here comes the important part,
      // here in useEffect - this hook is only called when the value
      // of searchQuery is changed, right? Because we've added the
      // variable in the dependency array right? So every time when
      // the state variable changes the useEffect hook is gonna call
      // the defined function inside of it which is used to fetch the
      // respective products - Correct me if I'm wrong
    },
    // Down untill here function(1)
    [searchQuery]
  );

  return (
    <div>
      {/* Once the value is recieved to the parent we're setting the value of searchQuery equal to that same value that the 
      user happen to be typing using the usestate setter function- setSearchQuery*/}
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
