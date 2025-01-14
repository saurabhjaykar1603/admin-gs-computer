import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { deleteProductApi } from "@/services/product/productsApi";

export const useDeleteProduct = () => {
  const { toast } = useToast();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      toast({
        title: "Product deleted successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending, error };
};
