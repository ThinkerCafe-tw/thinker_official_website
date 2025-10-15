import clsx from 'clsx';

export default function FormButton({ primary, children, ...restProps }) {
  return (
    <button
      className={clsx('w-full flex justify-center items-center px-3 py-2 rounded-md text-lg', primary && 'font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 bg-gradient-animate disabled:bg-none disabled:bg-gray-400 disabled:text-gray-200', !primary && 'font-normal bg-white/15 text-white/75 hover:bg-white/20 hover:text-white/80 disabled:bg-white/10 disabled:text-white/35')}
      {...restProps}
    >
      {children}
    </button>
  );
}
