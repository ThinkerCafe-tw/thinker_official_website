import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import RevealItem from "@/components/cards-reveal-grid";

export const runtime = "nodejs";
export const revalidate = 60;

type Item = { title?: string; description?: string; image?: string };

export default async function ProductContentPage({
  params,
}: {
  params: { id: string };
}) {
  const product: any = await getProductById(params.id);
  if (!product) return notFound();

  const title = product.en_name || product.zh_name;
  const subtitle = product.en_description || product.zh_description;
  const heroMedia = product.content_video || product.image;

  const items = FIXED_SIX(product);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />

      <section className="h-full w-full">
        <video
          className="inset-0 h-screen w-full object-cover absolute"
          src={heroMedia}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative h-screen mx-auto px-26 flex items-end pb-16">
          <div className="grid grid-cols-12 items-end w-full">
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              {(product.en_category || product.zh_category) && (
                <Badge
                  variant="secondary"
                  className="mb-2 animate-glow bg-gradient-to-r from-orange-400 to-pink-500 text-black bg-gradient-animate"
                >
                  {product.en_category || product.zh_category}
                </Badge>
              )}
              <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-shadow-lg text-shadow-black/50">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-gray-700 md:text-lg  max-w-3xl">
                  {subtitle}
                </p>
              )}
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
          <div
            className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-6
            lg:auto-rows-[180px]
            "
          >
            <RevealItem index={0} className={POSITION_CLASSES[0]}>
              <div className="relative h-full rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col bg-card/30 backdrop-blur">
                <div className="mb-4">
                  {items[0]?.title && (
                    <h3 className="font-heading text-3xl font-semibold leading-tight mb-2 line-clamp-2">
                      {items[0].title}
                    </h3>
                  )}
                  {items[0]?.description && (
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3">
                      {items[0].description}
                    </p>
                  )}
                </div>
                <div className="mt-auto">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow">
                    <div className="w-full aspect-[4/3]">
                      {items[0]?.image ? (
                        <img
                          src={items[0].image}
                          alt={items[0].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
            <RevealItem index={1} className={POSITION_CLASSES[1]}>
              <div className="relative h-full rounded-[28px] pt-6 md:pt-8 pl-6 md:pl-8 pr-0.5  shadow-sm flex flex-col bg-card/30 backdrop-blur">
                <div className="order-1">
                  <div className="relative w-full rounded-md overflow-hidden shadow">
                    <div className="w-full aspect-[16/9] pb-8">
                      {items[1]?.image ? (
                        <img
                          src={items[1].image}
                          alt={items[1].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  {items[1]?.title && (
                    <h3 className="font-heading text-2xl font-semibold leading-tight mb-2 line-clamp-2">
                      {items[1].title}
                    </h3>
                  )}
                  {items[1]?.description && (
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-2">
                      {items[1].description}
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
            <RevealItem index={2} className={POSITION_CLASSES[2]}>
              <div className="relative h-full rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col items-center text-center bg-card/30 backdrop-blur">
                <div className="mb-4">
                  {items[2]?.title && (
                    <h3 className="font-heading text-2xl font-semibold leading-tight mb-2 line-clamp-2">
                      {items[2].title}
                    </h3>
                  )}
                  {items[2]?.description && (
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3">
                      {items[2].description}
                    </p>
                  )}
                </div>
                <div className="mt-auto w-full">
                  <div className="relative w-full rounded-2xl  shadow">
                    <div className="w-full aspect-[18/8]">
                      {items[2]?.image ? (
                        <img
                          src={items[2].image}
                          alt={items[2].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
            <RevealItem index={3} className={POSITION_CLASSES[3]}>
              <div className="relative h-full rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col bg-card/30 backdrop-blur">
                <div className="">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow">
                    <div className="w-full aspect-[16/10] max-h-[45%]">
                      {items[3]?.image ? (
                        <img
                          src={items[3].image}
                          alt={items[3].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  {items[3]?.title && (
                    <h3 className="font-heading text-2xl font-semibold leading-tight  line-clamp-2">
                      {items[3].title}
                    </h3>
                  )}
                  {items[3]?.description && (
                    <p className="text-sm md:text-base  text-gray-400 leading-relaxed line-clamp-3">
                      {items[3].description}
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
            <RevealItem index={4} className={POSITION_CLASSES[4]}>
              <div className="relative h-full rounded-[28px] p-6  md:p-8 shadow-sm flex flex-col bg-card/30 backdrop-blur">
                <div className="mb-10">
                  {items[4]?.title && (
                    <h3 className="font-heading text-2xl font-semibold leading-tight mb-2 line-clamp-2">
                      {items[4].title}
                    </h3>
                  )}
                  {items[4]?.description && (
                    <p className="text-sm md:text-base  text-gray-400 leading-relaxed line-clamp-3">
                      {items[4].description}
                    </p>
                  )}
                </div>
                <div className="mt-auto">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow">
                    <div className="w-full aspect-[5/3]">
                      {items[4]?.image ? (
                        <img
                          src={items[4].image}
                          alt={items[4].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>
            <RevealItem index={5} className={POSITION_CLASSES[5]}>
              <div className="relative h-full rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col bg-card/30 backdrop-blur">
                <div className="mb-4">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow">
                    <div className="w-full aspect-[16/10]">
                      {items[5]?.image ? (
                        <img
                          src={items[5].image}
                          alt={items[5].title || "highlight"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/40" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  {items[5]?.title && (
                    <h3 className="font-heading text-2xl font-semibold leading-tight mb-2 line-clamp-2">
                      {items[5].title}
                    </h3>
                  )}
                  {items[5]?.description && (
                    <p className="text-sm md:text-base  text-gray-400 leading-relaxed line-clamp-3">
                      {items[5].description}
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="pointer-events-none absolute -inset-1 opacity-40 [mask-image:radial-gradient(white,transparent_60%)]">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
            </div>

            <div className="relative z-10 px-6 py-10 text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                  Where Innovation Meets Tradition.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FIXED_SIX(product: any): Item[] {
  return Array.from({ length: 6 }).map((_, i) => {
    const n = i + 1;
    const t = product[`content_highlight${n}`] as string | undefined;
    const d = product[`content_highlight${n}_description`] as
      | string
      | undefined;
    const img =
      (product[`content_highlight${n}_image`] as string | undefined) ||
      product.image;
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
