import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { deleteProductImageApi } from "@/services/product/productsApi";

export const useDeleteProductImage = () => {
  const { toast } = useToast();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, url }: { id: string; url: string }) =>
      deleteProductImageApi(id, url),
    onSuccess: () => {
      toast({
        title: "Product image deleted successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete product image",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending, error };
};
