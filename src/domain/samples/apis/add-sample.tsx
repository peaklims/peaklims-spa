import { AccessionKeys } from "@/domain/accessions/apis/accession.keys";
import { peakLimsApi } from "@/services/api-client";
import { toDateOnly } from "@/utils/dates";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SampleForCreationDto } from "../types";
import { SampleKeys } from "./sample.keys";

export const addSample = async (data: SampleForCreationDto) => {
  const collectionDate =
    data.collectionDate !== undefined && data.collectionDate !== null
      ? toDateOnly(data.collectionDate)
      : undefined;
  const receivedDate =
    data.receivedDate !== undefined && data.receivedDate !== null
      ? toDateOnly(data.receivedDate)
      : undefined;
  data = {
    ...data,
    collectionDate: collectionDate,
    receivedDate: receivedDate,
  };
  return peakLimsApi
    .post(`/v1/samples`, data)
    .then((response) => response.data);
};

type SampleMutationContext = {
  patientId: string;
};

export interface AddProps {
  data: SampleForCreationDto;
}

export function useAddSample(
  options?: UseMutationOptions<
    void,
    AxiosError,
    AddProps,
    SampleMutationContext
  >
) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, AddProps, SampleMutationContext>({
    mutationFn: ({ data: sampleData }: AddProps) => addSample(sampleData),
    onMutate: (variables) => {
      return { patientId: variables.data.patientId };
    },
    onSuccess: (_, __, context: SampleMutationContext | undefined) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: SampleKeys.lists() });
        queryClient.invalidateQueries({ queryKey: AccessionKeys.forEdits() });
        queryClient.invalidateQueries({ queryKey: SampleKeys.byPatient(context.patientId) });
      }
    },
    ...options,
  });
}
