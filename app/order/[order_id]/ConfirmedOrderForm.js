'use client';

import { useRouter } from 'next/navigation';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';

export default function ConfirmedOrderForm({ order, profile, course }) {
  const router = useRouter();
  const studentId = String(profile.student_id).padStart(5, '0');
  const studentFullName = profile.full_name;
  const orderId = String(order.order_id).padStart(5, '0');
  const orderCourseId = String(order.course_id).padStart(3, '0');
  const orderCourseName = course.zh_name;
  const orderCourseVariantName = {
    group: '小班制',
    single: '一對一',
  }[order.course_variant];
  const orderTotal = order.total.toLocaleString('zh-TW');

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <FormCard singleColumn title="恭喜，您已完成課程報名！">
        <div className="space-y-4">
          <p>
            您本次的報名資訊如下。
          </p>
          <p>
            學員編號：<span className="font-mono">{studentId}</span><br />
            學員姓名：{studentFullName}<br />
            報名序號：<span className="font-mono">{orderId}</span><br />
            報名課程：【{orderCourseId}】{orderCourseName}<br />
            上課方式：{orderCourseVariantName}<br />
            課程費用：新台幣 <span className="font-mono">{orderTotal}</span> 元<br />
          </p>
        </div>
      </FormCard>
      <FormFooter>
        <FormButton
          primary
          type="button"
          onClick={() => router.push('/products')}
        >
          探索更多課程
        </FormButton>
        <FormButton
          type="button"
          onClick={() => router.push('/')}
        >
          <span className="px-7">回首頁</span>
        </FormButton>
      </FormFooter>
    </div>
  );
}
