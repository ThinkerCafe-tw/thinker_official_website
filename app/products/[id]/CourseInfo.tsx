/**
 * CourseInfo - 實體課程詳細資訊組件
 *
 * 顯示實體課程的完整資訊，包括：
 * - 📅 課程日期與時間
 * - 📍 上課地點
 * - 🚇 交通資訊
 * - ⏰ 報名截止
 * - 👥 人數限制
 *
 * 目前僅針對課程 ID = 6（AI 全能實戰營）顯示
 */

export default function CourseInfo({ courseId }: { courseId: number }) {
  // 目前僅針對第六課顯示實體課程資訊
  if (courseId !== 6) return null;

  const courseDetails = {
    dates: [
      { date: '2024/11/29', day: '(六)', time: '09:30-15:30' },
      { date: '2024/12/06', day: '(六)', time: '09:30-15:30' },
      { date: '2024/12/13', day: '(六)', time: '09:30-15:30' },
    ],
    location: {
      name: 'ThinkerCafe 板橋教室',
      address: '新北市板橋區民權路 83 號 1F',
    },
    transportation: [
      { icon: '🚇', text: '捷運板南線「府中站」1 號出口，步行 5 分鐘' },
      { icon: '🚌', text: '公車站牌「板橋區公所」，步行 1 分鐘' },
      { icon: '🚗', text: '鄰近有多個收費停車場' },
    ],
    capacity: 12,
    deadline: '2024/11/24 (一) 23:59',
  };

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-xl border border-white/20">
      {/* 價格卡片 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-2 border-orange-400/40">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl">💰</span>
            <h3 className="text-xl font-bold text-orange-300">限時特價</h3>
          </div>
          <div className="text-5xl font-black text-white">
            NT$ 10,000
          </div>
          <div className="text-sm text-white/80 space-y-1">
            <p>✨ 搭配政府普發現金，剛好可以全額支付</p>
            <p className="text-orange-300 font-semibold">⏰ 報名截止：11/24 (一) 23:59</p>
          </div>
        </div>
      </div>

      {/* 標題 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500">
          <span className="text-2xl">📍</span>
        </div>
        <h2 className="text-2xl font-bold">實體課程資訊</h2>
      </div>

      {/* 課程日期 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📅</span>
          <h3 className="text-lg font-semibold">課程日期</h3>
        </div>
        <div className="grid gap-2 pl-8">
          {courseDetails.dates.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/10"
            >
              <span className="text-base font-medium min-w-[120px]">
                {item.date} {item.day}
              </span>
              <span className="text-sm text-white/70">{item.time}</span>
              <span className="ml-auto px-3 py-1 rounded-full bg-orange-500/20 text-xs font-medium">
                第 {index + 1} 天
              </span>
            </div>
          ))}
          <div className="mt-2 text-sm text-white/60 italic">
            共 3 天，每天 6 小時，總計 18 小時密集培訓
          </div>
        </div>
      </div>

      {/* 上課地點 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏢</span>
          <h3 className="text-lg font-semibold">上課地點</h3>
        </div>
        <div className="pl-8 space-y-2">
          <div className="text-base font-medium">{courseDetails.location.name}</div>
          <div className="text-sm text-white/70">{courseDetails.location.address}</div>
          <a
            href="https://maps.app.goo.gl/mtD5mkZfEFLRD41Y6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>在 Google 地圖中查看</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* 交通資訊 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚇</span>
          <h3 className="text-lg font-semibold">交通方式</h3>
        </div>
        <div className="grid gap-2 pl-8">
          {courseDetails.transportation.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
            >
              <span className="text-lg mt-0.5">{item.icon}</span>
              <span className="text-sm text-white/80">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 課程講師 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👨‍🏫</span>
          <h3 className="text-lg font-semibold">課程講師</h3>
        </div>
        <div className="pl-8">
          <a
            href="https://resume.thinker.cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-orange-400/30"
          >
            <div className="flex items-start gap-4">
              {/* 講師頭像 */}
              <div className="flex-shrink-0">
                <img
                  src="https://www.thinker.cafe/_next/image?url=https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F156606c6-168c-41e7-acfb-f5c1582e10b9%2Fdfbe2bb4-47ec-404d-af41-09f979415582%2FT071M7HENR0-U071M41HNPM-fcb5841616c5-512.jpeg%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Credential%3DASIAZI2LB4663WG6KV5Q%252F20251107%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20251107T232427Z%26X-Amz-Expires%3D3600%26X-Amz-Security-Token%3DIQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIQDbymV2GHh9kB2u5iVw%252Bhd52LU2hYZMnq2Vm0z3CO050gIgRMgu8kvwNIl95%252FIzv78s5dNbAuQHyHTllTMPeQOSSEUqiAQIyP%252F%252F%252F%252F%252F%252F%252F%252F%252F%252FARAAGgw2Mzc0MjMxODM4MDUiDDyOdXBe7EeJSev3FSrcA9EhAisLVotZWuD0sSDGfWH5j6SwuevPz6mJ6JI9P5hBbDASkt7Jg5IXZilkDkNSlYRQAbhxXr9qVlx7OUHJGUKoAGU0DDUq57jBF6oxSnvPdPdd%252B4HdW%252BCh7T8XQhAVtE%252BSuaRisWVY8CJ5LGEjZmI0tQKnTkA%252FAb0fGrfgPST6KH3xvb0gDrTtUtL8lv1k4PZpPll8sDfxVsh80Yt14fx5eQv23xrX8QVwBckBngW5kMLyqkxoivZWKUCRYTrOdGPyCktueme84E7rzjCA5KXCEATQs%252FkAvmJgDZgktUCtfer1PFz4Tn%252BdLXlaym%252FE%252FOjvz8D%252Bjcxlaa%252FLCwIhAuGPbHrs3S36X4gHbQHuCrTcwczb7jKqgnuD%252B9X%252BFISfpgbQ2HFAFxrr8Ivn4FWgK6gXA7%252B%252BzAj2uWRN1Ypn7GNjddcxjcfxwTYxQ8t8RWtJXW9RjzjDRmIEKIIBrdWNCSYhMyx86DMLQJSc8xBTiVeZxBGNiyjBo3CWYr4YW%252FtMk%252BODW1KzNEZW4SZOTE%252FYLVPhRZX8ASrEC4hAXZE0kS5gpHaU8rKej6z6O4uUq%252FkwMff9AyT8izsxaUEYSYT0yMhKaviYJIIXfN1%252BS7kh4jQ0Bt5EToLG7VIpdvtSMKD9ucgGOqUB57Bxmks43eQzwRQG2JepZVxDDBMgfbNTdke0jAcAWJu4p2XYPJ6cwOJS%252BsZX0%252FDK8QKZd2j15dmbz4ViUKy4IkKSkjMRE1CbEVViP7vPOlr1PU2A8JkoosuTWQP1kOD0v%252Bj%252BtnP1v85nq7q3UULWyimXUZKG2NTo05F3qFX5hPnuWgoXsdShlImVi34f9AQhLHXShwvEFLdwZfunbP39ABLvVZRr%26X-Amz-Signature%3D4f3b8e8ef819694830ec6c6db86552a4e3439dab335db2e6030bf0dec7defac2%26X-Amz-SignedHeaders%3Dhost%26x-amz-checksum-mode%3DENABLED%26x-id%3DGetObject&w=256&q=75"
                  alt="Cruz Tang"
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-400/50"
                />
              </div>

              {/* 講師資訊 */}
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-lg font-bold">湯明軒 Cruz Tang</h4>
                  <span className="text-xs text-orange-400">查看完整履歷 →</span>
                </div>
                <p className="text-sm text-white/70">
                  AI 原生領導者與系統架構師 · ThinkerCafe 執行長暨創辦人
                </p>

                {/* 專業背景亮點 */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-orange-400">📚</span>
                    <span className="text-white/80">11+ 年教學經驗</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-orange-400">👥</span>
                    <span className="text-white/80">500+ 位學生</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-orange-400">⏰</span>
                    <span className="text-white/80">1,000+ 小時授課</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-orange-400">🏢</span>
                    <span className="text-white/80">14+ 合作機構</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* 報名資訊 */}
      <div className="grid md:grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <span className="text-sm font-medium text-white/70">報名截止</span>
          </div>
          <div className="text-base font-semibold pl-7">{courseDetails.deadline}</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">👥</span>
            <span className="text-sm font-medium text-white/70">名額限制</span>
          </div>
          <div className="text-base font-semibold pl-7">
            限額 {courseDetails.capacity} 人
            <span className="ml-2 text-xs text-orange-400">（小班制教學）</span>
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-start gap-2">
          <span className="text-lg mt-0.5">💡</span>
          <div className="text-sm text-white/70 space-y-1">
            <p className="font-medium text-white/90">課程包含：</p>
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              <li>📱 100% 手機友善教學（不需要筆電）</li>
              <li>實體教材與講義</li>
              <li>課後錄影回放（30 天觀看期限）</li>
              <li>專屬 LINE 社群支援</li>
              <li>課程研習證書</li>
              <li>個人 AI 工具包網頁</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
