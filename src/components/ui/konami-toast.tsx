"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activated]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-8 right-8 z-[100] bg-green-500 text-black font-mono font-bold px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6)] border-2 border-green-400 rotate-2"
                >
                    <div className="text-xl">GOD MODE ENABLED</div>
                    <div className="text-xs opacity-80 mt-1">Unlimited Coffee Glitch Active</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
