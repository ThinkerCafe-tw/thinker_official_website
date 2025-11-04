import { readFileSync } from 'fs';

// 手動讀取 .env.local
const envFile = readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key) {
    // 移除值中的換行符號和引號
    env[key.trim()] = values.join('=').trim().replace(/\\n|"|'/g, '');
  }
});

const NOTION_API_KEY = env.NOTION_TOKEN;
const PRODUCTS_DATABASE_ID = env.NOTION_PRODUCTS_DATABASE_ID;
const NOTION_VERSION = '2022-06-28';

console.log('🔑 環境變數檢查:');
console.log('NOTION_TOKEN:', NOTION_API_KEY?.substring(0, 10) + '...');
console.log('PRODUCTS_DB_ID:', PRODUCTS_DATABASE_ID);

// 第六課的 page_id（需要先查詢）
const COURSE_6_PAGE_ID = await getCourse6PageId();

const YOU_WILL_LEARN = `✓ 第一天：AI 協作基礎與內容創作
- 建立 AI 協作思維，學會與 AI 當朋友
- 掌握 AI 文案寫作技巧，10 分鐘寫出吸引人的內容
- 發掘個人風格，在 AI 時代保持獨特價值
- 用 AI 做出專業美圖，不需設計背景

✓ 第二天：內容生產與決策思考
- 建立內容製造流水線，一次產出一個月素材
- 用 AI 批量生產爆紅內容
- 讓 AI 成為你的決策顧問與思考助手
- 建立專屬的 AI 智囊團系統

✓ 第三天：數據分析與專案實作
- 看懂社群數據，優化內容策略
- 用 AI 分析內容表現，做出更好決策
- 完成個人 AI 工作流專案
- 建立持續優化的 AI 協作系統`;

const SUMMERY = `這是一場全方位的 AI 協作訓練營。三天 18 小時的密集培訓，整合了 7 門 AI 全能技能課程精華，從 AI 基礎到實戰應用，從內容創作到數據分析，打造你的完整 AI 能力體系。

📅 第一天：AI 協作基礎與內容創作（6 小時）
09:30-11:00 | Course 05: AI 新手村
• 學會和 AI 溝通，建立正確的協作思維
• 掌握 ChatGPT、Claude 等主流工具
• 3 句話讓 AI 做出你要的東西

11:15-12:45 | Course 06: 寫作救星
• 用 AI 寫出吸引人的文案
• 掌握 5 種萬用文案公式（AIDA、故事、痛點解決）
• 10 分鐘產出以前要花 1 小時的內容

13:45-15:15 | Course 07: 找到你的風格
• 發掘你的隱藏特色與獨特價值
• 讓 AI 學會你的風格，但不失去個性
• 在 AI 時代保持不可替代性

15:30-16:30 | Course 08: 圖片魔法師
• 用 AI 做出專業等級美圖（Logo、社群圖、簡報封面）
• 掌握 5 個最實用的 AI 繪圖工具
• 建立專屬的視覺品牌風格

📅 第二天：內容生產與決策思考（6 小時）
09:30-11:30 | Course 09: 內容製造機
• 建立內容製造流水線
• 用一個點子變出 10 種不同內容
• 30 分鐘做出一週的社群發文
• 讓內容自動為你賺錢

11:45-13:45 | Course 10: 思考助手
• 用 AI 幫你分析問題，找出最佳解答
• 讓 AI 當你的決策顧問
• 建立多角色 AI 智囊團
• 面對難題不再焦慮，做出更明智決定

14:45-16:30 | Course 11: 看懂數字
• 看懂社群數據（IG/FB/YouTube）
• 用 AI 分析內容表現
• 學習競爭對手的成功策略
• 優化下一篇爆款內容

📅 第三天：整合實作與系統建立（6 小時）
09:30-12:30 | 個人專案實作
• 根據你的需求設計專屬 AI 工作流
• 講師一對一指導專案方向
• 整合前兩天所學技能
• 解決實作中遇到的問題

13:30-15:30 | 專案展示與優化
• 學員專案展示與互相學習
• 講師點評與優化建議
• 系統部署與持續改進策略

15:45-16:30 | 課程總結與未來規劃
• 7 門課核心回顧
• 建立你的 AI 學習路線圖
• 課後學習資源與社群支援`;

// 查詢第六課的 page_id
async function getCourse6PageId() {
  const response = await fetch(`https://api.notion.com/v1/databases/${PRODUCTS_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page_size: 100
    })
  });

  const data = await response.json();

  // Debug: 檢查 API 回應結構
  if (!response.ok) {
    console.error('❌ API 錯誤:', JSON.stringify(data, null, 2));
    throw new Error(`Notion API failed: ${data.message || 'Unknown error'}`);
  }

  console.log('\n📋 所有課程：');
  if (!data.results) {
    console.error('❌ 沒有 results 欄位:', JSON.stringify(data, null, 2));
    throw new Error('API 回應格式不正確');
  }

  data.results.forEach(page => {
    const courseId = page.properties.course_id?.number;
    const name = page.properties.zh_name?.rich_text?.[0]?.plain_text;
    console.log(`  - course_id: ${courseId}, name: ${name}`);
  });

  const course6 = data.results.find(page => page.properties.course_id?.number === 6);

  if (!course6) {
    throw new Error('找不到第六課 (course_id = 6)');
  }

  return course6.id;
}

// 更新 Notion 頁面
async function updateCourse6() {
  console.log('🔍 查詢第六課 page_id...');
  console.log('📄 Page ID:', COURSE_6_PAGE_ID);

  console.log('\n📝 更新課程內容...');

  const response = await fetch(`https://api.notion.com/v1/pages/${COURSE_6_PAGE_ID}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        you_will_learn: {
          rich_text: [{
            type: 'text',
            text: { content: YOU_WILL_LEARN }
          }]
        },
        summery: {
          rich_text: [{
            type: 'text',
            text: { content: SUMMERY }
          }]
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`更新失敗: ${error}`);
  }

  console.log('✅ 更新成功！');
  console.log('\n📊 更新內容：');
  console.log('- you_will_learn: 已更新（三天課程架構）');
  console.log('- summery: 已更新（詳細課表）');
}

// 執行
try {
  await updateCourse6();
} catch (error) {
  console.error('❌ 錯誤:', error.message);
  process.exit(1);
}
