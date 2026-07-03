import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SearchBar } from "@/components/site/SearchBar";
import { JobCard } from "@/components/site/JobCard";
import { jobs, categories } from "@/lib/jobs-data";
import {
  Sparkles, TrendingUp, Code2, Palette, Megaphone, Wallet,
  Settings2, Database, ArrowRight, Star, Building2, Globe2, GraduationCap,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verdant — Considered jobs at craft-driven teams" },
      { name: "description", content: "Discover roles at design-led startups and growing companies. Curated jobs, transparent salaries, and a quieter way to look." },
      { property: "og:title", content: "Verdant — Considered jobs at craft-driven teams" },
      { property: "og:description", content: "Discover roles at design-led startups and growing companies." },
    ],
  }),
  component: Home,
});

const iconMap = { Code2, Palette, Sparkles, Megaphone, TrendingUp, Wallet, Settings2, Database } as const;

function Home() {
  const featured = jobs.filter((j) => j.featured).slice(0, 3);
  const latest = jobs.slice(0, 6);
  const remote = jobs.filter((j) => j.remote).slice(0, 3);
  const internships = jobs.filter((j) => j.type === "Internship");

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.18), transparent 40%)" }} />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              Over 12,400 hand-picked roles
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Find the work that<br />
              <span className="text-[var(--gold)]">deserves you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Verdant is a quieter, more considered job board. Roles from design-led startups and growing companies — with transparent salaries and no recruiter noise.
            </p>

            <div className="mt-10">
              <SearchBar />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="font-medium text-white/80">Popular:</span>
              {["Product Designer", "Staff Engineer", "Growth", "Remote"].map((t) => (
                <Link
                  key={t}
                  to="/jobs"
                  search={{ q: t } as never}
                  className="rounded-full border border-white/15 px-3 py-1 transition-colors hover:bg-white/10"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[var(--gold)]/30 blur-3xl" />
            <div className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
              <img
                src={heroImg}
                alt="Professional at work"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                <Stat label="Open roles" value="12.4k" />
                <Stat label="Companies" value="1,820" />
                <Stat label="Hired this month" value="3,210" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured */}
        <Section
          eyebrow="Featured"
          title="Hand-picked this week"
          action={<SeeAll to="/jobs" label="See all featured" />}
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        </Section>

        {/* Categories */}
        <Section eyebrow="Categories" title="Browse by what you do">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => {
              const Icon = iconMap[c.icon as keyof typeof iconMap];
              return (
                <Link
                  key={c.name}
                  to="/jobs"
                  search={{ category: c.name } as never}
                  className="group flex items-center justify-between rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elegant"
                >
                  <div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-display text-base font-semibold">{c.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.count.toLocaleString()} roles</p>
                  </div>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Latest */}
        <Section
          eyebrow="Latest"
          title="Fresh listings"
          action={<SeeAll to="/jobs" label="Browse all jobs" />}
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        </Section>

        {/* Remote + Internships */}
        <Section eyebrow="Work your way" title="Remote & internships">
          <div className="grid gap-6 lg:grid-cols-2">
            <FeatureCard
              icon={<Globe2 className="h-5 w-5" />}
              tag="Remote"
              title={`${jobs.filter((j) => j.remote).length * 240}+ roles you can do from anywhere`}
              jobs={remote.slice(0, 2)}
              to="/jobs"
              search={{ remote: true } as never}
            />
            <FeatureCard
              icon={<GraduationCap className="h-5 w-5" />}
              tag="Internships"
              title="Start your career somewhere that pays for craft"
              jobs={internships.slice(0, 2)}
              to="/jobs"
              search={{ type: "Internship" } as never}
              gold
            />
          </div>
        </Section>

        {/* Top companies */}
        <Section eyebrow="Top companies" title="Teams hiring right now">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {["Lumen Labs", "Northwind", "Avoca", "Halcyon", "Verdant", "Mercato", "Orbital", "Kindred"].map((c) => (
              <div key={c} className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-3 py-6 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium">{c}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats band */}
        <section className="my-20 overflow-hidden rounded-[2rem] bg-emerald-gradient p-10 text-primary-foreground shadow-elegant sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                A job board that respects your time.
              </h2>
              <p className="mt-4 text-white/75">
                We read every listing. No ghost jobs, no recruiter spam, transparent salaries.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { v: "12.4k", l: "Open roles" },
                { v: "1,820", l: "Companies" },
                { v: "94%", l: "Salary visible" },
                { v: "4.8★", l: "Candidate rating" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-bold sm:text-4xl">{s.v}</p>
                  <p className="mt-1 text-sm text-white/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Section eyebrow="Stories" title="People who found something better">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { q: "Found my staff role at Northwind in three weeks. The salary was right there in the listing — no awkward back-and-forth.", n: "Maya Olsson", t: "Staff Engineer, Northwind" },
              { q: "Verdant is the only board I check now. Curation actually means something here.", n: "Jamal Reyes", t: "Product Designer, Lumen" },
              { q: "Hired four people for our growth team last quarter. Candidate quality is meaningfully different.", n: "Tomás Riviera", t: "Co-founder, Avoca" },
            ].map((s) => (
              <figure key={s.n} className="rounded-3xl border bg-card p-6 shadow-soft">
                <div className="flex gap-1 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                  "{s.q}"
                </blockquote>
                <figcaption className="mt-5 border-t pt-4">
                  <p className="font-display text-sm font-semibold">{s.n}</p>
                  <p className="text-xs text-muted-foreground">{s.t}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section eyebrow="FAQ" title="Frequently asked">
          <div className="mx-auto grid max-w-3xl gap-3">
            {[
              { q: "Is Verdant free for candidates?", a: "Yes — completely free. We're funded by employers who pay to list." },
              { q: "How are jobs curated?", a: "Every listing is read by a human. We reject ghost jobs, vague salary bands, and roles missing core information." },
              { q: "Do you support remote-only filtering?", a: "Yes. Filter by remote, by region, or by specific timezone overlap." },
              { q: "Can I get job alerts?", a: "Set up alerts based on title, skill, salary floor, or company. Delivered weekly." },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-card p-5 open:shadow-soft">
                <summary className="flex cursor-pointer items-center justify-between font-display font-semibold">
                  {f.q}
                  <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Newsletter */}
        <section className="my-20 rounded-[2rem] border bg-card p-10 text-center shadow-soft sm:p-14">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Get the curated digest.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            The 10 best new roles, every Tuesday. No spam, unsubscribe anytime.
          </p>
          <form className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-full border bg-background px-5 py-3 text-sm outline-none ring-ring/40 focus:ring-2"
            />
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-3 py-3 text-foreground">
      <p className="font-display text-lg font-bold leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({
  eyebrow, title, action, children,
}: { eyebrow: string; title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SeeAll({ to, label }: { to: "/jobs"; label: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function FeatureCard({
  icon, tag, title, jobs, to, search, gold,
}: {
  icon: React.ReactNode; tag: string; title: string; jobs: typeof import("@/lib/jobs-data").jobs;
  to: "/jobs"; search: never; gold?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-3xl border bg-card shadow-soft ${gold ? "bg-gold-gradient text-[var(--gold-foreground)]" : ""}`}>
      <div className="p-7">
        <div className="flex items-center gap-2">
          <div className={`grid h-9 w-9 place-items-center rounded-xl ${gold ? "bg-foreground/10" : "bg-primary/10 text-primary"}`}>
            {icon}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide">{tag}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold leading-tight">{title}</h3>
        <Link to={to} search={search} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
          Browse all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className={`grid gap-3 border-t p-5 ${gold ? "bg-background/95 text-foreground" : "bg-secondary/40"}`}>
        {jobs.map((j) => (
          <Link
            key={j.id}
            to="/jobs/$jobId"
            params={{ jobId: j.id }}
            className="flex items-center justify-between rounded-2xl bg-card p-4 transition-colors hover:bg-background"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: j.companyColor }}>
                {j.companyInitial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{j.title}</p>
                <p className="truncate text-xs text-muted-foreground">{j.company} · {j.location}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
