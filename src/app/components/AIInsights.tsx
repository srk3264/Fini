import { useEffect, useState } from "react";

// Placeholder for mood data type
type MoodEntry = {
  date: string; // YYYY-MM-DD
  mood: "very_bad" | "bad" | "neutral" | "good" | "very_good";
};

// Simple color mapping for moods
const moodColors: Record<string, string> = {
  very_bad: "#e86a2a",
  bad: "#ffcf48",
  neutral: "#9bccff",
  good: "#7dc66b",
  very_good: "#4caf50",
};

export default function AIInsights() {
  const [quote, setQuote] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [moodData, setMoodData] = useState<MoodEntry[]>([]); // To be replaced with real data

  // Fetch a motivational quote
  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data[0]) {
          setQuote(data[0].q);
          setQuoteAuthor(data[0].a);
        }
      })
      .catch(() => {
        setQuote("Stay positive and keep journaling!");
        setQuoteAuthor("Finn AI");
      });
  }, []);

  // Placeholder: generate fake mood data for the last 7 days
  useEffect(() => {
    const moods = ["very_bad", "bad", "neutral", "good", "very_good"];
    const today = new Date();
    const data: MoodEntry[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      data.unshift({
        date: d.toISOString().slice(0, 10),
        mood: moods[Math.floor(Math.random() * moods.length)] as MoodEntry["mood"],
      });
    }
    setMoodData(data);
  }, []);

  // Helper for mood to y-value
  const moodToY = (mood: string) => {
    switch (mood) {
      case "very_bad": return 0;
      case "bad": return 1;
      case "neutral": return 2;
      case "good": return 3;
      case "very_good": return 4;
      default: return 2;
    }
  };

  // Get last 7 days for line graph
  const last7 = moodData.slice(-7);

  // Get monthly mood counts for bubble chart
  const moodCounts = moodData.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-8 p-6 w-full max-w-xl mx-auto">
      {/* Quote Section */}
      <div className="bg-[#f9f9f9] rounded-2xl p-6 shadow flex flex-col items-center">
        <p className="text-lg font-medium text-center mb-2">“{quote}”</p>
        <p className="text-sm text-gray-500 text-center">— {quoteAuthor}</p>
      </div>

      {/* Mood Graph (last 7 days) */}
      <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
        <h2 className="text-base font-semibold mb-4">Mood This Week</h2>
        <svg width="100%" height="80" viewBox="0 0 210 80" className="w-full">
          {/* Axes */}
          <line x1="20" y1="10" x2="20" y2="70" stroke="#ccc" strokeWidth="1" />
          <line x1="20" y1="70" x2="200" y2="70" stroke="#ccc" strokeWidth="1" />
          {/* Mood line */}
          <polyline
            fill="none"
            stroke="#7dc66b"
            strokeWidth="3"
            points={last7.map((m, i) => `${30 + i * 28},${70 - moodToY(m.mood) * 15}`).join(" ")}
          />
          {/* Dots */}
          {last7.map((m, i) => (
            <circle
              key={i}
              cx={30 + i * 28}
              cy={70 - moodToY(m.mood) * 15}
              r={6}
              fill={moodColors[m.mood]}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
        </svg>
        <div className="flex justify-between w-full mt-2 text-xs text-gray-400">
          {last7.map((m, i) => (
            <span key={i} className="w-8 text-center">
              {new Date(m.date).toLocaleDateString(undefined, { weekday: "short" })}
            </span>
          ))}
        </div>
      </div>

      {/* Monthly Mood Bubble Chart */}
      <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
        <h2 className="text-base font-semibold mb-4">Monthly Mood Bubbles</h2>
        <div className="flex gap-4 justify-center items-end h-24">
          {Object.entries(moodCounts).map(([mood, count]) => (
            <div key={mood} className="flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: 24 + count * 4,
                  height: 24 + count * 4,
                  background: moodColors[mood],
                  opacity: 0.8,
                  border: "2px solid #fff",
                  marginBottom: 4,
                }}
              />
              <span className="text-xs text-gray-500 capitalize">{mood.replace("_", " ")}</span>
              <span className="text-xs text-gray-400">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
