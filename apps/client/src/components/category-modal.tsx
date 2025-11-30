"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Default categories
const DEFAULT_CATEGORIES = [
  "Environment",
  "Life",
  "Friendship",
  "Adventure",
  "Nature",
  "Family",
  "Education",
  "Science",
  "History",
  "Fantasy",
  "Mystery",
  "Comedy",
];

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  workType: "Story" | "Article" | "Poem" | null;
}

export function CategoryModal({
  open,
  onOpenChange,
  selectedCategories,
  onCategoriesChange,
  workType,
}: CategoryModalProps) {
  const [allCategories, setAllCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoriesInput, setNewCategoriesInput] = useState("");
  const [showCreateSingle, setShowCreateSingle] = useState(false);
  const [showCreateMultiple, setShowCreateMultiple] = useState(false);

  // Load categories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("storybird_categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAllCategories([...new Set([...DEFAULT_CATEGORIES, ...parsed])]);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save categories to localStorage
  const saveCategories = (categories: string[]) => {
    const customCategories = categories.filter(
      (cat) => !DEFAULT_CATEGORIES.includes(cat)
    );
    localStorage.setItem("storybird_categories", JSON.stringify(customCategories));
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoriesChange(newSelected);
  };

  // Create single category
  const handleCreateSingle = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !allCategories.includes(trimmed)) {
      const updated = [...allCategories, trimmed];
      setAllCategories(updated);
      saveCategories(updated);
      setNewCategory("");
      setShowCreateSingle(false);
      // Auto-select the newly created category
      if (!selectedCategories.includes(trimmed)) {
        onCategoriesChange([...selectedCategories, trimmed]);
      }
    }
  };

  // Create multiple categories
  const handleCreateMultiple = () => {
    const categories = newCategoriesInput
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0 && !allCategories.includes(cat));

    if (categories.length > 0) {
      const updated = [...new Set([...allCategories, ...categories])];
      setAllCategories(updated);
      saveCategories(updated);
      setNewCategoriesInput("");
      setShowCreateMultiple(false);
      // Auto-select newly created categories
      const newSelected = [
        ...new Set([...selectedCategories, ...categories]),
      ];
      onCategoriesChange(newSelected);
    }
  };

  // Remove category (only custom ones)
  const handleRemoveCategory = (category: string) => {
    if (DEFAULT_CATEGORIES.includes(category)) {
      return; // Can't remove default categories
    }
    const updated = allCategories.filter((c) => c !== category);
    setAllCategories(updated);
    saveCategories(updated);
    // Remove from selected if selected
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-700">
            🏷️ Select Categories
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {workType && (
              <span>
                Work Type: <span className="font-semibold text-pink-600">{workType}</span>
              </span>
            )}
            <br />
            Select one or more categories. These categories are reusable across all
            communication sections.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create Category Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => {
                setShowCreateSingle(true);
                setShowCreateMultiple(false);
              }}
              variant="outline"
              className="rounded-full border-pink-200 hover:bg-pink-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Single Category
            </Button>
            <Button
              onClick={() => {
                setShowCreateMultiple(true);
                setShowCreateSingle(false);
              }}
              variant="outline"
              className="rounded-full border-pink-200 hover:bg-pink-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Multiple Categories
            </Button>
          </div>

          {/* Create Single Category Form */}
          {showCreateSingle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-xl border-2 border-pink-200"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="Enter category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateSingle();
                    }
                  }}
                  className="rounded-full border-pink-200 focus:border-pink-400"
                />
                <Button
                  onClick={handleCreateSingle}
                  disabled={!newCategory.trim()}
                  className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateSingle(false);
                    setNewCategory("");
                  }}
                  variant="outline"
                  className="rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Create Multiple Categories Form */}
          {showCreateMultiple && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-xl border-2 border-pink-200"
            >
              <div className="space-y-2">
                <Input
                  placeholder="Enter categories separated by commas (e.g., Sports, Music, Art)..."
                  value={newCategoriesInput}
                  onChange={(e) => setNewCategoriesInput(e.target.value)}
                  className="rounded-full border-pink-200 focus:border-pink-400"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateMultiple}
                    disabled={!newCategoriesInput.trim()}
                    className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create All
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateMultiple(false);
                      setNewCategoriesInput("");
                    }}
                    variant="outline"
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Separate multiple categories with commas
                </p>
              </div>
            </motion.div>
          )}

          {/* Selected Categories Display */}
          {selectedCategories.length > 0 && (
            <div>
              <p className="text-sm font-medium text-pink-700 mb-2">
                Selected ({selectedCategories.length}):
              </p>
              <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-pink-200">
                {selectedCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-pink-200 text-pink-900 px-3 py-1"
                  >
                    {cat}
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="ml-2 hover:text-pink-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* All Categories Grid */}
          <div>
            <p className="text-sm font-medium text-pink-700 mb-3">
              Available Categories ({allCategories.length}):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allCategories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                const isDefault = DEFAULT_CATEGORIES.includes(category);
                return (
                  <motion.button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all flex items-center justify-between relative group",
                      isSelected
                        ? "bg-pink-200 border-pink-400 text-pink-900"
                        : "bg-white border-pink-200 hover:border-pink-300 text-gray-700"
                    )}
                  >
                    <span className="font-medium pr-2">{category}</span>
                    {isSelected && (
                      <Check className="h-5 w-5 text-pink-600 flex-shrink-0" />
                    )}
                    {!isDefault && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCategory(category);
                        }}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                        title="Remove category"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </button>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-pink-200">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="rounded-full border-pink-200 hover:bg-pink-100"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              disabled={selectedCategories.length === 0}
              className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
            >
              Done ({selectedCategories.length} selected)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

