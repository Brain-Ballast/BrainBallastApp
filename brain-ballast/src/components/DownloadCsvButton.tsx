import React from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const btnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: "#2563eb", 
  color: "#fff",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
};

const DownloadCsvButton: React.FC<{ filename?: string; className?: string }> = ({
  filename = "sensor-data.csv",
}) => {
  const onDownload = async () => {
    try {
      const resp = await fetch(`${API_BASE}/api/download`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Download failed.");
    }
  };

  return (
    <button onClick={onDownload} style={btnStyle}>
      Download CSV
    </button>
  );
};

export default DownloadCsvButton;