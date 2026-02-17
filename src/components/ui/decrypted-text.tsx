"use client";

import { useEffect, useRef, useState } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    className,
    revealDirection = "start",
    useOriginalCharsOnly = false,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const iterations = useRef(0);
    const interval = useRef<NodeJS.Timeout>(null);

    const startAnimation = () => {
        iterations.current = 0;
        clearInterval(interval.current!);

        interval.current = setInterval(() => {
            setDisplayText((prevText) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations.current) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );

            if (iterations.current >= text.length) {
                clearInterval(interval.current!);
            }

            iterations.current += 1 / 3;
        }, speed);
    };

    useEffect(() => {
        startAnimation();
        return () => clearInterval(interval.current!);
    }, [text]);

    return (
        <span
            className={className}
        >
            {displayText}
        </span>
    );
}
