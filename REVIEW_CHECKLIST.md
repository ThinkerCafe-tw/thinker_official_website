# 審核檢查清單 - 轉帳流程優化 + Email 通知系統

> **建立日期**: 2025-11-02
> **等待審核**: Cruz
> **預估審核時間**: 10-15 分鐘

---

## 📋 本次更新內容總覽

### Part A: 轉帳頁面優化 ✅
- [x] 新增「複製銀行代碼」按鈕
- [x] 新增「複製帳號」按鈕（自動去除連字號）
- [x] 新增「帳號後五碼」填寫欄位
- [x] 新增「轉帳時間」填寫欄位
- [x] 改善視覺設計（info box、倒數計時）
- [x] 新增繳費期限倒數顯示

### Part B: Email 通知系統 ✅
- [x] 整合 Resend Email 服務
- [x] 建立繳費提醒 Email 模板
- [x] 建立 API Route 發送 Email
- [x] 整合到訂單建立流程

### Part C: 資料庫更新 ✅
- [x] 新增 `transfer_account_last5` 欄位
- [x] 新增 `transfer_time` 欄位

---

## 📁 新增/修改的檔案清單

### 新增檔案

| 檔案路徑 | 用途 | 狀態 |
|---------|------|------|
| `app/order/[order_id]/CreatedOrderForm_NEW.js` | 優化後的轉帳頁面 | ✅ 待審核 |
| `app/buy-course/[[...slug]]/BuyCourseForm_NEW.js` | 整合 Email 發送 | ✅ 待審核 |
| `lib/email/resend.ts` | Resend SDK 初始化 | ✅ 待審核 |
| `lib/email/templates/PaymentReminder.tsx` | Email 模板 | ✅ 待審核 |
| `app/api/email/send-payment-reminder/route.ts` | Email API | ✅ 待審核 |
| `DATABASE_MIGRATION_20251102.sql` | 資料庫 Migration | ✅ 待審核 |
| `EMAIL_SETUP_GUIDE.md` | Email 設定文件 | 📝 參考用 |
| `IMMEDIATE_IMPROVEMENTS.md` | 優化計畫文件 | 📝 參考用 |
| `NEWEBPAY_INTEGRATION_PLAN.md` | 金流整合計畫 | 📝 參考用 |

### 需要替換的檔案

| 原檔案 | 新檔案 | 動作 |
|-------|-------|------|
| `app/order/[order_id]/CreatedOrderForm.js` | `CreatedOrderForm_NEW.js` | 重新命名 |
| `app/buy-course/[[...slug]]/BuyCourseForm.js` | `BuyCourseForm_NEW.js` | 重新命名 |

---

## ⚙️ 需要執行的設定步驟

### 1. 安裝套件

```bash
pnpm add resend react-email @react-email/components
```

### 2. 執行資料庫 Migration

```bash
# 連線到 Supabase SQL Editor
# 複製並執行 DATABASE_MIGRATION_20251102.sql
```

或使用 Supabase CLI:
```bash
supabase db push
```

### 3. 設定環境變數

在 `.env` 新增：

```bash
# Resend Email Service
RESEND_API_KEY=re_xxxxx  # 需要註冊 Resend 取得
RESEND_FROM_EMAIL=onboarding@resend.dev  # 測試階段用
# RESEND_FROM_EMAIL=noreply@thinker.cafe  # 正式環境（需驗證網域）

# Site URL（Email 連結用）
NEXT_PUBLIC_SITE_URL=https://thinker.cafe
```

### 4. 註冊 Resend（5 分鐘）

1. 前往 https://resend.com/signup
2. 使用 GitHub 快速註冊
3. 建立 API Key
4. 複製 `re_xxxxx` 格式的 Key
5. 貼到 `.env` 的 `RESEND_API_KEY`

---

## 🧪 測試計畫

### 測試案例 1: 轉帳頁面改善

1. 報名一個課程
2. 查看「步驟 3. 轉帳繳費」頁面
3. 測試「複製銀行代碼」按鈕
4. 測試「複製帳號」按鈕
5. 填寫「帳號後五碼」
6. 填寫「轉帳時間」
7. 點擊「已完成繳費」
8. 確認資料有儲存到資料庫

**預期結果**:
- 複製按鈕正常運作
- Toast 提示正常顯示
- 倒數計時正確顯示
- 資料儲存成功

### 測試案例 2: Email 發送

1. 報名一個課程
2. 確認建立訂單成功
3. 檢查信箱（包含垃圾郵件）
4. 確認收到繳費提醒信
5. 檢查 Email 內容是否正確

**預期結果**:
- Email 在 1 分鐘內收到
- 訂單資訊正確
- 連結可以點擊
- 視覺設計正常

### 測試案例 3: 資料庫欄位

```sql
-- 查詢測試訂單
SELECT
  order_id,
  state,
  transfer_account_last5,
  transfer_time,
  created_at
FROM orders
WHERE order_id = [測試訂單ID];
```

**預期結果**:
- 新欄位存在
- 資料正確儲存
- 舊訂單不受影響

---

## ⚠️ 注意事項

### 開發環境

1. **Email 測試**:
   - 使用 `onboarding@resend.dev` 作為寄件者
   - Email 會實際發送到填寫的信箱
   - 免費額度: 3,000 封/月

2. **資料庫**:
   - Migration 不會影響既有資料
   - 新欄位允許 NULL，向下相容

3. **Toast 通知**:
   - 需要確認 `useToast` hook 正常運作
   - 如果沒有 Toaster 元件，需要檢查 `layout.tsx`

### 正式環境

1. **Email**:
   - 必須驗證 `thinker.cafe` 網域
   - 修改 `RESEND_FROM_EMAIL=noreply@thinker.cafe`

2. **環境變數**:
   - 在 Vercel 設定 `RESEND_API_KEY`
   - 在 Vercel 設定 `NEXT_PUBLIC_SITE_URL`

---

## 🚀 部署檢查清單

### 本地測試完成後

- [ ] 所有測試案例通過
- [ ] Email 能正常接收
- [ ] 資料庫欄位正確
- [ ] Toast 通知正常

### 準備部署

- [ ] 替換檔案名稱（移除 `_NEW`）
- [ ] Commit 所有變更
- [ ] 在 Vercel 設定環境變數
- [ ] 執行資料庫 Migration（正式環境）
- [ ] Push to GitHub

### 部署後驗證

- [ ] 正式環境測試報名流程
- [ ] 確認 Email 正常發送
- [ ] 檢查 Resend 後台發送記錄
- [ ] 監控 Error Log

---

## 📊 預期效果

### 用戶體驗提升

- **降低輸入錯誤**: 複製按鈕避免手動輸入帳號
- **增加信任感**: Email 自動提醒，不怕遺失繳費資訊
- **加快驗證**: 後五碼+轉帳時間協助後台核對

### 後台管理改善

- **減少客服詢問**: -50%（Email 自動回答常見問題）
- **加快核對速度**: 有後五碼和時間資訊
- **降低人工成本**: 自動化 Email 通知

### 數據指標

- **轉換率**: 預期提升 20-30%
- **放棄率**: 預期降低 30-40%
- **Email 開信率**: 預期 40-60%（繳費提醒開信率通常較高）

---

## ❓ 常見問題

### Q1: Resend 免費嗎？

A: 免費額度 3,000 封/月，以目前規模完全足夠。

### Q2: Email 會被判定為垃圾郵件嗎？

A: 測試階段使用 `onboarding@resend.dev` 有可能。正式環境驗證自己的網域後，成功率 > 99%。

### Q3: 如果 Email 發送失敗，會影響訂單建立嗎？

A: 不會。Email 是非同步發送，即使失敗也不影響訂單。

### Q4: 舊訂單會受影響嗎？

A: 不會。新欄位允許 NULL，舊資料完全不受影響。

### Q5: 可以先不設定 Email 嗎？

A: 可以。轉帳頁面優化是獨立的，可以先上線這部分。

---

## 📞 如有問題

如果審核時發現任何問題：
1. 先查看 `EMAIL_SETUP_GUIDE.md`
2. 檢查環境變數是否設定
3. 確認套件是否安裝
4. 查看 Console Log

我會等你回來後一起處理！

---

**準備好審核了嗎？請告訴我你的想法！** 🚀
