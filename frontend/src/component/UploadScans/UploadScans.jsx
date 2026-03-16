"use client";
import { FaPlus } from "react-icons/fa6";

import { useRef, useState } from "react";
import styles from "./UploadScans.module.css";

export default function UploadScans() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    if (!selectedFiles) return;
    console.log("Selected files:", selectedFiles);
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload MRI Scans</h2>
      <p className={styles.subheading}>Select MRI Images to Analyze</p>

      {/* Hidden Input - Always rendered so it can be triggered from anywhere */}
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files.length === 0 ? (
        <div
          className={styles.dropzone}
          onClick={() => inputRef.current?.click()}
        >
          <div className={styles.icon}>☁️</div>
          <p className={styles.text}>
            <strong>Drag & Drop</strong> or <span>Browse Files</span>
          </p>
          <small className={styles.note}>JPG, PNG files only.</small>
        </div>
      ) : (
        <div className={styles.fileListContainer}>
          <div
            className={styles.uploadButton}
            onClick={() => inputRef.current?.click()}
          >
            <FaPlus />
          </div>
          {files.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                alt={`MRI Scan ${index + 1}`}
                className={styles.previewImage}
                height={100}
              />
            </div>
          ))}
        </div>
      )}

      <button className={styles.uploadBtn} disabled={files.length === 0}>
        Upload
      </button>
    </div>
  );
}
