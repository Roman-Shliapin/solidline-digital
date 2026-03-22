import type { CSSProperties } from "react";

/** Дефолтний акцент SolidLine у шаблонах */
export const DEFAULT_TEMPLATE_ACCENT = "#7C5CFF";

/** Нормалізація: нижній регістр, зайві пробіли */
function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Розширення #RGB → #RRGGBB */
function expandShortHex(h: string): string | null {
  const m = h.match(/^#([0-9a-f]{3})$/i);
  if (!m) return null;
  const [a, b, c] = m[1].split("").map((ch) => ch + ch);
  return `#${a}${b}${c}`.toUpperCase();
}

type RGB = { r: number; g: number; b: number };

function rgbToHex({ r, g, b }: RGB): string {
  return `#${[r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

export function hexToRgb(hex: string): RGB | null {
  const h = hex.trim();
  const long = h.match(/^#([0-9a-f]{6})$/i);
  if (long) {
    const n = parseInt(long[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const short = expandShortHex(h);
  return short ? hexToRgb(short) : null;
}

export function rgbToCss({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

/** Трохи темніше для hover-кнопок */
export function darkenHex(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const d = (v: number) => Math.round(Math.max(0, Math.min(255, v * (1 - amount))));
  return rgbToHex({ r: d(rgb.r), g: d(rgb.g), b: d(rgb.b) });
}

/** Світліший «muted» текст на темному фоні: змішування акценту з білим */
export function mixAccentWithWhite(hex: string, whiteRatio: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#C4B5FD";
  const w = Math.max(0, Math.min(1, whiteRatio));
  const mix = (c: number) => Math.round(c * (1 - w) + 255 * w);
  return rgbToCss({ r: mix(rgb.r), g: mix(rgb.g), b: mix(rgb.b) });
}

/** UA / RU / EN — вільний текст з поля «Brand colors» → hex */
const NAME_TO_HEX: Record<string, string> = {
  // Синій
  синий: "#2563EB",
  синій: "#2563EB",
  blue: "#2563EB",
  // Червоний
  красный: "#EF4444",
  червоний: "#EF4444",
  red: "#EF4444",
  // Зелений
  зеленый: "#22C55E",
  зелений: "#22C55E",
  green: "#22C55E",
  // Жовтий
  желтый: "#EAB308",
  жовтий: "#EAB308",
  yellow: "#EAB308",
  // Помаранчевий
  оранжевый: "#F97316",
  помаранчевий: "#F97316",
  orange: "#F97316",
  // Фіолетовий / типовий бренд
  фиолетовый: "#7C5CFF",
  фіолетовий: "#7C5CFF",
  purple: "#A855F7",
  violet: "#8B5CF6",
  // Рожевий
  розовый: "#EC4899",
  рожевий: "#EC4899",
  pink: "#EC4899",
  // Бірюзовий / cyan
  бирюзовый: "#14B8A6",
  бірюзовий: "#14B8A6",
  teal: "#14B8A6",
  cyan: "#06B6D4",
  // Золото
  золотой: "#EAB308",
  золотий: "#EAB308",
  gold: "#EAB308",
  // Нейтральні (як акцент на темному)
  белый: "#E5E7EB",
  білий: "#E5E7EB",
  white: "#E5E7EB",
  черный: "#9CA3AF",
  чорний: "#9CA3AF",
  black: "#9CA3AF",
  серый: "#94A3B8",
  сірий: "#94A3B8",
  gray: "#94A3B8",
  grey: "#94A3B8",
  // Додаткові англійські імена CSS (часті)
  crimson: "#DC143C",
  navy: "#000080",
  lime: "#32CD32",
  olive: "#808000",
  maroon: "#800000",
  aqua: "#00FFFF",
  indigo: "#6366F1",
  magenta: "#D946EF",
  brown: "#A16207",
  // Поширені CSS named colors (англійською)
  coral: "#FF7F50",
  salmon: "#FA8072",
  tomato: "#FF6347",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  mintcream: "#F5FFFA",
  turquoise: "#40E0D0",
  skyblue: "#87CEEB",
  steelblue: "#4682B4",
  darkblue: "#00008B",
  lightblue: "#ADD8E6",
  hotpink: "#FF69B4",
  darkgreen: "#006400",
  lightgreen: "#90EE90",
  darkorange: "#FF8C00",
  darkviolet: "#9400D3",
  darkred: "#8B0000",
  lightcoral: "#F08080",
  goldenrod: "#DAA520",
  silver: "#C0C0C0",
};

function parseRgbFunction(s: string): RGB | null {
  const m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return null;
  const r = Math.min(255, Math.max(0, Number(m[1])));
  const g = Math.min(255, Math.max(0, Number(m[2])));
  const b = Math.min(255, Math.max(0, Number(m[3])));
  return { r, g, b };
}

/**
 * Розпізнає hex, rgb()/rgba(), словник UA/RU/EN та поширені CSS-імена → RGB.
 */
export function parseColorToRgb(input: string): RGB | null {
  const raw = input.trim();
  if (!raw) return null;

  const asHex = hexToRgb(raw);
  if (asHex) return asHex;
  const short = expandShortHex(raw);
  if (short) {
    const rgb = hexToRgb(short);
    if (rgb) return rgb;
  }

  const fromRgb = parseRgbFunction(raw);
  if (fromRgb) return fromRgb;

  const key = norm(raw);
  if (NAME_TO_HEX[key]) {
    return hexToRgb(NAME_TO_HEX[key]);
  }

  return null;
}

/**
 * Перетворює рядок з форми (назва кольору, #hex, rgb) у hex для шаблону.
 * Невідомий ввід → дефолтний SolidLine-акцент.
 */
export function resolveBrandColor(input: string | undefined | null): string {
  const raw = input?.trim();
  if (!raw) return DEFAULT_TEMPLATE_ACCENT;

  const rgb = parseColorToRgb(raw);
  if (rgb) return rgbToHex(rgb);

  return DEFAULT_TEMPLATE_ACCENT;
}

/** Палітра для CSS-змінних у шаблонах */
export function templateAccentVars(resolvedHex: string): CSSProperties {
  let rgb = hexToRgb(resolvedHex);
  if (!rgb) {
    rgb = hexToRgb(DEFAULT_TEMPLATE_ACCENT)!;
  }

  const { r, g, b } = rgb;
  const base = rgbToHex(rgb);
  const hoverHex = darkenHex(base, 0.12);
  const softText = mixAccentWithWhite(base, 0.42);
  const softText2 = mixAccentWithWhite(base, 0.55);

  return {
    ["--tm-accent" as string]: base,
    ["--tm-accent-hover" as string]: hoverHex,
    ["--tm-accent-rgb" as string]: `${r}, ${g}, ${b}`,
    ["--tm-accent-soft" as string]: softText,
    ["--tm-accent-soft2" as string]: softText2,
    ["--tm-accent-glow" as string]: `rgba(${r}, ${g}, ${b}, 0.22)`,
    ["--tm-accent-15" as string]: `rgba(${r}, ${g}, ${b}, 0.15)`,
    ["--tm-accent-25" as string]: `rgba(${r}, ${g}, ${b}, 0.25)`,
    ["--tm-accent-30" as string]: `rgba(${r}, ${g}, ${b}, 0.3)`,
    ["--tm-accent-shadow" as string]: `rgba(${r}, ${g}, ${b}, 0.25)`,
  };
}
