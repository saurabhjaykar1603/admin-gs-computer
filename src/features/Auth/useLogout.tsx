import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/userStore";
import { useRefreshTokens } from "./useRefreshTokens";
import { LogoutApi } from "@/services/auth/authApis";

export function useLogout() {
  const { toast: toastFunction } = useToast();
  const { renewAccessToken } = useRefreshTokens();
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const {
    mutate: logoutUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      toastFunction({
        title: "Logged out Successfully",
        description: "You have logged out successfully.",
      });
      clearUser();
      navigate("/auth/login");
    },
    onError: (e: AxiosError) => {
      renewAccessToken();
      clearUser();

      if (e.response?.status === 401) {
        toastFunction({
          title: "Error",
          description: "You are not logged in.",
        });
      }
    },
  });

  return {
    logoutUser,
    isPending,
    error,
  };
}
