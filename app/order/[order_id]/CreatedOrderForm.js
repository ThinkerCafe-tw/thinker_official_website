'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TriangleAlert, LoaderCircle } from 'lucide-react';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';
import { createClient } from '@/utils/supabase/client.ts';

export default function CreatedOrderForm({ order, profile, course }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  async function updateOrderState() {
    setErrorMessage('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase
      .from('orders')
      .update({ state: 'payed' })
      .eq('order_id', order.order_id);

    if (error) {
      const { code, message } = error;
      setErrorMessage(`[${code}] ${message}`);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <FormCard singleColumn title="步驟 2. 完成繳費">
        <div className="space-y-4">
          <p>
            學員編號：<span className="font-mono">{studentId}</span><br />
            學員姓名：{studentFullName}<br />
            報名序號：<span className="font-mono">{orderId}</span><br />
            報名課程：【{orderCourseId}】{orderCourseName}<br />
            上課方式：{orderCourseVariantName}<br />
            課程費用：新台幣 <span className="font-mono">{orderTotal}</span> 元<br />
          </p>
          <hr className="border-foreground/33" />
          <p>
            繳費方式：轉帳繳費<br />
            應繳金額：新台幣 <span className="font-mono">{orderTotal}</span> 元<br />
            收款帳戶：思考者咖啡有限公司<br />
            收款銀行：<span className="font-mono">007</span> 第一銀行 苗栗分行<br />
            收款帳號：<span className="font-mono">321-10-060407</span><br />
          </p>
        </div>
      </FormCard>
      <FormCard singleColumn>
        <ul className="ml-4 list-disc font-bold text-red-600">
          <li>請務必於 24 小時內完成付款。若超過 24 小時，此報名將自動取消。</li>
          <li>在完成付款前，請將此分頁維持開啟或存成書籤，以免遺失繳費資訊。</li>
        </ul>
      </FormCard>
      {errorMessage && (
        <FormCard error singleColumn>
          <p className="flex items-center gap-2">
            <TriangleAlert size={18} />
            {errorMessage}
          </p>
        </FormCard>
      )}
      <FormFooter>
        <FormButton
          primary
          type="button"
          onClick={() => updateOrderState()}
          disabled={loading}
        >
          {loading && <LoaderCircle size={20} className="mr-1 animate-spin" />}
          我已完成轉帳繳費
        </FormButton>
      </FormFooter>
    </div>
  );
}
