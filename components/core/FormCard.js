import clsx from 'clsx';

export default function FormCard({ title, singleColumn, children }) {
  return (
    <div className="p-5 rounded-xl bg-card/50 text-card-foreground shadow-sm">
      {title && (
        <h2 className="mb-7 text-xl font-semibold lg:text-2xl">
          {title}
        </h2>
      )}
      <div className={clsx('grid grid-cols-1 gap-5 items-start', !singleColumn && 'md:grid-cols-2')}>
        {children}
      </div>
    </div>
  );
}
