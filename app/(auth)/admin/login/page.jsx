"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(32, 0, 64, 0.8))",
          zIndex: 1,
        }}
      ></div>

      {/* AI Image */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          bottom: "10%",
          zIndex: 2,
          maxWidth: "400px",
        }}
      >
        {/* <img
          src="/path-to-ai-image.png" // Replace with the correct image path
          alt="AI Robot"
          style={{
            width: "100%",
            objectFit: "contain",
          }}
        /> */}
      </div>

      {/* Login Box */}
      <div
        style={{
          background: "rgba(34, 34, 34, 0.95)",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(255, 0, 255, 0.3)",
          width: "400px",
          zIndex: 3,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}>
          Admin Login
        </h2>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <label style={{ color: "#bbb" }}>Email</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                marginTop: "0.3rem",
                border: "1px solid #555",
                borderRadius: "4px",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
            {errors.username && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {errors.username.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <label style={{ color: "#bbb" }}>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                marginTop: "0.3rem",
                border: "1px solid #555",
                borderRadius: "4px",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#6a0dad",
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#8a2be2")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6a0dad")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
