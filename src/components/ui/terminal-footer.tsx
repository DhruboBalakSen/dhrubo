"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandResult {
    command: string;
    output: React.ReactNode;
}

const COMMANDS = {
    help: "Available commands: help, ls, whoami, contact, clear, sudo, date",
    ls: "about/  projects/  skills/  experience/  contact.txt",
    whoami: "visitor@portfolio",
    contact: "Email: dhrubosen206@gmail.com | Phone: +91-6364606251",
    date: new Date().toString(),
    sudo: "Permission denied: user is not in the sudoers file. This incident will be reported.",
    rm: "Nice try. I have backups.",
};

export default function TerminalFooter() {
    const [history, setHistory] = useState<CommandResult[]>([]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        if (cmd === "clear") {
            setHistory([]);
            setInput("");
            return;
        }

        let output: React.ReactNode = "Command not found. Type 'help' for a list of commands.";

        if (cmd in COMMANDS) {
            output = COMMANDS[cmd as keyof typeof COMMANDS];
        } else if (cmd.startsWith("echo ")) {
            output = cmd.slice(5);
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
        setInput("");
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <footer className="w-full bg-black border-t border-border/50 font-mono text-sm py-4 relative z-30">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs uppercase tracking-wider">
                    <Terminal className="w-3 h-3" />
                    <span>Interactive Footer Terminal</span>
                </div>

                <div
                    ref={containerRef}
                    className="bg-zinc-950/50 rounded-md border border-border/30 p-4 h-48 overflow-y-auto font-mono text-xs md:text-sm shadow-inner scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className="text-muted-foreground mb-2">
                        Welcome to Portfolio CLI v2.0. Type 'help' to get started.
                    </div>

                    {history.map((entry, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex gap-2 text-green-500">
                                <span>➜</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-zinc-100">{entry.command}</span>
                            </div>
                            <div className="pl-6 text-zinc-400/90 whitespace-pre-wrap">{entry.output}</div>
                        </div>
                    ))}

                    <form onSubmit={handleCommand} className="flex gap-2 items-center">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-zinc-100 flex-1 placeholder:text-zinc-700"
                            placeholder="Type a command..."
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck="false"
                        />
                    </form>
                </div>

                <div className="mt-4 text-center text-xs text-muted-foreground/60">
                    © 2026 Dhrubo Balak Sen. Built with Next.js, Shadcn, and too much coffee.
                </div>
            </div>
        </footer>
    );
}
