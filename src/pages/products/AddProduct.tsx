import { Button } from "@/components/ui/button";
import ProductForm from "@/features/Products/ProductForm";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-2 mb-5">
        <div>
          <h1 className="text-3xl flex gap-3 font-bold tracking-tight items-center md:text-4xl lg:text-4xl mb-2 text-red-600">
            Add Products
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
      <ProductForm />
    </div>
  );
}

export default AddProduct;
