import React from "react";
import { Separator } from "./separator";

function SeparatorWithText({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <Separator className="flex-1" />
      <span className="px-3 text-sm text-muted-foreground">{text}</span>
      <Separator className="flex-1" />
    </div>
  );
}

export default SeparatorWithText;
