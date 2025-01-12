import { useToast } from "@/hooks/use-toast";
import { refreshAccessTokenApi } from "@/services/auth/authApis";
import { useMutation } from "@tanstack/react-query";

export function useRefreshTokens() {
  const { toast } = useToast();
  const {
    mutate: renewAccessToken,
    isPending,
    error,
  } = useMutation({
    mutationFn: refreshAccessTokenApi,
    onSuccess: () => {
      toast({
        title: "Success",
        description: " Session renewed successfully",
        variant: "default",
      });
    },
  });
  return { renewAccessToken, isPending, error };
}
