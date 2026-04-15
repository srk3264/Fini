import { useEffect, useState } from "react";
import leafImg from "../../assets/leaf.png";
import { useNavigate } from "react-router";
import { databases } from "../utils/appwrite";
import { Query } from "appwrite";
import { useAuth } from "../contexts/AuthContext";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL;


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
// Figma-inspired mood bubble colors
const moodBubbleColors: Record<string, string> = {
  very_bad: "#E86A2A",   // angry (orange-red)
  bad: "#FFCF48",        // neutral (yellow)
  neutral: "#9BCCFF",    // calm (blue)
  good: "#7DC66B",       // happy (green)
  very_good: "#4CAF50",  // very happy (darker green)
};

export default function AIInsights() {
  const navigate = useNavigate();
  const { user } = useAuth();
if (!user) {
  return <div className="text-center py-12 text-gray-400">Please sign in to view insights.</div>;
}
  const [quote, setQuote] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [moodData, setMoodData] = useState<MoodEntry[]>([]); // To be replaced with real data

  useEffect(() => {
  async function fetchQuote() {
    const quote_prompt = `
Generate a short motivational quote and its author for a journaling app user.
Respond in this exact JSON format: {"quote": "...", "author": "..."}
`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [{ role: "user", content: quote_prompt }]
        })
      });

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "";

      let quote = "";
      let author = "";

      try {
        // Try direct JSON parse
        ({ quote, author } = JSON.parse(aiText));
      } catch {
        // Try to extract JSON substring
        const match = aiText.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            ({ quote, author } = JSON.parse(match[0]));
          } catch {
            // fallback below
          }
        }
      }

      if (!quote) {
        setQuote("Stay positive and keep journaling!");
        setQuoteAuthor("Finn AI");
      } else {
        setQuote(quote);
        setQuoteAuthor(author);
      }
    } catch (e) {
      setQuote("Stay positive and keep journaling!");
      setQuoteAuthor("Finn AI");
    }
  }

  fetchQuote();
}, []);

  useEffect(() => {
  const fetchMoods = async () => {
    try {
      if (!user) return;
      const res = await databases.listDocuments(
        "69c1cbed0025338ed999",
        "journal_entries",
        [
          Query.equal("userId", [user.id]), // Only fetch current user's entries
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
}, [user]);

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
      fontSize: 24,
      fontFamily: 'MuseoModerno',
      fontWeight: 200,
      lineHeight: '24px',
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
  <div
  style={{
    color: 'black',
    fontSize: 15,
    fontFamily: 'DM Sans',
    fontWeight: 400,
    lineHeight: '20px',
    wordWrap: 'break-word',
    marginBottom: 16
    
  }}
>
  Monthly Mood Bubbles
</div>
  
  <div style={{ height: 16 }} /> {/* Add space between title and bubbles */}
  <div
    style={{
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      display: 'flex',
      flexDirection: 'row',
      gap: 32,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      minHeight: 180,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      marginBottom: 8,
      maxWidth: 400      
    }}
  >
    {Object.entries(moodCounts)
    .filter(([mood]) => ["very_bad", "bad", "neutral", "good", "very_good"].includes(mood))
    .map(([mood, count]) => {
      const minBubble = 48;
      const maxBubble = 120;
      const moodCountValues = Object.values(moodCounts);
      const maxCount = Math.max(...moodCountValues, 1);
      const size = minBubble + ((count / maxCount) * (maxBubble - minBubble));
      return (
        <div key={mood} className="flex flex-col items-center" style={{ minWidth: size }}>
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: moodBubbleColors[mood],
              opacity: 0.8,
              border: "2px solid #fff",
              marginBottom: 4,
              
            }}
          />
          <span className="text-xs text-gray-500 capitalize">{mood.replace("_", " ")}</span>
          <span className="text-xs text-gray-400">{count}</span>
        </div>
      );
    })}
  </div>
</div>
    </div>
          </div>
  );
}
