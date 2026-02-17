"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import confetti from "canvas-confetti";

export function useKonamiCode() {
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const code = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ];
        let index = 0;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === code[index]) {
                index++;
                if (index === code.length) {
                    setActivated(true);
                    index = 0;
                }
            } else {
                index = 0;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return activated;
}

export function KonamiToast() {
    const activated = useKonamiCode();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (activated) {
            setShow(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#22c55e", "#000000", "#ffffff"],
            });
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activated]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-[100] bg-black/90 text-green-500 font-mono font-bold px-6 py-4 rounded-lg border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div className="text-xl tracking-tighter">SYSTEM OVERRIDE</div>
                    </div>
                    <div className="text-xs text-green-400/70 mt-1 pl-5">
                        &gt; 0xCAFFEE_ACCESS_GRANTED
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
