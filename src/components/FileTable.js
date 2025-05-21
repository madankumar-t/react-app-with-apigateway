import React from "react";
import { lockFile, unlockFile } from "../services/api";

function FileTable({ files, locks, username }) {
  const handleLock = async (fileKey) => {
    await lockFile(fileKey, username);
    window.location.reload();
  };

  const handleUnlock = async (fileKey) => {
    await unlockFile(fileKey);
    window.location.reload();
  };

  return (
    <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "2rem" }}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Status</th>
          <th>Locked By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.length === 0 ? (
          <tr><td colSpan="4" style={{ textAlign: "center" }}>No files found in S3 bucket.</td></tr>
        ) : (
          files.map(file => {
            const lock = locks[file];
            return (
              <tr key={file}>
                <td>{file}</td>
                <td>{lock ? "🔒 Locked" : "🔓 Unlocked"}</td>
                <td>{lock ? lock.locked_by : "-"}</td>
                <td>
                  {!lock ? (
                    <button onClick={() => handleLock(file)}>Lock</button>
                  ) : (
                    <button onClick={() => handleUnlock(file)}>Unlock</button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default FileTable;
