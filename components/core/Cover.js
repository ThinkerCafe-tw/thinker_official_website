import clsx from 'clsx';

export default function Cover({ fullSize, children }) {
  return (
    <div className={clsx('flex flex-col justify-center items-center', !fullSize && 'pt-37 pb-18', fullSize && 'h-screen')}>
      {children}
    </div>
  );
}
