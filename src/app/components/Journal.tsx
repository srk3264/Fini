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


interface TextSegment {
  text: string;
  tag?: "reflections" | "health" | "todo" | "reminders";
}

interface JournalEntry {
  
  id: string;
  time: string;
  segments: TextSegment[];
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

const closeVoice = async () => {
  // Flush all captured turns from this session as one entry
  const combined = voiceBuffer.join(" ").trim();
  if (combined) {
    try {
      await saveVoiceEntry(combined);
    } catch (e) {
      console.warn("ui.voice:save-on-close:err", e);
    }
  }
  // Reset modal state
  setVoiceBuffer([]);
  setVoiceOpen(false);
  setVoiceState("listening");
  setVoiceStatus(undefined);
  setVoiceReply("");
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

  const aiSummary =
    "Yesterday was a lil rough, that's okay. We've been through crazier shit before from staying up 2 days for an exam that was eventually canceled & the other time when you farted thinking no one would notice! New day, new start!";

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
    const segs = text
      .split(/([.!?])\s+/) // keep sentence enders
      .reduce<string[]>((acc, cur, i, arr) => {
        if (i % 2 === 0) {
          const next = arr[i + 1] || "";
          const s = (cur + (/[.!?]/.test(next) ? next : "")).trim();
          if (s) acc.push(s);
        }
        return acc;
      }, [])
      .map((t) => ({ text: t }));

  const doc = await createEntry({
    content: text,
    segments: JSON.stringify(segs), // store as string (matches journal.ts)
    localTime: optimistic.time,
  });
  setEntries((prev) =>
    prev.map((e) => (e.id === optimistic.id ? { ...optimistic, id: (doc as any).$id } : e))
  );
  } catch (err) {
  console.warn("ui.save:text:err", err);
  setEntries((prev) => prev.filter((e) => e.id !== optimistic.id));
  } finally {
  isSubmittingRef.current = false;
  }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    setSwipedEntryId(null);
  };

  const handleTagSegment = (
    entryId: string,
    segmentIndex: number,
    tag: "reflections" | "health" | "todo" | "reminders"
  ) => {
    setEntries(
      entries.map((entry) => {
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
    setShowTagMenu(null);
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
            setShowTagMenu({
              entryId,
              segmentIndex: i,
              x: rect.left,
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

  const handleSaveEdit = () => {
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
    }
    setEditingEntryId(null);
    setEditingText("");
  };

// Save recognized speech as a journal entry + optimistic UI
const saveVoiceEntry = async (text: string) => {
  const t = (text || "").trim();
  if (!t) return;

  const optimistic = {
    id: `v-${Date.now()}`,
    time: getCurrentTime(),
    segments: t
      .split(/([.!?])\s+/)
      .reduce<string[]>((acc, cur, i, arr) => {
        if (i % 2 === 0) {
          const next = arr[i + 1] || "";
          const s = (cur + (/[.!?]/.test(next) ? next : "")).trim();
          if (s) acc.push(s);
        }
        return acc;
      }, [])
      .map((x) => ({ text: x })),
  };

  setEntries((prev) => [optimistic, ...prev]);
  setHasEntriesToday(true);
  setIsFirstEverEntry(false);

  try {
    const doc = await createEntry({
      content: t,
      segments: JSON.stringify(optimistic.segments),
      localTime: optimistic.time,
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
const fetchOpenRouterReply = async (text: string, persona: string): Promise<string> => {
  const key =
    (import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined) ||
    (import.meta.env.VITE_OPENROUTER_KEY as string | undefined);
  const model = import.meta.env.VITE_OPENROUTER_MODEL as string | undefined;

  if (!key || !model) {
    console.warn("openrouter:missing-key-or-model");
    return "";
  }

  const sys =
    (import.meta.env.VITE_OPENROUTER_SYSTEM as string | undefined) ||
    `You are a ${persona || "Balanced"} journaling companion. Reply in 1–2 sentences.`;

  const body = {
    model,
    messages: [
      { role: "system", content: sys },
      { role: "user", content: text },
    ],
    temperature: 0.7,
    max_tokens: 120,
  };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
    console.log("openrouter:status", res.status);
    const data = await res.json();
    return (data?.choices?.[0]?.message?.content || "").trim();
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
setIsFirstEverEntry(ordered.length === 0);
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
          <button className="relative shrink-0 size-[16px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50">
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
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full overflow-y-auto">
        <div className="content-stretch flex flex-col items-start py-[24px] relative w-full">
          {/* First Ever Entry - Empty State */}
          {isFirstEverEntry && !isTyping && (
            <div
              className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full mb-[24px] cursor-text"
              onClick={handleStartTyping}
            >
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">
                {getCurrentTime()}
              </p>
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.38)] min-h-px min-w-px break-words">
                Start writing your first entry...
              </p>
            </div>
          )}

          {/* AI Summary - First Entry of the Day */}
          {!isFirstEverEntry && !hasEntriesToday && !isTyping && entries.length === 0 && (
            <div
              className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full mb-[24px] cursor-text"
              onClick={handleStartTyping}
            >
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">
                {getCurrentTime()}
              </p>
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] relative text-[17px] text-[rgba(0,0,0,0.38)] min-h-px min-w-px break-words">
                {aiSummary}
              </p>
            </div>
          )}
          {/* Current Entry Being Typed */}
{isTyping && (
  <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
    <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">
      {getCurrentTime()}
    </p>
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
      placeholder={!isFirstEverEntry && entries.length === 0 ? aiSummary : "What's on your mind?"}
      className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-[rgba(0,0,0,0.87)] bg-transparent border-none outline-none resize-none placeholder:text-[rgba(0,0,0,0.38)]"
      rows={3}
    />
  </div>
)}
          {/* Existing Entries */}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full mb-[24px]"
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
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap">
                {entry.time}
              </p>
              <div className="flex-[1_0_0] min-h-px min-w-px relative">
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
              <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-medium leading-[1.3] min-h-px min-w-px relative text-[11px] text-[rgba(0,0,0,0.6)] text-left">
                {getTagName(tag)}
              </p>
            </button>
          ))}
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
        
        className={`${voiceOpen ? 'bg-[#212121]' : 'bg-[#ffcf48]'} content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0 cursor-pointer transition-all `}
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