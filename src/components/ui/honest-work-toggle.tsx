"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, Sparkles } from "lucide-react";

interface HonestWorkToggleProps {
    onToggle: (enabled: boolean) => void;
    enabled: boolean;
}

export default function HonestWorkToggle({ onToggle, enabled }: HonestWorkToggleProps) {
    return (
        <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg border border-border/50 w-fit">
            <AnimatePresence mode="wait">
                {enabled ? (
                    <motion.div
                        key="honest"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <EyeOff className="w-4 h-4 text-purple-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="pro"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center space-x-2">
                <Switch
                    id="honest-mode"
                    checked={enabled}
                    onCheckedChange={onToggle}
                    className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="honest-mode" className="text-xs font-mono cursor-pointer select-none">
                    {enabled ? "HONEST MODE ACTIVE" : "Professional Mode"}
                </Label>
            </div>
        </div>
    );
}
