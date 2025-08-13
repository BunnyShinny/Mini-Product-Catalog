"use client";

import { useState, useEffect } from "react";
import Card from '../components/Card';
import Dropdown from '../components/Dropdown';
import Search from '../components/Search';

export default function HomePage() {
  const [fullProducts, setFullProducts] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // New: sorting state
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setFullProducts(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const handleSort = (field) => {
    let order = "asc";

    // If clicking the same field, toggle the order
    if (field === sortField) {
      order = sortOrder === "asc" ? "desc" : "asc";
    }

    setSortField(field);
    setSortOrder(order);

    let sorted = [...products];
    if (field === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (field === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (field === "sold") {
      sorted.sort((a, b) => a.rating.count - b.rating.count);
    }

    // Reverse if descending
    if (order === "desc") {
      sorted.reverse();
    }

    setProducts(sorted);
    setCurrentPage(1);
  };

  // Pagination slice
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container lg:px-64 md:px-32 sm:px-16 py-6">
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-6 gap-4">
        <div id="sorting" className="inline-flex rounded-md shadow-xs" role="group">
          <button 
            type="button" 
            onClick={() => handleSort("name")}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg 
              ${sortField === "name" ? "bg-blue-200" : "bg-white"}`}
          >
            Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button 
            type="button" 
            onClick={() => handleSort("price")}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 
              ${sortField === "price" ? "bg-blue-200" : "bg-white"}`}
          >
            Price {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button 
            type="button" 
            onClick={() => handleSort("sold")}
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg 
              ${sortField === "sold" ? "bg-blue-200" : "bg-white"}`}
          >
            Sold {sortField === "sold" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Dropdown 
            name={category}
            setProducts={setProducts}
            setLoading={setLoading}
            setCategory={setCategory}
            fullProducts={fullProducts}
          />
          <Search 
            fullProducts={fullProducts}
            setProducts={setProducts}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
