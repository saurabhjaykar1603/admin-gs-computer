import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Product {
    title: string | undefined;
    images: string[];
    _id: string;
    name: string;
    description: string;
    price: number;
    category: {
        _id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
}

interface ProductListProps {
    productData: Product[];
    isProductDataLoading: boolean;
    isProductDataError: boolean | Error | null;
    pageCount: number;
    totalSize: number;
}

const ProductList = ({
    productData,
    isProductDataLoading,
    isProductDataError,
    pageCount,
    totalSize,
}: ProductListProps) => {
    useEffect(() => {
        if (isProductDataError) {
            throw new Error("Something went wrong.");
        }
    }, [isProductDataError]);

    console.log(productData, "productData");
    console.log(pageCount, "pageCount");
    console.log(totalSize, "totalSize");

    if (isProductDataLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Skeleton className="h-12 w-full rounded" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 mt-8">
            {productData?.length > 0 ? (
                productData?.map((product) => (
                    <div
                        key={product?._id}
                        className="flex flex-col cursor-pointer md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full border border-red-400"
                        onClick={() => {
                            window.location.href = `/dashboard/product-details/${product?._id}`;
                        }}
                    >
                        <div className="relative w-full md:w-1/3 h-48 md:h-96">
                            <img
                                src={product?.images?.[0]}
                                alt={product?.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="p-4 md:p-6 flex flex-col flex-grow w-full md:w-2/3">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 md:gap-0">
                                <h3 className="text-lg md:text-xl font-semibold">{product?.title}</h3>
                                <span className="text-red-600 text-lg md:text-xl font-bold">
                                    ₹{product?.price}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base mb-4">{product?.description}</p>
                            <div className="mt-auto">
                                <span className="inline-block px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                                    {product?.category?.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-center mt-10 md:justify-start">
                                <Button >View More</Button>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No Products Found</div>
            )}
        </div>
    );
};

export default ProductList;
