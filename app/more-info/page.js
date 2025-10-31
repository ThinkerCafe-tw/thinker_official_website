import Page from '@/components/core/Page.js';
import Cover from '@/components/core/Cover.js';
import Title from '@/components/core/Title.js';
import FormCard from '@/components/core/FormCard.js';

export default function MoreInfoPage() {
  return (
    <Page>
      <Cover>
        <Title>更多資訊</Title>
      </Cover>
      <div className="max-w-3xl mx-auto space-y-5">
        <FormCard
          id="company"
          title="公司資訊"
          compact
          singleColumn
          className="scroll-mt-24"
        >
          <p>
            登記名稱：思考者咖啡有限公司<br />
            統一編號：00207322<br />
          </p>
        </FormCard>
        <FormCard
          id="copyright"
          title="版權聲明"
          compact
          singleColumn
          className="scroll-mt-24"
        >
          <p>
            本網站所有課程內容、影片、講義及素材均受著作權法保護。未經授權，嚴禁下載、錄製、轉發或公開傳播。違反者將依法追究責任。
          </p>
        </FormCard>
        <FormCard
          id="tos"
          title="學生權益"
          compact
          singleColumn
          className="scroll-mt-24"
        >
          <p>
            報名前請詳閱 <a href="/files/terms-of-service.pdf" target="_blank" rel="noopener noreferrer" className="text-orange-400">學生權益書</a>，以了解您的權利與義務。
          </p>
        </FormCard>
        <FormCard
          id="refund"
          title="退費政策"
          compact
          singleColumn
          className="scroll-mt-24"
        >
          <p>
            課程一經開始，恕不接受退費。若因不可抗力因素（如授課老師臨時狀況、系統故障等）導致課程取消，我們將另行安排補課或退還相應課程費用。
          </p>
        </FormCard>
        <FormCard
          id="contact"
          title="聯絡客服"
          compact
          singleColumn
          className="scroll-mt-24"
        >
          <p>
            E-mail：<a href="mailto:hello@thinker.cafe">hello@thinker.cafe</a><br />
            手機：0937-431-998<br />
          </p>
        </FormCard>
      </div>
    </Page>
  );
}
