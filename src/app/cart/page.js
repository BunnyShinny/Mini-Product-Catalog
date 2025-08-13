"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    const { cart, totalTypes,setCart, removeFromCart   } = useCart();

    if (cart.length === 0) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Cart Page</h1>
            <p className="text-lg">Your cart is empty.</p>
        </div>
        );
    }

    return (
        <div className="container lg:px-64 md:px-32 sm:px-16 py-6">
        <h1 className="text-3xl font-bold mb-6">Cart Page</h1>
        <p className="mb-4">Total product types: {totalTypes}</p>

        <div className="flex flex-col gap-4">
            {cart.map((item) => (
            <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100  p-4 rounded-lg"
            >
                <div className="flex items-center gap-4">
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-orange-500 font-bold">${item.price}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">Qty: {item.qty}</p>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded hover:bg-red-200  transition"
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}
