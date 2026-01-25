"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function ShareSkillDialog({ open, onOpenChange }: any) {
  const [activeTab, setActiveTab] = useState("image");
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      skillCategory: "cooking",
      tags: "",
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Share Your Amazing Skill! ✨
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto flex flex-col">
          {/* Upload Area */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 ">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-2xl p-1 mb-6">
              <TabsTrigger value="image" className="rounded-xl data-[state=active]:bg-white shadow-sm">
                📸 Photo
              </TabsTrigger>
              <TabsTrigger value="video" className="rounded-xl data-[state=active]:bg-white shadow-sm">
                🎥 Video
              </TabsTrigger>
              <TabsTrigger value="audio" className="rounded-xl data-[state=active]:bg-white shadow-sm">
                🎙️ Audio
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="image" className="flex-1 space-y-4">
              <div className="h-64 border-2 border-dashed border-muted rounded-3xl flex items-center justify-center text-muted-foreground hover:border-purple-400 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="w-20 h-20 bg-muted mx-auto rounded-2xl mb-4 flex items-center justify-center">
                    <Upload className="h-10 w-10" />
                  </div>
                  <p className="text-lg font-medium mb-2">Drop your photo here</p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Similar for video/audio tabs */}
          </Tabs>
          
          {/* Form */}
          <form className="space-y-4 border-t pt-6">
            <Input placeholder="🎨 What did you create?" {...form.register("title")} />
            <Textarea 
              placeholder="Tell us about your creation! What inspired you? How long did it take?" 
              rows={3}
              {...form.register("description")}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Skill Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {['cooking', 'reading', 'art'].map(cat => (
                    <Badge key={cat} variant={form.watch("skillCategory") === cat ? "default" : "outline"} className="cursor-pointer p-3 h-16 rounded-2xl justify-center">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              <Input placeholder="#tags #delicious #baking" {...form.register("tags")} />
            </div>
            
            <Button type="submit" className="w-full rounded-2xl h-14 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 shadow-xl text-lg font-semibold">
              ✨ Share with the World!
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
