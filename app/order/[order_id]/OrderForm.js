'use client';

import { useRouter } from 'next/navigation';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';

export default function OrderForm({ order, profile, course }) {
  const router = useRouter();
  const orderTotal = order.total.toLocaleString('zh-TW');
  const studentId = String(profile.student_id).padStart(5, '0');
  const studentFullName = profile.full_name;
  const orderId = String(order.order_id).padStart(5, '0');
  const orderCourseId = String(order.course_id).padStart(3, '0');
  const orderCourseName = course.zh_name;
  const orderVariantName = {
    0: '小班制',
    1: '一對一',
  }[order.variant];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <FormCard singleColumn title="步驟 1. 完成付款">
        <div className="space-y-3">
          <p>
            依照下列資訊完成付款。
          </p>
          <p className="pl-4 border-l-3 border-foreground/75">
            付款方式：<span className="font-bold text-orange-400">轉帳付款</span><br />
            收款帳戶：<span className="font-bold text-orange-400">思考者咖啡有限公司</span><br />
            收款銀行：<span className="font-bold text-orange-400 font-mono">007 第一銀行</span><br />
            收款帳號：<span className="font-bold text-orange-400 font-mono">321-10-060407</span><br />
            應付金額：<span className="font-bold text-orange-400 font-mono">新台幣 {orderTotal} 元</span><br />
          </p>
        </div>
      </FormCard>
      <FormCard singleColumn title="步驟 2. 加 LINE 官方帳號好友">
        <div className="space-y-3">
          <p className="flex justify-center">
            <img src="/files/qr-code.png" alt="QR code" width={160} height={160} />
          </p>
          <p>
            LINE 搜尋 <span className="font-bold text-orange-400">@836tattx</span> 或掃描上方 <span className="font-bold text-orange-400">QR code</span>，將思考者咖啡 LINE 官方帳號加為好友。
          </p>
        </div>
      </FormCard>
      <FormCard singleColumn title="步驟 3. 驗證付款">
        <p>
          在 LINE 官方帳號輸入以下資訊，驗證繳費，方可開始安排課程。
        </p>
        <div className="pl-4 border-l-3 border-foreground/75">
          <ol className="list-decimal list-inside">
            <li>
              您的學員編號：<span className="font-bold text-orange-400 font-mono">{studentId}</span>
            </li>
            <li>
              您的訂單編號：<span className="font-bold text-orange-400 font-mono">{orderId}</span>
            </li>
            <li>
              轉帳銀行名稱：<span className="font-bold text-orange-400">（例如：中華郵政）</span>
            </li>
            <li>
              轉帳帳號末五碼：<span className="font-bold text-orange-400 font-mono">（例如：12345）</span>
            </li>
          </ol>
        </div>
      </FormCard>
      <FormCard error singleColumn>
        <div className="space-y-3">
          <p>* 請務必 <span className="font-bold text-orange-400">於 24 小時內完成付款及驗證</span>。若超過 24 小時，此訂單將自動取消。</p>
          <p>* 在完成付款及驗證前，請 <span className="font-bold text-orange-400">維持此分頁開啟</span> 或 <span className="font-bold text-orange-400">將此分頁存為書籤</span>，以免遺失付款資訊。</p>
        </div>
      </FormCard>
      <FormFooter>
        <FormButton
          type="button"
          onClick={() => router.push('/')}
        >
          回首頁
        </FormButton>
      </FormFooter>
    </div>
  );
}
