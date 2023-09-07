// import { generateSieveSortOrder } from "@/utils/sorting";
import { peakLimsApi } from "@/services/api-client";
import { toDateOnly } from "@/utils/dates";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AccessionKeys } from "./accession.keys";

const setAccessionPatient = async (data: SetAccessionPatient) => {
  const body = {
    accessionId: data.accessionId,
    patientId: data.patientId,
    patientForCreation: {
      firstName: data.patientForCreation?.firstName,
      lastName: data.patientForCreation?.lastName,
      dateOfBirth: toDateOnly(data.patientForCreation?.dateOfBirth),
      sex: data.patientForCreation?.sex,
      race: data.patientForCreation?.race,
      ethnicity: data.patientForCreation?.ethnicity,
    },
  };
  await peakLimsApi.put("/accessions/setPatient", body);
};

export type SetAccessionPatient = {
  accessionId: string;
  patientId?: string | undefined;
  patientForCreation?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: string;
    race?: string;
    ethnicity?: string;
  };
};

type MutationContext = { data: SetAccessionPatient };
export function useSetAccessionPatient(
  options?: UseMutationOptions<
    void,
    AxiosError,
    SetAccessionPatient,
    MutationContext
  >
) {
  const queryClient = useQueryClient();

  return useMutation((data: SetAccessionPatient) => setAccessionPatient(data), {
    onMutate: (data) => {
      // make `data` available for cache key
      return { data };
    },
    onSuccess: (_, __, context: MutationContext | undefined) => {
      if (context) {
        queryClient.invalidateQueries(AccessionKeys.lists());
        queryClient.invalidateQueries(
          AccessionKeys.forEdit(context.data.accessionId)
        );
      }
    },
    ...options,
  });
}
