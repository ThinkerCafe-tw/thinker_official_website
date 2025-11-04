import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/notion'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 靜態頁面（總是返回）
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://thinkcafe.tw',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://thinkcafe.tw/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://thinkcafe.tw/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://thinkcafe.tw/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    const products = await getProducts()
    console.log(`[Sitemap] Fetched ${products.length} products from Notion`)

    // 動態課程頁面
    const publishedProducts = products.filter((p: any) => p.is_published)
    console.log(`[Sitemap] Found ${publishedProducts.length} published products`)

    const productPages: MetadataRoute.Sitemap = publishedProducts.map((product: any) => ({
      url: `https://thinkcafe.tw/products/${product.course_id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    console.log(`[Sitemap] Generated sitemap with ${staticPages.length} static + ${productPages.length} product pages`)
    return [...staticPages, ...productPages]
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error)

    // 如果 Notion API 失敗，至少返回靜態頁面
    return [
      {
        url: 'https://thinkcafe.tw',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://thinkcafe.tw/products',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]
  }
}
