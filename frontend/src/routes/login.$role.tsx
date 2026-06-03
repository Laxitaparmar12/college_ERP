import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login/$role")({
  component: LoginPage,
});

function LoginPage() {
  const { role } = useParams({ from: "/login/$role" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // LoginPage function ke andar ye update karein:
const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const form = e.target as HTMLFormElement;
  const username = form.querySelectorAll('input')[0].value;
  const password = form.querySelectorAll('input')[1].value;

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    console.log("LOGIN RESPONSE:", response);
    
    const res = await response.json();

  if (response.ok) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("user", JSON.stringify(res.user));

    navigate({ to: "/dashboard/$role", params: { role } });
  } else {
      toast.error(res.error || "Login Failed");
    }
  } catch (err) {
    toast.error("Backend server connection failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 p-8 border rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Login as {role}</h2>
      <input name="username" placeholder="Username" required className="w-full p-3 mb-4 border rounded-xl" />
      <input name="password" type="password" placeholder="Password" required className="w-full p-3 mb-4 border rounded-xl" />
      <button disabled={loading} className="w-full bg-black text-white p-3 rounded-xl">
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}
