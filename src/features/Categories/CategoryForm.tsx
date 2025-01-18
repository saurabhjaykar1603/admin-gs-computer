import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface CategoryFormProps {
  initialData?: {
    name: string;
    description?: string;
  };
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const { register, handleSubmit: handleFormSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const isEditing = !!initialData;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Category Name
        </label>
        <Input
          id="name"
          placeholder="Enter category name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm font-medium text-red-500">
            {errors.name?.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {isEditing ? "Update Category" : "Create Category"}
      </Button>
    </form>
  );
}

export default CategoryForm;
