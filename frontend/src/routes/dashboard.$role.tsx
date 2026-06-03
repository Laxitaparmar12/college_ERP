import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Brain, LogOut, User, CalendarDays, BookOpen, FileText, Award, Video,
  Wallet, Bell, Sparkles, Camera, Users, ClipboardEdit, GraduationCap,
  BarChart3, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, Settings,
  PenSquare, Trash2, Plus, Download, Upload, Radio,
} from "lucide-react";
const API_BASE = "http://127.0.0.1:5000";

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Accept": "application/json" },
      ...options,
    });

    if (!res.ok) throw new Error("Something went wrong");

    return await res.json();
  } catch (err: any) {
    toast.error(err.message || "API Error");
    throw err;
  }
}
export const Route = createFileRoute("/dashboard/$role")({
  head: () => ({ meta: [{ title: "Dashboard — SmartERP" }] }),
  component: Dashboard,
});

type TabDef = { id: string; label: string; icon: any };

const studentTabs: TabDef[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "attendance", label: "Attendance", icon: CalendarDays },
  { id: "academic", label: "Academic", icon: BookOpen },
  { id: "assignment", label: "Assignments", icon: FileText },
  { id: "exam", label: "Examination", icon: Award },
  { id: "online", label: "Online Classes", icon: Video },
  { id: "fee", label: "Fee Management", icon: Wallet },
  { id: "notice", label: "Notice Board", icon: Bell },
  { id: "ai", label: "AI Engine", icon: Sparkles },
];

const facultyTabs: TabDef[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "attendance", label: "Attendance", icon: Camera },
  { id: "students", label: "Students", icon: Users },
  { id: "assignment", label: "Assignments", icon: ClipboardEdit },
  { id: "exam", label: "Examinations", icon: Award },
  { id: "online", label: "Online Classes", icon: Video },
  { id: "notice", label: "Notices", icon: Bell },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const adminTabs: TabDef[] = [
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "faculty", label: "Faculty", icon: Users },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "timetable", label: "Timetable", icon: CalendarDays },
  { id: "fee", label: "Fee Mgmt", icon: Wallet },
  { id: "exam", label: "Examination", icon: Award },
  { id: "notice", label: "Notice Board", icon: Bell },
  { id: "online", label: "Online Classes", icon: Video },
  { id: "analytics", label: "AI Analytics", icon: BarChart3 },
];

function Dashboard() {
  const { role } = useParams({ from: "/dashboard/$role" });
  const roleMap: Record<string, TabDef[]> = {
    admin: adminTabs,
    faculty: facultyTabs,
    student: studentTabs,
  };
  function handleLogout() {
  // localStorage clean (agar login data store kiya ho)
  localStorage.clear();

  // redirect to login page
  window.location.href = "/";
  }
  const tabs = roleMap[role] || studentTabs;
  const [active, setActive] = useState(tabs[0].id);

  const profiles: Record<string, { name: string; sub: string; initials: string }> = {
    student: { name: "Aarav Kapoor", sub: "B.Tech — CSE (Sem VI) • ID: 21CSE042", initials: "AK" },
    faculty: { name: "Dr. Sarah Jenkins", sub: "Senior AI Professor • Dept of CSE", initials: "SJ" },
    admin:   { name: "System Administrator", sub: "Root access • node-01", initials: "SA" },
  };
  const profile = profiles[role] ?? { name: "User", sub: "", initials: "U" };

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border bg-sidebar">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-border">
          <span className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Brain className="h-5 w-5 text-primary" />
          </span>
          <span className="font-display font-semibold">SmartERP</span>
        </Link>

        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center font-display text-sm font-semibold text-primary">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{profile.name}</div>
              <div className="text-xs text-muted-foreground truncate">{profile.sub}</div>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-(--mint)/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3" /> {role} • secure
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all
                  ${isActive
                    ? "bg-gradient-primary text-primary shadow-soft"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border bg-card/60 glass flex items-center justify-between px-6">
          <div>
            <div className="text-xs text-muted-foreground capitalize">{role} Dashboard</div>
            <div className="font-display font-semibold capitalize">
              {tabs.find((t) => t.id === active)?.label}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-accent">
              <Bell className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border hover:bg-accent">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div key={active} className="flex-1 overflow-y-auto p-6 md:p-8 animate-fade-in">
          {role === "student" && <StudentPanels active={active} />}
          {role === "faculty" && <FacultyPanels active={active} />}
          {role === "admin" && <AdminPanels active={active} />}
        </div>
      </main>
    </div>
  );
}
const uploadCSV = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload-csv`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    toast.success("CSV uploaded successfully!");
  } catch {
    toast.error("CSV upload failed");
  }
};
/* ---------- SHARED UI ---------- */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-border bg-card p-6 ${className}`}>{children}</div>;
}
function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-xl font-semibold">{children}</h2>
      {hint && <p className="text-sm text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

/* ---------- STUDENT ---------- */

function StudentPanels({ active }: { active: string }) {
  if (active === "profile") return <StudentProfile />;
  if (active === "attendance") return <StudentAttendance />;
  if (active === "academic") return <StudentAcademic />;
  if (active === "assignment") return <StudentAssignments />;
  if (active === "exam") return <StudentExam />;
  if (active === "online") return <StudentOnline />;
  if (active === "fee") return <StudentFee />;
  if (active === "notice") return <NoticeBoard />;
  if (active === "ai") return <StudentAI />;
  return null;
}

function StudentProfile() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center font-display text-3xl font-semibold text-primary shadow-glow">AK</div>
        <h3 className="mt-4 font-display text-xl font-semibold">Aarav Kapoor</h3>
        <p className="text-sm text-muted-foreground">21CSE042 • B.Tech CSE (Sem VI)</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <Stat label="CGPA" value="8.92" />
          <Stat label="Attendance" value="86%" />
        </div>
      </Card>
      <Card className="lg:col-span-2">
        <SectionTitle hint="Keep your personal details current.">Update Personal Info</SectionTitle>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }} className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" defaultValue="Aarav Kapoor" />
          <Field label="Email" defaultValue="aarav.k@college.edu" />
          <Field label="Phone" defaultValue="+91 98765 43210" />
          <Field label="Guardian" defaultValue="Rajiv Kapoor" />
          <Field label="Address" defaultValue="Sector 22, New Delhi" className="sm:col-span-2" />
          <button className="sm:col-span-2 justify-self-end inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all hover:-translate-y-0.5">
            Save Changes
          </button>
        </form>
      </Card>
    </div>
  );
}

function StudentAttendance() {
  const subjects = [
    { name: "Machine Learning", pct: 92, c: "mint" },
    { name: "Database Systems", pct: 87, c: "ice" },
    { name: "Compiler Design", pct: 68, c: "destructive" },
    { name: "Computer Networks", pct: 81, c: "lavender" },
    { name: "Operating Systems", pct: 78, c: "teal" },
    { name: "Software Engg.", pct: 94, c: "mint" },
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {subjects.map((s) => (
        <Card key={s.name} className="hover-lift">
          <div className="flex items-center justify-between">
            <div className="font-medium">{s.name}</div>
            {s.pct < 75 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 text-destructive px-2 py-1 text-[10px] font-medium uppercase tracking-wide animate-pulse-ring">
                <AlertTriangle className="h-3 w-3" /> Below 75%
              </span>
            )}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="font-display text-4xl font-semibold">{s.pct}%</div>
            <div className="text-xs text-muted-foreground">of 120 lectures</div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full ${s.c === "destructive" ? "bg-destructive" : `bg-[color:var(--${s.c})]`} transition-all duration-700`}
              style={{ width: `${s.pct}%` }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

function StudentAcademic() {
  const slots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const cls = ["ML", "DB", "OS", "CN", "CD", "SE"];
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle hint="Weekly timetable">Class Schedule</SectionTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left p-2 font-medium">Time</th>
                {days.map((d) => <th key={d} className="p-2 font-medium">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {slots.map((t, i) => (
                <tr key={t} className="border-t border-border">
                  <td className="p-2 text-muted-foreground">{t}</td>
                  {days.map((d, j) => (
                    <td key={d} className="p-1.5">
                      <div className={`rounded-xl p-2 text-center text-xs font-medium bg-[color:var(--${["ice","lavender","teal","mint"][(i+j)%4]})]/25`}>
                        {cls[(i + j) % cls.length]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <SectionTitle hint="Download semester study material">Study Material</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {["ML Notes.pdf", "DBMS Lab.zip", "OS Slides.pdf", "CN Manual.pdf", "CD Reference.zip", "SE Textbook.pdf"].map((f) => (
            <button
              key={f}
              onClick={() => toast.success(`Downloading ${f}`)}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-muted-foreground" /><span className="text-sm">{f}</span></div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StudentAssignments() {
  const [items, setItems] = useState([
    { t: "ML — Regression Lab", due: "Tomorrow", s: "Pending" },
    { t: "DB — Normalization Set", due: "3 days", s: "Pending" },
    { t: "OS — Scheduler Sim", due: "1 week", s: "Submitted" },
    { t: "CN — Packet Trace", due: "Today", s: "Pending" },
  ]);
  return (
    <Card>
      <SectionTitle hint="Upload your work and track submissions">Assignments</SectionTitle>
      <div className="space-y-3">
        {items.map((a, i) => (
          <div key={a.t} className="flex items-center justify-between rounded-2xl border border-border p-4 hover:bg-accent/40 transition-colors">
            <div>
              <div className="font-medium">{a.t}</div>
              <div className="text-xs text-muted-foreground">Due in {a.due}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase ${a.s === "Submitted" ? "bg-(--mint)/30" : "bg-(--lavender)/30"}`}>
                {a.s}
              </span>
              {a.s === "Pending" && (
                <button
                  onClick={() => {
                    const next = [...items]; next[i] = { ...a, s: "Submitted" }; setItems(next);
                    toast.success("File uploaded — submission recorded");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:shadow-lift transition-all"
                >
                  <Upload className="h-3.5 w-3.5" /> Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StudentExam() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="md:col-span-2">
        <SectionTitle hint="Cumulative academic standing">CGPA Summary</SectionTitle>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-6xl font-semibold bg-linear-to-br from-primary to-lavender bg-clip-text text-transparent">8.92</div>
            <div className="text-sm text-muted-foreground">out of 10.00 • Sem VI</div>
          </div>
          <button onClick={() => toast.success("Generating PDF grade card…")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all hover:-translate-y-0.5">
            Generate Grade Card
          </button>
        </div>
        <div className="mt-6 grid grid-cols-6 gap-2">
          {[8.1, 8.4, 8.7, 8.6, 8.9, 8.92].map((g, i) => (
            <div key={i} className="rounded-xl bg-(--ice)/30 p-3 text-center">
              <div className="text-[10px] text-muted-foreground">Sem {i + 1}</div>
              <div className="font-display font-semibold">{g}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Upcoming Exam</SectionTitle>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subject</span><span className="font-medium">Compiler Design</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">Dec 14, 2026</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Hall</span><span className="font-medium">Block C — 204</span></div>
        </div>
      </Card>
    </div>
  );
}

function StudentOnline() {
  const lectures = [
    { t: "Machine Learning — Live Lab", by: "Dr. Jenkins", live: true },
    { t: "Database Systems — Indexing", by: "Prof. Rao", live: false },
    { t: "OS — Concurrency", by: "Prof. Mehta", live: false },
  ];
  return (
    <div className="space-y-3">
      {lectures.map((l) => (
        <Card key={l.t} className="flex items-center justify-between hover-lift">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center"><Video className="h-5 w-5 text-primary" /></div>
            <div>
              <div className="font-medium">{l.t}</div>
              <div className="text-xs text-muted-foreground">{l.by}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {l.live && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 text-destructive px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider animate-pulse-ring">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Live Now
              </span>
            )}
            <button
              onClick={() => toast.success(`Joining ${l.t}…`)}
              className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:shadow-lift transition-all"
            >
              Join Classroom
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StudentFee() {
  const [paid, setPaid] = useState(false);
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="md:col-span-2">
        <SectionTitle hint="Semester VI dues">Fee Breakdown</SectionTitle>
        <div className="space-y-3 text-sm">
          {[
            ["Tuition Fee", "₹38,000"],
            ["Library Fee", "₹2,500"],
            ["Lab Fee", "₹3,500"],
            ["Examination Fee", "₹1,000"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
          ))}
          <div className="flex justify-between pt-2"><span className="font-medium">Total Pending</span><span className="font-display text-xl font-semibold">₹45,000</span></div>
        </div>
      </Card>
      <Card>
        <SectionTitle>Checkout</SectionTitle>
        {paid ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-12 w-12 mx-auto text-mint" />
            <div className="mt-3 font-medium">Payment received</div>
            <div className="text-xs text-muted-foreground">Receipt #TXN-2026-04210</div>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Secure payment gateway simulation.</p>
            <button
              onClick={() => { setPaid(true); toast.success("Payment successful"); }}
              className="mt-4 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all hover:-translate-y-0.5"
            >
              Pay ₹45,000 Online
            </button>
          </>
        )}
      </Card>
    </div>
  );
}

function NoticeBoard() {
  const notices = [
    { t: "Mid-Sem Exam Schedule Released", d: "2 hours ago", tag: "Examination" },
    { t: "Cultural Fest 'Spectra' — Registrations Open", d: "Yesterday", tag: "Event" },
    { t: "Library Closed on Dec 25", d: "2 days ago", tag: "General" },
    { t: "Workshop on Generative AI — Auditorium", d: "3 days ago", tag: "Workshop" },
  ];
  return (
    <div className="space-y-3">
      {notices.map((n) => (
        <Card key={n.t} className="flex items-center justify-between hover-lift">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-(--lavender)/30 flex items-center justify-center"><Bell className="h-5 w-5 text-primary" /></div>
            <div>
              <div className="font-medium">{n.t}</div>
              <div className="text-xs text-muted-foreground">{n.d} • {n.tag}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StudentAI() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card className="bg-gradient-card">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-4 w-4 text-teal" /> Predictive Model
        </div>
        <div className="mt-4 font-display text-5xl font-semibold">8.85<span className="text-2xl text-muted-foreground"> / 10</span></div>
        <p className="mt-2 text-sm text-muted-foreground">Forecasted final CGPA based on attendance, assignment velocity, and mid-sem performance.</p>
        <div className="mt-6 h-2 rounded-full bg-white/60 overflow-hidden">
          <div className="h-full w-[88%] bg-gradient-primary" />
        </div>
      </Card>
      <Card>
        <SectionTitle hint="Personalized recommendations">Smart Study Plan</SectionTitle>
        <ul className="space-y-3 text-sm">
          {[
            "Focus 4hr/week on Compiler Design — attendance is below threshold.",
            "Practice 15 SQL queries weekly to push DB grade from A to A+.",
            "Join the OS concurrency live lab on Thursday for hands-on practice.",
          ].map((tip, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-border p-3">
              <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-primary flex items-center justify-center text-primary text-xs font-semibold">{i + 1}</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------- FACULTY ---------- */

function FacultyPanels({ active }: { active: string }) {
  if (active === "profile") return (
    <Card>
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center font-display text-2xl font-semibold text-primary">SJ</div>
        <div>
          <h2 className="font-display text-2xl font-semibold">Dr. Sarah Jenkins</h2>
          <p className="text-sm text-muted-foreground">Senior AI Professor • Dept of Computer Science</p>
          <p className="text-sm text-muted-foreground">PhD Stanford • 14 yrs experience • h-index 32</p>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <Stat label="Active Classes" value="6" />
        <Stat label="Students" value="248" />
        <Stat label="Research Papers" value="42" />
      </div>
    </Card>
  );
  if (active === "attendance") return <FacultyAttendance />;
  if (active === "students") return <FacultyStudents />;
  if (active === "assignment") return <FacultyAssignment />;
  if (active === "exam") return <FacultyExam />;
  if (active === "online") return <FacultyOnline />;
  if (active === "notice") return <FacultyNotice />;
  if (active === "analytics") return <FacultyAnalytics />;
  return null;
}

function FacultyAttendance() {
  const [scanning, setScanning] = useState(false);
  return (
    <Card className="text-center">
      <SectionTitle hint="Trigger OpenCV-powered classroom attendance">Face Recognition Attendance</SectionTitle>
      <div className="mx-auto my-6 relative h-48 w-48 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
        <Camera className="h-16 w-16 text-primary" />
        {scanning && <div className="absolute inset-0 rounded-full border-4 border-[color:var(--teal)] animate-ping" />}
      </div>
      <button
        disabled={scanning}
        onClick={() => {
          setScanning(true);
          setTimeout(() => { setScanning(false); toast.success("Attendance captured — 42 students marked"); }, 2000);
        }}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all hover:-translate-y-0.5 disabled:opacity-70"
      >
        {scanning ? <><Loader2 className="h-4 w-4 animate-spin" /> Parsing webcam feed…</> : <>Trigger Face Recognition Scan</>}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">Computer vision powered by OpenCV + Dlib</p>
    </Card>
  );
}

function FacultyStudents() {
  const roster = [
    { n: "Aarav Kapoor", a: 86, g: 8.92, trend: "up" },
    { n: "Diya Sharma", a: 91, g: 9.10, trend: "up" },
    { n: "Karan Singh", a: 64, g: 6.40, trend: "down" },
    { n: "Riya Mehta", a: 78, g: 8.05, trend: "up" },
    { n: "Vihaan Joshi", a: 88, g: 8.62, trend: "up" },
  ];
  return (
    <Card>
      <SectionTitle hint="Class roster with performance trends">Student Management</SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase">
            <tr><th className="text-left p-3">Student</th><th className="text-left p-3">Attendance</th><th className="text-left p-3">CGPA</th><th className="text-left p-3">Trend</th></tr>
          </thead>
          <tbody>
            {roster.map((r) => (
              <tr key={r.n} className="border-t border-border hover:bg-accent/40 transition-colors">
                <td className="p-3 font-medium">{r.n}</td>
                <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs ${r.a < 75 ? "bg-destructive/15 text-destructive" : "bg-[color:var(--mint)]/30"}`}>{r.a}%</span></td>
                <td className="p-3">{r.g}</td>
                <td className="p-3 text-xs">{r.trend === "up" ? "↗ Improving" : "↘ Declining"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FacultyAssignment() {
  return (
    <Card>
      <SectionTitle hint="Publish a new assignment to your class">Create Assignment</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Assignment published to CSE-VI"); }} className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" defaultValue="Neural Network Lab 3" />
        <Field label="Course" defaultValue="Machine Learning" />
        <Field label="Due Date" defaultValue="2026-06-20" />
        <Field label="Max Score" defaultValue="100" />
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <textarea rows={4} defaultValue="Implement a 3-layer MLP from scratch using NumPy and benchmark on MNIST." className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--ring)] focus:ring-4 focus:ring-[color:var(--ring)]/15 transition-all" />
        </div>
        <button className="sm:col-span-2 justify-self-end inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">
          <Plus className="h-4 w-4" /> Publish Assignment
        </button>
      </form>
    </Card>
  );
}

function FacultyExam() {
  const students = ["Aarav Kapoor", "Diya Sharma", "Karan Singh", "Riya Mehta", "Vihaan Joshi"];
  return (
    <Card>
      <SectionTitle hint="Sync directly to the database">Grade Entry</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Grades persisted"); }} className="space-y-3">
        {students.map((s) => (
          <div key={s} className="flex items-center justify-between gap-4 rounded-2xl border border-border p-3">
            <div className="text-sm font-medium">{s}</div>
            <input defaultValue={Math.floor(70 + Math.random() * 25)} className="w-24 rounded-xl border border-input bg-background px-3 py-2 text-sm text-right outline-none focus:border-[color:var(--ring)] focus:ring-4 focus:ring-[color:var(--ring)]/15" />
          </div>
        ))}
        <button className="ml-auto block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Sync to DB</button>
      </form>
    </Card>
  );
}

function FacultyOnline() {
  return (
    <Card>
      <SectionTitle hint="Generate a virtual classroom link">Schedule Online Class</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Stream link: meet.smarterp/x42-9k1"); }} className="grid sm:grid-cols-2 gap-4">
        <Field label="Topic" defaultValue="Backpropagation Deep Dive" />
        <Field label="Course" defaultValue="Machine Learning" />
        <Field label="Date" defaultValue="2026-06-10" />
        <Field label="Time" defaultValue="10:00 AM" />
        <button className="sm:col-span-2 justify-self-end rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Generate Token & Schedule</button>
      </form>
    </Card>
  );
}

function FacultyNotice() {
  return (
    <Card>
      <SectionTitle hint="Broadcasts reach every student in your class instantly">Flash Announcement</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Announcement broadcast to 248 students"); }} className="space-y-4">
        <Field label="Headline" defaultValue="Tomorrow's lecture moved to Block B-201" />
        <div>
          <label className="text-xs font-medium text-muted-foreground">Message</label>
          <textarea rows={4} defaultValue="Due to lab equipment maintenance…" className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--ring)] focus:ring-4 focus:ring-[color:var(--ring)]/15" />
        </div>
        <button className="ml-auto block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Broadcast Now</button>
      </form>
    </Card>
  );
}

function FacultyAnalytics() {
  const risks = [
    { n: "Karan Singh", reason: "Attendance 64% • 3 missed assignments" },
    { n: "Neha Pillai", reason: "Mid-sem score below 40%" },
    { n: "Arjun Das", reason: "5 consecutive lecture absences" },
  ];
  return (
    <div className="space-y-5">
      <Card className="bg-gradient-card">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <BarChart3 className="h-4 w-4 text-[color:var(--teal)]" /> Scikit-Learn Risk Model
        </div>
        <p className="mt-3 text-sm">3 students flagged as high-risk this cycle.</p>
      </Card>
      {risks.map((r) => (
        <Card key={r.n} className="flex items-start gap-4 hover-lift border-l-4 border-l-destructive/60">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <div className="font-medium">{r.n}</div>
            <div className="text-xs text-muted-foreground">{r.reason}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------- ADMIN ---------- */

function AdminPanels({ active }: { active: string }) {
  return (
    <div className="space-y-6">
      <AdminStatusBar />
      {active === "students" && <AdminCRUD title="Student Management" />}
      {active === "faculty" && <AdminFaculty />}
      {active === "courses" && <AdminCourses />}
      {active === "timetable" && <AdminTimetable />}
      {active === "fee" && <AdminFee />}
      {active === "exam" && <AdminExam />}
      {active === "notice" && <AdminGlobalNotice />}
      {active === "online" && <AdminLiveStreams />}
      {active === "analytics" && <AdminAnalytics />}
    </div>
  );
}

function AdminStatusBar() {
  const items = [
    { l: "Active Users", v: "4,250", c: "ice" },
    { l: "Faculty Nodes", v: "180", c: "lavender" },
    { l: "Fee Collection", v: "94%", c: "teal" },
    { l: "API Uptime", v: "100%", c: "mint" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((i) => (
        <Card key={i.l} className="hover-lift">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{i.l}</div>
          <div className="mt-1 font-display text-3xl font-semibold">{i.v}</div>
          <div className={`mt-3 h-1.5 rounded-full bg-[color:var(--${i.c})]/30 overflow-hidden`}>
            <div className={`h-full w-4/5 rounded-full bg-[color:var(--${i.c})]`} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function AdminCRUD({ title }: { title: string }) {
  const rows = [
    { id: "21CSE001", n: "Aarav Kapoor", dept: "CSE", sem: "VI" },
    { id: "21CSE002", n: "Diya Sharma", dept: "CSE", sem: "VI" },
    { id: "21ECE015", n: "Karan Singh", dept: "ECE", sem: "VI" },
    { id: "21MEC022", n: "Riya Mehta", dept: "MECH", sem: "VI" },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle hint="CRUD operations on student records">{title}</SectionTitle>
        <button onClick={() => toast.success("New record form opened")} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:shadow-lift transition-all">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadCSV(file);
        }}
    className="mb-4"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase">
            <tr><th className="text-left p-3">ID</th><th className="text-left p-3">Name</th><th className="text-left p-3">Dept</th><th className="text-left p-3">Sem</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-accent/40 transition-colors">
                <td className="p-3 font-mono text-xs">{r.id}</td>
                <td className="p-3 font-medium">{r.n}</td>
                <td className="p-3">{r.dept}</td>
                <td className="p-3">{r.sem}</td>
                <td className="p-3 text-right">
                  <button onClick={() => toast.success("Edit dialog opened")} className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent"><PenSquare className="h-4 w-4" /></button>
                  <button onClick={() => toast.error("Record deleted")} className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AdminFaculty() {
  const depts = [
    { d: "Computer Science", f: 42, p: true },
    { d: "Electronics", f: 28, p: true },
    { d: "Mechanical", f: 36, p: false },
    { d: "Civil", f: 24, p: true },
  ];
  return (
    <Card>
      <SectionTitle hint="Departments & permissions">Faculty Management</SectionTitle>
      <div className="space-y-3">
        {depts.map((d) => (
          <div key={d.d} className="flex items-center justify-between rounded-2xl border border-border p-4">
            <div>
              <div className="font-medium">{d.d}</div>
              <div className="text-xs text-muted-foreground">{d.f} faculty members</div>
            </div>
            <label className="inline-flex items-center gap-2 text-xs">
              Publish Access
              <span className={`relative h-6 w-11 rounded-full transition-colors ${d.p ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${d.p ? "translate-x-5" : "translate-x-0.5"}`} />
              </span>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminCourses() {
  return (
    <Card>
      <SectionTitle hint="Define structure for a new course">Create Course</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Course published"); }} className="grid sm:grid-cols-2 gap-4">
        <Field label="Course Name" defaultValue="Quantum Computing" />
        <Field label="Code" defaultValue="CSE-705" />
        <Field label="Modules" defaultValue="6" />
        <Field label="Duration (weeks)" defaultValue="16" />
        <Field label="Credits" defaultValue="4" />
        <Field label="Department" defaultValue="CSE" />
        <button className="sm:col-span-2 justify-self-end rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Save Course</button>
      </form>
    </Card>
  );
}

function AdminTimetable() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle hint="AI-generated conflict-free schedule">Timetable Generator</SectionTitle>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--mint)]/30 px-3 py-1 text-xs font-medium">
          <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--mint)]" />
          Dynamic Clash Detection Active — 0 Overlaps Found
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`rounded-xl p-3 text-xs text-center font-medium bg-[color:var(--${["ice","lavender","teal","mint"][i%4]})]/25`}>
            Slot {i + 1}
          </div>
        ))}
      </div>
      <button onClick={() => toast.success("Timetable regenerated")} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Regenerate</button>
    </Card>
  );
}

function AdminFee() {
  return (
    <Card>
      <SectionTitle hint="Configure semester fee structure">Fee Configuration</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Fee structure updated"); }} className="grid sm:grid-cols-2 gap-4">
        <Field label="Tuition Fee" defaultValue="₹38,000" />
        <Field label="Library Fee" defaultValue="₹2,500" />
        <Field label="Lab Fee" defaultValue="₹3,500" />
        <Field label="Due Date" defaultValue="2026-07-15" />
        <Field label="Late Fine /day" defaultValue="₹100" />
        <Field label="Installments" defaultValue="2" />
        <button className="sm:col-span-2 justify-self-end rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Save Configuration</button>
      </form>
    </Card>
  );
}

function AdminExam() {
  const [locked, setLocked] = useState(true);
  return (
    <Card>
      <SectionTitle hint="Lock or release term grades to student accounts">Examination Master Switch</SectionTitle>
      <div className="flex items-center justify-between rounded-2xl border border-border p-5">
        <div>
          <div className="font-medium">Grade visibility — Sem VI</div>
          <div className="text-xs text-muted-foreground">{locked ? "Grades are currently HIDDEN from students" : "Students can now view their final grades"}</div>
        </div>
        <button
          onClick={() => { setLocked(!locked); toast.success(`Grades ${locked ? "released" : "locked"}`); }}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:shadow-lift ${locked ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}
        >
          {locked ? "Release Grades" : "Lock Grades"}
        </button>
      </div>
    </Card>
  );
}

function AdminGlobalNotice() {
  return (
    <Card>
      <SectionTitle hint="Push to every active session">Global Banner</SectionTitle>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Banner is now live across all portals"); }} className="space-y-4">
        <Field label="Banner Headline" defaultValue="Winter Break — Dec 22 to Jan 4" />
        <Field label="Audience" defaultValue="All Users" />
        <Field label="Priority" defaultValue="High" />
        <button className="ml-auto block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-lift transition-all">Publish Banner</button>
      </form>
    </Card>
  );
}

function AdminLiveStreams() {
  const streams = [
    { t: "ML — Live Lab", server: "us-east-1", health: "Healthy" },
    { t: "DB — Indexing", server: "us-west-2", health: "Healthy" },
    { t: "OS — Concurrency", server: "ap-south-1", health: "Degraded" },
  ];
  return (
    <div className="space-y-3">
      {streams.map((s) => (
        <Card key={s.t} className="flex items-center justify-between hover-lift">
          <div className="flex items-center gap-3">
            <Radio className={`h-5 w-5 ${s.health === "Healthy" ? "text-[color:var(--mint)]" : "text-destructive"}`} />
            <div>
              <div className="font-medium">{s.t}</div>
              <div className="text-xs text-muted-foreground">{s.server}</div>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs ${s.health === "Healthy" ? "bg-[color:var(--mint)]/30" : "bg-destructive/15 text-destructive"}`}>{s.health}</span>
        </Card>
      ))}
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="md:col-span-2">
        <SectionTitle hint="Comparative department performance">Department Metrics</SectionTitle>
        <div className="space-y-3">
          {[
            { d: "CSE", v: 92 }, { d: "ECE", v: 84 }, { d: "MECH", v: 76 }, { d: "CIVIL", v: 71 },
          ].map((r) => (
            <div key={r.d}>
              <div className="flex justify-between text-sm"><span>{r.d}</span><span className="font-medium">{r.v}%</span></div>
              <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-primary transition-all duration-700" style={{ width: `${r.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Fee Collections</SectionTitle>
        <div className="font-display text-4xl font-semibold">₹2.4Cr</div>
        <p className="text-xs text-muted-foreground">94% of target — Q3 FY26</p>
        <div className="mt-4 flex gap-1 h-20 items-end">
          {[40, 55, 70, 62, 80, 91, 85, 94].map((v, i) => (
            <div key={i} className="flex-1 rounded-md bg-gradient-primary transition-all" style={{ height: `${v}%` }} />
          ))}
        </div>
      </Card>
      <Card className="md:col-span-3">
        <SectionTitle hint="Year-over-year">Seasonal Attendance Trends</SectionTitle>
        <div className="flex gap-2 h-32 items-end">
          {[78, 82, 88, 84, 76, 70, 85, 91, 88, 86, 92, 89].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md bg-[color:var(--lavender)]/60 transition-all" style={{ height: `${v}%` }} />
              <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- ATOMS ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-gradient-card p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-xl font-semibold">{value}</div>
    </div>
  );
}

function Field({ label, defaultValue, className = "" }: { label: string; defaultValue?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--ring)] focus:ring-4 focus:ring-[color:var(--ring)]/15 transition-all"
      />
    </div>
  );
}
