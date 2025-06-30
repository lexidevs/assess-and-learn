// TODO: so much styling

import { useState } from "preact/hooks";

type AuthMode = "login" | "register";

export function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "register") {
        const response = await fetch(
          "http://localhost:3001/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username: email, password }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert("Registration successful! You can now log in.");
          setMode("login");
        } else {
          setError(data.message || "Registration failed");
        }
      } else {
        const response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Login successful!");
          window.location.href = "/"; // Redirect to home or assessment page
        } else {
          setError(data.message || "Login failed");
        }
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit as any}>
        {/* If register, show name field */}
        {mode === "register" && (
          <div>
            <label>
              Name:
              <input
                type="text"
                required
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
              />
            </label>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <label>
            Email:
            <input
              type="email"
              required
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>
            Password:
            <input
              type="password"
              required
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
        <button type="submit" style={{ marginTop: 16 }}>
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        {mode === "login" ? (
          <span>
            Don't have an account?{" "}
            <button type="button" onClick={() => setMode("register")}>
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button type="button" onClick={() => setMode("login")}>
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
