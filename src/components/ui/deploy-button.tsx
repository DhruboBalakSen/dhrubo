"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGS = [
    "Initializing deployment sequence...",
    "Optimizing assets...",
    "Minifying JS bundles...",
    "Running unit tests (skipped)",
    "Connecting to production database...",
    "Bypassing firewalls...",
    "Compiling tailwindcss...",
    "Downloading internet...",
    "Deleting node_modules...",
    "Uploading to cloud...",
];

export default function DeployButton() {
    const [status, setStatus] = useState<"idle" | "deploying" | "crashed" | "success">("idle");
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === "deploying") {
            let i = 0;
            const interval = setInterval(() => {
                setLogs((prev) => [...prev, LOGS[i]]);
                i++;
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }

                if (i >= LOGS.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus("crashed"), 500);
                }
            }, 300);
            return () => clearInterval(interval);
        } else if (status === "crashed") {
            const timeout = setTimeout(() => {
                setStatus("idle");
                setLogs([]);
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    const handleDeploy = () => {
        if (status !== "idle") return;
        setStatus("deploying");
        setLogs([]);
    };

    return (
        <>
            <Button
                variant="destructive"
                size="lg"
                onClick={handleDeploy}
                disabled={status !== "idle"}
                className="font-mono uppercase tracking-widest hover:scale-105 transition-transform"
            >
                <Rocket className="mr-2 w-4 h-4" />
                {status === "idle" ? "Deploy to Prod" : "Deploying..."}
            </Button>

            <AnimatePresence>
                {status === "deploying" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center font-mono text-sm"
                    >
                        <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-2xl">
                            <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-zinc-400">Deployment in progress...</span>
                            </div>
                            <div ref={scrollRef} className="h-64 overflow-y-auto space-y-2 font-mono text-xs text-green-400">
                                {logs.map((log, i) => (
                                    <div key={i}>&gt; {log}</div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === "crashed" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-blue-700 text-white flex flex-col items-center justify-center font-mono p-8 text-center"
                    >
                        <div className="text-9xl mb-8">:(</div>
                        <h1 className="text-4xl font-bold mb-4">CRITICAL SYSTEM FAILURE</h1>
                        <p className="text-xl mb-8">
                            An unhandled exception occurred at user_is_too_awesome.dll
                        </p>
                        <div className="bg-white/20 p-4 rounded text-sm mb-8 animate-pulse">
                            Error Code: 0xBAD_C0DE_420
                            <br />
                            Restarting universe in 3... 2... 1...
                        </div>
                        <p className="text-sm opacity-60 mt-8">(Just kidding. Please don't fire me.)</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
