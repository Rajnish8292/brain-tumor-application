import Navbar from "@/component/Nav/Nav";
import ScanResultCard from "@/component/ResultCard/ResultCard";
import UploadScans from "@/component/UploadScans/UploadScans";
import styles from "./page.module.css";
import AuthGuard from "@/component/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.flexHalfContainer} data-name="upload-section">
          <UploadScans />
        </div>
        <div className={styles.flexHalfContainer} data-name="result-section">
          <div className={styles.heading}>Results (1/1)</div>
          <ScanResultCard
            tumorType={"Glioma Tumor"}
            confidence={95}
            imageUrl="/images/glioma.jpg"
          />
        </div>
      </div>
    </AuthGuard>
  );
}
