import { useState, useRef, useEffect } from "react";

export default function Dropdown({ name,setProducts,setLoading }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = async (category) => {
    let link = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
    if (category === "all") {
      link = `https://fakestoreapi.com/products`;
    }

    setLoading(true); // start loader

    try {
      const res = await fetch(link);
      const data = await res.json();
      setProducts(data);
      setOpen(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        {name}
        <svg
          className="w-3 h-3 ms-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-44 max-h-64 overflow-auto bg-white rounded-md shadow-lg divide-y divide-gray-100 dark:bg-gray-700 z-20">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {/* All option */}
            <li
              onClick={() => handleCategoryClick("all")}
              className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              All
            </li>

            {/* Dynamic categories */}
            {categories.length === 0 && (
              <li className="px-4 py-2">Loading...</li>
            )}
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
