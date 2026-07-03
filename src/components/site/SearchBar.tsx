import { Search, MapPin } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function SearchBar({ size = "lg" }: { size?: "lg" | "md" }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/jobs", search: { q: q || undefined, location: loc || undefined } as never });
      }}
      className={`glass mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-3xl p-2 shadow-elegant sm:flex-row sm:items-center ${
        size === "lg" ? "" : "sm:rounded-2xl"
      }`}
    >
      <div className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:py-2.5">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, skill, or company"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="hidden h-8 w-px bg-border sm:block" />
      <div className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:py-2.5">
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Location or 'Remote'"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
      >
        Search jobs
      </button>
    </form>
  );
}
