import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SparklesIcon } from "lucide-react";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { CreateJobSectionWrapper } from "./CreateJobSectionWrapper";

interface JobBasicsSectionProps {
  form: UseFormReturn<CreateJobFormData>;
}

export function JobBasicsSection({ form }: JobBasicsSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <CreateJobSectionWrapper
      step={1}
      title="Datapoint"
      description="Datapoint details"
    >
      <div className="space-y-4">
        {/* Target URL */}
        <div className="space-y-1.5">
          <Label htmlFor="url">Target URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/products"
            {...register("url")}
          />
          {errors.url && (
            <p className="text-xs text-destructive">{errors.url.message}</p>
          )}
        </div>
        {/* Job Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Datapoint name</Label>
          <Input
            id="name"
            placeholder="e.g. Amazon keyboard products list"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Datapoint Path */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="datapointPath">Datapoint CSS / HTML path</Label>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <SparklesIcon className="h-3 w-3 text-primary" />
              <span
                className="text-primary/70 cursor-not-allowed"
                title="Coming soon — premium feature"
              >
                Select manually (premium)
              </span>
            </span>
          </div>
          <Input
            id="datapointPath"
            placeholder="e.g. div.product-list > .item"
            {...register("datapointPath")}
          />
          <p className="text-xs text-muted-foreground">
            The CSS selector or XPath pointing to the data you want to extract.
          </p>
          {errors.datapointPath && (
            <p className="text-xs text-destructive">
              {errors.datapointPath.message}
            </p>
          )}
        </div>
      </div>
    </CreateJobSectionWrapper>
  );
}
