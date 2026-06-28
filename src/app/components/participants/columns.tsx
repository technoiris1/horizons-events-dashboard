"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Participant } from "@/lib/types"

function sortableHeader(
  label: string,
  column: any
) {
  return (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(
          column.getIsSorted() === "asc"
        )
      }
      className="px-0 hover:bg-transparent"
    >
      {label}

      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "Display Name",

    header: ({ column }) =>
      sortableHeader("Participant", column),
  },

  {
    accessorKey: "Email",

    header: "Email",
  },

  {
    accessorKey: "Country",

    header: "Country",
  },

  {
    accessorKey: "Approved hours",

    header: ({ column }) =>
      sortableHeader("Approved", column),
  },

  {
    accessorKey: "Hours in review",

    header: ({ column }) =>
      sortableHeader("Review", column),
  },

  {
    accessorKey: "Un-submitted hours",

    header: ({ column }) =>
      sortableHeader("Unsubmitted", column),
  },

  {
    accessorKey: "Submitted hours",

    header: ({ column }) =>
      sortableHeader("Submitted", column),
  },

  {
    accessorKey: "Tracked hours",

    header: ({ column }) =>
      sortableHeader("Tracked", column),
  },
];