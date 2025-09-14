// "use client";

// import { useEffect, useRef, useState } from "react";

// type HL = { title?: string; description?: string; image?: string; empty?: boolean };

// export default function CardsRevealGrid({
//   items,
//   positionClasses,
// }: {
//   items: HL[];
//   positionClasses: string[];
// }) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [visible, setVisible] = useState<boolean[]>(() => Array(items.length).fill(false));

//   useEffect(() => {
//     const root = containerRef.current;
//     if (!root) return;

//     const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));

//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return; 

//           const i = Number((entry.target as HTMLElement).dataset.index || "0");
//           setVisible((prev) => {
//             if (prev[i]) return prev;
//             const next = [...prev];
//             next[i] = true;
//             return next;
//           });

//           io.unobserve(entry.target); 
//         });
//       },
//       {
//         root: null,
//         rootMargin: "-35% 0px -35% 0px",
//         threshold: 0.25,
//       }
//     );

//     cards.forEach((el) => io.observe(el));
//     return () => io.disconnect();
//   }, [items.length]);

//   return (
//     <div
//       ref={containerRef}
//       className="
//         grid gap-6
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-6
//         lg:auto-rows-[180px]
//       "
//     >
//       {items.map((h, i) => (
//         <div
//           key={i}
//           data-card
//           data-index={i}
//           className={[
//             "h-full overflow-hidden",
//             "opacity-0 translate-y-6",
//             visible[i] ? "opacity-100 translate-y-0 blur-0" : "",
//             "transition-all duration-700 will-change-transform will-change-opacity",
//             positionClasses[i] || "",
//           ].join(" ")}
//           style={{ transitionDelay: `${i * 120}ms` }}
//         >
//           <MiniCardFixed item={h}  />
//         </div>
//       ))}
//     </div>
//   );
// }

// function MiniCardFixed({ item }: { item: HL }) {
//   return (
//     <div
//       className="relative overflow-hidden rounded-[28px] p-6 md:p-8 shadow-sm h-full flex flex-col bg-card/30 backdrop-blur hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in"
//     >
//       <div className="mb-4 min-h-0">
//         {item.title && (
//           <h3 className="font-heading text-2xl font-semibold leading-tight mb-2 line-clamp-2">
//             {item.title}
//           </h3>
//         )}
//         {item.description && (
//           <p className="text-sm md:text-base text-black/70 leading-relaxed line-clamp-3">
//             {item.description}
//           </p>
//         )}
//       </div>

//       <div className="mt-auto flex-shrink-0 min-h-0">
//         <div className="relative w-full rounded-2xl overflow-hidden shadow">
//           <div className="w-full aspect-[16/10] md:aspect-[5/3] lg:aspect-[16/9] max-h-[65%]">
//             {item.image ? (
//               <img src={item.image} alt={item.title || "highlight"} className="h-full w-full object-cover" />
//             ) : (
//               <div className="h-full w-full bg-white/40" />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function RevealItem({
  index,
  className = "",
  delayStep = 120,
  children,
}: {
  index: number;
  className?: string;     // 放你的 grid 定位/尺寸 class（原本的 POSITION_CLASSES[i]）
  delayStep?: number;     // 進場延遲間隔
  children: ReactNode;    // 卡片內容（隨你排版）
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShown(true);
          io.unobserve(el); // 只浮現一次
        });
      },
      { root: null, rootMargin: "-35% 0px -35% 0px", threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "h-full overflow-hidden",
        "opacity-0 translate-y-6",
        shown ? "opacity-100 translate-y-0 blur-0" : "",
        "transition-all duration-700 will-change-transform will-change-opacity",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${index * delayStep}ms` }}
    >
      {children}
    </div>
  );
}