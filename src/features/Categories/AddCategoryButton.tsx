import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { useCreateCategory } from "./useCreateCategory";
import { useState } from "react";

function AddCategoryButton() {
  const { createCategory } = useCreateCategory();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          onSubmit={(values) => {
            createCategory(values);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryButton;
