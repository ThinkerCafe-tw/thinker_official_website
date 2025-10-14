'use client';

import { useRouter } from 'next/navigation';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';

export default function PayedOrderForm({ order, profile }) {
  const router = useRouter();
  const studentId = String(profile.student_id).padStart(5, '0');
  const orderId = String(order.order_id).padStart(5, '0');

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <FormCard singleColumn title="步驟 3. 加 LINE 官方帳號好友驗證繳費">
        <div className="space-y-4">
          <p>
            LINE 搜尋 <span className="font-bold text-orange-400">@836tattx</span> 或掃描下方 QR code，將思考者咖啡 LINE 官方帳號加為好友。
          </p>
          <p className="flex justify-center">
            <img
              src="/files/qr-code.png"
              alt="QR code"
              width={160}
              height={160}
              className="rounded-lg"
            />
          </p>
          <p>
            加為好友後，在 LINE 官方帳號輸入以下資訊驗證繳費，方可開始安排課程。
          </p>
          <ol className="list-decimal list-inside">
            <li>
              學員編號：<span className="font-mono">{studentId}</span>
            </li>
            <li>
              報名序號：<span className="font-mono">{orderId}</span>
            </li>
            <li>
              轉帳銀行名稱：（例如：中華郵政）
            </li>
            <li>
              轉帳帳號末五碼：（例如：<span className="font-mono">12345</span>）
            </li>
          </ol>
        </div>
      </FormCard>
      <FormCard singleColumn>
        <ul className="ml-4 list-disc font-bold text-red-600">
          <li>請務必於 24 小時內完成驗證。若超過 24 小時，此報名將自動取消。</li>
          <li>在完成驗證前，請將此分頁維持開啟或存成書籤，以免遺失驗證資訊。</li>
        </ul>
      </FormCard>
      <FormFooter>
        <FormButton
          primary
          type="button"
          onClick={() => router.refresh()}
        >
          我已完成繳費驗證，下一步
        </FormButton>
      </FormFooter>
    </div>
  );
}
