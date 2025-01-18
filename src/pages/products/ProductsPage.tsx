import { Button } from "@/components/ui/button";
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
          <p className="text-sm text-muted-foreground md:text-base text-red-500">
            Create and manage your product inventory
          </p>
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

    </>
  );
}

export default ProductPage;
