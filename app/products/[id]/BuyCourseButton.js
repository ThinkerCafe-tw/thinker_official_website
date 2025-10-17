'use client';

import { useRouter } from 'next/navigation';
import FormButton from '@/components/core/FormButton.js';

export default function BuyCourseButton({ courseId, className, children }) {
  const router = useRouter();

  return (
    <FormButton
      primary
      className={className}
      type="button"
      onClick={() => router.push(`/buy-course/${courseId}`)}
    >
      {children}
    </FormButton>
  );
}
