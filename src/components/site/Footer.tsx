import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "For Candidates", links: ["Browse jobs", "Browse companies", "Salary guide", "Career advice"] },
    { title: "For Employers", links: ["Post a job", "Pricing", "Employer dashboard", "Talent insights"] },
    { title: "Company", links: ["About", "Press", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Accessibility"] },
  ];
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-gradient shadow-soft">
                <Briefcase className="h-5 w-5 text-primary-foreground" strokeWidth={2.25} />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">Verdant</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The considered job board for craft-driven teams and the people who join them.
            </p>
            <div className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-full border bg-background px-4 py-2.5 text-sm outline-none ring-ring/40 focus:ring-2"
              />
              <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="font-display text-sm font-semibold">{c.title}</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Verdant Labs, Inc. All rights reserved.</p>
          <p>Crafted with care in San Francisco.</p>
        </div>
      </div>
    </footer>
  );
}
