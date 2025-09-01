import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />

      {/* Header Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Contact Us</Badge>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
              Whether you have questions about our products, want to explore partnership opportunities, or simply want
              to share your thoughts, we're here to listen.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[400px] sm:h-[600px] w-[400px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">
              Quick answers to common questions about Thinker Cafe.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
            <div className="rounded-lg bg-card/50 backdrop-blur p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">
                What makes Thinker Cafe different?
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                We combine cutting-edge technology with traditional coffee craftsmanship to create unique experiences.
                Our tech-enabled ordering system, precision brewing methods, and innovation-focused environment set us
                apart.
              </p>
            </div>

            <div className="rounded-lg bg-card/50 backdrop-blur p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">
                Do you offer wholesale or bulk orders?
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Yes! We offer wholesale pricing for businesses and bulk orders for events. Contact us with your
                requirements and we'll provide a custom quote.
              </p>
            </div>

            <div className="rounded-lg bg-card/50 backdrop-blur p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">
                Can I host events at Thinker Cafe?
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Our space is perfect for tech meetups, workshops, and networking events. We offer flexible packages to
                accommodate different event types and sizes.
              </p>
            </div>

            <div className="rounded-lg bg-card/50 backdrop-blur p-4 sm:p-6">
              <h3 className="font-heading text-base sm:text-lg font-semibold mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Currently, we ship within the continental US. We're working on expanding our shipping options to serve
                international customers. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
