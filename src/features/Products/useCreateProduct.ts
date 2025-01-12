import { createProductApi } from "@/services/product/productsApi";
import { useMutation } from "@tanstack/react-query";
import { CreateProductPayload } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";

export const useCreateProduct = () => {
  const { toast } = useToast();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      imageFile,
    }: {
      data: CreateProductPayload;
      imageFile: File | Array<File>;
    }) => createProductApi(data, imageFile),
    onSuccess: () => {
      toast({
        title: "Product created successfully",
        variant: "default",
      });
    },
  });

  return { mutate, isPending, error };
};
