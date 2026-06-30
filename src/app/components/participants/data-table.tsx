"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



function SearchFieldToggle({
  value,
  onChange,
}: {
  value: "Display Name" | "Email";
  onChange: (value: "Display Name" | "Email") => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-muted p-0.5 text-sm">
      <div
        className="absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-background shadow-sm transition-transform duration-200 ease-out"
        style={{
          transform: value === "Email" ? "translateX(calc(100% + 4px))" : "translateX(0)",
        }}
      />
      <button
        type="button"
        onClick={() => onChange("Display Name")}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-200 ${
          value === "Display Name" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Name
      </button>
      <button
        type="button"
        onClick={() => onChange("Email")}
        className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-200 ${
          value === "Email" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Email
      </button>
    </div>
  );
}




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type SearchField = "Display Name" | "Email";

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchField, setSearchField] = React.useState<SearchField>("Display Name");
  const [searchValue, setSearchValue] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    enableMultiSort: true,
    sortDescFirst: true,
    state: {
      sorting,
    },
  });
  React.useEffect(() => {
    table.getColumn("Display Name")?.setFilterValue(undefined);
    table.getColumn("Email")?.setFilterValue(undefined);
    table.getColumn(searchField)?.setFilterValue(searchValue);
  }, [searchField, searchValue, table]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder={`Search by ${searchField === "Display Name" ? "name" : "email"}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />

        <SearchFieldToggle value={searchField} onChange={setSearchField} />
      </div>

      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-12">#</TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id} className="hover:bg-muted/40">
                  <TableCell className="text-muted-foreground tabular-nums">
                    {index + 1}
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}