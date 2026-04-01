"use client";
import { useState } from "react";
import { TopBar } from "./TopBar";
import { Workspace } from "@/types/dashboard.types";
import { User } from "@/types/auth.types";

const WORKSPACES: Workspace[] = [
  { id: "1", name: "My Workspace" },
  { id: "2", name: "Client Project" },
];

export function TopBarWrapper({ user }: { user: User }) {
  const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);

  return (
    <TopBar
      user={user}
      workspaces={WORKSPACES}
      currentWorkspace={currentWorkspace}
      onWorkspaceChange={setCurrentWorkspace}
    />
  );
}