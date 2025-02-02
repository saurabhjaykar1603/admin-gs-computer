import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/ui/PaginationComponent";
import ProductList from "@/features/Products/ProductList";
import { useProducts } from "@/features/Products/useProducts";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const navigate = useNavigate();
  const { products, isLoading, error, pageCount, totalSize } = useProducts();

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-red-600">
            ALL Products
          </h1>
        </div>
        <div>
          <Button
            variant={"destructive"}
            onClick={() => navigate("/dashboard/add-products")}
            className="text-sm sm:text-base"
          >
            <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <ProductList
        productData={products}
        isProductDataError={error}
        isProductDataLoading={isLoading}
        pageCount={pageCount}
        totalSize={totalSize}
      />

      <PaginationComponent totalSize={totalSize} isLoading={isLoading} />
    </>
  );
}

export default ProductPage;
