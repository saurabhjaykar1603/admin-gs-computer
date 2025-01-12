import { useToast } from "@/hooks/use-toast";
import { LoginApi } from "@/services/auth/authApis";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

export function useLogin() {
  const { toast } = useToast();
  const setUser=useUserStore((state) => state.setUser);
  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data) => {
      toast({
        title: "Logged in Successfully",
        description: "You have logged in successfully.",
        variant: "default",
      });
      setUser(data?.user as unknown as User);
      return <Navigate to="/dashboard" replace />;
    },
    onError: (e: AxiosError) => {
      if (e.response?.status === 401) {
        toast({
          title: "Error",
          description: "You are not logged in.",
        });
      }
      if (e.response?.status === 400) {
        toast({
          title: "Error",
          description: "Invalid credentials.",
          variant: "destructive",
        });
      }
    },

    retry: false,
  });

  return {
    loginUser,
    isPending,
    error: error as AxiosError | null,
  };
}