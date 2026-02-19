"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Workspace } from "@/types/dashboard.types";

const WORKSPACES: Workspace[] = [
  { id: "1", name: "My Workspace" },
  { id: "2", name: "Client Project" },
];

export function TopBarWrapper({
  user,
}: {
  user: { name: string; email: string };
}) {
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
