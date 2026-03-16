"use client";

import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/Nav/Nav";

export default function LoginPage() {

  const handleLogin = () => {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

   if (name === storedUser.name && password === storedUser.password) {
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "/";
} else {
  alert("Invalid credentials");
}

  };

  return (
    <>
      <Nav />

      <div className={styles.page}>
        <div className={styles.imageSection}>
          <Image
            src="/assets/demo.jpg"
            alt="Brain Scan"
            fill
            className={styles.bgImage}
            priority
          />
        </div>

        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2>Welcome Back!</h2>

            <label>Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
            />

            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />

            {/* 🔴 IMPORTANT */}
            <button type="button" onClick={handleLogin}>
              Log In
            </button>

            <p className={styles.signup}>
              Don’t have an account? <Link href="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
