import { Link } from "@tanstack/react-router";
import { Briefcase, Menu } from "lucide-react";
import { useState } from "react";

const navItems: { to: "/" | "/jobs"; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Browse Jobs" },
];
const extraItems = [
  { href: "#companies", label: "Companies" },
  { href: "#employers", label: "For Employers" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-gradient shadow-soft">
              <Briefcase className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.25} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">Verdant</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            {extraItems.map((n) => (
              <a key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
              Sign in
            </button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
              Post a job
            </button>
          </div>

          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="border-t bg-card/95 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              {extraItems.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary">
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t pt-3">
                <button className="flex-1 rounded-full border px-4 py-2 text-sm font-medium">Sign in</button>
                <button className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Post a job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
