// components/validation-error-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";

interface ValidationErrorDialogProps {
  errors: Record<string, string[]>;
  isOpen: boolean;
  onClose: () => void;
}

export function ValidationErrorDialog({ 
  errors, 
  isOpen, 
  onClose 
}: ValidationErrorDialogProps) {
    debugger
  const errorCount = Object.values(errors).flat().length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-red-900">
                {errorCount === 1 ? "1 field needs attention" : `${errorCount} fields need attention`}
              </DialogTitle>
              <DialogDescription className="text-red-700">
                Please fix these issues before publishing:
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {Object.entries(errors).map(([field, messages]) => (
            <div key={field} className="flex gap-3 items-start p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm text-red-900 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                {messages.map((message, idx) => (
                  <p key={idx} className="text-sm text-red-700 leading-relaxed">
                    • {message}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            className="rounded-full border-red-200 hover:bg-red-50 text-red-700"
            onClick={onClose}
          >
            Got it, I'll fix them
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
