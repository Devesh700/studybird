"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "@/store/hooks";
import { createStory } from "@/features/story/slice";
import { toast } from "sonner";
import { WorkTypeStep } from "./components/work-type-step";
import { FormStep } from "./components/form-step";
import { CategoryModal } from "./components/category-modal";

// You can move this to a separate config file
const WORK_TYPES = [
  { value: "Story", label: "Story", icon: "📖" },
  { value: "Article", label: "Article", icon: "📰" },
  { value: "Poem", label: "Poem", icon: "🪶" },
] as const;

type WorkType = (typeof WORK_TYPES)[number]["value"];

const newStorySchema = z.object({
  title: z.string().min(3, "Title is too short").max(120, "Title is too long"),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(300, "Description is too long"),
  whatItsAbout: z
    .string()
    .min(10, "Please describe what your work is about")
    .max(1000),
  body: z.string().min(50, "Content is too short"),
  originalWork: z.string().optional(),
  validation: z.string().optional(),
  suggestedHashtags: z.string().optional(),
  tags: z.string().optional(),
});

type NewStoryValues = z.infer<typeof newStorySchema>;

type Step = "workType" | "form";

export default function NewStoryPage() {
  const dispatch = useAppDispatch();
  const [workType, setWorkType] = useState<WorkType | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [step, setStep] = useState<Step>("workType");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const form = useForm<NewStoryValues>({
    resolver: zodResolver(newStorySchema),
    defaultValues: {
      title: "",
      description: "",
      whatItsAbout: "",
      body: "",
      originalWork: "",
      validation: "",
      suggestedHashtags: "",
      tags: "",
    },
  });

  const handleWorkTypeSelect = (type: WorkType) => {
    setWorkType(type);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "form") setStep("workType");
  };

  async function onSubmit(values: NewStoryValues) {
    if (!workType) {
      toast.error("Please select a work type first.");
      setStep("workType");
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title,
        body: values.body,
        workType,
        description: values.description,
        whatItsAbout: values.whatItsAbout,
        originalWork: values.originalWork || undefined,
        validation: values.validation || undefined,
        tags: (values.tags ?? "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        suggestedHashtags: (values.suggestedHashtags ?? "")
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        categories: selectedCategories,
      };

      const res = await dispatch(createStory(payload)).unwrap();

      form.reset();
      setWorkType(null);
      setSelectedCategories([]);
      setStep("workType");

      toast.success(`Published: ${res.title}`);
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to publish");
    } finally {
      setIsSubmitting(false);
    }
  }

return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "workType" ? (
            <WorkTypeStep 
              onSelect={handleWorkTypeSelect}
              key="work-type"
            />
          ) : (
            <FormStep
              form={form}
              workType={workType!}
              selectedCategories={selectedCategories}
              onCategoriesClick={() => setShowCategoryModal(true)}
              onBack={handleBack}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              key="form"
            />
          )}
        </AnimatePresence>

        <CategoryModal
          open={showCategoryModal}
          onOpenChange={setShowCategoryModal}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />
      </div>
    </div>
  );
}
