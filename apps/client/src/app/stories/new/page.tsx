"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/store/hooks";
import { createStory } from "@/features/story/slice";
import { CategoryModal } from "@/components/category-modal";
import { Settings } from "lucide-react";

const WORK_TYPES = [
  { value: "Story", label: "📖 Story", icon: "📖" },
  { value: "Article", label: "📰 Article", icon: "📰" },
  { value: "Poem", label: "🪶 Poem", icon: "🪶" },
] as const;

export default function NewStoryPage() {
  const dispatch = useAppDispatch();
  
  // Step 1: Work Type Selection
  const [workType, setWorkType] = useState<"Story" | "Article" | "Poem" | null>(null);
  
  // Step 2: Category Selection
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whatItsAbout, setWhatItsAbout] = useState("");
  const [body, setBody] = useState("");
  const [originalWork, setOriginalWork] = useState("");
  const [validation, setValidation] = useState("");
  const [suggestedHashtags, setSuggestedHashtags] = useState("");
  const [tags, setTags] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"workType" | "form">("workType");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // Handle work type selection
  const handleWorkTypeSelect = (type: "Story" | "Article" | "Poem") => {
    setWorkType(type);
    setCurrentStep("form");
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep === "form") {
      setCurrentStep("workType");
    }
  };

  async function handlePublish() {
    if (!workType) {
      alert("Please select a work type");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }
    if (!title || !description || !whatItsAbout || !body) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        body,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        workType,
        description,
        whatItsAbout,
        originalWork: originalWork || undefined,
        validation: validation || undefined,
        suggestedHashtags: suggestedHashtags
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        categories: selectedCategories,
      };
      const res = await dispatch(createStory(payload)).unwrap();
      
      // Reset form
      setTitle("");
      setDescription("");
      setWhatItsAbout("");
      setBody("");
      setOriginalWork("");
      setValidation("");
      setSuggestedHashtags("");
      setTags("");
      setWorkType(null);
      setSelectedCategories([]);
      setCurrentStep("workType");
      
      alert(`🎉 Published: ${res.title}`);
    } catch (error: any) {
      alert(`❌ Failed to publish: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  // Step 1: Work Type Selection
  if (currentStep === "workType") {
    return (
      <div className="py-10 px-4 flex justify-center items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-lg p-8 md:p-12 border border-pink-100"
        >
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-200 blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 blur-3xl opacity-25" />

          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 text-center mb-4">
            ✍️ What would you like to write?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Select the type of work you want to create
          </p>

          <div className="space-y-4 relative z-10">
            {WORK_TYPES.map((type) => (
              <motion.button
                key={type.value}
                onClick={() => handleWorkTypeSelect(type.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 bg-white rounded-2xl border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all text-left flex items-center gap-4 shadow-sm"
              >
                <span className="text-4xl">{type.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-700">{type.label}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }


  // Step 3: Main Form
  return (
    <div className="py-10 px-4 flex justify-center items-start min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-4xl bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-lg p-6 md:p-10 border border-pink-100"
      >
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-200 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 blur-3xl opacity-25" />

        <div className="relative z-10">
          <button
            onClick={handleBack}
            className="mb-4 text-pink-600 hover:text-pink-700 flex items-center gap-2"
          >
            ← Back to Categories
          </button>

          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pink-700">
                🪶 Create Your {workType}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Selected: <span className="font-semibold">{workType}</span> | Categories:{" "}
                <span className="font-semibold">{selectedCategories.join(", ")}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="✨ Enter a beautiful title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="📝 Write a brief description..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* What it's about */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                What it's about <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="💭 Describe what your work is about..."
                rows={4}
                value={whatItsAbout}
                onChange={(e) => setWhatItsAbout(e.target.value)}
                className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* Content/Body */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="🖋️ Start writing your content..."
                rows={12}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all font-mono"
              />
            </div>

            {/* Original Work (if referenced) */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Original Work (if referenced from somewhere)
              </label>
              <Input
                placeholder="🔗 Source or reference (optional)..."
                value={originalWork}
                onChange={(e) => setOriginalWork(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* Validation */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Validation
              </label>
              <Input
                placeholder="✓ Validation notes (optional)..."
                value={validation}
                onChange={(e) => setValidation(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* Suggested Hashtags */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Suggested Hashtags
              </label>
              <Input
                placeholder="🏷️ Add suggested hashtags (comma separated)..."
                value={suggestedHashtags}
                onChange={(e) => setSuggestedHashtags(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple hashtags with commas
              </p>
            </div>

            {/* Additional Tags */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                Additional Tags
              </label>
              <Input
                placeholder="🏷️ Add tags (comma separated)..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>

            {/* Selected Categories Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-pink-700">
                  Selected Categories <span className="text-red-500">*</span>
                </label>
                <Button
                  type="button"
                  onClick={() => setCategoryModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-pink-200 hover:bg-pink-100"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {selectedCategories.length > 0 ? "Edit Categories" : "Select Categories"}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-white rounded-xl border border-pink-200 min-h-[60px]">
                {selectedCategories.length > 0 ? (
                  selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="bg-pink-200 text-pink-900 px-3 py-1"
                    >
                      {cat}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm flex items-center">
                    No categories selected. Click "Select Categories" to choose.
                  </span>
                )}
              </div>
            </div>

            {/* Category Modal */}
            <CategoryModal
              open={categoryModalOpen}
              onOpenChange={setCategoryModalOpen}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              workType={workType}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="rounded-full border-pink-200 hover:bg-pink-100"
              >
                ← Back
              </Button>
              <Button
                variant="outline"
                disabled={loading}
                className="rounded-full border-pink-200 hover:bg-pink-100"
              >
                💾 Save Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={loading}
                className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 shadow-md"
              >
                {loading ? "Publishing..." : "✨ Publish"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
