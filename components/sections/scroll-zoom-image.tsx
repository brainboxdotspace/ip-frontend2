"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

// As the section scrolls through the viewport, the image gently zooms in and
// drifts to the left. Scroll-linked + spring-smoothed, respects reduced-motion.
export function ScrollZoomImage({
  src,
  alt,
  className,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.16, 1.24]);
  const xRaw = useTransform(scrollYProgress, [0, 0.5, 1], [36, 0, -64]);

  const spring = { stiffness: 110, damping: 30, mass: 0.4 };
  const scale = useSpring(scaleRaw, spring);
  const x = useSpring(xRaw, spring);

  return (
    <div
      ref={ref}
      className={cn(
        "media relative mx-auto overflow-hidden rounded-2xl",
        className,
      )}
    >
      <motion.div
        style={reduce ? undefined : { scale, x }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
        />
      </motion.div>
      {label ? (
        <span className="absolute bottom-4 left-4 z-[2] inline-flex items-center gap-2 rounded-pill bg-black/55 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {label}
        </span>
      ) : null}
    </div>
  );
}
