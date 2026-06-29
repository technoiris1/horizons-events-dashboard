"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Participant } from "@/lib/types";

function sortableHeader(label: string, column: any) {
  return (
    <Button
      variant="ghost"
      className="px-0 hover:bg-transparent"
      onClick={() => {
        const sorted = column.getIsSorted();
        if (sorted === false) {
          column.toggleSorting(true); // first click → desc
        } else if (sorted === "desc") {
          column.toggleSorting(false); // second click → asc
        } else {
          column.clearSorting(); // third click → clear
        }
      }}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

const hourCell = (key: string) => ({
  cell: ({ row }: any) => (
    <div className="text-right font-medium">
      {Number(row.getValue(key)).toFixed(1)}
    </div>
  ),
});

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "Display Name",
    header: ({ column }) => sortableHeader("Participant", column),
    cell: ({ row }) => (
      <div className="font-medium">
        {String(row.getValue("Display Name"))}
      </div>
    ),
  },

  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {String(row.getValue("Email"))}
      </div>
    ),
  },

  {
    accessorKey: "Country",
    header: "Country",
    cell: ({ row }) => (
      <div>{String(row.getValue("Country"))}</div>
    ),
  },
  {
    accessorKey: "Approved hours",
    header: ({ column }) => sortableHeader("Approved", column),
    ...hourCell("Approved hours"),
  },

  {
    accessorKey: "Hours in review",
    header: ({ column }) => sortableHeader("Review", column),
    ...hourCell("Hours in review"),
  },

  {
    accessorKey: "Un-submitted hours",
    header: ({ column }) => sortableHeader("Unsubmitted", column),
    ...hourCell("Un-submitted hours"),
  },

  {
    accessorKey: "Submitted hours",
    header: ({ column }) => sortableHeader("Submitted", column),
    ...hourCell("Submitted hours"),
  },

  {
    accessorKey: "Tracked hours",
    header: ({ column }) => sortableHeader("Tracked", column),
    ...hourCell("Tracked hours"),
  },
];