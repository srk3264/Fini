import { useEffect, useState } from "react";
import leafImg from "../../assets/leaf.png";
import { useNavigate } from "react-router";
import { databases } from "../utils/appwrite";
import { Query } from "appwrite";


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
const moodScore: Record<MoodEntry["mood"], number> = {
  very_bad: -2,
  bad: -1,
  neutral: 0,
  good: 1,
  very_good: 2,
};

export default function AIInsights() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [moodData, setMoodData] = useState<MoodEntry[]>([]); // To be replaced with real data

  // Fetch a motivational quote
  useEffect(() => {
fetch("https://api.allorigins.win/raw?url=https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      setQuote(data.content);
      setQuoteAuthor(data.author);
    })
    .catch(() => {
      setQuote("Stay positive and keep journaling!");
      setQuoteAuthor("Finn AI");
    });
}, []);

  useEffect(() => {
  const fetchMoods = async () => {
    try {
      const res = await databases.listDocuments(
        "69c1cbed0025338ed999",
        "journal_entries",
        [
          Query.limit(1000)
        ]
      );

      const data: MoodEntry[] = res.documents.map((doc: any) => ({
        date: doc.$createdAt.slice(0, 10), // YYYY-MM-DD
        mood: doc.mood,
      }));

      setMoodData(data);
    } catch (err) {
      console.error("Failed to fetch moods", err);
    }
  };

  fetchMoods();
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

  

  // Get monthly mood counts for bubble chart
  const moodCounts = moodData.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const latestDate = new Date(); // always today

const moodEntriesByDate = moodData.reduce((acc, entry) => {
  const key = entry.date;

  if (!acc[key]) acc[key] = [];
  acc[key].push(entry);

  return acc;
}, {} as Record<string, MoodEntry[]>);
console.log('Apr 11 entries', moodEntriesByDate['2026-04-11']);


// Build last 7 days ending with latestDate, using average score (default to neutral/3)
const last7 = Array.from({ length: 7 }, (_, i) => {
    
  const d = new Date(latestDate);
  d.setDate(latestDate.getDate() - (6 - i));
  const dateStr = d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
  
  // Find the most common mood for that day (for color), fallback to neutral
  const entries = moodEntriesByDate[dateStr] || [];

let sumScore = 0;

if (entries.length > 0) {
  sumScore = entries.reduce(
    (sum, e) => sum + moodScore[e.mood],
    0
  );
}

return { date: dateStr, avgScore: sumScore };
});
console.log('last7 mood graph data', last7);

  return (
     <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex', paddingLeft: 16,
      paddingRight: 16}}>
    <div style={{alignSelf: 'stretch', paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <button
      
  onClick={() => navigate('/journal')}
  style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <div style={{color: 'black', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 700, lineHeight: '20px', wordWrap: 'break-word'}}>AI Insights</div>
      <div style={{opacity: 0, color: 'rgba(0, 0, 0, 0.87)', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '15.6px', wordWrap: 'break-word'}}>Skip</div>
    </div>

    <div className="flex flex-col gap-14 p-0 w-full max-w-xl mx-auto">
        <div style={{ marginTop: 12 }} />
      {/* Quote Section */}
      <div style={{
  width: '100%',
  height: '100%',
  padding: 16,
  background: 'white',
  borderRadius: 16,
  outline: '1px rgba(0, 0, 0, 0.12) solid',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 18,
  display: 'inline-flex'
}}>
  <img src={leafImg} alt="decorative leaf" style={{ width: 36, height: 97, transform: "scaleX(-1)"}} />
  <div style={{
    flex: '1 1 0',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    display: 'inline-flex'
  }}>
    <div style={{
      color: 'black',
      fontSize: 15,
      fontFamily: 'DM Sans',
      fontWeight: 400,
      lineHeight: '20px',
      wordWrap: 'break-word'
    }}>Quote</div>
    <div style={{
      alignSelf: 'stretch',
      textAlign: 'center',
      color: 'black',
      fontSize: 16,
      fontFamily: 'MuseoModerno',
      fontWeight: 200,
      lineHeight: '22.4px',
      wordWrap: 'break-word'
    }}>“{quote}”</div>
    <div style={{
      alignSelf: 'stretch',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.38)',
      fontSize: 13,
      fontFamily: 'DM Sans',
      fontWeight: 400,
      lineHeight: '18px',
      wordWrap: 'break-word'
    }}>-{quoteAuthor || 'anonymous'}</div>
  </div>
  <img src={leafImg} alt="decorative leaf" style={{ width: 36, height: 97 }} />
</div>

      {/* Mood Graph (last 7 days) */}
      <div style={{
  width: '100%',
  height: '100%',
  padding: 16,
  background: 'white',
  borderRadius: 16,
  outline: '1px rgba(0, 0, 0, 0.12) solid',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 16,
  display: 'inline-flex'
}}>
  <div style={{
    alignSelf: 'stretch',
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: 'DM Sans',
    fontWeight: 400,
    lineHeight: '20px',
    wordWrap: 'break-word'
  }}>Daily Emotional Graph</div>
  
  <div
  style={{
    alignSelf: 'stretch',
    overflowX: 'auto', // Enable horizontal scroll
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    minWidth: 350 // Ensures enough space for 7+ labels
  }}
>
  {last7.map((d, i) => {
  const height = Math.min(Math.abs(d.avgScore ?? 0) * 35, 110);

  return (
    <div
      key={i}
     style={{
    width: 40,
    height: 120,              // 🔥 FIX: force same column height
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", // baseline locked
    alignItems: "center",
  }}
>
      <div
  style={{
    width: 12,
    height,
    background: (d.avgScore ?? 0) >= 0 ? "#4caf50" : "#e86a2a",
    borderRadius: 6
  }}
/>

<div
  style={{
    fontSize: 10,
    color: "rgba(0,0,0,0.6)",
    height: 14,                 // fixed slot
    display: "flex",
    alignItems: "flex-end",     // 🔥 locks baseline
    justifyContent: "center",
    marginTop: 6,
  }}
>
  {d.date.slice(5, 10)}
</div>
    </div>
  );
})}
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
          </div>
  );
}
