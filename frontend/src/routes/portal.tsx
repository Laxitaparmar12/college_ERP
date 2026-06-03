import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Users, ShieldCheck, ArrowRight, Brain, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [{ title: "Select Portal — SmartERP" }] }),
  component: PortalSelect,
});

const roles = [
  {
    id: "student",
    title: "Student Portal",
    icon: GraduationCap,
    desc: "Tracking, academics, assignment uploads, and AI score prediction.",
    bullets: ["Live attendance", "Assignment uploads", "AI grade forecast"],
    tint: "ice",
  },
  {
    id: "faculty",
    title: "Faculty Portal",
    icon: Users,
    desc: "Grading, virtual sessions, and webcam-triggered attendance.",
    bullets: ["Face recognition", "Grade entry", "Class scheduler"],
    tint: "lavender",
  },
  {
    id: "admin",
    title: "Admin Portal",
    icon: ShieldCheck,
    desc: "User control, timetable generation, and analytics center.",
    bullets: ["CRUD operations", "Timetable AI", "Global insights"],
    tint: "teal",
  },
];

function PortalSelect() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (id: string) => {
    setPicked(id);
    setTimeout(() => navigate({ to: "/login/$role", params: { role: id } }), 350);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--lavender)]/30 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--teal)]/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Brain className="h-5 w-5 text-primary" />
            </span>
            <span className="font-display font-semibold">SmartERP</span>
          </Link>
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <span className="text-xs font-medium uppercase tracking-widest text-[color:var(--teal)]">Gateway</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold">Who Are You?</h1>
          <p className="mt-3 text-muted-foreground">Select your custom portal to continue.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {roles.map((r, i) => {
            const isPicked = picked === r.id;
            const isOther = picked && picked !== r.id;
            return (
              <button
                key={r.id}
                onClick={() => handlePick(r.id)}
                className={`group relative text-left rounded-3xl border bg-card p-8 transition-all duration-500 hover-lift animate-fade-in
                  ${isPicked ? "scale-105 border-[color:var(--ring)] shadow-lift" : "border-border"}
                  ${isOther ? "opacity-40 scale-95" : ""}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[color:var(--${r.tint})]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                    <r.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <span className={`h-1.5 w-1.5 rounded-full bg-[color:var(--${r.tint})]`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between text-sm font-medium text-primary">
                    <span>Enter portal</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
