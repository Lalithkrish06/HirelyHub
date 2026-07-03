import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Bookmark, Briefcase } from "lucide-react";
import { formatSalary, timeAgo, type Job } from "@/lib/jobs-data";

export function JobCard({ job, variant = "grid" }: { job: Job; variant?: "grid" | "list" }) {
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      className="group relative block rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-base font-display font-bold text-white"
            style={{ backgroundColor: job.companyColor }}
          >
            {job.companyInitial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">{job.company}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {timeAgo(job.postedDays)}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Save job"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight group-hover:text-primary">
        {job.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" /> {job.type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, variant === "list" ? 5 : 3).map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground/80">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Salary</p>
          <p className="font-display text-base font-semibold text-foreground">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          {job.experience}
        </span>
      </div>
    </Link>
  );
}
