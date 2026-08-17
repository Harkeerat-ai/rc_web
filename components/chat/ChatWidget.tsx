"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import PhoenixIcon from "@/components/chat/PhoenixIcon";
import {
  ChatMessage,
  ChatLabels,
  ChatLanguage,
  SseParser,
  StreamAnswerFrame,
  StreamTokenFrame,
  createId,
  getLabels,
  getSessionId,
  getStoredLanguage,
  isRtl,
  storeLanguage,
} from "@/lib/chat";

interface ActiveMessage extends ChatMessage {
  streaming?: boolean;
  feedback?: "up" | "down" | "done";
  suggestions?: string[];
}

const STREAM_URL = "/api/chat/chat/stream";
const FEEDBACK_URL = "/api/chat/feedback";

export default function ChatWidget() {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ActiveMessage[]>([]);
  const [lang, setLang] = useState<ChatLanguage>("en");
  const [labels, setLabels] = useState<ChatLabels>(getLabels("en"));
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);

  const sessionRef = useRef("default");
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    sessionRef.current = getSessionId();
    const stored = getStoredLanguage();
    setLang(stored);
    setLabels(getLabels(stored));
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch("/api/chat/health", { cache: "no-store" })
      .then((res) => {
        if (!cancelled) setConfigured(res.ok);
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, loading, reducedMotion]);

  const changeLanguage = (next: ChatLanguage) => {
    setLang(next);
    setLabels(getLabels(next));
    storeLanguage(next);
  };

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: ActiveMessage = {
      id: createId(),
      role: "user",
      content,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const botId = createId();
    const botMsg: ActiveMessage = {
      id: botId,
      role: "bot",
      content: "",
      streaming: true,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, botMsg]);

    const controller = new AbortController();
    abortRef.current = controller;

    fetch(STREAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: content,
        session_id: sessionRef.current,
        language: lang,
        stream: true,
      }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 503) {
          setConfigured(false);
          updateBot(botId, { content: labels.offline, streaming: false });
          return;
        }
        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }
        setConfigured(true);
        const parser = new SseParser();
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            const frames = parser.parse(decoder.decode(value, { stream: !done }));
            for (const frame of frames) {
              if ("token" in frame && (frame as StreamTokenFrame).token) {
                const tok = (frame as StreamTokenFrame).token;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botId ? { ...m, content: m.content + tok } : m
                  )
                );
              } else if ("answer" in frame) {
                const f = frame as StreamAnswerFrame;
                updateBot(botId, {
                  content: f.answer,
                  streaming: false,
                  sources: f.sources,
                  citations: f.citations,
                  urls: f.urls,
                  messageId: f.message_id,
                });
                if (f.message_id) {
                  pollSuggestions(botId, f.message_id);
                }
              }
            }
          }
        }
        updateBot(botId, { streaming: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          updateBot(botId, { content: labels.networkError, streaming: false });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateBot = (botId: string, patch: Partial<ActiveMessage>) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === botId ? { ...m, ...patch } : m))
    );
  };

  const pollSuggestions = (botId: string, messageId: number) => {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = window.setInterval(async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/chat/suggestions/${messageId}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { suggestions?: string[] };
        if (data.suggestions && data.suggestions.length > 0) {
          window.clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId
                ? { ...m, suggestions: data.suggestions }
                : m
            )
          );
        }
      } catch {
        // ignore, keep polling
      }
      if (attempts >= maxAttempts) window.clearInterval(interval);
    }, 1500);
  };

  const sendFeedback = (messageId: number, rating: 1 | -1, botId: string) => {
    fetch(FEEDBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message_id: messageId,
        rating,
        session_id: sessionRef.current,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, feedback: "done" } : m
            )
          );
        }
      })
      .catch(() => {
        // ignore
      });
  };

  const panel = (
    <motion.div
      key="chat-panel"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass-card fixed bottom-24 right-4 z-[70] flex w-[min(92vw,380px)] flex-col overflow-hidden"
      dir={isRtl(lang) ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-3 border-b border-gold/20 bg-primary/60 px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-rust/30 border border-gold/40">
          <PhoenixIcon className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold text-ivory">
            RCBW Assistant
          </p>
          <p className="text-[11px] text-text-muted">{labels.poweredBy}</p>
        </div>
        <select
          value={lang}
          onChange={(e) => changeLanguage(e.target.value as ChatLanguage)}
          aria-label="Language"
          className="rounded-md border border-gold/20 bg-surface/80 px-1.5 py-1 text-[11px] text-ivory outline-none focus:border-gold/50"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="ar">AR</option>
          <option value="hi">HI</option>
          <option value="mr">MR</option>
          <option value="ta">TA</option>
          <option value="gu">GU</option>
          <option value="pa">PA</option>
        </select>
        <button
          onClick={() => setOpen(false)}
          aria-label={labels.minimize}
          className="text-text-muted transition-colors hover:text-gold cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        </button>
      </div>

      <div
        ref={messagesRef}
        className="hide-scrollbar flex max-h-[46vh] min-h-[220px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && !loading && (
          <div className="rounded-xl border border-gold/15 bg-surface/40 px-4 py-3 text-[13px] leading-relaxed text-text-muted">
            {labels.welcome}
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col">
            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-gradient-to-br from-gold to-rust text-white"
                  : "self-start border border-gold/15 bg-surface/50 text-ivory"
              }`}
            >
              {m.content}
              {m.streaming && <TypingDots />}
            </div>
            {m.role === "bot" && !m.streaming && (
              <BotExtras
                m={m}
                labels={labels}
                onFeedback={(rating) => m.messageId && sendFeedback(m.messageId, rating, m.id)}
                onSuggestion={(s) => sendMessage(s)}
              />
            )}
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gold/20 bg-primary/60 px-3 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={labels.placeholder}
          disabled={loading || configured === false}
          className="min-w-0 flex-1 rounded-full border border-gold/20 bg-surface/70 px-4 py-2 text-[13px] text-ivory placeholder-text-muted/60 outline-none focus:border-gold/50 disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || configured === false || !input.trim()}
          aria-label={labels.send}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rust text-white transition-all hover:shadow-[0_0_20px_rgba(227,178,80,0.45)] disabled:opacity-40 cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div dir="ltr">
      <AnimatePresence>{open && panel}</AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? labels.minimize : labels.open}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rust shadow-[0_0_25px_rgba(227,178,80,0.45)] transition-shadow hover:shadow-[0_0_35px_rgba(227,178,80,0.6)] cursor-pointer"
      >
        <PhoenixIcon className="h-8 w-8" />
      </motion.button>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="mt-1.5 flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:300ms]" />
    </span>
  );
}

function BotExtras({
  m,
  labels,
  onFeedback,
  onSuggestion,
}: {
  m: ActiveMessage;
  labels: ChatLabels;
  onFeedback: (rating: 1 | -1) => void;
  onSuggestion: (s: string) => void;
}) {
  const [showCitations, setShowCitations] = useState(false);
  const suggestions = m.suggestions ?? [];

  const hasMeta = (m.sources?.length ?? 0) > 0 || (m.urls?.length ?? 0) > 0;

  return (
    <div className="mt-1.5 self-start max-w-[95%]">
      {hasMeta && (
        <div className="mt-1.5 space-y-1">
          {(m.urls ?? []).map((u, i) => (
            <a
              key={i}
              href={u.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-gold/20 bg-surface/50 px-2.5 py-1 text-[11px] text-gold transition-colors hover:border-gold/50"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {u.title}
            </a>
          ))}
          {(m.sources ?? []).length > 0 && (
            <p className="text-[11px] text-text-muted">
              {labels.sources}
              {(m.sources ?? []).join(", ")}
            </p>
          )}
          {(m.citations ?? []).length > 0 && (
            <button
              onClick={() => setShowCitations((v) => !v)}
              className="text-[11px] text-gold underline-offset-2 hover:underline cursor-pointer"
            >
              {showCitations ? "Hide citations" : "View citations"}
            </button>
          )}
        </div>
      )}
      {showCitations && (m.citations ?? []).length > 0 && (
        <div className="mt-1.5 space-y-1.5 rounded-lg border border-gold/10 bg-surface/40 p-2.5">
          {(m.citations ?? []).map((c, i) => (
            <div key={i} className="text-[11px] leading-relaxed">
              <span className="font-semibold text-gold">{c.source_name}:</span>{" "}
              <span className="text-text-muted">{c.snippet}</span>
            </div>
          ))}
        </div>
      )}
      {m.messageId && (
        <div className="mt-2 flex items-center gap-1.5">
          {m.feedback === "done" ? (
            <span className="text-[11px] text-gold">
              {labels.feedbackThanks}
            </span>
          ) : (
            <>
              <button
                onClick={() => onFeedback(1)}
                aria-label={labels.helpful}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-gold/20 text-text-muted transition-colors hover:border-gold/50 hover:text-gold cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.8a2 2 0 011.94 2.48l-1.5 6A2 2 0 0117.3 20H9a2 2 0 01-2-2V8a2 2 0 011-1.73L13 3.5c.7-.3 1.5.2 1.6.9L14 10z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onFeedback(-1)}
                aria-label={labels.notHelpful}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-gold/20 text-text-muted transition-colors hover:border-gold/50 hover:text-gold cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14H5.2a2 2 0 01-1.94-2.48l1.5-6A2 2 0 016.7 4H15a2 2 0 012 2v8a2 2 0 01-1 1.73L11 20.5c-.7.3-1.5-.2-1.6-.9L10 14z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggestion(s)}
              className="rounded-full border border-gold/20 bg-surface/50 px-3 py-1 text-[11px] text-ivory transition-colors hover:border-gold/50 hover:text-gold cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}