import React, { useState } from "react";
export default function Progress() {
  return (
    <div className="flex justify-center items-center gap-6">
      <progress
        className="progress progress-accent w-56 bg-red-200"
        value="10"
        max="21"
      ></progress>
      <h2>10/21</h2>
    </div>
  );
}
