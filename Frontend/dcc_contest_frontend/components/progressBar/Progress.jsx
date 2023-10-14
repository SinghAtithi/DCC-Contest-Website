import React, { useState } from "react";
export default function Progress({ progress }) {
  return (
    <div className="flex justify-center items-center gap-6">
      <progress
        className="progress progress-accent w-56 bg-red-200"
        value={progress}
        max="21"
      ></progress>
      <h2>{progress}/21</h2>
    </div>
  );
}
