import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { jobs, formatSalary, timeAgo, type Job } from "@/lib/jobs-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JobCard } from "@/components/site/JobCard";
import { ArrowLeft, MapPin, Briefcase, Clock, Users, Calendar, Bookmark, Share2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.job.title} — ${loaderData.job.company} | Verdant` },
          { name: "description", content: loaderData.job.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.job.title} at ${loaderData.job.company}` },
          { property: "og:description", content: loaderData.job.description.slice(0, 160) },
        ]
      : [{ title: "Job — Verdant" }],
  }),
  notFoundComponent: () => (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Role not found</h1>
        <p className="mt-3 text-muted-foreground">This listing may have closed.</p>
        <Link to="/jobs" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Back to jobs</Link>
      </div>
      <Footer />
    </>
  ),
  errorComponent: ({ reset }) => (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <button onClick={reset} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Try again</button>
      </div>
    </>
  ),
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData() as { job: Job };
  const similar = jobs.filter((j) => j.id !== job.id && (j.category === job.category || j.company === job.company)).slice(0, 3);

  return (
    <>
      <Navbar />

      <section className="bg-emerald-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to jobs
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl text-2xl font-display font-bold text-white shadow-elegant"
                style={{ backgroundColor: job.companyColor }}
              >
                {job.companyInitial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white/70">{job.company} · <span className="text-[var(--gold)]">{job.category}</span></p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {job.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {timeAgo(job.postedDays)}</span>
                  {job.remote && <span className="rounded-full bg-[var(--gold)]/20 px-2.5 py-0.5 text-xs font-semibold text-[var(--gold)]">Remote</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10" aria-label="Save"><Bookmark className="h-4 w-4" /></button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10" aria-label="Share"><Share2 className="h-4 w-4" /></button>
              <a href="#apply" className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--gold-foreground)] shadow-gold transition-transform hover:scale-[1.02]">
                Apply now
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="min-w-0 space-y-10">
            <Block title="About the role">
              <p className="text-base leading-relaxed text-foreground/80">{job.description}</p>
            </Block>

            <Block title="What you'll do">
              <ul className="space-y-3">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="You'll likely have">
              <ul className="space-y-3">
                {job.qualifications.map((r) => (
                  <li key={r} className="flex gap-3 text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Required skills">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span key={s} className="rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">{s}</span>
                ))}
              </div>
            </Block>

            <Block title="Benefits">
              <div className="grid gap-2 sm:grid-cols-2">
                {job.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 rounded-xl bg-secondary px-4 py-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                  </div>
                ))}
              </div>
            </Block>

            <div id="apply" className="rounded-3xl bg-emerald-gradient p-8 text-primary-foreground shadow-elegant sm:p-10">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to apply?</h2>
              <p className="mt-2 text-white/75">Send your application directly to {job.recruiter.name}.</p>
              <a href="#" className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-[var(--gold-foreground)] shadow-gold transition-transform hover:scale-[1.02]">
                Apply for this role
              </a>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-3xl border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Salary range</p>
              <p className="mt-1 font-display text-2xl font-bold text-primary">{formatSalary(job.salaryMin, job.salaryMax)}</p>
              <div className="mt-5 space-y-3 border-t pt-5 text-sm">
                <Row icon={<Briefcase className="h-4 w-4" />} label="Experience" value={job.experience} />
                <Row icon={<Users className="h-4 w-4" />} label="Vacancies" value={String(job.vacancies)} />
                <Row icon={<Calendar className="h-4 w-4" />} label="Apply by" value={`${job.deadlineDays} days left`} />
                <Row icon={<MapPin className="h-4 w-4" />} label="Work mode" value={job.remote ? "Remote-friendly" : "On-site"} />
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recruiter</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-display font-bold text-primary">
                  {job.recruiter.name.split(" ").map((p) => p[0]).join("")}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{job.recruiter.name}</p>
                  <p className="text-xs text-muted-foreground">{job.recruiter.title}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Similar roles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">{icon}{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
