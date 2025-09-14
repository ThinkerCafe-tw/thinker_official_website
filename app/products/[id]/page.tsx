// app/products/content/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import CardsRevealGrid from "@/components/cards-reveal-grid"; // ← Client 子元件

export const runtime = "nodejs";
export const revalidate = 60;

export default async function ProductContentPage({ params }: { params: { id: string } }) {
  const product: any = await getProductById(params.id);
  if (!product) return notFound();

  const title = product.en_name || product.zh_name;
  const subtitle = product.en_description || product.zh_description;
  const heroMedia = product.content_video || product.image;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />
      <section className="h-full w-full">
        <video className="inset-0 h-screen w-full object-cover absolute" src={heroMedia} autoPlay muted loop playsInline />
          <div className="relative h-screen mx-auto px-26 flex items-end pb-16">
            <div className="grid grid-cols-12 items-end w-full">
              <div className="col-span-12 md:col-span-8 lg:col-span-9">
                {(product.en_category || product.zh_category) && (
                  <Badge variant="secondary" className="mb-2">
                    {product.en_category || product.zh_category}
                  </Badge>
                )}
                <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">{subtitle}</p>}
              </div>
              <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-6 md:mt-0 flex md:justify-end">
                <button className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 max-w-6xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 hover-lift hover-glow bg-gradient-animate flex justify-self-center">
                  <Link href="/contact">Contact us</Link>
                </button>
              </div>
            </div>
          </div>
      </section>
    <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <CardsRevealGrid
            items={FIXED_SIX(product)}
            positionClasses={POSITION_CLASSES}
          />
        </div>
      </section>
    </div>
  );
}


type HL = { title?: string; description?: string; image?: string; empty?: boolean };

function FIXED_SIX(product: any): HL[] {
  return Array.from({ length: 6 }).map((_, i) => {
    const n = i + 1;
    const t = product[`content_highlight${n}`] as string | undefined;
    const d = product[`content_highlight${n}_description`] as string | undefined;
    const img = (product[`content_highlight${n}_image`] as string | undefined) || product.image;
    return {
      title: t || `Highlight ${n}`,
      description: d || "Details coming soon.",
      image: img,
    };
  });
}

export const POSITION_CLASSES = [
  "lg:col-start-1 lg:row-start-1 lg:col-span-3 lg:row-span-3",
  "lg:col-start-4 lg:row-start-1 lg:col-span-3 lg:row-span-2",
  "lg:col-start-4 lg:row-start-3 lg:col-span-2 lg:row-span-1",
  "lg:col-start-6 lg:row-start-3 lg:col-span-1 lg:row-span-1",
  "lg:col-start-1 lg:row-start-4 lg:col-span-4 lg:row-span-2",
  "lg:col-start-5 lg:row-start-4 lg:col-span-2 lg:row-span-2",
];

