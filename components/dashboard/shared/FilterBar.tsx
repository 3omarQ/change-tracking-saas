"use client";
import { Input } from "@/components/ui/input";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { SearchIcon, XIcon } from "lucide-react";

export type SortOption = "latest" | "alphabetical";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  search: string;
  sort: SortOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  searchPlaceholder?: string;
  targetOptions?: FilterOption[];
  targetValue?: FilterOption | null;
  onTargetChange?: (value: FilterOption | null) => void;
  activeStatus?: string | null;
  onStatusClear?: () => void;
}

export function FilterBar({
  search,

  onSearchChange,

  searchPlaceholder = "Search...",
  targetOptions,
  targetValue,
  onTargetChange,
  activeStatus,
  onStatusClear,

}: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {targetOptions && onTargetChange && (
        <Combobox
          items={targetOptions}
          itemToStringValue={(o) => o.label}
          value={targetValue ?? null}
          onValueChange={(o) => onTargetChange(o ?? null)}
        >
          <ComboboxInput
            placeholder="Filter by target..."
            className="w-48 text-xs"
            showClear
          />
          <ComboboxContent>
            <ComboboxEmpty>No targets found.</ComboboxEmpty>
            <ComboboxList>
              {(option) => (
                <ComboboxItem
                  key={option.id}
                  value={option}
                  className="text-xs"
                >
                  {option.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}

      {activeStatus && onStatusClear && (
        <button
          onClick={onStatusClear}
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-input bg-transparent hover:bg-accent transition-colors"
        >
          <span
            className={activeStatus === "ACTIVE"
              ? "h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"
              : "h-1.5 w-1.5 rounded-full bg-amber-400 inline-block"
            }
          />
          {activeStatus === "ACTIVE" ? "Active" : "Paused"}
          <XIcon className="h-3 w-3 text-muted-foreground" />
        </button>
      )}


    </div>
  );
}