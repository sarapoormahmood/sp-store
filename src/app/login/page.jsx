"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "ورود ناموفق بود");
      }

      setSuccess("ورود با موفقیت انجام شد! 🎉");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f5ed",
        direction: "rtl",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#315c3a",
            marginBottom: "10px",
          }}
        >
          ورود به S&P
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          به حساب کاربری خودت وارد شو
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="ایمیل"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="رمز عبور"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && (
            <p
              style={{
                color: "#b42318",
                background: "#fdecec",
                padding: "10px",
                borderRadius: "8px",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: "#315c3a",
                background: "#edf5ef",
                padding: "10px",
                borderRadius: "8px",
                margin: 0,
              }}
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              background: "#315c3a",
              color: "white",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#666",
          }}
        >
          هنوز حساب نداری؟
          {" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            style={{
              border: "none",
              background: "none",
              color: "#315c3a",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ثبت‌نام
          </button>
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  direction: "rtl",
};