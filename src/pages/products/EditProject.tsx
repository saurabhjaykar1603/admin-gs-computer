import { Button } from "@/components/ui/button";
import ProductForm from "@/features/Products/ProductForm";
import { useProduct } from "@/features/Products/useProduct";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const { data, isLoading, } = useProduct();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const ProductData = data?.products ? data?.products[0] : null;

  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-2 mb-5">
        <div>
          <h1 className="text-3xl flex gap-3 font-bold tracking-tight items-center md:text-4xl lg:text-4xl mb-2 text-red-600">
            Edit Products
          </h1>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant={"destructive"}
            onClick={() => navigate("/dashboard/products")}
          >
            {" "}
            <List className="text-3xl" />{" "}
            <span className="hidden md:block">Add Product</span>
          </Button>
        </div>
      </div>
      <ProductForm defaultFormValues={ProductData} />
    </div>
  );
}

export default EditProduct;
