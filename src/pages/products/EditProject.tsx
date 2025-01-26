import { Button } from "@/components/ui/button";
import ProductForm from "@/features/Products/ProductForm";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
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
      <ProductForm
        defaultFormValues={{
          title: "Default Title",
          description:
            "Default description of the product, it needs to be more than 10 characters.",
          features: ["1. Feature 1", "2. Feature 2"],
          category: {
            label: "Default Category",
            value: "default-category-id",
          },
          price: 100,
          images: ["https://via.placeholder.com/150"],
        }}
      />
    </div>
  );
}

export default EditProduct;
