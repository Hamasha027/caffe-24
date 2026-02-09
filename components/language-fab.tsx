"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/components/language-provider";

type LanguageButtonProps = {
  className?: string;
  showLabel?: boolean;
};

export function LanguageButton({ className, showLabel = true }: LanguageButtonProps) {
  const { lang, toggleLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/70 backdrop-blur px-3 py-2 shadow-sm hover:shadow transition"
      }
      aria-label={t("lang.switch")}
      title={t("lang.switch")}
    >
      <Languages size={16} className="text-slate-700 dark:text-slate-200" />
      {showLabel ? (
        <span className="text-[10px] leading-none font-semibold text-slate-800 dark:text-slate-100">
          {lang === "ckb" ? "EN" : "کوردی"}
        </span>
      ) : null}
    </button>
  );
}

export function LanguageFab() {
  return (
    <LanguageButton className="fixed left-3 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/85 dark:bg-slate-900/70 backdrop-blur px-3 py-2 shadow-lg hover:shadow-xl transition" />
  );
}
