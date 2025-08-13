// /app/products/[id]/page.js

import Image from "next/image";

export default async function ProductDetail({ params }) {
  const { id } = params;

  // Fetch product data
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return (
    <div className="container lg:px-64 md:px-32 sm:px-16 py-6">
      <div className="flex flex-row items-center">
        <div className="flex justify-center items-center h-32 shadow-sm bg-gray-100 dark:bg-gray-700 rounded-t-lg">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="my-4">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
