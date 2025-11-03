'use client';

import { useRouter } from 'next/navigation';
import FormButton from '@/components/core/FormButton.js';

export default function BuyCourseButton({ courseId, className, children }) {
  const router = useRouter();

  // 目前只有第六課開放報名
  const isAvailable = courseId === 6;

  return (
    <FormButton
      primary={isAvailable}
      className={className}
      type="button"
      onClick={() => isAvailable && router.push(`/buy-course/${courseId}`)}
      disabled={!isAvailable}
    >
      {isAvailable ? children : '即將開放'}
    </FormButton>
  );
}
