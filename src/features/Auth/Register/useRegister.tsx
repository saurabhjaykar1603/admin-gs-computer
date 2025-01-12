import { useToast } from "@/hooks/use-toast";
import { registerApi } from "@/services/auth/authApis";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast({
        title: "Registered Successfully",
        description: "You have successfully registered.",
        variant: "default",
      });
      navigate("/auth/login");
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 400) {
        toast({
          title: "Error",
          description: "User already exists with this email.",
        });
      }
    },
  });
  return {
    registerUser,
    isPending,
    error: error as AxiosError | null,
  };
}
