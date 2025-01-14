import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function CategoryCard({ name, id }: { name: string; id: string }) {
  console.log(id);
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="font-medium">{name}</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}

export default CategoryCard;
