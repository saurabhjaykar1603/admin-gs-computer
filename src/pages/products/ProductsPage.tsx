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
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-4xl mb-2 text-red-600">
            ALL Products
          </h1>

        </div>
        <div>
          <Button variant={"destructive"} onClick={() => navigate("/dashboard/add-products")}>
            {" "}
            <PlusCircle className="text-3xl" /> Add Product
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

      <PaginationComponent
        totalSize={totalSize}
        isLoading={isLoading}
      />
    </>
  );
}

export default ProductPage;
