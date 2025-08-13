import Image from "next/image";

export default function Card({product}) 
{
    return (
        <a href={`/products/${product.id}`} className="w-auto h-auto cursor-pointer bg-white border border-gray-200 rounded-sm shadow-sm  flex flex-col transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div href="#" className="p-2 flex justify-center items-center shadow-sm bg-gray-100  rounded-t-lg">
                <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                style={{ objectFit: 'contain', width: '100px', height:'100px' }}
                unoptimized
                />
            </div>
            <div className="lg:px-5 px-2 py-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1 mb-1 flex-1 flex flex-col justify-between min-h-[4rem] my:min-h-[5rem]">
                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 ">{product.title.length > 20
                    ? product.title.slice(0, 30) + "..."
                    : product.title}</h5>
                
                </div>
                <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-lg text-orange-500 ">
                                <span className="text-sm font-normal mr-[2px]">
                                    $
                                </span>
                                {product.price}
                            </span>      
                            <span className="text-xs min-h-4 flex-grow-0 flex-shrink ml-auto">
                                
                                {product.rating.count} Sold
                            </span>      
                        </div>
                </div>
                
            </div>
        </a>
    )
}