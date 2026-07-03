export type Job = {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  remote: boolean;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: "Entry" | "Mid" | "Senior" | "Lead";
  salaryMin: number;
  salaryMax: number;
  postedDays: number;
  category: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  vacancies: number;
  deadlineDays: number;
  recruiter: { name: string; title: string };
  featured?: boolean;
};

const palette = ["#064e3b", "#0d7a5f", "#c9a84c", "#1e3a5f", "#9b4423", "#4a6741"];

export const categories = [
  { name: "Engineering", count: 1284, icon: "Code2" },
  { name: "Design", count: 642, icon: "Palette" },
  { name: "Product", count: 421, icon: "Sparkles" },
  { name: "Marketing", count: 538, icon: "Megaphone" },
  { name: "Sales", count: 716, icon: "TrendingUp" },
  { name: "Finance", count: 305, icon: "Wallet" },
  { name: "Operations", count: 289, icon: "Settings2" },
  { name: "Data", count: 467, icon: "Database" },
];

export const companies = [
  "Lumen Labs", "Northwind", "Avoca", "Halcyon", "Verdant", "Mercato", "Orbital", "Kindred"
];

export const jobs: Job[] = [
  {
    id: "lumen-senior-product-designer",
    title: "Senior Product Designer",
    company: "Lumen Labs",
    companyInitial: "L",
    companyColor: palette[0],
    location: "San Francisco, CA",
    remote: true,
    type: "Full-time",
    experience: "Senior",
    salaryMin: 145000,
    salaryMax: 185000,
    postedDays: 2,
    category: "Design",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    description:
      "Lumen Labs is building the operating system for modern creative teams. We're hiring a Senior Product Designer to shape the next generation of our collaboration suite — from quiet, considered defaults to expressive moments of delight.",
    responsibilities: [
      "Own end-to-end design for a major product surface",
      "Lead design critiques and partner closely with engineering",
      "Evolve and maintain our design system across web and native",
      "Run discovery research with customers and synthesize insights",
    ],
    qualifications: [
      "5+ years designing complex web products",
      "Strong systems thinking and craft in Figma",
      "Track record shipping at small, fast-moving teams",
      "Excellent written communication",
    ],
    benefits: ["Equity", "Unlimited PTO", "Health, dental & vision", "$2k home office stipend", "Quarterly offsites"],
    vacancies: 2,
    deadlineDays: 21,
    recruiter: { name: "Avery Chen", title: "Head of Talent" },
    featured: true,
  },
  {
    id: "northwind-staff-engineer",
    title: "Staff Software Engineer, Platform",
    company: "Northwind",
    companyInitial: "N",
    companyColor: palette[1],
    location: "New York, NY",
    remote: true,
    type: "Full-time",
    experience: "Lead",
    salaryMin: 210000,
    salaryMax: 280000,
    postedDays: 1,
    category: "Engineering",
    skills: ["TypeScript", "Go", "Kubernetes", "PostgreSQL", "Distributed Systems"],
    description:
      "Help us scale Northwind's logistics platform serving thousands of operators across North America. You'll set technical direction for our core services and mentor engineers across the company.",
    responsibilities: [
      "Set architecture direction for the platform team",
      "Lead high-impact migrations with zero downtime",
      "Mentor senior and mid-level engineers",
      "Partner with product on long-horizon planning",
    ],
    qualifications: [
      "8+ years building production distributed systems",
      "Deep expertise in at least one backend ecosystem",
      "Experience leading cross-team technical initiatives",
    ],
    benefits: ["Equity", "401k match", "Comprehensive health", "Sabbatical after 4 years"],
    vacancies: 1,
    deadlineDays: 30,
    recruiter: { name: "Priya Raman", title: "Engineering Recruiter" },
    featured: true,
  },
  {
    id: "avoca-growth-marketer",
    title: "Growth Marketing Lead",
    company: "Avoca",
    companyInitial: "A",
    companyColor: palette[2],
    location: "Remote — EU",
    remote: true,
    type: "Full-time",
    experience: "Senior",
    salaryMin: 95000,
    salaryMax: 130000,
    postedDays: 4,
    category: "Marketing",
    skills: ["SEO", "Paid Acquisition", "Lifecycle", "Analytics"],
    description:
      "Avoca is hiring a Growth Marketing Lead to build our acquisition engine from the ground up. You'll own the funnel end-to-end and work directly with the founders.",
    responsibilities: [
      "Define and execute our acquisition strategy",
      "Manage paid budgets across search and social",
      "Build lifecycle programs that drive activation",
    ],
    qualifications: [
      "5+ years in B2B SaaS growth roles",
      "Proven track record scaling acquisition",
      "Strong analytical and writing skills",
    ],
    benefits: ["Fully remote", "4-week PTO minimum", "Equity", "Annual retreat"],
    vacancies: 1,
    deadlineDays: 14,
    recruiter: { name: "Tomás Riviera", title: "Co-founder" },
    featured: true,
  },
  {
    id: "halcyon-product-manager",
    title: "Product Manager, Payments",
    company: "Halcyon",
    companyInitial: "H",
    companyColor: palette[3],
    location: "London, UK",
    remote: false,
    type: "Full-time",
    experience: "Mid",
    salaryMin: 85000,
    salaryMax: 115000,
    postedDays: 6,
    category: "Product",
    skills: ["Payments", "Roadmapping", "SQL", "Stakeholder Mgmt"],
    description:
      "Own the Halcyon payments roadmap and partner with engineering, design, and risk to ship infrastructure used by thousands of merchants.",
    responsibilities: [
      "Own the payments roadmap",
      "Define metrics and write specs",
      "Partner with risk and compliance",
    ],
    qualifications: ["3+ years PM experience", "Fintech background a plus", "Strong SQL"],
    benefits: ["Hybrid (3 days in)", "Private health", "Cycle-to-work"],
    vacancies: 1,
    deadlineDays: 18,
    recruiter: { name: "Imogen Carr", title: "Talent Partner" },
  },
  {
    id: "verdant-data-scientist",
    title: "Senior Data Scientist",
    company: "Verdant",
    companyInitial: "V",
    companyColor: palette[4],
    location: "Remote — Worldwide",
    remote: true,
    type: "Full-time",
    experience: "Senior",
    salaryMin: 130000,
    salaryMax: 170000,
    postedDays: 3,
    category: "Data",
    skills: ["Python", "SQL", "Causal Inference", "ML"],
    description:
      "Verdant is decarbonizing supply chains. We're hiring a Senior Data Scientist to build the models that power our emissions intelligence platform.",
    responsibilities: [
      "Design and ship production ML models",
      "Partner with engineering on data infrastructure",
      "Communicate findings to non-technical stakeholders",
    ],
    qualifications: [
      "5+ years in applied DS / ML roles",
      "Strong Python and SQL",
      "Comfort with ambiguity",
    ],
    benefits: ["Fully remote", "Equity", "Climate-aligned mission"],
    vacancies: 2,
    deadlineDays: 28,
    recruiter: { name: "Noah Park", title: "Recruiting Lead" },
  },
  {
    id: "mercato-frontend",
    title: "Frontend Engineer",
    company: "Mercato",
    companyInitial: "M",
    companyColor: palette[5],
    location: "Berlin, DE",
    remote: true,
    type: "Full-time",
    experience: "Mid",
    salaryMin: 70000,
    salaryMax: 95000,
    postedDays: 5,
    category: "Engineering",
    skills: ["React", "TypeScript", "CSS", "Accessibility"],
    description:
      "Build the customer-facing storefronts that thousands of independent merchants rely on. Craft, performance, and accessibility matter here.",
    responsibilities: [
      "Ship customer-facing features end-to-end",
      "Care for performance and accessibility budgets",
      "Collaborate with design on the component library",
    ],
    qualifications: ["3+ years with React/TypeScript", "Strong CSS fundamentals"],
    benefits: ["Remote-friendly", "Relocation support", "Learning budget"],
    vacancies: 2,
    deadlineDays: 24,
    recruiter: { name: "Lena Hofmann", title: "Tech Recruiter" },
  },
  {
    id: "orbital-devops",
    title: "DevOps Engineer",
    company: "Orbital",
    companyInitial: "O",
    companyColor: palette[0],
    location: "Austin, TX",
    remote: false,
    type: "Full-time",
    experience: "Mid",
    salaryMin: 120000,
    salaryMax: 155000,
    postedDays: 8,
    category: "Engineering",
    skills: ["AWS", "Terraform", "CI/CD", "Observability"],
    description:
      "Own infrastructure for a small, talented platform team building tooling for satellite operators.",
    responsibilities: ["Own AWS infrastructure", "Build delightful CI/CD", "Set up observability"],
    qualifications: ["4+ years infrastructure experience", "Strong AWS and Terraform"],
    benefits: ["On-site catering", "Equity", "Health"],
    vacancies: 1,
    deadlineDays: 20,
    recruiter: { name: "Jordan Vance", title: "Director of Eng" },
  },
  {
    id: "kindred-intern",
    title: "Product Design Intern",
    company: "Kindred",
    companyInitial: "K",
    companyColor: palette[2],
    location: "Remote — Americas",
    remote: true,
    type: "Internship",
    experience: "Entry",
    salaryMin: 32000,
    salaryMax: 42000,
    postedDays: 1,
    category: "Design",
    skills: ["Figma", "Visual Design", "User Flows"],
    description:
      "12-week paid internship working alongside our design team on real product surfaces. Mentorship guaranteed.",
    responsibilities: ["Ship UI work for production features", "Run design crits"],
    qualifications: ["Currently studying design or self-taught with portfolio"],
    benefits: ["Paid", "Mentorship", "Conversion possible"],
    vacancies: 3,
    deadlineDays: 12,
    recruiter: { name: "Sasha Lin", title: "Design Manager" },
  },
];

export function formatSalary(min: number, max: number) {
  const fmt = (n: number) =>
    n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

export function timeAgo(days: number) {
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const w = Math.floor(days / 7);
  return w === 1 ? "1 week ago" : `${w} weeks ago`;
}
