"use client";

import { useEffect, useState } from "react";
import { Activity, Coffee, Bug, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SystemMonitor() {
    const [cpu, setCpu] = useState(12);
    const [memory, setMemory] = useState(45);
    const [coffee, setCoffee] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(Math.floor(Math.random() * 30) + 10);
            setMemory(Math.floor(Math.random() * 20) + 40);
            setCoffee((prev) => Math.max(0, prev - 0.1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="bg-card/30 backdrop-blur-md border border-border/40 p-4 w-full h-full flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3 h-3 text-green-500" />
                    System Status
                </h3>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Layers className="w-3 h-3" /> CPU</span>
                        <span className="font-mono text-foreground">{cpu}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            animate={{ width: `${cpu}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Bug className="w-3 h-3" /> Bugs</span>
                        <span className="font-mono text-foreground">0</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[2%] rounded-full" />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Coffee className="w-3 h-3" /> Coffee</span>
                        <span className="font-mono text-foreground">{Math.floor(coffee)}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-amber-600 rounded-full"
                            animate={{ width: `${coffee}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">Stack</span>
                        <span className="font-mono text-foreground">Overflow</span>
                    </div>
                    <div className="text-[10px] font-mono text-yellow-500/80 truncate">
                        Ctrl+C / Ctrl+V
                    </div>
                </div>
            </div>
        </Card>
    );
}
