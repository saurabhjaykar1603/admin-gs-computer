import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { useState } from "react";
import { useUpdateCategory } from "./useUpdateCategory";
import { Pencil } from "lucide-react";

function EditCategoryButton({
  id,
  defaultData,
}: {
  id: string;
  defaultData: string;
}) {
  const { updateCategory } = useUpdateCategory();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Existing Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          initialData={defaultData}
          onSubmit={(values) => {
            updateCategory({ id: id, data: values });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryButton;
