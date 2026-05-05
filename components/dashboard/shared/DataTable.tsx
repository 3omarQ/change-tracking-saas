"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  filterFns,
  FilterFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";

interface EmptyState {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  action?: ReactNode;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter: string;
  entityName?: string;
  onRowClick?: (row: TData) => void;
  emptyState?: EmptyState;
  filteredEmptyState?: EmptyState;
}

function createExactOrFuzzyFilter<TData>(): FilterFn<TData> {
  return (row, columnId, value, addMeta) => {
    const search = value as string;
    const isExact = search.startsWith('"') && search.endsWith('"') && search.length > 2;

    if (isExact) {
      const exactTerm = search.slice(1, -1).toLowerCase();
      const cellValue = String(row.getValue(columnId) ?? "").toLowerCase();
      return cellValue === exactTerm;
    }

    return filterFns.includesString(row, columnId, value, addMeta);
  };
}

function TableEmptyState({ state }: { state: EmptyState }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{state.title}</p>
        {state.description && (
          <p className="mx-auto max-w-sm text-xs leading-5 text-muted-foreground">
            {state.description}
          </p>
        )}
      </div>
      {state.actionLabel && state.actionHref && (
        <Button asChild size="sm">
          <Link href={state.actionHref}>{state.actionLabel}</Link>
        </Button>
      )}
      {state.actionLabel && state.onAction && (
        <Button type="button" variant="outline" size="sm" onClick={state.onAction}>
          {state.actionLabel}
        </Button>
      )}
      {state.action}
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  entityName = "row",
  onRowClick,
  emptyState,
  filteredEmptyState,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const exactOrFuzzyFilter = useMemo(() => createExactOrFuzzyFilter<TData>(), []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: exactOrFuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;
  const isFilteredEmpty = data.length > 0 && rows.length === 0;
  const resolvedEmptyState = isFilteredEmpty
    ? filteredEmptyState ?? {
        title: `No ${entityName}s match your filters.`,
        description: "Try changing your search or filters.",
      }
    : emptyState ?? {
        title: `No ${entityName}s found.`,
        description: "There is nothing to show yet.",
      };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border border-border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate max-w-3xs py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <TableEmptyState state={resolvedEmptyState} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {rows.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} {entityName}(s)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
