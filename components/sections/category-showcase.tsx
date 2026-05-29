"use client";

import * as React from "react";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Category switcher: pick a use-case pill and the showcase image swaps, with a
// small "plain product" inset standing in for the before state.
const categories = [
  {
    id: "lifestyle",
    label: "Lifestyle",
    src: "/img/ip2/697623e2c1bb8c1db4a9c872_Botika_Homepage_BotikaCreatorProgram.avif",
    inset: "/img/ip/flat-jacket.webp",
  },
  {
    id: "editorial",
    label: "Editorial",
    src: "/img/ip2/6976234b84e6fbece572e594_Botika_HomePage_Editorials.avif",
    inset: "/img/ip/flat-dress.webp",
  },
  {
    id: "on-model",
    label: "On-model",
    src: "/img/ip2/694d1aba6f75e6997aa01475_Botika_Homepage_Client_Forever21.avif",
    inset: "/img/ip/flat-shirt.avif",
  },
  {
    id: "studio",
    label: "Studio",
    src: "/img/ip2/6976234bc173726a3281e3e5_Botika_HomePage_IncreaseDiversity.avif",
    inset: "/img/ip/product-bag.webp",
  },
  {
    id: "campaign",
    label: "Campaign",
    src: "/img/ip2/6976234b086075b0811ad678_Botika_HomePage_GetToMarketFaster.avif",
    inset: "/img/ip/flat-jacket.webp",
  },
];

export function CategoryShowcase() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="py-24">
      <Container className="flex flex-col items-center gap-8">
        <Reveal>
          <SectionHeading
            title="Turn plain product photos into beautiful visual assets with AI."
            description="Improve your visual content with Vela, tuned for enhancing faces, text, and ecommerce imagery."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                  i === active
                    ? "bg-ink text-white"
                    : "bg-bg-soft text-muted hover:text-fg",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-line">
            {categories.map((c, i) => (
              <Image
                key={c.id}
                src={c.src}
                alt={c.label}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority={i === 0}
                className={cn(
                  "object-cover transition-opacity duration-700 ease-out",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}

            {/* "plain product" before inset — swaps with the active category */}
            <div className="absolute left-5 top-1/2 hidden h-44 w-36 -translate-y-1/2 overflow-hidden rounded-xl border-4 border-white bg-white shadow-2xl sm:block">
              {categories.map((c, i) => (
                <Image
                  key={c.id}
                  src={c.inset}
                  alt={`${c.label} input`}
                  fill
                  sizes="144px"
                  className={cn(
                    "object-cover transition-opacity duration-700 ease-out",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
