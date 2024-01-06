import { ManageAttachments } from "@/domain/accession-attachments/components/manage-attachments";
import { useGetAccessionForEdit } from "@/domain/accessions/apis/get-editable-aggregate";
import AccessionStatusBadge from "@/domain/accessions/features/status-badge";
import {
  AccessionAttachmentDto,
  AccessionContactDto,
  AccessionStatus,
  TestOrderDto,
} from "@/domain/accessions/types";
import { useGetAllOrganizationsForDropdown } from "@/domain/organizations/apis/get-all-organizations";
import { AccessionOrganizationForm } from "@/domain/organizations/features/manage-accession-org";
import { ManageAccessionPatientCard } from "@/domain/patients/components/manage-accession-patient";
import { useGetPatientSamples } from "@/domain/samples/apis/get-patient-samples";
import { ManageAccessionSamples } from "@/domain/samples/components/manage-accession-samples";
import { useGetOrderables } from "@/domain/test-orders/apis/get-orderables.api";
import { ManageAccessionTestOrders } from "@/domain/test-orders/features/manage-accession-test-orders";
import { Tab, Tabs } from "@nextui-org/react";
import { useParams } from "@tanstack/react-router";
import { Paperclip } from "lucide-react";
import { Helmet } from "react-helmet";

export function EditAccessionPage() {
  const queryParams = useParams();
  const accessionId = queryParams.accessionId;
  const { data: accession } = useGetAccessionForEdit(accessionId);

  const accessionNumber = accession?.accessionNumber ?? "";
  const accessionNumberTitle = accessionNumber ? ` - ${accessionNumber}` : "";

  return (
    <div className="">
      <Helmet>
        <title>Edit Accession {accessionNumberTitle}</title>
      </Helmet>

      <div className="flex items-center justify-start w-full space-x-4">
        <h1 className="flex items-center justify-start text-4xl font-bold tracking-tight scroll-m-20">
          Edit Accession
          <span className="pl-3 text-2xl">({accession?.accessionNumber})</span>
        </h1>
        {accession && (
          <AccessionStatusBadge status={accession?.status as AccessionStatus} />
        )}
      </div>

      <div className="pt-3 space-y-10">
        <div className="flex items-center justify-center w-full sm:justify-start">
          <h2 className="sr-only">Accession Patient</h2>
          <ManageAccessionPatientCard accession={accession} />
        </div>
        <div className="flex flex-col w-full">
          {accession?.patient?.id ? (
            <>
              <h2 className="text-3xl">Accession Details</h2>
              <AccessionDetails
                accessionId={accessionId}
                organizationId={accession?.organizationId}
                accessionContacts={accession.accessionContacts}
                patientId={accession?.patient?.id}
                testOrders={accession.testOrders}
                attachments={accession.attachments}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AccessionDetails({
  accessionId,
  organizationId,
  accessionContacts,
  patientId,
  testOrders,
  attachments,
}: {
  accessionId: string | undefined;
  organizationId: string | undefined;
  accessionContacts: AccessionContactDto[] | undefined;
  patientId: string | undefined;
  testOrders: TestOrderDto[] | undefined;
  attachments: AccessionAttachmentDto[] | undefined;
}) {
  const { data: samples } = useGetPatientSamples({
    patientId: patientId ?? "",
  });
  const { data: orgs, isLoading: orgsAreLoading } =
    useGetAllOrganizationsForDropdown();
  const { data: orderables } = useGetOrderables();
  return (
    <Tabs
      aria-label="Accession Details"
      color="primary"
      variant="underlined"
      classNames={{
        tab: "max-w-fit px-0 h-12",
        tabList:
          "gap-6 w-full relative rounded-none p-0 border-b border-divider",
        panel:
          "shadow-lg rounded-lg px-6 py-4 h-full min-h-[56-rem] min-h-[48rem]", // h-[56rem] sm:h-[48rem]
      }}
      radius="lg"
    >
      <Tab
        key="organization"
        title={
          <div className="flex items-center space-x-2">
            {/* https://iconbuddy.app/solar/hospital-bold */}
            <svg
              width="512"
              height="512"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21.5 8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552c-.441-.295-1.034-.332-2.115-.336c.004.291.004.596.004.91V7.25h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v6.5H17V6c0-1.886 0-2.828-.586-3.414C15.828 2 14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586C7 3.172 7 4.114 7 6v15.25H5.5v-6.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1V5.91c0-.313 0-.618.004-.91c-1.081.005-1.674.042-2.115.337a2 2 0 0 0-.552.552C2.5 6.393 2.5 7.096 2.5 8.5v12.75H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-.5V8.5ZM12 4.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V9a.75.75 0 0 1-1.5 0V7.75H10a.75.75 0 0 1 0-1.5h1.25V5a.75.75 0 0 1 .75-.75ZM9.25 12a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75ZM12 18.25a.75.75 0 0 1 .75.75v2.25h-1.5V19a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            <p>Organization</p>
          </div>
        }
      >
        <h3 className="text-xl font-semibold tracking-tight">
          Organization Details
        </h3>
        <AccessionOrganizationForm
          accessionContacts={accessionContacts}
          accessionId={accessionId}
          organizationId={organizationId}
          orgs={orgs}
          orgsAreLoading={orgsAreLoading}
        />
      </Tab>
      <Tab
        key="samples"
        title={
          <div className="flex items-center space-x-2">
            {/* https://iconbuddy.app/fluent-emoji-high-contrast/test-tube */}
            <svg
              width="512"
              height="512"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                d="M21.86 2.504a1.5 1.5 0 0 0-2.415 1.708L3.828 19.828a6 6 0 1 0 8.486 8.486L27.93 12.697a1.5 1.5 0 0 0 1.708-2.414L21.86 2.504Zm-1.061 3.182l5.657 5.657l-3.068 3.068l-10.476-.838l1.877-1.876l1.59 1.59a.75.75 0 0 0 1.061-1.06l-1.59-1.59l4.949-4.95Zm-9.192 9.193l1.59 1.59a.75.75 0 0 1-1.06 1.061l-1.591-1.59l1.06-1.061ZM7.364 19.12l1.591 1.591a.75.75 0 0 1-1.06 1.061l-1.592-1.591l1.061-1.06Z"
              />
            </svg>
            <p>Samples</p>
          </div>
        }
      >
        <ManageAccessionSamples patientId={patientId} samples={samples} />
      </Tab>
      <Tab
        key="panels-and-tests"
        title={
          <div className="flex items-center space-x-2">
            <svg
              width="512"
              height="512"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <g fill="none" stroke="currentColor" strokeWidth="4">
                <rect width="30" height="36" x="9" y="8" rx="2" />
                <path
                  strokeLinecap="round"
                  d="M18 4v6m12-6v6m-14 9h16m-16 8h12m-12 8h8"
                />
              </g>
            </svg>
            <p>Panels and Tests</p>
          </div>
        }
      >
        {accessionId && (
          <ManageAccessionTestOrders
            orderables={orderables}
            accessionId={accessionId}
            testOrders={testOrders}
            patientId={patientId ?? ""}
          />
        )}
      </Tab>
      <Tab
        key="attachments"
        title={
          <div className="flex items-center space-x-2">
            <Paperclip className="w-5 h-5" />
            <span>Attachments</span>
          </div>
        }
      >
        <div className="h-full px-6 py-4 overflow-auto">
          {accessionId && attachments && (
            <ManageAttachments
              accessionId={accessionId}
              attachments={attachments}
            />
          )}
        </div>
      </Tab>
      <Tab
        key="comments"
        title={
          <div className="flex items-center space-x-2">
            {/* https://iconbuddy.app/akar-icons/comment */}
            <svg
              width="512"
              height="512"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              >
                <path
                  strokeWidth="round"
                  d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172C2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"
                />
                <path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225c-.492-.33-.399-1.355-.212-3.404L6.5 17.5" />
              </g>
            </svg>
            <span>Comments</span>
          </div>
        }
      >
        <div className="h-full px-6 py-4 overflow-auto bg-rose-600">
          Change your comments here.
        </div>
      </Tab>
    </Tabs>
  );
}
