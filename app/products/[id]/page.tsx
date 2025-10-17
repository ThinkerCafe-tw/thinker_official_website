import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getProductById } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import RevealItem from "@/components/cards-reveal-grid";
import Page from '@/components/core/Page.js';
import Cover from '@/components/core/Cover.js';
import BuyCourseButton from './BuyCourseButton.js';
import Bar from './Bar.js';
import Content from './Content.js';
import { parseCourseName } from '@/utils/course.js';

export const runtime = "nodejs";
export const revalidate = 60;

type Item = { title?: string; description?: string; image?: string };

export default async function ProductContentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product: any = await getProductById(id);
  if (!product) return notFound();

  const courseId = product.course_id;
  const title = product.zh_name;
  const subtitle = product.zh_description;
  const heroMedia = product.content_video || product.image;
  const items = FIXED_SIX(product);

  return (
    <Page>
      <Cover fullScreenHeight className="flex flex-col justify-end items-start pb-8">
        <video
          className="absolute top-0 left-0 z-0 w-screen h-screen object-cover"
          src={heroMedia}
          autoPlay
          muted
          loop
          playsInline
        />
            <div className="relative z-1 space-y-3 mb-8 lg:space-y-5">
              {(product.zh_category) && (
                <Badge
                  variant="secondary"
                  className="animate-glow bg-gradient-to-r from-orange-400 to-pink-500 text-black bg-gradient-animate"
                >
                  {product.zh_category}
                </Badge>
              )}
              <h1 className="font-bold text-3xl/[1.1] text-shadow-lg text-shadow-black/50 lg:text-5xl">
                {parseCourseName(product)}
              </h1>
              {subtitle && (
                <p className="text-base/[1.25] text-white-700 text-shadow-lg text-shadow-black/50 lg:text-lg/[1.25]">
                  {subtitle}
                </p>
              )}
            </div>
              <BuyCourseButton
                courseId={courseId}
                className="relative z-1 w-auto text-base shadow-md shadow-black/50 lg:text-lg"
              >
                立即報名
              </BuyCourseButton>
      </Cover>
      <div className="mt-8 space-y-8">
        <Bar product={product} />
        <Content product={product} />
      </div>
      <section className="mb-16">
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
      <section className="pb-16">
        <div className="container mx-auto px-4 flex justify-center">
          <BuyCourseButton courseId={courseId}>
            立即報名
          </BuyCourseButton>
        </div>
      </section>
    </Page>
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
