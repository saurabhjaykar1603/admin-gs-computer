import CategoryList from "@/features/Categories/CategoryList";
import { useCategories } from "@/features/Categories/useCategories";

function Category() {
  const { categories, isLoading, error } = useCategories();
  return (
    <div>
      <CategoryList
        categories={categories}
        isLoading={isLoading}
        error={error || null}
      />
    </div>
  );
}

export default Category;
