import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryApi } from "@/services/category/categoryApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: updateCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      updateCategoryApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category Updated Successfully",
        description: "The category has been updated.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    updateCategory,
    isPending,
    error: error as AxiosError | null,
  };
};
