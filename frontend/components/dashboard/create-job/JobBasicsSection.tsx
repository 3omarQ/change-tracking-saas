import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SparklesIcon, WandIcon } from "lucide-react";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { CreateJobSectionWrapper } from "./CreateJobSectionWrapper";
import { ElementPickerModal } from "./element-picker/ElementPickerModal";

interface JobBasicsSectionProps {
  form: UseFormReturn<CreateJobFormData>;
}

export function JobBasicsSection({ form }: JobBasicsSectionProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [elementPickerOpen, setElementPickerOpen] = useState(false);
  const url = watch("url");

  const handleElementPickerConfirm = (selector: string) => {
    setValue('datapointPath', selector);
  };

  return (
    <>
      <CreateJobSectionWrapper
        step={1}
        title="Datapoint"
        description="Datapoint details"
      >
        <div className="space-y-4">
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="datapointPath">Datapoint CSS / HTML path</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setElementPickerOpen(true)}
                disabled={!url}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary h-6 px-2"
              >
                <WandIcon className="h-3 w-3" />
                Select visually
              </Button>
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

      <ElementPickerModal
        open={elementPickerOpen}
        onOpenChange={setElementPickerOpen}
        url={url}
        onConfirm={handleElementPickerConfirm}
      />
    </>
  );
}