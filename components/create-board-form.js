"use client";
import { useState } from "react";

export default function AddBoardForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New board name"
        className="font-sans w-full border border-med-gray rounded px-2 py-1 text-sm"
      />
      <button
        type="submit"
        className="tracking-wide font-sans w-full bg-purple text-white py-1.25 rounded text-sm cursor-pointer"
      >
        + Add Board
      </button>
    </form>
  );
}
