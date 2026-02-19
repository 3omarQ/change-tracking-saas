"use client";

import { ChevronDownIcon, CheckIcon, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Workspace } from "@/types/dashboard.types";

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  onWorkspaceChange: (workspace: Workspace) => void;
}

function WorkspaceAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md bg-primary/15 shrink-0",
        className
      )}
    >
      <span className="font-bold text-primary leading-none">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export function WorkspaceSwitcher({
  workspaces,
  currentWorkspace,
  onWorkspaceChange,
}: WorkspaceSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 max-w-[180px]">
          <WorkspaceAvatar
            name={currentWorkspace.name}
            className="w-4 h-4 text-[9px]"
          />
          <span className="truncate">{currentWorkspace.name}</span>
          <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onSelect={() => onWorkspaceChange(workspace)}
            className="gap-2.5 cursor-pointer"
          >
            <WorkspaceAvatar
              name={workspace.name}
              className="w-6 h-6 text-[10px]"
            />
            <span className="flex-1 truncate">{workspace.name}</span>
            {workspace.id === currentWorkspace.id && (
              <CheckIcon className="h-3.5 w-3.5 text-primary shrink-0" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2.5 cursor-pointer text-muted-foreground">
          <PlusIcon className="h-4 w-4" />
          New workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
