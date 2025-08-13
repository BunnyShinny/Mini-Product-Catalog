"use client";

import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductDetail() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const increaseQty = () => setQty(prev => prev + 1);
  const decreaseQty = () => setQty(prev => (prev > 1 ? prev - 1 : 1));


  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!product) return <p className="text-center py-6">Product not found</p>;

  return (
    <div className="container lg:px-64 md:px-32 sm:px-16 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex justify-center items-center md:w-1/2 bg-gray-100  rounded-lg p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
          />
        </div>
        <div className="flex flex-col justify-between md:w-1/2 h-full">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <span className="text-lg underline underline-offset-4 font-semibold text-yellow-400 ">
                  {product.rating.rate}
                </span>
                <span className="text-sm text-gray-400 ">Rating</span>
              </div>
              |
              <div className="ml-3">
                <span className="text-lg underline underline-offset-4 font-semibold text-gray-700 ">
                  {product.rating.count}
                </span>
                <span className="text-sm text-gray-400 ">Sold</span>
              </div>
            </div>
            <p className="p-3 text-4xl text-orange-500 font-semibold">
              ${product.price}
            </p>
            <p className="my-4">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <button onClick={decreaseQty} className="w-10 h-10 flex items-center justify-center bg-gray-200  rounded-md text-lg font-bold hover:bg-gray-300  transition">-</button>
              <span className="w-12 text-center text-lg font-semibold">{qty}</span>
              <button onClick={increaseQty} className="w-10 h-10 flex items-center justify-center bg-gray-200  rounded-md text-lg font-bold hover:bg-gray-300  transition">+</button>
            </div>
            <button onClick={() => addToCart(product, qty)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
