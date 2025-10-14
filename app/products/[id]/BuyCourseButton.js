'use client';

import { useRouter } from 'next/navigation';

export default function BuyCourseButton({ courseId, ...restProps }) {
  const router = useRouter();

  return (
    <button {...restProps} onClick={() => router.push(`/buy-course/${courseId}`)} />
  );
}
