import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { deleteProductApi } from "@/services/product/productsApi";
import { useNavigate } from "react-router-dom";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      toast({
        title: "Product deleted successfully",
        variant: "default",
      });
      navigate("/dashboard/products");
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
