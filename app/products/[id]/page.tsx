import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getProductById } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import Page from '@/components/core/Page.js';
import Cover from '@/components/core/Cover.js';
import BuyCourseButton from './BuyCourseButton.js';
import Bar from './Bar.js';
import Content from './Content.js';
import HighlightGrid from './HighlightGrid.js';
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
        <HighlightGrid items={items} />
      </div>
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
