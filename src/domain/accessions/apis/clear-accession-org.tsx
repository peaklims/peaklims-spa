// import { generateSieveSortOrder } from "@/utils/sorting";
import { peakLimsApi } from "@/services/api-client";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AccessionKeys } from "./accession.keys";

const clearAccessionOrganization = async ({
  accessionId,
}: {
  accessionId: string;
}) => {
  await peakLimsApi.put(`/v1/accessions/${accessionId}/clearOrganization`);
};

type MutationContext = {
  accessionId: string;
};

export function useClearAccessionOrganization(
  options?: UseMutationOptions<
    void,
    AxiosError,
    { accessionId: string },
    MutationContext
  >
) {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError,
    { accessionId: string },
    MutationContext
  >({
    mutationFn: ({ accessionId }: { accessionId: string }) => {
      return clearAccessionOrganization({ accessionId });
    },
    onMutate: (variables) => {
      // make `data` available for cache key
      return { accessionId: variables.accessionId };
    },
    onSuccess: (_, __, context: MutationContext | undefined) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: AccessionKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: AccessionKeys.forEdit(context.accessionId),
        });
      }
    },
    ...options,
  });
}
