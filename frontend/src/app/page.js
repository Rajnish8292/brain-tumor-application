"use client";

import Navbar from "@/component/Nav/Nav";
import ScanResultCard from "@/component/ResultCard/ResultCard";
import UploadScans from "@/component/UploadScans/UploadScans";
import styles from "./page.module.css";
import AuthGuard from "@/component/AuthGuard";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { uploadResults, isUploading } = useAppContext();
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.flexHalfContainer} data-name="upload-section">
          <UploadScans />
        </div>
        <div className={styles.flexHalfContainer} data-name="result-section">
          {/* <div className={styles.heading}>Results (1/1)</div> */}
          {/* <ScanResultCard
              tumorType={"Glioma Tumor"}
              confidence={95}
              imageUrl="/images/glioma.jpg"
            /> */}
          {/* <h2>no results</h2> */}

          {!uploadResults && <h2>no results</h2>}

          {uploadResults && (
            <div className={styles.heading}>
              Results (1/{uploadResults.length})
            </div>
          )}
        </div>
      </div>
    </>
  );
}
