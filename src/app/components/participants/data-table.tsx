"use client";

import * as React from "react";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";

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

type Operator = ">" | ">=" | "<" | "<=" | "=";

interface NumericFilterValue {
  operator: Operator;
  value: number;
}

export const numericFilterFn: FilterFn<any> = (row, columnId, filterValue: NumericFilterValue) => {
  if (!filterValue || Number.isNaN(filterValue.value)) return true;
  const rowValue = Number(row.getValue(columnId));
  switch (filterValue.operator) {
    case ">":
      return rowValue > filterValue.value;
    case ">=":
      return rowValue >= filterValue.value;
    case "<":
      return rowValue < filterValue.value;
    case "<=":
      return rowValue <= filterValue.value;
    case "=":
      return rowValue === filterValue.value;
    default:
      return true;
  }
};

const HOUR_COLUMNS = [
  "Approved hours",
  "Hours in review",
  "Un-submitted hours",
  "Submitted hours",
  "Tracked hours",
] as const;

const ALL_EXPORT_COLUMNS = [
  "Display Name",
  "Email",
  "Country",
  ...HOUR_COLUMNS,
] as const;

type SearchField = "Display Name" | "Email";

function SearchFieldToggle({
  value,
  onChange,
}: {
  value: SearchField;
  onChange: (value: SearchField) => void;
}) {
  return (
    <div className="relative flex w-44 items-center rounded-full bg-muted p-1 text-sm">
      <div
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-background shadow-sm transition-transform duration-200 ease-out"
        style={{
          transform: value === "Email" ? "translateX(calc(100% + 4px))" : "translateX(0)",
        }}
      />
      <button
        type="button"
        onClick={() => onChange("Display Name")}
        className={`relative z-10 flex-1 rounded-full py-1.5 text-center transition-colors duration-200 ${
          value === "Display Name" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Name
      </button>
      <button
        type="button"
        onClick={() => onChange("Email")}
        className={`relative z-10 flex-1 rounded-full py-1.5 text-center transition-colors duration-200 ${
          value === "Email" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Email
      </button>
    </div>
  );
}

type NumericFilterState = Record<string, { operator: Operator; value: string }>;

function NumericFiltersBar({
  filters,
  onChange,
  onClear,
}: {
  filters: NumericFilterState;
  onChange: (key: string, next: { operator: Operator; value: string }) => void;
  onClear: () => void;
}) {
  const hasActiveFilters = Object.values(filters).some((f) => f.value !== "");

  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <div className="flex flex-wrap items-end gap-3">
        {HOUR_COLUMNS.map((key) => {
          const filter = filters[key] ?? { operator: ">=", value: "" };
          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">{key}</label>
              <div className="flex overflow-hidden rounded-md border bg-background">
                <select
                  value={filter.operator}
                  onChange={(e) =>
                    onChange(key, { ...filter, operator: e.target.value as Operator })
                  }
                  className="border-r bg-transparent px-2 text-sm text-muted-foreground focus:outline-none"
                >
                  <option value=">">{">"}</option>
                  <option value=">=">{"\u2265"}</option>
                  <option value="<">{"<"}</option>
                  <option value="<=">{"\u2264"}</option>
                  <option value="=">{"="}</option>
                </select>
                <input
                  type="number"
                  step="0.1"
                  value={filter.value}
                  onChange={(e) => onChange(key, { ...filter, value: e.target.value })}
                  placeholder="hrs"
                  className="w-20 bg-transparent px-2 py-1.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          );
        })}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

function escapeCsv(val: unknown) {
  const str = String(val ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function exportRowsToCSV(rows: { original: any }[]) {
  const csv = [
    ALL_EXPORT_COLUMNS.join(","),
    ...rows.map((row) =>
      ALL_EXPORT_COLUMNS.map((h) => escapeCsv(row.original[h])).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `arcana-participants-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchField, setSearchField] = React.useState<SearchField>("Display Name");
  const [searchValue, setSearchValue] = React.useState("");
  const [numericFilters, setNumericFilters] = React.useState<NumericFilterState>({});

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


  React.useEffect(() => {
    HOUR_COLUMNS.forEach((key) => {
      const filter = numericFilters[key];
      const column = table.getColumn(key);
      if (!column) return;
      if (filter && filter.value !== "") {
        column.setFilterValue({ operator: filter.operator, value: Number(filter.value) });
      } else {
        column.setFilterValue(undefined);
      }
    });
  }, [numericFilters, table]);

  const handleFilterChange = (key: string, next: { operator: Operator; value: string }) => {
    setNumericFilters((prev) => ({ ...prev, [key]: next }));
  };

  const handleClearFilters = () => setNumericFilters({});

  const handleExport = () => {
    exportRowsToCSV(table.getRowModel().rows);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder={`Search by ${searchField === "Display Name" ? "name" : "email"}...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="max-w-sm"
          />
          <SearchFieldToggle value={searchField} onChange={setSearchField} />
        </div>

        <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <NumericFiltersBar
        filters={numericFilters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

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