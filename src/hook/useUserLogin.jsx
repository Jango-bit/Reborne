import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleError";

export const useUserLogin = (request, endpoint, navigateTo = "#") => {
  const navigate = useNavigate();

  const {
    mutate,
    isPaused: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (formData) => {
      return request.post(endpoint, formData);
    },
    onSuccess: ({ data }) => {
      console.log(data)
      localStorage.setItem("token", data?.token);
      // localStorage.setItem("rtoken", data?.refresh_token);
      toast.success("Login successful");
      navigate(navigateTo);
    },
    onError: (error) => {
      handleError(error);
    },
  });
  return {
    mutate,
    isSuccess,
    isLoading,
  };
};
