import { updateProductApi } from "@/services/product/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductPayload } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      id,
      payload,
      imageFile,
    }: {
      id: string;
      payload: UpdateProductPayload;
      imageFile: File | Array<File>;
    }) => updateProductApi(id, payload, imageFile),
    onSuccess: () => {
      toast({
        title: "Product updated successfully",
        variant: "default",
      });
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        title: "Failed to update product",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending, error };
};
