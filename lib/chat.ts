export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  sources?: string[];
  citations?: { source_name: string; snippet: string }[];
  urls?: { title: string; url: string }[];
  messageId?: number;
  createdAt: number;
}

export interface StreamTokenFrame {
  token: string;
}

export interface StreamAnswerFrame {
  answer: string;
  message_id?: number;
  sources?: string[];
  citations?: { source_name: string; snippet: string }[];
  urls?: { title: string; url: string }[];
}

export const CHAT_LANGUAGES = ["en", "es", "ar", "hi", "mr", "ta", "gu", "pa"] as const;

export type ChatLanguage = (typeof CHAT_LANGUAGES)[number];

export interface ChatLabels {
  welcome: string;
  placeholder: string;
  send: string;
  sources: string;
  helpful: string;
  notHelpful: string;
  feedbackThanks: string;
  feedbackImprove: string;
  networkError: string;
  notConfigured: string;
  poweredBy: string;
  minimize: string;
  open: string;
  offline: string;
}

const EN_LABELS: ChatLabels = {
  welcome: "Hi! I'm the RCBW assistant. Ask me anything about the club, our projects, or how to join.",
  placeholder: "Ask a question…",
  send: "Send",
  sources: "Sources: ",
  helpful: "Helpful",
  notHelpful: "Not helpful",
  feedbackThanks: "Thanks for the feedback!",
  feedbackImprove: "Noted, we'll improve.",
  networkError: "Network error — please try again.",
  notConfigured: "Chat is coming soon.",
  poweredBy: "powered by RCBW",
  minimize: "Minimize",
  open: "Open chat",
  offline: "The assistant is offline right now. Try again later.",
};

const LABEL_DEFAULTS: Record<ChatLanguage, Partial<ChatLabels>> = {
  en: {},
  es: {
    welcome: "¡Hola! Soy el asistente de RCBW. Pregúntame sobre el club, nuestros proyectos o cómo unirte.",
    placeholder: "Haz una pregunta…",
    send: "Enviar",
    sources: "Fuentes: ",
    helpful: "Útil",
    notHelpful: "No útil",
    feedbackThanks: "¡Gracias por tu opinión!",
    feedbackImprove: "Anotado, mejoraremos.",
    networkError: "Error de red — inténtalo de nuevo.",
    notConfigured: "El chat estará disponible pronto.",
    poweredBy: "impulsado por RCBW",
    minimize: "Minimizar",
    open: "Abrir chat",
    offline: "El asistente no está disponible ahora. Inténtalo más tarde.",
  },
  ar: {
    welcome: "مرحبًا! أنا مساعد RCBW. اسألني عن النادي أو مشاريعنا أو كيفية الانضمام.",
    placeholder: "اطرح سؤالًا…",
    send: "إرسال",
    sources: "المصادر: ",
    helpful: "مفيد",
    notHelpful: "غير مفيد",
    feedbackThanks: "شكرًا على ملاحظاتك!",
    feedbackImprove: "تم التّدوين، سنحسّن.",
    networkError: "خطأ في الشبكة — حاول مجددًا.",
    notConfigured: "الدردشة قريبًا.",
    poweredBy: "بدعم من RCBW",
    minimize: "تصغير",
    open: "فتح الدردشة",
    offline: "المساعد غير متاح الآن. حاول لاحقًا.",
  },
  hi: {
    welcome: "नमस्ते! मैं RCBW सहायक हूँ। क्लब, हमारे प्रोजेक्ट या जुड़ने के बारे में पूछें।",
    placeholder: "प्रश्न पूछें…",
    send: "भेजें",
    sources: "स्रोत: ",
    helpful: "उपयोगी",
    notHelpful: "उपयोगी नहीं",
    feedbackThanks: "फ़ीडबैक के लिए धन्यवाद!",
    feedbackImprove: "नोट किया, हम सुधारेंगे।",
    networkError: "नेटवर्क त्रुटि — कृपया पुनः प्रयास करें।",
    notConfigured: "चैट जल्द आ रहा है।",
    poweredBy: "RCBW द्वारा संचालित",
    minimize: "छोटा करें",
    open: "चैट खोलें",
    offline: "सहायक अभी उपलब्ध नहीं है। बाद में प्रयास करें।",
  },
  mr: {
    welcome: "नमस्कार! मी RCBW सहायक आहे. क्लब, आमच्या प्रकल्प किंवा सामील होण्याबद्दल विचारा.",
    placeholder: "प्रश्न विचारा…",
    send: "पाठवा",
    sources: "स्रोत: ",
    helpful: "उपयुक्त",
    notHelpful: "उपयुक्त नाही",
    feedbackThanks: "अभिप्रायाबद्दल धन्यवाद!",
    feedbackImprove: "नोंद घेतली, आम्ही सुधारू.",
    networkError: "नेटवर्क त्रुटी — पुन्हा प्रयत्न करा.",
    notConfigured: "चॅट लवकरच येत आहे.",
    poweredBy: "RCBW द्वारा समर्थित",
    minimize: "लहान करा",
    open: "चॅट उघडा",
    offline: "सहाय्यक आत्ता उपलब्ध नाही. नंतर प्रयत्न करा.",
  },
  ta: {
    welcome: "வணக்கம்! நான் RCBW உதவியாளர். கிளப், எங்கள் திட்டங்கள் அல்லது இணைவது பற்றி கேளுங்கள்.",
    placeholder: "கேள்வி கேளுங்கள்…",
    send: "அனுப்பு",
    sources: "ஆதாரங்கள்: ",
    helpful: "பயனுள்ள",
    notHelpful: "பயனற்ற",
    feedbackThanks: "கருத்துக்கு நன்றி!",
    feedbackImprove: "குறித்துள்ளோம், மேம்படுத்துவோம்.",
    networkError: "நெட்வொர்க் பிழை — மீண்டும் முயற்சிக்கவும்.",
    notConfigured: "அரட்டை விரைவில் வரும்.",
    poweredBy: "RCBW ஆல் இயக்கப்படுகிறது",
    minimize: "சுருக்கு",
    open: "அரட்டையைத் திற",
    offline: "உதவியாளர் இப்போது கிடைக்கவில்லை. பின்னர் முயற்சிக்கவும்.",
  },
  gu: {
    welcome: "નમસ્તે! હું RCBW સહાયક છું. ક્લબ, અમારા પ્રોજેક્ટ્સ અથવા જોડાવા વિશે પૂછો.",
    placeholder: "પ્રશ્ન પૂછો…",
    send: "મોકલો",
    sources: "સ્ત્રોત: ",
    helpful: "ઉપયોગી",
    notHelpful: "ઉપયોગી નથી",
    feedbackThanks: "પ્રતિસાદ માટે આભાર!",
    feedbackImprove: "નોંધ્યું, અમે સુધારીશું.",
    networkError: "નેટવર્ક ભૂલ — ફરી પ્રયાસ કરો.",
    notConfigured: "ચેટ ટૂંક સમયમાં આવે છે.",
    poweredBy: "RCBW દ્વારા સંચાલિત",
    minimize: "નાનું કરો",
    open: "ચેટ ખોલો",
    offline: "સહાયક હાલ ઉપલબ્ધ નથી. પછી પ્રયાસ કરો.",
  },
  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ RCBW ਸਹਾਇਕ ਹਾਂ। ਕਲੱਬ, ਸਾਡੇ ਪ੍ਰੋਜੈਕਟ ਜਾਂ ਜੁੜਨ ਬਾਰੇ ਪੁੱਛੋ।",
    placeholder: "ਸਵਾਲ ਪੁੱਛੋ…",
    send: "ਭੇਜੋ",
    sources: "ਸਰੋਤ: ",
    helpful: "ਲਾਭਦਾਇਕ",
    notHelpful: "ਲਾਭਦਾਇਕ ਨਹੀਂ",
    feedbackThanks: "ਫੀਡਬੈਕ ਲਈ ਧੰਨਵਾਦ!",
    feedbackImprove: "ਨੋਟ ਕੀਤਾ, ਅਸੀਂ ਸੁਧਾਰਾਂਗੇ।",
    networkError: "ਨੈੱਟਵਰਕ ਗਲਤੀ — ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    notConfigured: "ਚੈਟ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ।",
    poweredBy: "RCBW ਦੁਆਰਾ ਸੰਚਾਲਿਤ",
    minimize: "ਛੋਟਾ ਕਰੋ",
    open: "ਚੈਟ ਖੋਲ੍ਹੋ",
    offline: "ਸਹਾਇਕ ਹੁਣ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
  },
};

export function getLabels(lang: ChatLanguage): ChatLabels {
  return { ...EN_LABELS, ...LABEL_DEFAULTS[lang] };
}

export function isRtl(lang: ChatLanguage): boolean {
  return lang === "ar";
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "default";
  let sid = window.localStorage.getItem("rcbw_chat_session");
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem("rcbw_chat_session", sid);
  }
  return sid;
}

export function getStoredLanguage(): ChatLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("rcbw_chat_lang") as ChatLanguage | null;
  return stored && CHAT_LANGUAGES.includes(stored) ? stored : "en";
}

export function storeLanguage(lang: ChatLanguage): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("rcbw_chat_lang", lang);
}

export function createId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export class SseParser {
  private buffer = "";

  parse(chunk: string): (StreamTokenFrame | StreamAnswerFrame)[] {
    this.buffer += chunk;
    const lines = this.buffer.split("\n");
    this.buffer = lines.pop() ?? "";
    const frames: (StreamTokenFrame | StreamAnswerFrame)[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      const payload = trimmed.slice(6);
      if (!payload) continue;
      try {
        frames.push(JSON.parse(payload));
      } catch {
        // ignore malformed frame
      }
    }
    return frames;
  }
}