import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getProductById } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import RevealItem from "@/components/cards-reveal-grid";
import { BsLine } from "react-icons/bs";
import { FaHand, FaAward, FaRegCircleCheck } from "react-icons/fa6";
import BuyCourseButton from './BuyCourseButton.js';

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
  const contentTagIcons = {
    '社群參與': <BsLine />,
    '課後提問': <FaHand />,
    '研習證書': <FaAward />,
  };

  return (
    <>
      <section className="h-full w-full mb-16">
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
              {(product.zh_category) && (
                <Badge
                  variant="secondary"
                  className="mb-2 animate-glow bg-gradient-to-r from-orange-400 to-pink-500 text-black bg-gradient-animate"
                >
                  {product.zh_category}
                </Badge>
              )}
              <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-shadow-lg text-shadow-black/50">
                【{String(courseId).padStart(3, '0')}】{title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-white-700 md:text-lg max-w-3xl text-shadow-lg text-shadow-black/50">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-6 md:mt-0 flex md:justify-end">
              <BuyCourseButton courseId={courseId} type="button" className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 max-w-6xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 hover-lift hover-glow bg-gradient-animate flex justify-self-center">
                立即報名
              </BuyCourseButton>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 py-6 rounded-xl text-xl font-semibold text-center bg-white/20 shadow-xl lg:grid-cols-4 lg:divide-x lg:divide-white/25">
            <span>{product.bar_text_1}</span>
            <span>{product.bar_text_2}</span>
            <span>{product.bar_text_3}</span>
            <span>{product.bar_text_4}</span>
          </div>
        </div>
      </section>
      <section className="mb-16">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
            <div className="md:col-span-2 lg:col-span-3">
              <h2 className="mb-5 text-3xl font-semibold">你將會學到</h2>
              <div className="whitespace-pre-line text-xl text-gray-300">
                {product.you_will_learn}
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <h2 className="mb-5 text-3xl font-semibold">技能提升</h2>
              <div className="flex flex-wrap">
                {product.skill_tags.map(tag => (
                  <span key={tag} className="px-4 py-1 border border-slate-400 rounded-full mr-2 mb-2 bg-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-1">
              <h2 className="mb-5 text-3xl font-semibold">包含內容</h2>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-1">
                {product.content_tags.map(tag => (
                  <div key={tag} className="flex items-center text-xl text-gray-300">
                    {contentTagIcons[tag] || <FaRegCircleCheck />}
                    <span className="ml-2">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-4">
              <h2 className="mb-5 text-3xl font-semibold">課程大綱</h2>
              <div className="whitespace-pre-line text-xl text-gray-300">
                {product.summery}
              </div>
            </div>
          </div>
        </div>
      </section>
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
          <BuyCourseButton courseId={courseId} type="button" className="w-full px-12 py-3 rounded-xl shadow-xl text-xl font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition-all md:w-auto bg-gradient-animate hover-lift hover-glow">
            立即報名
          </BuyCourseButton>
        </div>
      </section>
    </>
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
