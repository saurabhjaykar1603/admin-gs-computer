import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/Category";
import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import AddCategoryButton from "./AddCategoryButton";

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

function CategoryList({ categories, isLoading, error }: CategoryListProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) return (
    <div className="space-y-4">
      {[...Array(13)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-12 w-full">
            <Skeleton className="h-full w-full rounded" />
          </div>
        
        </div>
      ))}
    </div>
  );
  return (
    <div className="space-y-4">
      <div>
        <AddCategoryButton/>
      </div>
      {categories.map((category) => (
        <CategoryCard key={category._id} name={category.name} id={category._id} />
      ))}
    </div>
  );
}

export default CategoryList;
