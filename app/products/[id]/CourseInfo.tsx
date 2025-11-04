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
