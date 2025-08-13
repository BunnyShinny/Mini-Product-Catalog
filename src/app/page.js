"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Card from '../components/Card';
import Dropdown from '../components/Dropdown';
import Search from '../components/Search';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setLoading(false);
      });
  }, []);

  

  return (
    <div className="container lg:px-64 md:px-32 sm:px-16  py-6">
      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center space-x-2">
            <Dropdown 
              name="Category"
              setProducts={setProducts}
              setLoading={setLoading}
            />
            <Search 
              products={products}
              setProducts={setProducts}
              setLoading={setLoading}
            />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}