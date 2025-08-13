export default function search({ fullProducts, setProducts, setLoading }) 
{
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProducts = fullProducts.filter(product =>
        product.title.toLowerCase().includes(query)
        );
        setProducts(filteredProducts);
    };
    return (
        <div>
            <input type="text" 
            id="search" 
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  " 
            placeholder="Search ..." 
            required />
        </div>
    );
}