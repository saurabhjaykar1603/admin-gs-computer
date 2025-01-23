import { createProductApi } from "@/services/product/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProductPayload } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      imageFile,
    }: {
      data: CreateProductPayload;
      imageFile: File | Array<File>;
    }) => createProductApi(data, imageFile),
    onSuccess: (data) => {
      toast({
        title: "Product created successfully",
        variant: "default",
      });
      navigate("/dashboard/products");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { mutate, isPending, error };
};
