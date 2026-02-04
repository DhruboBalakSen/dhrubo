"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, GitCommitHorizontal } from "lucide-react";

const commits = [
    "Fixed bug, created 3 new ones",
    "Code works, don't touch",
    "Removed console.log('here')",
    "Adjusted CSS by 1px",
    "Merged conflicts with reality",
    "WIP: Do not deploy",
    "Refactored spaghetti into lasagna",
    "Optimized for job security",
    "Deleted tests because they were failing",
    "Added comments explaining why this is ugly",
    "Temporary fix (added in 2021)",
    "Git push --force (I live dangerously)",
];

export default function GitJokes() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % commits.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="bg-black/80 font-mono text-xs md:text-sm border-border/50 p-4 w-full max-w-lg mx-auto backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 text-muted-foreground mb-3 border-b border-border/30 pb-2">
                <Terminal className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-[10px] md:text-xs">bash — dhrubo@dev:~/mental-state</span>
                <div className="ml-auto flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-green-500 shrink-0">➜</span>
                <span className="text-blue-400 shrink-0">git commit -m</span>
                <div className="relative h-6 w-full flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-yellow-100/90 whitespace-nowrap truncate"
                        >
                            "{commits[index]}"
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </Card>
    );
}
