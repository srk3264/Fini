import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type VoiceState = "listening" | "processing" | "response";

export function VoiceModal({
  open, state, statusText, onClose, onBackdrop,
  mascotListeningSrc, mascotProcessingSrc, mascotResponseSrc,
  onSaved, responseText, onReadyChange,
}: {
  open: boolean;
  state: "listening" | "processing" | "response";
  statusText?: string;
  onClose: () => void;
  onBackdrop?: () => void;
  mascotListeningSrc: string;
  mascotProcessingSrc: string;
  mascotResponseSrc: string;
  onSaved?: (text: string) => void;
  responseText?: string;
  onReadyChange?: (ready: boolean) => void;
}) {

  // Ensure waves animate on first open by forcing a remount key locally
  const [localKey, setLocalKey] = useState(0);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) {
      setLocalKey((k) => k + 1);
    }
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    console.log('sr:setup', { open, state });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Web Speech API lifecycle
  const recogRef = useRef<any>(null);
  const mediaRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<{ctx: AudioContext; src: MediaStreamAudioSourceNode; analyser: AnalyserNode} | null>(null);
  const rafRef = useRef<number | null>(null);
  const [levels, setLevels] = useState<number[]>(() => Array.from({ length: 8 }, () => 24));
  const [captured, setCaptured] = useState("");
  const capturedRef = useRef("");
  const sessionRef = useRef(0);
  const openRef = useRef(false);
  const restartingRef = useRef(false);
  const restartTO = useRef<number | null>(null);
  useEffect(() => { openRef.current = open; }, [open]);
  const stateRef = useRef<VoiceState>("listening");
  useEffect(() => { stateRef.current = state; }, [state]);
  // Track what we've already staged this modal session to avoid duplicates
  const lastSavedRef = useRef<string>("");

  const stopAll = (flush: boolean) => {
    console.log('sr:stopAll', { flush });
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (audioRef.current) {
      try { audioRef.current.ctx.close(); } catch {}
      audioRef.current = null;
    }
    try {
      if (recogRef.current) {
        flush ? recogRef.current.stop?.() : recogRef.current.abort?.();
        recogRef.current.onresult = null;
        recogRef.current.onend = null;
      }
    } catch {}
    recogRef.current = null;
    if (mediaRef.current) {
      mediaRef.current.getTracks().forEach(t => t.stop());
      mediaRef.current = null;
    }
  };

  const startListening = async () => {
    console.log('sr:startListening');
    capturedRef.current = "";
    setCaptured("");
    sessionRef.current++;
    const thisSession = sessionRef.current;
    try {
      // Explicitly request mic permission; this shows the browser prompt
      mediaRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('sr:permission:ok', {
        tracks: mediaRef.current?.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState }))
      });
    } catch (err) {
      console.warn('sr:permission:error', err);
      return;
    }
    // Attach WebAudio analyser for live levels
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = ctx.createMediaStreamSource(mediaRef.current!);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      src.connect(analyser);
      audioRef.current = { ctx, src, analyser };
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const bars = 8;
      const update = () => {
        if (!audioRef.current) return;
        analyser.getByteTimeDomainData(buf);
        // Compute RMS chunked into bars
        const chunk = Math.floor(buf.length / bars);
        const next: number[] = [];
        for (let b = 0; b < bars; b++) {
          let sum = 0;
          for (let i = b * chunk; i < (b + 1) * chunk; i++) {
            const v = (buf[i] - 128) / 128; // -1..1
            sum += v * v;
          }
          const rms = Math.sqrt(sum / chunk); // 0..1
          const h = 20 + Math.min(62, Math.round(rms * 120));
          next.push(h);
        }
        setLevels(next);
        rafRef.current = requestAnimationFrame(update);
      };
      rafRef.current = requestAnimationFrame(update);
    } catch (e) {
      console.warn('sr:analyser:failed', e);
    }
    // ensure no leftover recognizer
  try { recogRef.current?.abort?.(); } catch {}
  recogRef.current = null;
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      console.warn('sr:not-supported');
      return;
    }
    const r = new SR();
    r.lang = 'en-US';
    r.interimResults = true;
    r.continuous = true; // keep recording until user taps Check
    r.onstart = () => { console.log('sr:onstart'); onReadyChange?.(false); };
    r.onresult = (e: any) => {
      if (thisSession !== sessionRef.current) return;
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const alt = e.results[i][0];
        const chunk = alt?.transcript || "";
        if (e.results[i].isFinal) finalText += (finalText ? " " : "") + chunk.trim();
      }
      if (finalText) {
        setCaptured(prev => (prev ? prev + " " : "") + finalText);
        capturedRef.current = (capturedRef.current ? capturedRef.current + " " : "") + finalText;
        console.log('sr:final', finalText);
        if (capturedRef.current.length > 0) onReadyChange?.(true);
      }
    };
    r.onend = () => {
  const phase = stateRef.current;
  console.log('sr:onend', { phase, have: capturedRef.current.length });
  if (openRef.current && phase === 'listening' && thisSession === sessionRef.current) {
    if (!restartingRef.current) {
      restartingRef.current = true;
      if (restartTO.current) { clearTimeout(restartTO.current); restartTO.current = null; }
      restartTO.current = window.setTimeout(() => {
        if (openRef.current && stateRef.current === 'listening' && thisSession === sessionRef.current) {
          try { r.start(); } catch {}
        }
        restartingRef.current = false;
        restartTO.current = null;
      }, 250);
    }
    return;
  }
      if (phase === 'processing' && thisSession === sessionRef.current) {
        const txt = capturedRef.current.trim();
        console.log('sr:onend->onSaved', { len: txt.length, txt });
        try { onSaved?.(txt); } catch (e) { console.error('sr:onSaved:throw', e); }
      }
    };
    try { r.start(); } catch {}
    recogRef.current = r;
  };

  // Clean up on unmount/close
  useEffect(() => {
    if (!open) return;
    return () => stopAll(false);
  }, [open]);

  // Force stop when the modal closes
  useEffect(() => {
  if (!open && recogRef.current) {
    console.log('sr:force-stop-on-close');
    stopAll(false);
    sessionRef.current++; // invalidate any pending restarts
    capturedRef.current = "";
    setCaptured("");
    // cancel any pending auto-restart and reset throttle
    if (restartTO.current) { clearTimeout(restartTO.current); restartTO.current = null; }
    restartingRef.current = false;
    onReadyChange?.(false);
  }
}, [open]);




  // (reverted) removed mic-driven animation effect

  useEffect(() => {
  if (state === 'processing') {
    console.log('sr:to-processing');
    onReadyChange?.(false); // disable Check during processing
    const snapshot = capturedRef.current.trim();
    if (snapshot && snapshot !== lastSavedRef.current) {
      try { onSaved?.(snapshot); lastSavedRef.current = snapshot; } catch (e) { console.error('sr:onSaved:throw:effect', e); }
    }
    capturedRef.current = "";
    setCaptured("");
    sessionRef.current++;
    stopAll(true);
    return () => {};
  }
  if ((state === 'listening' || state === 'response') && open) {
  capturedRef.current = "";
  setCaptured("");
  onReadyChange?.(false);  // disabled until sr:final arrives
  if (!recogRef.current) startListening();
}


}, [state, open]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center pointer-events-none" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 mb-28 md:mb-0 w-[326px] rounded-[24px] border border-[rgba(0,0,0,0.12)] bg-white/70 backdrop-blur-md p-4 flex flex-col items-end gap-4 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] pointer-events-auto"
      >
        
        <button onClick={onClose} className="bg-white rounded-full px-2.5 py-1 text-[17px] leading-[1.4] border border-[rgba(0,0,0,0.12)]">Close ✕</button>
        {state === 'processing' && (
          <div className="w-full text-center text-[15px] text-[rgba(0,0,0,0.87)]">{statusText}</div>
        )}
        <AnimatePresence initial={false} mode="wait">
          {state === 'response' && (
            <motion.div
              key={`resp-${(responseText || '').slice(0, 32)}-${localKey}`}
              initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, scale: 0.99, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.6 }}
              className="w-full text-center text-[15px] text-[rgba(0,0,0,0.87)]"
            >
              {responseText || ''}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full flex items-center justify-center">
          <img
            src={state === 'processing' ? mascotProcessingSrc : state === 'response' ? mascotResponseSrc : mascotListeningSrc}
            alt="mascot"
            className="w-[150px] h-[150px] object-contain"
            onError={(e) => {
              // Fallback to listening mascot if the provided asset fails
              (e.currentTarget as HTMLImageElement).src = mascotListeningSrc;
            }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {state === "processing" ? (
            <motion.div key={`waves-disabled`} className="w-full h-[82px] flex items-end justify-center gap-2 opacity-40"
              initial={{ opacity: 0.4 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0.4 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-2 rounded-full bg-[#E0E0E0]" style={{ height: 24 }} />
              ))}
            </motion.div>
          ) : (
            <motion.div key={`waves-live-${localKey}`} className="w-full h-[82px] flex items-end justify-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-2 rounded-full bg-[#ffcf48]" style={{ height: (levels[i] ?? 24) }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export type VoiceStateType = VoiceState;
