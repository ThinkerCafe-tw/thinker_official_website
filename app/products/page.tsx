import { Navigation } from "@/components/navigation"
import { ProductGrid } from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
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

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}
