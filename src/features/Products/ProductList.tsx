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
      <div className="flex items-center justify-center min-h-[40vh]">
        <Skeleton className="h-8 w-full max-w-[95vw] rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-3 px-3">
      {productData?.length > 0 ? (
        productData?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden 
                      hover:shadow-lg transition-shadow w-full border border-red-400 
                      touch-manipulation"
            onClick={() => {
              window.location.href = `/dashboard/product-details/${product?._id}`;
            }}
          >
            <div className="relative w-full h-40">
              <img
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <div className="flex flex-col justify-between items-start mb-2 gap-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {product?.title}
                </h3>
                <span className="text-red-600 text-sm font-bold">
                  ₹{product?.price}
                </span>
              </div>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                {product?.description}
              </p>
              <div className="mt-auto">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
                  {product?.category?.name}
                </span>
              </div>
              <div className="flex items-center justify-center mt-3">
                <Button className="w-full text-xs active:scale-[0.98] transition-transform">
                  View More
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-xs">
          No Products Found
        </div>
      )}
    </div>
  );
};

export default ProductList;
