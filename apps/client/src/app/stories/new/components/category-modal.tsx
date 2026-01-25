// components/category-modal.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = [
  "Fiction", "Romance", "Fantasy", "Sci-Fi", "Mystery",
  "Thriller", "Poetry", "Horror", "Adventure", "Drama",
  "Comedy", "Non-Fiction", "Biography", "Self-Help",
  "Technology", "History", "Travel", "Food", "Health"
];

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export function CategoryModal({ 
  open, 
  onOpenChange, 
  selectedCategories, 
  onCategoriesChange 
}: CategoryModalProps) {
  const handleToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoriesChange(newCategories);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="px-6 py-6 border-b">
          <SheetTitle className="text-rose-700">Select Categories</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Choose up to 5 categories for your work
          </p>
        </SheetHeader>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 cursor-pointer group"
                onClick={() => handleToggle(category)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleToggle(category)}
                  />
                  <label htmlFor={category} className="text-sm font-medium">
                    {category}
                  </label>
                </div>
                {selectedCategories.includes(category) && (
                  <Badge className="bg-rose-100 text-rose-800">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-muted/50">
          <div className="text-sm text-muted-foreground mb-3">
            {selectedCategories.length} of 5 selected
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="bg-rose-100 text-rose-800">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
