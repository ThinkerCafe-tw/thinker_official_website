import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('[Debug] Starting to fetch products...')
    const startTime = Date.now()

    const products = await getProducts()
    const elapsed = Date.now() - startTime

    console.log(`[Debug] Fetched ${products.length} products in ${elapsed}ms`)

    const publishedProducts = products.filter((p: any) => p.published)

    return NextResponse.json({
      success: true,
      totalProducts: products.length,
      publishedProducts: publishedProducts.length,
      elapsed: `${elapsed}ms`,
      courseIds: publishedProducts.map((p: any) => p.course_id),
      sampleProduct: publishedProducts[0] ? {
        course_id: publishedProducts[0].course_id,
        zh_name: publishedProducts[0].zh_name,
        published: publishedProducts[0].published
      } : null
    })
  } catch (error) {
    console.error('[Debug] Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
