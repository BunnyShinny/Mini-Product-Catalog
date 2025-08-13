export default function search({ products, setProducts, setLoading }) 
{
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        console.log(query);
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query)
        );
        setProducts(filteredProducts);
        setLoading(false);
    };
    return (
        <div>
            <input type="text" 
            id="search" 
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " 
            placeholder="Search ..." 
            required />
        </div>
    );
}