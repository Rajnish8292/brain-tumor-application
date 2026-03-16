import React from "react";
import styles from "./ResultCard.module.css";
import Image from "next/image";



const ScanResultCard = ({ tumorType, confidence, imageUrl }) => {
  const isHighConfidence = confidence >= 80;

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>Scan Analysis Results</h4>

      <div className={styles.content}>
        {/* MRI Image */}
        <div className={styles.imageBox}>
          <img src="/assets/demo.jpg" alt="MRI Scan" />

        </div>

        {/* Info */}
        <div className={styles.info}>
          <h3>{tumorType}</h3>

          <p>
            Confidence: <span>{confidence}%</span>
          </p>

          <div className={styles.badge}>🔥 {tumorType}</div>
        </div>
      </div>

      {isHighConfidence && (
        <div className={styles.status}>❤️ High Confidence Detected</div>
      )}
    </div>
  );
};

export default ScanResultCard;
