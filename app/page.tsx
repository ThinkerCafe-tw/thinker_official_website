import { Navigation } from "@/components/navigation"
import { ProductCarousel } from "@/components/product-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Users, Award } from "lucide-react"
import { ScrollRevealSection } from "@/components/scroll-reveal-section"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <div className="min-h-screen   bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />
      <section className="relative overflow-hidden h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight animate-fade-in text-white">
              The Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 animate-glow">
                Product
              </span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              Built to make you extraordinarily productive, Thinker Cafe is the best way to experience coffee with
              AI-powered brewing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 hover-lift hover-glow bg-gradient-animate"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Try Our Products
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover-lift bg-transparent"
              >
                All Products
              </Button> */}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section with Box Opening Animation */}
      <ScrollRevealSection className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float-particles"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-float-particles"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float-particles"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-float-particles"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">Featured Products</h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">
              Discover our carefully curated selection of premium coffee products and brewing equipment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-2xl blur-2xl transform scale-110" />
            <ProductCarousel />
          </div>
        </div>
      </ScrollRevealSection>

      {/* Features Section */}
      <ScrollReveal direction="up" delay={100}>
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="fade" delay={200}>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">Why Choose Thinker Cafe?</h2>
                <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">
                  We combine traditional coffee craftsmanship with modern technology to deliver an unparalleled
                  experience.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ScrollReveal direction="up" delay={300}>
                <Card className="border-0 bg-card/50 backdrop-blur hover-lift">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 hover-glow">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold">Innovation</h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      Cutting-edge brewing technology meets artisanal coffee craftsmanship.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <Card className="border-0 bg-card/50 backdrop-blur hover-lift">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-accent/10 hover-glow">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold">Community</h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      A space for thinkers, creators, and coffee enthusiasts to connect.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <Card className="border-0 bg-card/50 backdrop-blur sm:col-span-2 lg:col-span-1 hover-lift">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 hover-glow">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold">Quality</h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      Premium beans sourced globally, roasted to perfection locally.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">Ready to Experience the Future?</h2>
              <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">
                Join us at Thinker Cafe and discover what happens when innovation meets tradition.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 hover-lift hover-glow bg-gradient-animate mt-6"
              >
                Visit Us Today
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
