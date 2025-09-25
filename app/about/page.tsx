export const runtime = "nodejs";
export const revalidate = 0; 

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const titleRow = storyList.find(s => (s.en_title || "").trim().length > 0) || null;
const storyTitle = titleRow?.en_title || null;
const storyImage = titleRow?.image || null;

const paragraphs = Array.from(
  new Set( 
    storyList
      .map(s => (s.en_description || "").trim())
      .filter(Boolean)
      .filter(p => p !== (storyTitle || "").trim())
  )
);

  return (
    <>
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
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-accent/5 to-primary/5 blur-3xl" />
        </div>
      </section>
    {paragraphs.length > 0 && (
      <section className="py-20">
        <div className="container mx-auto px-4">
         <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            {storyTitle && (
              <h2 className="font-heading text-3xl font-bold lg:text-4xl mb-6">
                {storyTitle}
              </h2>
            )}
            <div className="space-y-4 text-muted-foreground max-w-[720px]">
              {paragraphs.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
          </div>
            {storyImage && (
              <div className="lg:col-span-5">
                <img
                src={storyImage}
                alt="Thinker Cafe Interior"
                className="w-full max-w-[520px] mx-auto rounded-xl shadow-2xl h-auto object-cover"
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
    </>
  );
} 
