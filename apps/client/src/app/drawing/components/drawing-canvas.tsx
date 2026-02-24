"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { TwitterPicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Undo2, Redo, Eraser, Palette, Save, Image, Star, Heart, Zap, 
  Download, Share2, Plus, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { set } from "zod";

const STICKERS = [
  { emoji: "⭐", color: "#FFD700" },
  { emoji: "❤️", color: "#FF6B6B" },
  { emoji: "🦄", color: "#A78BFA" },
  { emoji: "🌈", color: "#06B6D4" },
  { emoji: "🎨", color: "#F59E0B" },
  { emoji: "✨", color: "#FBBF24" },
];

export default function DrawingCanvas() {
  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'sticker'>('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [lines, setLines] = useState<{ tool: string; points: number[]; stroke: string; lineWidth: number }[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState("");
  const [artworkDescription, setArtworkDescription] = useState("");
  const [windowLoaded, setWindowLoaded] = useState(false);

  const getStage = () => stageRef.current?.getStage();

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const stage = getStage();
    const pos = stage.getPointerPosition();
    
    setHistory([...history, lines]);
    setLines([...lines, {
      tool,
      points: [pos.x, pos.y],
      stroke: color,
      lineWidth,
    }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines[lines.length - 1] = lastLine;
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const undo = () => {
    if (lines.length > 0 && history.length > 0) {
      const newHistory = [...history];
      newHistory.push(lines);
      setHistory(newHistory);
      setLines(history[history.length - 1]);
    }
  };

  const redo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const newLines = newHistory.pop();
      setHistory(newHistory);
      setLines(newLines || []);
    }
  };

  const clearCanvas = () => {
    setLines([]);
    setHistory([]);
  };

  const addSticker = (emoji: string) => {
    const stage = getStage();
    const pos = stage.getPointerPosition();
    setHistory([...history, lines]);
    setLines([...lines, {
      tool: 'sticker',
      points: [pos.x, pos.y],
      stroke: emoji,
      lineWidth: 60,
    }]);
  };

  const exportCanvas = useCallback(async () => {
    const stage = getStage();
    const uri = stage.toDataURL();
    return uri;
  }, []);

  useEffect(() => {
    setWindowLoaded(true);
  },[])

  if(!windowLoaded) return <AnimatePresence></AnimatePresence>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            🎨 Drawing Studio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unleash your imagination! Draw, paint, add stickers, and share your masterpiece with the world ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-purple-200/50 overflow-hidden">
              <div 
                className="w-full h-[70vh] md:h-[80vh] relative bg-gradient-to-br from-white to-purple-50 cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Stage
                  width={window.innerWidth < 768 ? window.innerWidth - 32 : 1200}
                  height={window.innerHeight * 0.7}
                  ref={stageRef}
                >
                  <Layer>
                    {lines.map((line, i) => (
                      line.tool === 'sticker' ? (
                        <Text
                          key={i}
                          x={line.points[0] - 30}
                          y={line.points[1] - 30}
                          text={line.stroke}
                          fontSize={line.lineWidth}
                          fill="#000"
                          shadowColor="rgba(0,0,0,0.3)"
                          shadowBlur={4}
                          shadowOffset={{ x: 2, y: 2 }}
                        />
                      ) : (
                        <Line
                          key={i}
                          points={line.points}
                          stroke={line.stroke}
                          strokeWidth={line.lineWidth}
                          tension={0.5}
                          lineCap="round"
                          lineJoin="round"
                          globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                          shadowColor={line.stroke}
                          shadowBlur={10}
                          shadowOpacity={0.8}
                        />
                      )
                    ))}
                  </Layer>
                </Stage>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
            {/* Tool Selector */}
            <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-0 overflow-hidden">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold text-purple-900 flex items-center gap-2">
                  <Palette className="h-6 w-6" />
                  Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[
                    { icon: Palette, label: 'Pen', value: 'pen' as const },
                    { icon: Eraser, label: 'Eraser', value: 'eraser' as const },
                    { icon: Image, label: 'Stickers', value: 'sticker' as const },
                  ].map(({ icon: Icon, label, value }) => (
                    <Tooltip key={value}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={tool === value ? "default" : "outline"}
                          className={`h-16 rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all group ${tool === value ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/25' : 'hover:bg-purple-50 border-purple-200'}`}
                          onClick={() => setTool(value)}
                        >
                          <Icon className={`h-6 w-6 ${tool === value ? 'text-white' : 'text-purple-700'}`} />
                          <span className="text-xs mt-1 block">{label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brush Size */}
            <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-0">
              <CardContent className="p-6 pt-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-900 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Brush Size
                  </label>
                  <Slider 
                    value={[lineWidth]} 
                    onValueChange={(v) => setLineWidth(v[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Thin</span>
                    <span className="font-mono bg-purple-100 px-2 py-1 rounded-full text-purple-800">{lineWidth}px</span>
                    <span>Thick</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Picker */}
            <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-0 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-900 flex items-center gap-2">
                    🎨 Color
                  </label>
                  <div 
                    className="w-full h-12 rounded-2xl border-2 border-purple-200 cursor-pointer relative overflow-hidden shadow-inner hover:shadow-md transition-all"
                    style={{ backgroundColor: color }}
                    onClick={() => setShowColorPicker(true)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full h-14 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl hover:border-purple-400 flex items-center gap-3 text-purple-700 font-semibold"
                    onClick={undo}
                  >
                    <Undo2 className="h-5 w-5" />
                    Undo
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo last action (⌘Z)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full h-14 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl hover:border-purple-400 flex items-center gap-3 text-purple-700 font-semibold"
                    onClick={redo}
                  >
                    <Redo className="h-5 w-5" />
                    Redo
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo (⌘Y)</p>
                </TooltipContent>
              </Tooltip>

              <Button 
                size="lg" 
                onClick={clearCanvas}
                variant="destructive"
                className="w-full h-14 rounded-2xl shadow-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
              >
                <Image className="h-5 w-5 mr-2" />
                Clear Canvas
              </Button>

              <Button 
                size="lg" 
                onClick={() => setShowSaveDialog(true)}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl text-white font-bold text-lg"
              >
                <Save className="h-5 w-5 mr-2" />
                Save & Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Color Picker Dialog */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
            onClick={() => setShowColorPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-purple-200/50 max-w-sm w-full max-h-[80vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-900">Pick a Color 🎨</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 rounded-2xl p-0"
                  onClick={() => setShowColorPicker(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <TwitterPicker 
                  color={color}
                  onChange={(c) => setColor(c.hex)}
                  className="!w-full"
                />
                <div className="grid grid-cols-5 gap-2 pt-4">
                  {[
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
                  ].map(c => (
                    <button
                      key={c}
                      className="w-12 h-12 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border-4 border-transparent hover:border-white"
                      style={{ backgroundColor: c }}
                      onClick={() => {
                        setColor(c);
                        setShowColorPicker(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Your Masterpiece is Ready! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview Canvas */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 shadow-inner">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-2">Preview</h3>
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-emerald-700 font-medium">Approved! ✨</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Layers:</span>
                  <span className="font-semibold text-emerald-700">{lines.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Colors:</span>
                  <span className="font-semibold text-purple-700">10+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size:</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold">
                    HD
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Input 
                placeholder="🎨 My Rainbow Unicorn Adventure"
                value={artworkTitle}
                onChange={(e) => setArtworkTitle(e.target.value)}
              />
              <Textarea 
                placeholder="I drew a magical unicorn flying through rainbows! It took me 30 minutes and I used pink, purple, and gold colors. What do you think? ✨"
                value={artworkDescription}
                onChange={(e) => setArtworkDescription(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 rounded-2xl h-14 border-2 border-purple-200 shadow-lg hover:shadow-xl"
                onClick={() => setShowSaveDialog(false)}
              >
                Keep Drawing
              </Button>
              <Button 
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-2xl text-lg font-bold text-white"
                onClick={async () => {
                  const canvasData = await exportCanvas();
                  console.log('🎨 Artwork saved!', { title: artworkTitle, data: canvasData });
                  setShowSaveDialog(false);
                }}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Masterpiece
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stickers Panel - Always visible on hover */}
      {tool === 'sticker' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-4 flex gap-3 z-[999]"
        >
          {STICKERS.map(({ emoji }, i) => (
            <motion.button
              key={i}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl hover:scale-110 text-2xl font-black text-white transition-all duration-200"
              onClick={() => addSticker(emoji)}
              whileTap={{ scale: 0.95 }}
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
