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
    onError: (err: AxiosError) => {
      const errorMessage =
        (err.response?.data as { message?: string }).message ||
        "An error occurred";
      toast({
        title: "info",
        description: errorMessage,
        variant: "default",
      });
    },
  });

  return {
    createCategory,
    isPending,
    error: error as AxiosError | null,
  };
};
