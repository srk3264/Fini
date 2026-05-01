import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import imgBack from "../../assets/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgMenuVertical from "../../assets/b2774143423e71485a704f9730d2a104faf4226b.png";
import imgLock from "../../assets/ef753b695b0845109003a51fdcf17838a0edde82.png";
import imgXlargeIcons from "../../assets/951682e4223c22ec85fa3820295fece43cc29eab.png";
import imgMicrophone from "../../assets/f6e225d1d7bed07d025a199c40de73151fac42c5.png";
import imgSignUp from "../../assets/f387def340aeea59ee5b04bffb6cadb926a90695.png";
import imgDelete from "../../assets/6161d1e0b2947f1636808ce7b712646d605ee7e8.png";
import { createEntry, listMyEntries } from "../utils/journal";
import { useAuth } from "../contexts/AuthContext";
import { VoiceModal } from "./VoiceModal";
import { getProfile } from "../utils/profile"; // add at top if missing
import mascotListening from "../../assets/Finis.png";
import mascotProcessing from "../../assets/Finis-1.png";
import mascotResponse from "../../assets/Finis-2.png";
import winkSentiment from 'wink-sentiment';
import { Client, Functions, Account } from "appwrite";
import { updateEntry } from "../utils/journal";
import { deleteEntry } from "../utils/journal";

interface TextSegment {
  text: string;
  tag?: "reflections" | "health" | "todo" | "reminders";
  mood?: "positive" | "negative" | "neutral";
}

interface JournalEntry {
  
  id: string;
  time: string;
  segments: TextSegment[];
}

function getMood(text: string): "positive" | "negative" | "neutral" {
  const result = winkSentiment(text);
  if (result.score > 0) return "positive";
  if (result.score < 0) return "negative";
  return "neutral";
}

// Appwrite proxy for segment tagging
const client = new Client();
client
  .setEndpoint("https://sfo.cloud.appwrite.io/v1") // or your self-hosted endpoint
  .setProject("69c1cb9a00318d9dea10"); // <-- replace with your Appwrite project ID

const functions = new Functions(client);
const account = new Account(client);

async function getTag(
  text: string
): Promise<"reflections" | "health" | "todo" | "reminders" | undefined> {
  const candidateLabels = ["reflections", "health", "todo", "reminders"];

  try {
    await account.get();

    const execution = await functions.createExecution(
      "69d85ed70025a371e4e5",
      JSON.stringify({ text, candidate_labels: candidateLabels }),
      false
    );

    let data: any = null;

try {
  const raw = (execution as any)?.responseBody;

  console.log("Raw responseBody:", raw);

  if (!raw || typeof raw !== "string") {
    console.warn("Empty or non-string responseBody");
    return undefined;
  }

  // sometimes Appwrite returns plain text or extra whitespace
  const cleaned = raw.trim();

  if (!cleaned) {
    console.warn("Empty responseBody string");
    return undefined;
  }

  data = JSON.parse(cleaned);
} catch (e) {
  console.warn("JSON parse failed (responseBody not valid JSON):", e);
  return undefined;
}

    console.log("Appwrite execution object:", execution);
    console.log("Tag response:", data);

    if (data?.label && typeof data?.score === "number") {
      return data.score >= 0.5
        ? (data.label as "reflections" | "health" | "todo" | "reminders")
        : undefined;
    }

    return undefined;
  } catch (e) {
    console.error("getTag error", e);
    return undefined;
  }
}
   

export default function Journal() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFirstEverEntry, setIsFirstEverEntry] = useState(true);
  const [hasEntriesToday, setHasEntriesToday] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const isSubmittingRef = useRef(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [showTagMenu, setShowTagMenu] = useState<{
    entryId: string;
    segmentIndex: number;
    x: number;
    y: number;
  } | null>(null);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [swipedEntryId, setSwipedEntryId] = useState<string | null>(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
const [voiceState, setVoiceState] = useState<"listening"|"processing"|"response">("listening");
const [voiceStatus, setVoiceStatus] = useState<string|undefined>(undefined);
const [voiceReply, setVoiceReply] = useState("");
const [voiceReady, setVoiceReady] = useState(false);
const [voiceBuffer, setVoiceBuffer] = useState<string[]>([]);
const [aiPersona, setAiPersona] = useState<string>("");
const openVoice = () => {
setVoiceReady(false); // ensure disabled at the start
setVoiceOpen(true);
setVoiceState("listening");
setVoiceStatus(undefined);
};

const confirmVoice = async () => {
if (voiceState === "processing") return;
setVoiceState("processing");
setVoiceStatus("Processing…");
};

const closeVoice = () => {
  const combined = voiceBuffer.join(" ").trim();

  // ✅ CLOSE UI IMMEDIATELY
  setVoiceBuffer([]);
  setVoiceOpen(false);
  setVoiceState("listening");
  setVoiceStatus(undefined);
  setVoiceReply("");

  // ✅ Save in background (no await)
  if (combined) {
    saveVoiceEntry(combined).catch((e) =>
      console.warn("ui.voice:save-on-close:err", e)
    );
  }
};


const handleVoiceButton = async () => {
try {
if (!voiceOpen) {
openVoice(); // show modal immediately
try { await navigator.mediaDevices.getUserMedia({ audio: true }); }
catch (e) { console.warn("mic perm", e); }
return;
}
await confirmVoice();
} catch (err) {
console.error("ui.mic:error", err);
}
};
  const [selectedRange, setSelectedRange] = useState<{
    entryId: string;
    start: number;
    end: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiSummaryLoading, setAiSummaryLoading] = useState<boolean>(false);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const getCurrentDate = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  };

 


  const handleStartTyping = () => {
    setIsTyping(true);
    setIsFirstEverEntry(false);
    setHasEntriesToday(true);
  };
  const handleMenuButtonClick = () => {
  setShowMenuPopup((v) => !v);
};

  const handleAddEntryFromValue = async (raw: string) => {
  const text = (raw || "").trim();
  if (!text || isSubmittingRef.current) return;
  isSubmittingRef.current = true;

  const optimistic: JournalEntry = {
  id: `tmp-${Date.now()}`,
  time: getCurrentTime(),
  segments: [{ text }],
  };

  setEntries((prev) => [optimistic, ...prev]);
  setIsFirstEverEntry(false);
  setHasEntriesToday(true);
  setCurrentEntry("");

  try {
    // ...existing code...
    const segs = await Promise.all(
  text
    .split(/([.!?])\s+/)
    .reduce<string[]>((acc, cur, i, arr) => {
      if (i % 2 === 0) {
        const next = arr[i + 1] || "";
        const s = (cur + (/[.!?]/.test(next) ? next : "")).trim();
        if (s) acc.push(s);
      }
      return acc;
    }, [])
    .map(async (t) => {
  const tag = await getTag(t);
  console.log("Segment:", t, "Tag:", tag);
  return tag ? { text: t, tag } : { text: t };
})
);
console.log("Segments to be saved:", segs);
const allowedMoods = ["very_bad", "bad", "neutral", "good", "very_good"];
// Map your getMood output to Appwrite's allowed values
function mapMood(mood: string): string {
  if (mood === "positive") return "good";
  if (mood === "negative") return "bad";
  if (allowedMoods.includes(mood)) return mood;
  return "neutral";
}
const overallMoodRaw = getMood(text);
const overallMood = mapMood(overallMoodRaw);
/* const tags = segs
  .flatMap(s => s.tag ? [s.tag] : []); */
  
const doc = await createEntry({
  content: text,
  segments: JSON.stringify(segs),
  localTime: optimistic.time,
  /* tags, */
  mood: overallMood,
});
  setEntries((prev) =>
    prev.map((e) => (e.id === optimistic.id ? { ...optimistic, id: (doc as any).$id, segments: segs, } : e))
  );
  } catch (err) {
  console.warn("ui.save:text:err", err);
  setEntries((prev) => prev.filter((e) => e.id !== optimistic.id));
  } finally {
  isSubmittingRef.current = false;
  }
  };

  const handleDeleteEntry = async (id: string) => {
  setEntries(entries.filter((entry) => entry.id !== id));
  setSwipedEntryId(null);
  try {
    await deleteEntry(id);
  } catch (e) {
    console.warn("Failed to delete entry:", e);
  }
};

  const allowedMoods = ["very_bad", "bad", "neutral", "good", "very_good"];
function mapMood(mood: string): string {
  if (mood === "positive") return "good";
  if (mood === "negative") return "bad";
  if (allowedMoods.includes(mood)) return mood;
  return "neutral";
}

  const handleTagSegment = async (
  entryId: string,
  segmentIndex: number,
  tag: "reflections" | "health" | "todo" | "reminders"
) => {
  // Prevent double call by disabling menu
  setShowTagMenu(null);

  // Update state immediately
  setEntries((prev) =>
    prev.map((entry) => {
      if (entry.id === entryId) {
        const newSegments = [...entry.segments];
        newSegments[segmentIndex] = {
          ...newSegments[segmentIndex],
          tag,
        };
        return { ...entry, segments: newSegments };
      }
      return entry;
    })
  );

  // Persist the change to the database (update, not create)
  const entryToUpdate = entries.find((e) => e.id === entryId);
  if (entryToUpdate) {
    try {
      await updateEntry(entryId, {
        content: entryToUpdate.segments.map((s) => s.text).join(" "),
        segments: JSON.stringify(entryToUpdate.segments),
        localTime: entryToUpdate.time,
        mood: mapMood(getMood(entryToUpdate.segments.map((s) => s.text).join(" "))),
      });
    } catch (e) {
      console.warn("Failed to save updated tag:", e);
    }
  }
};

  const handleTextSelection = (entryId: string, e: React.MouseEvent | React.TouchEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Find which segment was selected
      const entry = entries.find((e) => e.id === entryId);
      if (entry) {
        let charCount = 0;
        for (let i = 0; i < entry.segments.length; i++) {
          const segmentLength = entry.segments[i].text.length;
          if (charCount + segmentLength >= selection.anchorOffset) {
            const rect = range.getBoundingClientRect();

setShowTagMenu({
  entryId,
  segmentIndex: i,
  x: rect.left + window.scrollX,
  y: rect.bottom + window.scrollY,
});
            break;
          }
          charCount += segmentLength;
        }
      }
    }
  };

  const handleEntryClick = (entryId: string) => {
    // If not selecting text, enter edit mode
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      const entry = entries.find((e) => e.id === entryId);
      if (entry) {
        setEditingEntryId(entryId);
        setEditingText(entry.segments.map((s) => s.text).join(""));
      }
    }
  };

  const handleSaveEdit = async () => {
  if (editingEntryId && editingText.trim()) {
    setEntries(
      entries.map((entry) => {
        if (entry.id === editingEntryId) {
          return {
            ...entry,
            segments: [{ text: editingText }],
          };
        }
        return entry;
      })
    );
    // Update in DB
    try {
      await updateEntry(editingEntryId, {
        content: editingText,
        segments: JSON.stringify([{ text: editingText }]),
        // Add other fields as needed
      });
    } catch (e) {
      console.warn("Failed to update entry:", e);
    }
  }
  setEditingEntryId(null);
  setEditingText("");
};

// Save recognized speech as a journal entry + optimistic UI
// Save recognized speech as a journal entry + optimistic UI
const saveVoiceEntry = async (text: string) => {
  // Instead of splitting/joining, use the buffer as segments
  const buffer = voiceBuffer.map((t) => t.trim()).filter(Boolean);
  if (buffer.length === 0) return;

  const segments = await Promise.all(
  buffer.map(async (t) => ({
    text: t,
    tag: await getTag(t),
  }))
);
const content = buffer.join(" ");
const allowedMoods = ["very_bad", "bad", "neutral", "good", "very_good"];
function mapMood(mood: string): string {
  if (mood === "positive") return "good";
  if (mood === "negative") return "bad";
  if (allowedMoods.includes(mood)) return mood;
  return "neutral";
}
const overallMood = mapMood(getMood(content));
const optimistic = {
  id: `v-${Date.now()}`,
  time: getCurrentTime(),
  segments,
};
setEntries((prev) => [optimistic, ...prev]);
setHasEntriesToday(true);
setIsFirstEverEntry(false);

try {
  const doc = await createEntry({
    content,
    segments: JSON.stringify(segments),
    localTime: optimistic.time,
    mood: overallMood,
  });
  setEntries((prev) =>
    prev.map((e) => (e.id === optimistic.id ? { ...optimistic, id: (doc as any).$id } : e))
  );
} catch (e) {
  console.warn("ui.save:voice:err", e);
  setEntries((prev) => prev.filter((e) => e.id !== optimistic.id));
}
};
// Fetch a short AI reply based on aiPersona
// Persona is passed in; model comes only from env

function trimToTwoSentences(text: string): string {
  const filtered = text
    .replace(/^(okay[,.\s]*|so[,.\s]*|alright[,.\s]*|hmm[,.\s]*)/i, "")
    .replace(/the user (said|is|feels|mentioned)[^.!?]*[.!?]/gi, "")
    .replace(/i (should|need to|will)[^.!?]*[.!?]/gi, "")
    .split(/\n+/)
    .filter((line: string) =>
      !/guidelines|ai assistant|responding to|analysis|let me|first,|they want me/i.test(line.toLowerCase())
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = filtered.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return filtered;
  return sentences.slice(0, 2).join(" ").trim();
}

const fetchOpenRouterReply = async (text: string, persona: string): Promise<string> => {
  const sys =
  (import.meta.env.VITE_OPENROUTER_SYSTEM as string | undefined) ||
  `You are talking directly to the user.

Rules:
- Speak in second person ("you"), never refer to "the user"
- Do NOT describe what you are doing
- Do NOT explain your reasoning
- Do NOT analyze the message
- Do NOT say things like "the user said", "okay", or "first"
- Respond naturally like a real conversation
- Keep it to 1–2 sentences

Just respond to the message.`;

  const body = {
    messages: [
      { role: "system", content: sys },
      { role: "user", content: text },
    ],
    temperature: 0.7,
    max_tokens: 120,
  };

  try {
    const res = await fetch("/.netlify/functions/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("openrouter:status", res.status);
    const data = await res.json();
const raw = (data?.choices?.[0]?.message?.content || "").trim();
return trimToTwoSentences(raw);
  } catch (e) {
    console.warn("openrouter:error", e);
    return "";
  }
};



useEffect(() => {
if (!user) return;
(async () => {
try {
const docs = await listMyEntries();
const mapped = docs.map((d: any) => {
let segs: any = d.segments;
try { if (typeof segs === "string") segs = JSON.parse(segs); } catch {}
const segments = Array.isArray(segs) ? segs : [{ text: d.content }];
return {
id: d.$id,
createdAt: d.$createdAt,
time:
d.localTime ||
new Date(d.$createdAt)
.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
.toLowerCase(),
segments,
};
});

  const now = new Date();
const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
const ordered = mapped
.filter(m => {
const t = new Date(m.createdAt).getTime(); // Appwrite ISO (UTC) → compare in local window
return t >= dayStart && t < dayEnd;
})
.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
.map(({ createdAt, ...rest }) => rest);

setEntries(ordered);
setIsFirstEverEntry(docs.length === 0);
setHasEntriesToday(ordered.length > 0);





} catch (e) {
console.warn("journal.list:err", e);
}
})();
}, [user]);

  const getTagColor = (tag?: "reflections" | "health" | "todo" | "reminders") => {
    switch (tag) {
      case "reflections":
        return "#ffcf48";
      case "health":
        return "#9bccff";
      case "todo":
        return "#7dc66b";
      case "reminders":
        return "#e86a2a";
      default:
        return "transparent";
    }
  };

  const getTagName = (tag: "reflections" | "health" | "todo" | "reminders") => {
    switch (tag) {
      case "reflections":
        return "Reflections";
      case "health":
        return "Health";
      case "todo":
        return "To do";
      case "reminders":
        return "Reminders";
    }
  };

  useEffect(() => {
    if (isTyping && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    if (editingEntryId && editTextareaRef.current) {
      editTextareaRef.current.focus();
    }
  }, [editingEntryId]);

  useEffect(() => {
  (async () => {
    try {
      const res = await getProfile("appwrite-session-active");
      const p = res.success ? res.profile?.aiPersona : null;
      if (p) setAiPersona(String(p));
    } catch (e) {
      console.warn("profile:persona:err", e);
    }
  })();
}, []);

useEffect(() => {
  if (!showMenuPopup) return;
  const handler = (e: MouseEvent) => {
    setShowMenuPopup(false);
  };
  setTimeout(() => {
    window.addEventListener("click", handler);
  }, 0);
  return () => window.removeEventListener("click", handler);
}, [showMenuPopup]);

useEffect(() => {
  // Only run if there are no entries for today and not currently typing
  if (!user || hasEntriesToday || isTyping) return;
  console.log("Fetching AI summary for yesterday...");
  setAiSummaryLoading(true);
  const fetchYesterdaySummary = async () => {
    try {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const yDate = yesterday.toISOString().slice(0, 10);
      // 2. Fetch yesterday's entries
      const docs = await listMyEntries();
      const yEntries = docs.filter((d: any) => {
        const entryDate = new Date(d.$createdAt).toISOString().slice(0, 10);
        return entryDate === yDate;
      });
      if (yEntries.length === 0) {
        setAiSummary("No entries from yesterday.");
        setAiSummaryLoading(false);
        return;
      }
      // 3. Concatenate text
      const text = yEntries.map((d: any) => d.content).join("\n");
      // 4. Call OpenRouter
      const summary = await fetchOpenRouterReply(
        `Summarize these journal entries for me in 2-3 sentences: \n${text}`,
        aiPersona
      );
      setAiSummary(summary || "No summary available.");
    } catch (e) {
      setAiSummary("No summary available.");
    } finally {
      setAiSummaryLoading(false);
    }
  };
  fetchYesterdaySummary();
}, [user, aiPersona, hasEntriesToday, isTyping]);

const micDisabled = voiceState === "processing" || (voiceOpen && !voiceReady);
console.log("ui.mic", { voiceOpen, voiceState, voiceReady, disabled: micDisabled });

  return (
    <div className="content-stretch flex flex-col items-start justify-between px-[16px] relative min-h-screen">
      {/* Header */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="content-stretch flex items-center justify-between py-[16px] relative shrink-0 w-full">
          <button
            onClick={() => navigate(-1)}
            className="relative shrink-0 size-[16px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
          >
            <img
              alt="Back"
              className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
              src={imgBack}
            />
          </button>
          <p className="font-['DM_Sans',sans-serif] font-bold leading-[20px] relative shrink-0 text-[15px] text-black whitespace-nowrap">
            Journal
          </p>
          <button
  className="relative shrink-0 size-[16px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
  onClick={handleMenuButtonClick}
>
  <img
    alt="Menu"
    className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
    src={imgMenuVertical}
  />
</button>
        </div>

        {/* Date and Privacy Badge */}
        <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full">
          <p className="font-['DM_Sans',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[22px] text-black whitespace-nowrap">
            {getCurrentDate()}
          </p>
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <img
                alt="Lock"
                className="absolute inset-0 max-w-none object-contain opacity-38 pointer-events-none size-full"
                src={imgLock}
              />
            </div>
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">
              Your data is protected
            </p>
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="flex-[1_0_0] min-h-px min-w-0 relative w-full overflow-y-auto">
        <div className="content-stretch flex flex-col gap-[24px] items-start py-[24px] relative w-full">
          {/* First Ever Entry - Empty State */}
          {isFirstEverEntry && !isTyping && (
            <div
              className="content-stretch flex flex-col items-end relative shrink-0 w-full cursor-text"
              onClick={handleStartTyping}
            >
              {/* Placeholder view: do not show a timestamp */}
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.38)] min-h-px min-w-0 break-words">
                Start writing your first entry...
              </p>
            </div>
          )}

          {/* AI Summary - First Entry of the Day */}
          {!isFirstEverEntry && !hasEntriesToday && !isTyping && entries.length === 0 && (
            <div
              className="content-stretch flex flex-col items-end relative shrink-0 w-full cursor-text"
              onClick={handleStartTyping}
            >
              {/* AI summary placeholder: hide timestamp */}
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.38)] min-h-px min-w-0 break-words">
                {aiSummary}
              </p>
            </div>
          )}
          {/* Current Entry Being Typed */}
{isTyping && (
  <div className="content-stretch flex flex-row items-end justify-between gap-[16px] relative shrink-0 w-full">
    <textarea
      ref={textareaRef}
      value={currentEntry}
      onChange={(e) => setCurrentEntry(e.target.value)}
      onBlur={(e) => {
      const val = e.currentTarget.value;
      const trimmed = val.trim();
      if (trimmed) setTimeout(() => handleAddEntryFromValue(val), 0);
      // if empty: do nothing → keep timestamp/input visible
      }}
      placeholder={
    !isFirstEverEntry && entries.length === 0
      ? aiSummaryLoading
        ? "Loading summary..."
        : aiSummary
      : "What's on your mind?"
  }
      className="flex-1 min-w-0 font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.87)] bg-transparent border-none outline-none resize-none placeholder:text-[rgba(0,0,0,0.38)]"
      rows={3}
    />
    {currentEntry.trim() !== "" && (
      <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] entry-timestamp whitespace-nowrap">
        {getCurrentTime()}
      </p>
    )}
   {(() => {
      console.log('[JOURNAL PLACEHOLDER DEBUG]', {
        isFirstEverEntry,
        entriesLength: entries.length,
        aiSummary,
        aiSummaryLoading
      });
      return null;
    })()}
  </div>
)}
          {/* Existing Entries */}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="content-stretch flex flex-row items-end justify-between gap-[16px] relative shrink-0 w-full"
              onTouchStart={(e) => {
                const startX = e.touches[0].clientX;
                const startTime = Date.now();
                let moved = false;

                const handleTouchMove = (moveEvent: TouchEvent) => {
                  const currentX = moveEvent.touches[0].clientX;
                  if (Math.abs(startX - currentX) > 10) {
                    moved = true;
                  }
                  if (startX - currentX > 50) {
                    setSwipedEntryId(entry.id);
                  }
                };

                const handleTouchEnd = () => {
                  const endTime = Date.now();
                  if (!moved && endTime - startTime > 500) {
                    // Long press detected
                    handleTextSelection(entry.id, e);
                  }
                  document.removeEventListener("touchmove", handleTouchMove);
                  document.removeEventListener("touchend", handleTouchEnd);
                };

                document.addEventListener("touchmove", handleTouchMove);
                document.addEventListener("touchend", handleTouchEnd);
              }}
            >
              <div className="flex-1 min-w-0 flex flex-col gap-[8px] items-start">
                {editingEntryId === entry.id ? (
                  <textarea
                    ref={editTextareaRef}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    
                    onBlur={() => {
                    handleSaveEdit();
                    setTimeout(() => {
                    setIsTyping(true);
                    if (textareaRef.current) textareaRef.current.focus();
                    }, 0);
                    }}
                    className="w-full font-['DM_Sans',sans-serif] font-normal leading-[22px] text-[17px] text-[rgba(0,0,0,0.87)] bg-transparent border-none outline-none resize-none"
                    rows={3}
                  />
                ) : (
                  <p
                    className="font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.87)] cursor-pointer select-text break-words"
                    onClick={() => handleEntryClick(entry.id)}
                    onMouseUp={(e) => handleTextSelection(entry.id, e)}
                    onTouchEnd={(e) => {
                      setTimeout(() => handleTextSelection(entry.id, e), 100);
                    }}
                  >
                    {entry.segments.map((segment, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: segment.tag
                            ? `${getTagColor(segment.tag)}40`
                            : "transparent",
                        }}
                      >
                        {segment.text}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] entry-timestamp whitespace-nowrap">
                {entry.time}
              </p>

              {/* Delete Button */}
              {swipedEntryId === entry.id && (
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="bg-[#e86a2a] content-stretch flex items-center p-[16px] relative shrink-0 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
                >
                  <div className="relative shrink-0 size-[32px]">
                    <img
                      alt="Delete"
                      className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
                      src={imgDelete}
                    />
                  </div>
                </button>
              )}
            </div>
          ))}

          
        </div>
      </div>

      {/* Tag Menu */}
      {showTagMenu && (
        <div
          className="absolute bg-white content-stretch flex flex-col gap-[8px] items-start px-[12px] py-[8px] rounded-[16px] shadow-lg w-[119px] z-50"
          style={{
            left: `${showTagMenu.x}px`,
            top: `${showTagMenu.y + 8}px`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-[-1px] pointer-events-none rounded-[17px]"
          />
          {(["reflections", "health", "todo", "reminders"] as const).map((tag) => (
            <button
              key={tag}
              onClick={() =>
                handleTagSegment(
                  showTagMenu.entryId,
                  showTagMenu.segmentIndex,
                  tag
                )
              }
              className="content-stretch flex gap-[4px] items-center px-[2px] py-[4px] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.02)]"
            >
              <div
                className="rounded-[33.333px] shrink-0 size-[8px]"
                style={{ backgroundColor: getTagColor(tag) }}
              />
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-medium leading-[1.3] min-h-px min-w-0 relative text-[11px] text-[rgba(0,0,0,0.6)] text-left">
                {getTagName(tag)}
              </p>
            </button>
          ))}
        </div>
      )}

      {showMenuPopup && (
  <div
    style={{
      position: "absolute",
      top: 56, // adjust as needed for your button
      right: 16,
      zIndex: 50,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      width: 240,
      padding: "8px 0",
    }}
  >
    <button className="flex items-center w-full px-5 py-3 gap-3 hover:bg-gray-50 text-black text-base font-normal"
    onClick={() => {
    setShowMenuPopup(false);
    navigate('/insights');
  }}>
      {/* Replace below with your Finn Insights SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wand-sparkles-icon lucide-wand-sparkles"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
      Finn Insights
    </button>
    <div className="border-t border-gray-100 mx-4" />
    <button className="flex items-center w-full px-5 py-3 gap-3 hover:bg-gray-50 text-black text-base font-normal">
      {/* Replace below with your Jlogs SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big-icon lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>
      Jlogs
    </button>
    <div className="border-t border-gray-100 mx-4" />
    <button className="flex items-center w-full px-5 py-3 gap-3 hover:bg-gray-50 text-black text-base font-normal">
      {/* Replace below with your Preferences SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal">
        <path d="M10 5H3"/>
        <path d="M12 19H3"/>
        <path d="M14 3v4"/>
        <path d="M16 17v4"/>
        <path d="M21 12h-9"/>
        <path d="M21 19h-5"/>
        <path d="M21 5h-7"/>
        <path d="M8 10v4"/>
        <path d="M8 12H3"/>
      </svg>
      Preferences
    </button>
    <div className="border-t border-gray-100 mx-4" />
    <button
  className="flex items-center w-full px-5 py-3 gap-3 hover:bg-gray-50 text-black text-base font-normal"
  onClick={async () => {
    try {
      await account.deleteSession('current'); // Appwrite sign out
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      navigate('/sign-in');
    } catch (e) {
      console.warn('Sign out failed', e);
    }
  }}
>
  {/* Optionally add a Sign out SVG */}
  Sign out
</button>
  </div>
)}

      {/* Bottom Action Bar */}
      <div className="content-stretch flex items-center justify-between py-[12px] relative shrink-0 w-full">
        <button className="bg-white content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0 cursor-pointer transition-all hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]">
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
          />
          <div className="relative shrink-0 size-[32px]">
            <img
              alt="Add Image"
              className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
              src={imgXlargeIcons}
            />
          </div>
        </button>
        

        <button
        onClick={voiceOpen ? confirmVoice : handleVoiceButton}
        
        disabled={micDisabled}
        
        className={`
  content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0 cursor-pointer transition-all
  ${micDisabled && voiceState !== "processing"
    ? 'bg-[rgba(33,33,33,0.60)]'
    : (voiceOpen ? 'bg-[#212121]' : 'bg-[#ffcf48]')
  }
`}
        title={voiceOpen ? (voiceState === 'processing' ? 'Processing…' : (voiceReady ? 'Save' : 'Preparing…')) : 'Start voice'}
      >
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
        />
        <div className="relative shrink-0 size-[32px] flex items-center justify-center"> {voiceState === "processing" ? ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-label="Loading" className={`h-6 w-6 animate-spin ${voiceOpen ? "text-white" : "text-black"}`}> <path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/> <path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/> <path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/> </svg> ) : voiceOpen ? ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-label="Save" className={`h-6 w-6 ${voiceOpen ? "text-white" : "text-black"} ${micDisabled ? "opacity-60" : ""}`}> <path d="M20 6 9 17l-5-5"/> </svg> ) : ( <img alt="Voice" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMicrophone} /> )} </div>


      </button>

      <button className="bg-white content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0 cursor-pointer transition-all hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]">
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
        />
        <div className="relative shrink-0 size-[32px]">
          <img
            alt="Draw"
              className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
              src={imgSignUp}
            />
          </div>
        </button>
        <VoiceModal
  open={voiceOpen}
  state={voiceState}
  statusText={voiceStatus}
  onClose={closeVoice}
  mascotListeningSrc={mascotListening}      // TODO: replace with listening mascot asset
  mascotProcessingSrc={mascotProcessing}     // TODO: replace with processing mascot asset
  mascotResponseSrc={mascotResponse}       // TODO: replace with response mascot asset
  responseText={voiceReply}
  onSaved={async (text) => {
  const t = (text || "").trim();
  setVoiceStatus("Saved");

  // Buffer this turn; save once on Close
  if (t) setVoiceBuffer((prev: string[]) => [...prev, t]);

  // Ask AI for a short reply
  setVoiceStatus("Generating reply…");
  const ai = t ? await fetchOpenRouterReply(t, aiPersona) : "";
  setVoiceReply(ai || (t ? `Got it: ${t}` : "I didn’t catch that — try again?"));
  setVoiceState("response");
  setVoiceStatus(undefined);
}}


  onReadyChange={(ready) => setVoiceReady(ready)}
/>
      </div>
      
    </div>
  );
}