import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi } from "@/services/category/categoryApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: deleteCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category Deleted Successfully",
        description: "The category has been deleted.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    deleteCategory,
    isPending,
    error: error as AxiosError | null,
  };
};
