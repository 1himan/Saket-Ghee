"use client";
import React, { useState, useEffect } from "react";

interface SearchComponentProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchComponent({ onSearch, initialValue = "" }: SearchComponentProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
