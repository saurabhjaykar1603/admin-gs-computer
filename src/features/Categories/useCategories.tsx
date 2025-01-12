import { getAllCategoriesApi } from "@/services/category/categoryApi";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  return {
    categories,
    isLoading,
    error,
    refetch,
  };
};
