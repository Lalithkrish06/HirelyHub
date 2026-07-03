import { createFileRoute, Link } from "@tanstack/react-router";
import { jobs, categories, formatSalary } from "@/lib/jobs-data";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SearchBar } from "@/components/site/SearchBar";
import { JobCard } from "@/components/site/JobCard";
import { LayoutGrid, List as ListIcon, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  location: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  experience: fallback(z.string(), "").default(""),
  remote: fallback(z.boolean(), false).default(false),
  sort: fallback(z.enum(["recent", "salary"]), "recent").default("recent"),
});

export const Route = createFileRoute("/jobs")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Browse Jobs — Verdant" },
      { name: "description", content: "Search hand-picked jobs at design-led startups and growing teams." },
      { property: "og:title", content: "Browse Jobs — Verdant" },
    ],
  }),
  component: JobsList,
});

const TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const LEVELS = ["Entry", "Mid", "Senior", "Lead"] as const;

function JobsList() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.q.toLowerCase();
    const loc = search.location.toLowerCase();
    let list = jobs.filter((j) => {
      if (q && !(`${j.title} ${j.company} ${j.skills.join(" ")}`.toLowerCase().includes(q))) return false;
      if (loc) {
        if (loc === "remote") { if (!j.remote) return false; }
        else if (!j.location.toLowerCase().includes(loc)) return false;
      }
      if (search.category && j.category !== search.category) return false;
      if (search.type && j.type !== search.type) return false;
      if (search.experience && j.experience !== search.experience) return false;
      if (search.remote && !j.remote) return false;
      return true;
    });
    if (search.sort === "salary") list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    else list = [...list].sort((a, b) => a.postedDays - b.postedDays);
    return list;
  }, [search]);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const activeFilters = [
    search.category && { k: "category", v: search.category },
    search.type && { k: "type", v: search.type },
    search.experience && { k: "experience", v: search.experience },
    search.remote && { k: "remote", v: "Remote only" },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <Navbar />
      <section className="bg-emerald-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Browse</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            {filtered.length.toLocaleString()} {filtered.length === 1 ? "role" : "roles"} waiting for you
          </h1>
          <div className="mt-8"><SearchBar /></div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className={`${filtersOpen ? "fixed inset-0 z-50 overflow-y-auto bg-background p-6" : "hidden"} lg:static lg:block lg:p-0`}>
            <div className="flex items-center justify-between lg:hidden">
              <h2 className="font-display text-xl font-bold">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-3xl border bg-card p-5 shadow-soft lg:sticky lg:top-20">
              <FilterGroup title="Category">
                <select
                  value={search.category}
                  onChange={(e) => update({ category: e.target.value })}
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup title="Employment type">
                <div className="flex flex-wrap gap-1.5">
                  {TYPES.map((t) => (
                    <Chip key={t} active={search.type === t} onClick={() => update({ type: search.type === t ? "" : t })}>{t}</Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Experience">
                <div className="flex flex-wrap gap-1.5">
                  {LEVELS.map((l) => (
                    <Chip key={l} active={search.experience === l} onClick={() => update({ experience: search.experience === l ? "" : l })}>{l}</Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Work mode">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={search.remote}
                    onChange={(e) => update({ remote: e.target.checked })}
                    className="h-4 w-4 accent-primary"
                  />
                  Remote only
                </label>
              </FilterGroup>

              <button
                onClick={() => navigate({ search: {} as never })}
                className="mt-2 text-xs font-semibold text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium shadow-soft lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                {activeFilters.map((f) => (
                  <button
                    key={f.k}
                    onClick={() => update({ [f.k]: f.k === "remote" ? false : "" } as never)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {f.v} <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={search.sort}
                  onChange={(e) => update({ sort: e.target.value as "recent" | "salary" })}
                  className="rounded-full border bg-card px-3 py-2 text-sm font-medium shadow-soft outline-none"
                >
                  <option value="recent">Most recent</option>
                  <option value="salary">Highest salary</option>
                </select>
                <div className="hidden rounded-full border bg-card p-1 shadow-soft sm:flex">
                  <button
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    className={`grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className={`grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border bg-card p-16 text-center shadow-soft">
                <p className="font-display text-xl font-semibold">No matches.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try removing a filter or searching for something broader.</p>
              </div>
            ) : (
              <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2" : "flex flex-col gap-4"}>
                {filtered.map((j) => <JobCard key={j.id} job={j} variant={view} />)}
              </div>
            )}

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Showing {filtered.length} of {jobs.length} jobs · <Link to="/" className="font-semibold text-primary hover:underline">Back to home</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );

  void formatSalary; // referenced for tree-shake guard
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2.5 font-display text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
