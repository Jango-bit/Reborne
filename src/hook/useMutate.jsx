import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { handleError } from "@/utils/handleError";

export const useMutate = (
  request,
  endpoint,
  queryKey,
  method = "post",
  navigateTo = "#"
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isIdle, status, isPending, isSuccess, error, data } =
    useMutation({
      mutationFn: ({ formData, id }) => {
        return id
          ? request?.[method](endpoint + id, formData)
          : request?.[method](endpoint, formData);
      },
      onSuccess: ({ data }) => {
        toast.success(data?.message || "Successful");
        navigateTo && navigateTo !== "#" && navigate(navigateTo);
      },
      onError: (error) => {
        handleError(error);
      },
      onSettled: () => {
        queryKey && queryClient.invalidateQueries([queryKey]);
      },
    });
  useEffect(() => {
    switch (status) {
      case "error":
        setIsLoading(false);
      case "idle":
        setIsLoading(true);
      case "pending":
        setIsLoading(true);
      case "success":
        setIsLoading(false);
      default:
        setIsLoading(false);
    }
    // setIsLoading(status);
  }, [isPending, setIsLoading]);
  return {
    mutate,
    isLoading: isPending,
    error,
    isSuccess,
    data,
  };
};
/************************************************************************************************************************
 *   const { mutate, isSuccess, isLoading } = useMutate(basicFormRequest,EMPLOYER_REGISTER,"userProfile","post","#", ); *
 *                                                                                                                      *
 ************************************************************************************************************************
 */
