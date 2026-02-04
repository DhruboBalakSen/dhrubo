"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface BlurFadeProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    blur?: string;
    className?: string;
    yOffset?: number;
    inView?: boolean;
}

export default function BlurFade({
    children,
    delay = 0,
    duration = 0.5,
    blur = "10px",
    className,
    yOffset = 20,
    inView = true,
    ...props
}: BlurFadeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
                duration,
                delay,
                ease: "easeOut",
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
