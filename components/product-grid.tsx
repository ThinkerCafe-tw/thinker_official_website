"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import type { NotionProduct } from "@/lib/notion"

export function ProductGrid() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [products, setProducts] = useState<NotionProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories from products
  const en_categories = ["all", ...Array.from(new Set(products.map((product) => product.en_category)))]
  const zh_categories = ["全部", ...Array.from(new Set(products.map((product) => product.zh_category)))]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.en_category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary animate-glow"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
        {en_categories.map((category, index) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`transition-all duration-200 hover-lift ${
              selectedCategory === category ? "bg-primary hover:bg-primary/90 animate-glow" : "hover:bg-muted"
            }`}
          >
            {language === "en" ? category : zh_categories[index]}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <Card
            key={product.id}
            className={`group overflow-hidden border-0 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={language === "en" ? product.en_name : product.zh_name}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground animate-glow">
                    {language === "en" ? "Featured" : "精選"}
                  </Badge>
                )}
                {/* <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-1 rounded-full transition-all duration-200 hover:bg-background/90">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div> */}
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs transition-colors duration-200 hover:bg-primary/20">
                    {language === "en" ? product.en_category : product.zh_category}
                  </Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 transition-colors duration-200 group-hover:text-primary">
                  {language === "en" ? product.en_name : product.zh_name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === "en" ? product.en_description : product.zh_description}
                </p>
                {/* <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 hover-lift hover-glow">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {language === "en" ? "Add" : "加入"}
                  </Button>
                </div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
