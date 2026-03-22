"use client";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./UploadScans.module.css";
import { useAppContext } from "@/context/AppContext";

const USER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMjM5OThAZ21haWwuY29tIiwiaWF0IjoxNzczNjg2NjgyfQ.xsBMbal_2PrMzyR9657F1b1BwSvyiJ6kRbISbIoNjGE";

export default function UploadScans() {
  const { isUploading, setIsUploading } = useAppContext();
  console.log(USER_TOKEN);

  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    if (!selectedFiles) return;
    setFiles((prev) => [...Array.from(selectedFiles), ...prev]);
  };

  const handleUpload = async () => {
    if (files.length == 0) return;

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const req = await fetch("/api/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
        body: formData,
      });
      const data = await req.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload MRI Scans</h2>

      <p className={styles.subheading}>
        {files.length > 0 ? (
          <span>Total selected file {files.length}</span>
        ) : (
          <span>Select MRI Images to Analyze</span>
        )}
      </p>

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
            <motion.div
              key={file.name + file.lastModified}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={styles.previewItem}
              style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className={styles.deleteOverlay}
                onClick={() => {
                  setFiles((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <div className={styles.deleteIcon}>
                  <MdDelete />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button
        className={styles.uploadBtn}
        disabled={files.length === 0}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
