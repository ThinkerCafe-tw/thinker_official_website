import clsx from 'clsx';

export default function Page({ fullSize, children }) {
  return (
    <div className={clsx(!fullSize && 'max-w-6xl px-5 pb-5 mx-auto')}>
      {children}
    </div>
  );
}
