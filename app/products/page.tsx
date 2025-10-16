import Page from '@/components/core/Page.js';
import Cover from '@/components/core/Cover.js';
import Title from '@/components/core/Title.js';
import Subtitle from '@/components/core/Subtitle.js';
import { ProductGrid } from './ProductGrid.tsx';

export default function ProductsPage() {
  return (
    <Page>
      <Cover>
        <Title>我們的課程</Title>
        <Subtitle>未來的創作者，都懂 AI。</Subtitle>
      </Cover>
      <ProductGrid />
    </Page>
  );
}
