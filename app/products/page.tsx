import { ProductGrid } from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold lg:text-5xl">我們的課程</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              未來的創作者，都懂 AI。
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <ProductGrid />
        </div>
      </section>
    </>
  )
}
