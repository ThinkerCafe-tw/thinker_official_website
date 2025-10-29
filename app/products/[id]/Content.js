import { FaCheck } from 'react-icons/fa6';

export default function Content({ product }) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1">
        <h2 className="mb-3 text-2xl font-semibold">你將會學到</h2>
        <div className="whitespace-pre-line text-lg text-gray-300">
          {product.you_will_learn}
        </div>
      </div>
      <div className="md:col-span-1 lg:col-span-1">
        <h2 className="mb-3 text-2xl font-semibold">技能提升</h2>
        <div className="flex flex-wrap gap-2">
          {product.skill_tags.map(tag => (
            <span key={tag} className="px-3 py-1 border border-slate-400 rounded-full whitespace-nowrap text-sm bg-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="md:col-span-1 lg:col-span-1">
        <h2 className="mb-3 text-2xl font-semibold">包含內容</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-1">
          {product.content_tags.map(tag => (
            <div key={tag} className="flex items-start gap-x-1 text-base/[1] text-gray-300">
              <FaCheck className="shrink-0" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-3 lg:col-span-4">
        <h2 className="mb-3 text-2xl font-semibold">課程大綱</h2>
        <div className="whitespace-pre-line text-lg text-gray-300">
          {product.summery}
        </div>
      </div>
    </div>
  );
}
