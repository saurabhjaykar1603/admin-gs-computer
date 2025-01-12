import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

function AddProduct() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div>
          <h1 className="text-3xl flex gap-3 font-bold tracking-tight items-center md:text-4xl lg:text-4xl mb-2 text-red-600">
            Add Products
          </h1>
          <p className="text-sm text-muted-foreground md:text-base text-red-500">
            Create and manage your product inventory
          </p>
        </div>
        <div>
          <Button variant={"destructive"}>
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
