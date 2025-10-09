import clsx from 'clsx';

export default function FormButton({ primary, children, ...restProps }) {
  return (
    <button
      className={clsx('w-full flex justify-center items-center px-20 py-2 rounded-md text-lg md:w-auto', primary && 'font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 bg-gradient-animate', !primary && 'font-normal bg-white/15 text-white/75 hover:bg-white/20 hover:text-white/80')}
      {...restProps}
    >
      {children}
    </button>
  );
}
