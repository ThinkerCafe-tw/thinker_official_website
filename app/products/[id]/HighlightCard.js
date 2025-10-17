import { cn } from '@/lib/utils';

export default function HighlightCard({ item, index }) {
  const { title, description, image } = item;
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
  const cardImage = (
    <div className="grow aspect-video rounded-lg overflow-hidden bg-white/40">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
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
