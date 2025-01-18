import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "@/services/category/categoryApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: createCategory,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: { name: string }) => createCategoryApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category Created Successfully",
        description: "The category has been created.",
        variant: "default",
      });
    }, 
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create category. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    createCategory,
    isPending,
    error: error as AxiosError | null,
  };
};
