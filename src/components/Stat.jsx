import React from "react";

export default function Stat({ label, value }) {
  return (
    <div className="p-3 border rounded text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
