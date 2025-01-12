import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const navigate = useNavigate();

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
          <Button variant={"destructive"}onClick={()=>navigate("/dashboard/add-products")}>
            {" "}
            <PlusCircle className="text-3xl" /> Add Product
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}

export default ProductPage;
