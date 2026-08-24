"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار رمز عبور یکسان نیستند.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "ثبت‌نام ناموفق بود");
      }

      setSuccess("ثبت‌نام با موفقیت انجام شد! 🎉");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
          ثبت‌نام در S&P
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          حساب کاربری خودت رو بساز
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <input
            name="name"
            type="text"
            placeholder="نام و نام خانوادگی"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

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
            minLength={6}
            style={inputStyle}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="تکرار رمز عبور"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
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
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#666",
          }}
        >
          قبلاً حساب ساخته‌ای؟
          {" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{
              border: "none",
              background: "none",
              color: "#315c3a",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ورود
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