"use client";
import Image from "next/image";

export function LoginLogo() {
  return (
    <div className="flex justify-center">
      <Image
        src="/logo.png"
        alt="Company Logo"
        width={250}
        height={250}
        className="select-none"
        draggable={true}
        priority
      />
    </div>
  );
}
