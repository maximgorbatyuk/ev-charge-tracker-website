import en from './locales/en.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';
import kk from './locales/kk.json';
import zh from './locales/zh.json';

export const locales = ['en', 'de', 'ru', 'tr', 'uk', 'kk', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  tr: 'Türkçe',
  uk: 'Українська',
  kk: 'Қазақша',
  zh: '中文',
};

export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  de: 'DE',
  ru: 'RU',
  tr: 'TR',
  uk: 'UK',
  kk: 'KK',
  zh: 'ZH',
};

export const localeRegions: Record<Locale, string> = {
  en: 'en-US',
  de: 'de-DE',
  ru: 'ru-RU',
  tr: 'tr-TR',
  uk: 'uk-UA',
  kk: 'kk-KZ',
  zh: 'zh-CN',
};

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
  tr: 'tr_TR',
  uk: 'uk_UA',
  kk: 'kk_KZ',
  zh: 'zh_CN',
};

const translations: Record<Locale, Record<string, string>> = {
  en, de, ru, tr, uk, kk, zh,
};

type TranslationKey = keyof typeof en;

export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey, vars?: Record<string, string>): string {
    let text = translations[lang]?.[key] ?? translations[defaultLocale][key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replaceAll(`{${k}}`, v);
      }
    }
    return text;
  };
}

export function getLangFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function getLocalizedPath(lang: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLocale) {
    return cleanPath;
  }
  return `/${lang}${cleanPath}`;
}

export function getCurrentPath(url: URL): string {
  const lang = getLangFromUrl(url);
  if (lang === defaultLocale) {
    return url.pathname;
  }
  return url.pathname.replace(new RegExp(`^/${lang}`), '') || '/';
}
