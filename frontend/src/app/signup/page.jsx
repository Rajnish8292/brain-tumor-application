"use client";

import styles from "./signup.module.css";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/Nav/Nav";

export default function SignupPage() {

  const handleSignup = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!name || !email || !password || !confirm) {
      alert("All fields are required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully");

    // ✅ redirect to login
    window.location.href = "/login";
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
            <h2>Create Account</h2>

            <label>Full Name</label>
            <input id="name" type="text" placeholder="Enter your full name" />

            <label>Email</label>
            <input id="email" type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input id="password" type="password" placeholder="Create a password" />

            <label>Confirm Password</label>
            <input id="confirm" type="password" placeholder="Re-enter password" />

            {/* 🔴 THIS WAS MISSING */}
            <button type="button" onClick={handleSignup}>
              Create Account
            </button>

            <p className={styles.login}>
              Already have an account? <Link href="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
