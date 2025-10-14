import clsx from 'clsx';

export default function FormCard({ error, title, singleColumn, children }) {
  return (
    <div className={clsx('p-5 rounded-xl text-card-foreground shadow-sm', !error && 'bg-card/50', error && 'bg-red-900/75')}>
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
