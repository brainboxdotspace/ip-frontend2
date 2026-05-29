"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Catalogue-style mode switcher: auto-advances through the workflows and the
// preview crossfades. The source composites bake their own tab strip on the
// right edge, so we show the left ~75% (object-left) and overlay real tabs.
const modes = [
  {
    id: "on-model",
    label: "On model",
    src: "/img/ip2/697622ede64a222537322295_Botika_Homepage_OnModel.avif",
  },
  {
    id: "flat-lay",
    label: "Flat lay",
    src: "/img/ip2/697622ed431f97eb3c5bc02d_Botika_Homepage_FlayLay.avif",
  },
  {
    id: "mannequin",
    label: "Mannequin",
    src: "/img/ip2/697622ed85b2ab77257fbcc6_Botika_Homepage_Mannaquin.avif",
  },
];

const INTERVAL = 3600;

export function WorkflowTabs() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const n = modes.length;

  React.useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduce, n]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full overflow-hidden rounded-[28px] border border-line bg-[#ececed] shadow-[0_50px_90px_-50px_rgba(13,15,20,0.45)]"
    >
      <div className="relative aspect-[16/11] w-full sm:aspect-[2/1]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={modes[active].id}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={modes[active].src}
              alt={`${modes[active].label} preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              priority
              className="object-cover object-left"
            />
          </motion.div>
        </AnimatePresence>

        {/* Tabs overlaid on the light right edge */}
        <div className="absolute inset-y-0 right-0 z-10 flex flex-col items-end justify-center gap-3 pr-6 sm:gap-4 sm:pr-12 lg:pr-16">
          {modes.map((m, i) => {
            const isActive = i === active;
            return (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className="group flex flex-col items-end"
              >
                <span
                  className={cn(
                    "font-display text-2xl tracking-tight transition-colors duration-200 sm:text-3xl",
                    isActive
                      ? "text-zinc-900"
                      : "text-zinc-400 group-hover:text-zinc-600",
                  )}
                >
                  {m.label}
                </span>
                {/* auto-advance progress underline */}
                <span className="mt-1 block h-0.5 w-full overflow-hidden rounded-full">
                  {isActive ? (
                    <motion.span
                      key={`${m.id}-${active}-${paused}`}
                      className="block h-full bg-zinc-900"
                      initial={{ width: reduce ? "100%" : 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: reduce || paused ? 0 : INTERVAL / 1000,
                        ease: "linear",
                      }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
          <span
            aria-disabled
            className="cursor-default font-display text-2xl tracking-tight text-zinc-300 sm:text-3xl"
          >
            Video
          </span>
        </div>
      </div>
    </div>
  );
}
