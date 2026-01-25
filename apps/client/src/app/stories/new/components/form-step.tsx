// components/form-step.tsx
"use client";

import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ValidationErrorDialog } from "@/components/validation-error-dialog";
import { useState } from "react";

interface FormStepProps {
  form: any;
  workType: WorkType;
  selectedCategories: string[];
  onCategoriesClick: () => void;
  onBack: () => void;
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
  formErrors?: Record<string, string[]>; // For validation dialog
}

export function FormStep({ 
  form, 
  workType, 
  selectedCategories, 
  onCategoriesClick, 
  onBack, 
  onSubmit, 
  isSubmitting,
//   formErrors
}: FormStepProps) {
    const [formErrors,setFormErrors] = useState<Record<string, string[]>>({});
    
    const onError = (formErrors:Error) => {
        debugger;
         const dialogErrors = Object.entries(formErrors).reduce((acc, [key, error]) => {
      acc[key] = [error.message || 'Invalid field'];
      return acc;
    }, {} as Record<string, string[]>);
    
    setFormErrors(dialogErrors); // Add this state
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header - unchanged */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-50/90 to-purple-50/90 p-8 backdrop-blur-sm shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-pink-400/10 to-purple-400/10" />
        
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
          >
            ← Back to types
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/80 text-xs font-semibold text-rose-700 shadow-sm">
              {workType}
            </span>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-rose-50"
              onClick={onCategoriesClick}
            >
              {selectedCategories.length || "Select"} categories
            </Badge>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-rose-700 font-medium">Categories</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategories.length ? (
                selectedCategories.slice(0, 3).map((cat) => (
                  <span key={cat} className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs rounded-full">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground italic text-xs">Click to select</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COMPLETE FORM with ALL 8 fields */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
            
            {/* 1. Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a compelling title for your work..."
                      className="h-12 rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormDescription className="text-xs">Max 120 characters</FormDescription>
                    <span className="text-xs text-muted-foreground">{field.value?.length || 0}/120</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Description <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Write a brief description that draws readers in..."
                      className="rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50 min-h-[80px]"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormDescription className="text-xs">Max 300 characters</FormDescription>
                    <span className="text-xs text-muted-foreground">{field.value?.length || 0}/300</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. What it's about */}
            <FormField
              control={form.control}
              name="whatItsAbout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">What it's about <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Describe the theme, setting, characters, or main idea..."
                      className="rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50 min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription className="text-xs mt-1">Help readers understand your work's essence</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Body/Content */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Content <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={12}
                      placeholder="Start writing your story, article, or poem here..."
                      className="rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50 min-h-[300px] font-light"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormDescription className="text-xs">Minimum 50 characters</FormDescription>
                    <span className="text-xs text-muted-foreground">{field.value?.length || 0} chars</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. Original Work */}
            <FormField
              control={form.control}
              name="originalWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Original work (if referenced)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Link to source, inspiration, or referenced work (optional)..."
                      className="h-12 rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs mt-1">For inspired works or adaptations</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 6. Validation */}
            <FormField
              control={form.control}
              name="validation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Validation notes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Content warnings, age ratings, disclaimers (optional)..."
                      className="h-12 rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs mt-1">Trigger warnings, maturity ratings, etc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 7. Suggested Hashtags */}
            <FormField
              control={form.control}
              name="suggestedHashtags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Suggested hashtags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="#fantasy #magic #adventure (comma separated)"
                      className="h-12 rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs mt-1">Help readers find your work</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 8. Additional Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-rose-700 font-medium">Additional tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="friendship, dragons, mystery (comma separated)"
                      className="h-12 rounded-2xl border-rose-200/50 bg-white/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-rose-300/50"
                    />
                  </FormControl>
                  <FormDescription className="text-xs mt-1">Keywords for search and discovery</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 -mx-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={isSubmitting}
                className="h-11 px-6 rounded-full hover:bg-rose-50 text-rose-700 border border-rose-200/50"
              >
                ← Back
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-full border-rose-200/50 hover:bg-rose-50"
              >
                💾 Save Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg text-white font-semibold"
              >
                {isSubmitting ? "Publishing..." : "✨ Publish"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Validation Error Dialog */}
       <ValidationErrorDialog 
        errors={formErrors} 
        isOpen={!!formErrors && Object.keys(formErrors).length > 0}
        onClose={() => {setFormErrors({})}} // Handle in parent
      />
    </motion.div>
  );
}
