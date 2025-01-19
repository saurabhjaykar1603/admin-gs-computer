import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h1 className="text-3xl flex gap-3 font-bold tracking-tight items-center md:text-4xl lg:text-4xl mb-2 text-red-600">
            Add Products
          </h1>

        </div>
        <div>
          <Button
            variant={"destructive"}
            onClick={() => navigate("/dashboard/products")}
          >
            {" "}
            <List className="text-3xl" />{" "}
            <span className="hidden md:block">Product List</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
