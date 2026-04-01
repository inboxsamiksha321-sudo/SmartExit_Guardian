import React, { useState } from "react";
import { motion } from "framer-motion";

const priorities = {
  Phone: "high",
  Wallet: "high",
  Keys: "medium",
};

const getColor = (priority) => {
  if (priority === "high") return "text-red-400";
  if (priority === "medium") return "text-yellow-400";
  return "text-gray-300";
};

export default function App() {
  const [mode, setMode] = useState("College");
  const [checklist, setChecklist] = useState(["Wallet", "Phone", "Keys"]);
  const [detected, setDetected] = useState([]);
  const [logs, setLogs] = useState([]);

  const toggleItem = (item) => {
    setDetected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const missing = checklist.filter((i) => !detected.includes(i));

  const simulateEvent = () => {
    const time = new Date().toLocaleTimeString();
    const newLog = `[${time}] ${missing.length > 0 ? "Missing: " + missing.join(", ") : "Safe Exit"}`;
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Carry Assistant</h1>

      {/* Mode Selector */}
      <div className="mb-6">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-black/40 p-2 rounded"
        >
          <option>College</option>
          <option>Gym</option>
          <option>Travel</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Checklist */}
        <div className="bg-white/10 p-5 rounded-xl backdrop-blur">
          <h2 className="text-xl mb-4">Checklist</h2>

          {checklist.map((item) => (
            <div key={item} className="flex justify-between mb-2">
              <span className={getColor(priorities[item])}>
                {item}
              </span>
              <input
                type="checkbox"
                onChange={() => toggleItem(item)}
              />
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="bg-white/10 p-5 rounded-xl backdrop-blur">
          <h2 className="text-xl mb-4">Status</h2>

          {missing.length > 0 ? (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              className="bg-red-500/20 p-4 rounded"
            >
              Missing: {missing.join(", ")}
            </motion.div>
          ) : (
            <div className="bg-green-500/20 p-4 rounded">
              All Good ✅
            </div>
          )}

          <button
            onClick={simulateEvent}
            className="mt-4 bg-blue-500 px-4 py-2 rounded"
          >
            Simulate Exit
          </button>
        </div>

        {/* Last Seen + Logs */}
        <div className="bg-white/10 p-5 rounded-xl backdrop-blur">
          <h2 className="text-xl mb-4">Activity</h2>

          {logs.map((log, i) => (
            <div key={i} className="text-sm text-gray-300 mb-1">
              {log}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}