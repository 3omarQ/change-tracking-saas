"use client";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "./ConfirmDialog";

interface ConfirmMenuItemProps {
	label: string;
	icon?: React.ReactNode;
	title: string;
	description: React.ReactNode;
	confirmLabel?: string;
	isLoading?: boolean;
	onConfirm: () => void;
	className?: string;
}

export function ConfirmMenuItem({
	label,
	icon,
	title,
	description,
	confirmLabel,
	isLoading = false,
	onConfirm,
	className,
}: ConfirmMenuItemProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<DropdownMenuItem
				className={className}
				onSelect={(e) => {
					e.preventDefault();
					setTimeout(() => setOpen(true), 0);
				}}
			>
				{icon}
				{label}
			</DropdownMenuItem>

			<ConfirmDialog
				open={open}
				onOpenChange={(v) => {
					setOpen(v);
					if (!v) setTimeout(() => { document.body.style.pointerEvents = ""; }, 0);
				}}
				title={title}
				description={description}
				confirmLabel={confirmLabel}
				isLoading={isLoading}
				onConfirm={() => {
					onConfirm();
					setOpen(false);
				}}
			/>
		</>
	);
}