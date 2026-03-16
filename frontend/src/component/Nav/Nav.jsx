"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Left side */}
      <div className={styles.left}>
        <Image
          src={logo.src}
          alt="Brain Tumor Detection"
          width={40}
          height={40}
        />
        <span className={styles.title}>
          Brain Tumor <br /> Detection System
        </span>
      </div>

      {/* Right side */}
      <div className={styles.right}>
        <Link href="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Link href="/upload" className={styles.link}>
          Upload Scans
        </Link>
        <button className={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}
