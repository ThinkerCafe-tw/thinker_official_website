import { Navigation } from "@/components/navigation"
import { ProductGrid } from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold lg:text-5xl">Our Products</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From premium coffee beans to professional brewing equipment, discover everything you need for the perfect
              cup.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}
