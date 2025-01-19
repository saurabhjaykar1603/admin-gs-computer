import { updateProductApi } from "@/services/product/productsApi";
import { useMutation } from "@tanstack/react-query";
import { UpdateProductPayload } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";

export const useUpdateProduct = () => {
  const { toast } = useToast();
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
