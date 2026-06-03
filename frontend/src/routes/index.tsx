import { NavBar } from "@/components/NavBar";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Brain, Camera, LineChart, Sparkles, ArrowRight, Github, Linkedin,
  GraduationCap, ShieldCheck, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartERP — Next-Generation Academic Intelligence" },
      { name: "description", content: "AI-powered college ERP with face recognition attendance, performance prediction, and smart analytics." },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Camera,
    title: "Face Recognition Attendance",
    desc: "OpenCV-powered camera scanning marks attendance in seconds — no manual rolls, no proxies.",
    tint: "from-ice/40 to-transparent",
  },
  {
    icon: Brain,
    title: "AI Performance Prediction",
    desc: "TensorFlow models forecast student outcomes and surface at-risk learners early.",
    tint: "from-lavender/40 to-transparent",
  },
  {
    icon: LineChart,
    title: "Smart Analytics Dashboard",
    desc: "Multi-layered KPIs across departments, attendance, fees, and engagement — in real time.",
    tint: "from-teal/40 to-transparent",
  },
];

const team = [
  { name: "Aarav Sharma", role: "Project Lead & AI Specialist", initials: "AS" },
  { name: "Priya Verma", role: "Full Stack Engineer", initials: "PV" },
  { name: "Rohan Mehta", role: "UI/UX Frontend Designer", initials: "RM" },
  { name: "Ananya Iyer", role: "Database Administrator", initials: "AI" },
];

function Landing() {
  const [metrics, setMetrics] = useState({
    activeUsers: "...",
    facultyCount: "...",
    avgAttendance: "...%",
    avgCgpa: "...",
    feeCollection: "...%",
    atRiskStudents: "..."
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Connection Refused");
        return res.json();
      })
      .then((data) => {
        setMetrics({
          activeUsers: data.active_users,
          facultyCount: data.faculty_count,
          avgAttendance: data.avg_attendance,
          avgCgpa: data.avg_cgpa,
          feeCollection: data.fee_collection,
          atRiskStudents: data.at_risk_students
        });
      })
      .catch((err) => {
        console.warn("Backend down, serving layout placeholders:", err);
        setMetrics({
          activeUsers: "4,250+",
          facultyCount: "180",
          avgAttendance: "92.4%",
          avgCgpa: "8.6",
          feeCollection: "94%",
          atRiskStudents: "12"
        });
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-lavender/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-ice/40 blur-3xl animate-float-delayed" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-teal" />
              Powered by Computer Vision + Machine Learning
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              Next-Generation
              <br />
              <span className="bg-linear-to-r from-primary via-lavender to-teal bg-clip-text text-transparent">
                Academic Intelligence
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              SmartERP automates everything from attendance and grading to predictive analytics —
              uniting students, faculty, and administrators on one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
              >
                Explore Features
              </a>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              {[
                [metrics.activeUsers, "Active Users"],
                [metrics.facultyCount, "Faculty"],
                ["99.9%", "Uptime"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-semibold">{v}</div>
                  <div className="text-muted-foreground text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-delayed">
            <div className="relative rounded-3xl bg-gradient-card p-1 shadow-lift">
              <div className="rounded-[1.4rem] bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive/60" />
                    <div className="h-2 w-2 rounded-full bg-mint" />
                    <div className="h-2 w-2 rounded-full bg-ice" />
                  </div>
                  <span className="text-xs text-muted-foreground">analytics.smarterp</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Attendance", val: metrics.avgAttendance, c: "ice" },
                    { label: "Avg CGPA", val: metrics.avgCgpa, c: "lavender" },
                    { label: "Fee Coll.", val: metrics.feeCollection, c: "teal" },
                    { label: "At-Risk", val: metrics.atRiskStudents, c: "mint" },
                  ].map((k) => (
                    <div key={k.label} className="rounded-2xl border border-border p-4">
                      <div className="text-xs text-muted-foreground">{k.label}</div>
                      <div className="mt-1 font-display text-2xl font-semibold">{k.val}</div>
                      <div className={`mt-3 h-1.5 rounded-full bg-${k.c}/30`}>
                        <div className={`h-full w-2/3 rounded-full bg-${k.c}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-primary p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-primary/70">AI Prediction</div>
                    <div className="font-display text-lg font-semibold text-primary">Class avg ↑ 6.2%</div>
                  </div>
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-medium uppercase tracking-widest text-teal">Innovations</span>
            <h2 className="mt-2 font-display text-4xl font-semibold">Platform Innovations</h2>
            <p className="mt-3 text-muted-foreground">Three engines that redefine campus operations.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover-lift animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.tint} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                    <f.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6 bg-gradient-hero/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-medium uppercase tracking-widest text-lavender">Builders</span>
            <h2 className="mt-2 font-display text-4xl font-semibold">Our Project Team</h2>
            <p className="mt-3 text-muted-foreground">The minds behind SmartERP.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div
                key={m.name}
                className="group rounded-3xl border border-border bg-card p-6 text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center font-display text-2xl font-semibold text-primary shadow-glow">
                  {m.initials}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{m.role}</p>
                <div className="mt-5 flex justify-center gap-3">
                  <a href="#" title={`Linkedin - ${m.name}`} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-accent transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" title={`Github - ${m.name}`} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-accent transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-24 px-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-lift">
          <GraduationCap className="h-10 w-10 mx-auto text-primary" />
          <h2 className="mt-4 font-display text-4xl font-semibold text-primary">Ready to modernize your campus?</h2>
          <p className="mt-3 text-primary/70 max-w-xl mx-auto">Launch the portal and step into the future of academic administration.</p>
          <Link
            to="/portal"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5"
          >
            Launch Portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-primary text-primary-foreground/80">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-gradient-primary">
                <Brain className="h-5 w-5 text-primary" />
              </span>
              <span className="font-display text-lg font-semibold text-primary-foreground">SmartERP</span>
            </div>
            <p className="mt-4 text-sm max-w-sm">Intelligent infrastructure for modern educational institutions.</p>
          </div>
          <div>
            <h4 className="text-primary-foreground font-medium text-sm">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-primary-foreground">Features</a></li>
              <li><a href="#team" className="hover:text-primary-foreground">Team</a></li>
              <li><Link to="/portal" className="hover:text-primary-foreground">Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-foreground font-medium text-sm">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-xs">
            <span>© 2026 SmartERP. All rights reserved.</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Secure by design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}