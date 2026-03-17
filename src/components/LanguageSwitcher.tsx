import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Locale } from "@/i18n/translations";
import { useState, useRef, useEffect } from "react";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
  { code: "fr", label: "FR" },
];

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="text-xs font-medium tracking-wide uppercase">{languages.find(l => l.code === locale)?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-8 bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden min-w-[80px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLocale(lang.code); setOpen(false); }}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                locale === lang.code
                  ? "text-white bg-white/10"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
