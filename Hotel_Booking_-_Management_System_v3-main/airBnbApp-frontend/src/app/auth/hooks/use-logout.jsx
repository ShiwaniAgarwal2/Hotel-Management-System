import API_CONFIG from "@/config/api.config";
import { PATHS } from "@/config/path.config";
import useMutation from "@/lib/hooks/useMutation";
import { useAuthContext } from "@/lib/providers/auth-context-provider";
import { AUTH_TOKEN_KEY, removeStorageItem } from "@/lib/storage-manager";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useLogoutHandler() {

  const navigate = useNavigate();
  const {setAuthenticatedUser} = useAuthContext();

  const {mutate, pending} = useMutation(API_CONFIG.AUTH.LOGOUT, 'POST');

  const logoutHandler = () => {
    mutate(null, {
      onSuccess: () => {
        removeStorageItem(AUTH_TOKEN_KEY);
        setAuthenticatedUser(prev => ({
          ...prev,
          isAuthenticated: false,
          user: null
        }))
        toast("Logged out successfully", {
          type: 'success'
        })
        navigate(PATHS.LANDING, {replace: true})
      },
      onError: (error) => {
        toast('Could not Log out', {
          type: 'error',
          description: `Error: ${error.message}`
        })
      }
    })
  }

  return {logoutHandler, pending}

}