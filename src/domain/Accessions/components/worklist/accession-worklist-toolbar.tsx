"use client";

import { FilterControl } from "@/components/data-table/filter-control";
import { useAccessioningWorklistTableStore } from "@/components/data-table/paginated-data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddAccession } from "@/domain/accessions/apis/add-accession";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { RegisteredRoutesInfo, useNavigate } from "@tanstack/react-router";
import { CircleIcon, PlusCircle, TimerIcon, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function AccessionWorklistToolbar() {
  const { filterInput, setFilterInput, isFiltered, resetFilters } =
    useAccessioningWorklistTableStore();
  const [liveValue, setLiveValue] = useState(filterInput);
  const [debouncedFilterInput] = useDebouncedValue(liveValue, 400);

  useEffect(() => {
    setFilterInput(debouncedFilterInput);
    if (debouncedFilterInput === null) {
      resetFilters();
    }
  }, [debouncedFilterInput, resetFilters, setFilterInput]);

  const navigate = useNavigate();
  const createAccessionApi = useAddAccession();
  function createAccession() {
    createAccessionApi
      .mutateAsync()
      .then((data) => {
        // formMode = "Edit";
        // AccessionData = data;
        navigate({
          to: `/accessions/${data.id}` as RegisteredRoutesInfo["routePaths"],
        });
      })
      .then(() => {
        // Notifications.success("Accession created successfully");
      })
      .catch((e) => {
        // Notifications.error("There was an error creating the Accession");
        // console.error(e);
      });
  }

  return (
    <div className="flex-col space-y-3 sm:flex-row sm:flex sm:items-center sm:justify-between sm:flex-1 sm:space-y-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 space-x-2">
          <Input
            placeholder="Filter accessions..."
            value={(liveValue as string) ?? ""}
            onChange={(event) => {
              setLiveValue(event.currentTarget.value);
            }}
            className="w-48 lg:w-54"
          />
          <FilterControl title="Status" options={statuses} />
          {isFiltered.result() && (
            <Button
              variant="ghost"
              onClick={() => {
                setLiveValue(null);
                resetFilters();
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <XCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
      <Button
        className="w-full space-x-2 sm:w-auto"
        onClick={() => createAccession()}
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Accession</span>
      </Button>
    </div>
  );
}

const statuses = [
  {
    value: "Draft",
    label: "Draft",
    icon: CircleIcon,
  },
  {
    value: "Ready For Testing",
    label: "Ready For Testing",
    icon: TimerIcon,
  },
];
