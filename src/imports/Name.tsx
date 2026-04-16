import React, { useRef, useState } from "react";
import { databases, DATABASE_ID, PROFILES_COLLECTION_ID, ID, account } from "../app/utils/appwrite";

const BackIcon = () => (
  <svg width="16" height="16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Name: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGo = async () => {
    setLoading(true);
    setError("");
    try {
      let userId;
      try {
        const user = await account.get();
        userId = user.$id;
      } catch {
        userId = undefined;
      }
      await databases.createDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        userId || ID.unique(),
        { nickname }
      );
      // TODO: Navigate to next screen or show success
    } catch (err) {
      setError("Failed to save nickname. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-4">
      {/* Top Section */}
      <div className="mb-8">
        {/* Header */}
        <div className="flex items-center justify-between h-14">
          <button>
            <BackIcon />
          </button>
          <div className="font-bold text-base">Journal</div>
          <button className="text-xs text-black/80 font-normal">Skip</button>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 mt-2">
          <div className="h-2 bg-[#FFCF48] rounded-full" style={{ width: "25%" }} />
        </div>
        {/* Prompt */}
        <div className="mb-2">
          <div className="text-lg font-semibold">Please enter your nickname</div>
          <input
            ref={inputRef}
            type="text"
            className="w-full mt-2 text-lg font-normal text-black/80 border-b-2 border-[#FFCF48] focus:outline-none placeholder:text-black/60"
            placeholder="Tap to start writing"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            autoFocus
            disabled={loading}
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="w-full flex flex-col gap-6 mb-8 mt-24">
        <button
          className={`w-full h-12 rounded-full flex items-center justify-center text-lg font-normal transition-opacity ${
            nickname ? "bg-[#FFCF48] opacity-100" : "bg-[#FFCF48] opacity-40"
          }`}
          disabled={!nickname || loading}
          onClick={handleGo}
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Name;