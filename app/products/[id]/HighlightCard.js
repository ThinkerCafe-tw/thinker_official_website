import { cn } from '@/lib/utils';

export default function HighlightCard({ item, index, courseId }) {
  const { title, description, image } = item;

  // 課程 5 的定價圖 SVG（只在 courseId === 5 且 index === 0 時顯示）
  const testSVG = (courseId === 5 && index === 0) ? `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="1600" height="900" fill="#f8f9fa"/>
  <rect x="20" y="20" width="1560" height="200" fill="#FF6B6B" rx="20"/>
  <text x="800" y="150" font-family="Arial, sans-serif" font-size="130" font-weight="bold" fill="white" text-anchor="middle">早鳥優惠</text>
  <rect x="30" y="250" width="760" height="630" fill="white" stroke="#dee2e6" stroke-width="4" rx="24"/>
  <text x="410" y="380" font-family="Arial, sans-serif" font-size="85" font-weight="bold" fill="#495057" text-anchor="middle">小團班</text>
  <text x="410" y="590" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="#FF6B6B" text-anchor="middle">590</text>
  <text x="410" y="670" font-family="Arial, sans-serif" font-size="60" fill="#FF6B6B" text-anchor="middle">TWD</text>
  <rect x="210" y="760" width="400" height="95" fill="#28a745" rx="12"/>
  <text x="410" y="820" font-family="Arial, sans-serif" font-size="54" font-weight="bold" fill="white" text-anchor="middle">省 890 元</text>
  <rect x="810" y="250" width="760" height="630" fill="white" stroke="#dee2e6" stroke-width="4" rx="24"/>
  <text x="1190" y="380" font-family="Arial, sans-serif" font-size="85" font-weight="bold" fill="#495057" text-anchor="middle">一對一</text>
  <text x="1190" y="590" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="#FF6B6B" text-anchor="middle">990</text>
  <text x="1190" y="670" font-family="Arial, sans-serif" font-size="60" fill="#FF6B6B" text-anchor="middle">TWD</text>
  <rect x="970" y="760" width="440" height="95" fill="#28a745" rx="12"/>
  <text x="1190" y="820" font-family="Arial, sans-serif" font-size="54" font-weight="bold" fill="white" text-anchor="middle">省 1,510 元</text>
</svg>` : null;

  const finalImage = testSVG || image;
  const cardText = (
    <div
      className={cn(
        'space-y-2',
        [2, 3].includes(index) && 'lg:space-y-1',
      )}
    >
      {title && (
        <h3
          className={cn(
            'text-2xl/[1.1] font-semibold',
            index === 2 && 'lg:text-lg/[1.1]',
            index === 3 && 'lg:text-base/[1.1]',
            index === 5 && 'lg:text-xl/[1.1]',
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          className={cn(
            'text-sm/[1.25] text-gray-400',
            [2, 3].includes(index) && 'lg:line-clamp-1',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
  const isSVG = finalImage && finalImage.trim().startsWith('<svg');
  const cardImage = (
    <div className="grow aspect-video rounded-lg overflow-hidden">
      {finalImage && (
        isSVG ? (
          <div
            dangerouslySetInnerHTML={{ __html: finalImage }}
            className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
          />
        ) : (
          <img
            src={finalImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        )
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-y-3 h-full p-5 rounded-3xl bg-card/30">
      {[0, 1, 2, 4].includes(index) && (
        <>
          {cardText}
          {cardImage}
        </>
      )}
      {[3, 5].includes(index) && (
        <>
          {cardImage}
          {cardText}
        </>
      )}
    </div>
  );
}
