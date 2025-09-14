// import { Navigation } from "@/components/navigation"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Coffee, Users, Award, Target, Heart, Zap } from "lucide-react"
// import { CountUp } from "@/components/count-number";

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
//       <Navigation />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden py-20 lg:py-32">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-4xl text-center">
//             <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">About Thinker Cafe</Badge>
//             <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-6xl">
//               Where <span className="text-primary">Innovation</span> Meets Tradition
//             </h1>
//             <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
//               Founded on the belief that great coffee and great ideas go hand in hand, Thinker Cafe is more than just a
//               coffee shop—it's a hub for creativity, innovation, and community.
//             </p>
//           </div>
//         </div>

//         {/* Background decoration */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
//           <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-accent/5 to-primary/5 blur-3xl" />
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
//             <div>
//               <h2 className="font-heading text-3xl font-bold lg:text-4xl mb-6">Our Story</h2>
//               <div className="space-y-4 text-muted-foreground">
//                 <p>
//                   Thinker Cafe was born from a simple observation: the best ideas often emerge over a great cup of
//                   coffee. Our founders, passionate about both technology and coffee culture, envisioned a space where
//                   these two worlds could seamlessly blend.
//                 </p>
//                 <p>
//                   Since our inception, we've been committed to pushing the boundaries of what a coffee experience can
//                   be. From our precision brewing techniques to our tech-enabled ordering system, every aspect of Thinker
//                   Cafe is designed to enhance your coffee journey.
//                 </p>
//                 <p>
//                   Today, we continue to serve not just exceptional coffee, but also as a catalyst for innovation,
//                   creativity, and meaningful connections in our community.
//                 </p>
//               </div>
//             </div>
//             <div>
//               <img src="/modern-tech-coffee-shop.png" alt="Thinker Cafe Interior" className="rounded-lg shadow-2xl" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-2xl text-center mb-16">
//             <h2 className="font-heading text-3xl font-bold lg:text-4xl">Our Values</h2>
//             <p className="mt-4 text-muted-foreground">The principles that guide everything we do at Thinker Cafe.</p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                   <Zap className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Innovation</h3>
//                 <p className="text-sm text-muted-foreground">
//                   We constantly explore new technologies and methods to enhance the coffee experience, from bean to cup.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
//                   <Award className="h-6 w-6 text-accent" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Quality</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Every bean is carefully selected, every brew meticulously crafted to deliver exceptional quality in
//                   every cup.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                   <Users className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Community</h3>
//                 <p className="text-sm text-muted-foreground">
//                   We foster connections between thinkers, creators, and coffee lovers, building a vibrant community.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
//                   <Heart className="h-6 w-6 text-accent" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Sustainability</h3>
//                 <p className="text-sm text-muted-foreground">
//                   We're committed to ethical sourcing and sustainable practices that benefit both people and planet.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                   <Target className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Excellence</h3>
//                 <p className="text-sm text-muted-foreground">
//                   We strive for excellence in every aspect of our business, from customer service to product quality.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur">
//               <CardContent className="p-6 text-center">
//                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
//                   <Coffee className="h-6 w-6 text-accent" />
//                 </div>
//                 <h3 className="font-heading text-xl font-semibold mb-3">Passion</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Our love for coffee drives everything we do, inspiring us to create memorable experiences for our
//                   customers.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
//             <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
//               <CardContent className="p-0">
//                 <div className="mb-6">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 mb-4">
//                     <Target className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="font-heading text-2xl font-bold">Our Mission</h3>
//                 </div>
//                 <p className="text-muted-foreground">
//                   To create exceptional coffee experiences that inspire creativity, foster innovation, and build
//                   meaningful connections within our community. We believe that great coffee has the power to fuel great
//                   ideas and bring people together.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-gradient-to-br from-accent/5 to-accent/10 p-8">
//               <CardContent className="p-0">
//                 <div className="mb-6">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 mb-4">
//                     <Zap className="h-6 w-6 text-accent" />
//                   </div>
//                   <h3 className="font-heading text-2xl font-bold">Our Vision</h3>
//                 </div>
//                 <p className="text-muted-foreground">
//                   To be the leading destination where technology and coffee culture converge, setting new standards for
//                   innovation in the coffee industry while maintaining the warmth and authenticity that makes every visit
//                   special.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

      
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-2xl text-center mb-16">
//             <h2 className="font-heading text-3xl font-bold lg:text-4xl">By the Numbers</h2>
//             <p className="mt-4 text-muted-foreground">Our journey in numbers since we opened our doors.</p>
//           </div>

//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             <div className="text-center">
//               <div className="font-heading text-4xl font-bold text-primary mb-2">
//                  <CountUp end={50} suffix="K+" />
//               </div>
//               <div className="text-sm text-muted-foreground">Cups Served</div>
//             </div>
//             <div className="text-center">
//               <div className="font-heading text-4xl font-bold text-accent mb-2">
//                 <CountUp end={1200} suffix="+" />
//               </div>
//               <div className="text-sm text-muted-foreground">Happy Customers</div>
//             </div>
//             <div className="text-center">
//               <div className="font-heading text-4xl font-bold text-primary mb-2">
//                 <CountUp end={25} suffix="+" />
//               </div>
//               <div className="text-sm text-muted-foreground">Coffee Origins</div>
//             </div>
//             <div className="text-center">
//               <div className="font-heading text-4xl font-bold text-accent mb-2">
//                 <CountUp end={99} suffix="%" />
//               </div>
//               <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-2xl text-center mb-16">
//             <h2 className="font-heading text-3xl font-bold lg:text-4xl">Meet Our Team</h2>
//             <p className="mt-4 text-muted-foreground">The passionate individuals behind Thinker Cafe's success.</p>
//           </div>

//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             <Card className="border-0 bg-card/50 backdrop-blur text-center">
//               <CardContent className="p-6">
//                 <div className="mb-4">
//                   <img
//                     src="/coffee-shop-founder-headshot.png"
//                     alt="Alex Chen"
//                     className="mx-auto h-20 w-20 rounded-full object-cover"
//                   />
//                 </div>
//                 <h3 className="font-heading text-lg font-semibold">Alex Chen</h3>
//                 <p className="text-sm text-primary mb-2">Founder & CEO</p>
//                 <p className="text-xs text-muted-foreground">
//                   Former tech executive turned coffee enthusiast, Alex brings innovation to every cup.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur text-center">
//               <CardContent className="p-6">
//                 <div className="mb-4">
//                   <img
//                     src="/head-barista-headshot.png"
//                     alt="Maria Rodriguez"
//                     className="mx-auto h-20 w-20 rounded-full object-cover"
//                   />
//                 </div>
//                 <h3 className="font-heading text-lg font-semibold">Maria Rodriguez</h3>
//                 <p className="text-sm text-accent mb-2">Head Barista</p>
//                 <p className="text-xs text-muted-foreground">
//                   Award-winning barista with 10+ years of experience in specialty coffee.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 bg-card/50 backdrop-blur text-center">
//               <CardContent className="p-6">
//                 <div className="mb-4">
//                   <img
//                     src="/operations-manager-headshot.png"
//                     alt="David Kim"
//                     className="mx-auto h-20 w-20 rounded-full object-cover"
//                   />
//                 </div>
//                 <h3 className="font-heading text-lg font-semibold">David Kim</h3>
//                 <p className="text-sm text-primary mb-2">Operations Manager</p>
//                 <p className="text-xs text-muted-foreground">
//                   Ensures every aspect of our operations runs smoothly and efficiently.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



// app/about/page.tsx
export const runtime = "nodejs";
export const revalidate = 0; // 每次請求都取最新（可改成秒數以快取）

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Users, Award, Target, Heart, Zap } from "lucide-react";
import { CountUp } from "@/components/count-number";

import {
  getOurStoryContent,
  getOurValueContent,
  getOurTeamContent,
  getOurMissionVisionContent,
  type NotionOurStory,
  type NotionOurValue,
  type NotionOurTeam,
  type NotionOurMissionVision,
} from "@/lib/notion";


function first<T>(arr: T[] | undefined | null): T | null {
  return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
}



export default async function AboutPage() {
  const [values, team, storyList, missionVision] = await Promise.all([
    getOurValueContent(),
    getOurTeamContent(),
    getOurStoryContent(),
    getOurMissionVisionContent(),
  ]);

 

  const heroBadge = "About Thinker Cafe";
  const heroTitle =
    'Where <span class="text-primary">Innovation</span> Meets Tradition';
  const heroSubtitle =
    "Founded on the belief that great coffee and great ideas go hand in hand, Thinker Cafe is more than just a coffee shop—it's a hub for creativity, innovation, and community"




// 假設你已經有 storyList: NotionOurStory[]
const titleRow = storyList.find(s => (s.en_title || "").trim().length > 0) || null;
const storyTitle = titleRow?.en_title || null;
const storyImage = titleRow?.image || null;

// 收集所有 en_description 作為段落
const paragraphs = Array.from(
  new Set( // 去重
    storyList
      .map(s => (s.en_description || "").trim())
      .filter(Boolean)
      // 避免把和標題相同的句子再渲染成段落
      .filter(p => p !== (storyTitle || "").trim())
  )
);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.3),transparent_50%),linear-gradient(to_top_right,rgba(249,115,22,0.2),transparent,rgba(34,197,94,0.2)),linear-gradient(to_bottom_right,#581c87,#1e3a8a,#0f766e)]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              {heroBadge}
            </Badge>
            <h1
              className="font-heading text-4xl font-bold tracking-tight lg:text-6xl"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-accent/5 to-primary/5 blur-3xl" />
        </div>
      </section>


{paragraphs.length > 0 && (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <div>
          {storyTitle && (
            <h2 className="font-heading text-3xl font-bold lg:text-4xl mb-6">
              {storyTitle}
            </h2>
          )}
          <div className="space-y-4 text-muted-foreground">
            {paragraphs.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>

        {storyImage && (
          <div>
            <img
              src={storyImage}
              alt="Thinker Cafe Interior"
              className="rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </div>
  </section>
)}

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-3xl font-bold lg:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do at Thinker Cafe.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(values?.length ? values : []).map(
              (v: NotionOurValue ) => {
                return (
                  <Card
                    key={v.id}
                    className="border-0 bg-card/50 backdrop-blur"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 hover:bg-primary/10"
                      >
                        <img
                          src={v.image}
                          alt={v.en_title || v.zh_title }
                          className="h-10 w-10 text-accent hover:text-primary"
                        />
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-3">
                        {v.en_title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{v.en_description}</p>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
             {(missionVision?.length ? missionVision : []).map(
              (mv: NotionOurMissionVision ) => {
                return (
                  <Card
                    key={mv.id}
                    className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 p-8"
                  >
                    <CardContent className="p-0">
                      <div
                        className="mb-6"
                      >
                         <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 mb-4">
                           <img
                             src={mv.image}
                             alt={mv.en_title || mv.zh_title}
                             className="h-12 w-12 text-accent hover:text-primary"
                           />
                         </div>
                      </div>
                      <h3 className="font-heading text-2xl font-bold">
                        {mv.en_title}
                      </h3>
                      <p className="text-muted-foreground">{mv.en_description}</p>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-3xl font-bold lg:text-4xl">
              By the Numbers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our journey in numbers since we opened our doors.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-primary mb-2">
                <CountUp end={50} suffix="K+" />
              </div>
              <div className="text-sm text-muted-foreground">Cups Served</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-accent mb-2">
                <CountUp end={1200} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-primary mb-2">
                <CountUp end={25} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Coffee Origins</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-4xl font-bold text-accent mb-2">
                <CountUp end={99} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-3xl font-bold lg:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-muted-foreground">
              The passionate individuals behind Thinker Cafe&apos;s success.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(team?.length ? team : []).map((m: NotionOurTeam) => (
              <Card
                key={m.id}
                className="border-0 bg-card/50 backdrop-blur text-center"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={m.image || "/coffee-shop-founder-headshot.png"}
                      alt={m.en_name || m.zh_name || "Team member"}
                      className="mx-auto h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {m.en_name || m.zh_name}
                  </h3>
                  <p className="text-sm text-primary mb-2">
                    {m.en_role || m.zh_role}
                  </p>
                  {(m.en_role_description || m.zh_role_description) && (
                    <p className="text-xs text-muted-foreground">
                      {m.en_role_description || m.zh_role_description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 