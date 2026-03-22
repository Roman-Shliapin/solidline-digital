# 🧠 AI Website Preview — Технічний план та правила для Cursor AI

> **Мова документу:** Українська  
> **Призначення:** Повний технічний план реалізації + правила поведінки AI-асистента в Cursor  
> **Стек:** Node.js · Next.js · Claude API · Tailwind CSS · MongoDB

---

# ЧАСТИНА 1 — ПЛАН РЕАЛІЗАЦІЇ

---

## 📐 1. Системна архітектура

```
┌─────────────────────────────────────────────────────────────┐
│                        КЛІЄНТ (Browser)                      │
│                                                              │
│  ┌──────────────┐    ┌────────────────────────────────────┐  │
│  │  Форма       │───▶│  Preview Card (iframe/div scroll)  │  │
│  │  (HTML/React)│    │  ┌──────────────────────────────┐  │  │
│  └──────────────┘    │  │  Згенерований HTML + Tailwind │  │  │
│                      │  └──────────────────────────────┘  │  │
│                      │  [ ✅ Approve ] [ 📞 Consultation ] │  │
│                      └────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
          │                          │
          ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js / Next.js API)          │
│                                                              │
│   /api/generate-preview  ──▶  Claude API (claude-sonnet-4)  │
│   /api/approve-design    ──▶  Database (MongoDB)            │
│   /api/request-consult   ──▶  Email / CRM / Webhook         │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│               DATABASE (MongoDB / MongoDB Atlas)             │
│                                                              │
│   Collection: submissions    Collection: generatedDesigns    │
│   Collection: approvedDesigns  Collection: consultations     │
└─────────────────────────────────────────────────────────────┘
```

### Чому такий підхід:

- **Next.js** — об’єднує фронтенд і бекенд в одному проєкті, API routes вбудовані
- **Claude API** — найкраща модель для генерації структурованого HTML-коду
- **MongoDB** — гнучка документна БД, ідеальна для зберігання HTML і JSON даних без фіксованої схеми
- **Tailwind CSS** — утилітарний CSS, який Claude добре розуміє і генерує

---

## 🖥️ 2. Frontend Flow

### Крок 1 — Форма (клієнт заповнює дані)

```html
<!-- Поля форми -->
- Тип бізнесу (dropdown): ресторан, агентство, магазин, IT, тощо - Стиль дизайну
(radio): мінімалістичний, корпоративний, яскравий, елегантний - Кольорова схема
(color picker або вибір): синій, зелений, темний тощо - Сторінки (checkboxes):
Головна, Про нас, Послуги, Контакти, Портфоліо - Назва компанії (text input) -
Слоган (text input, опціонально) - Додаткові побажання (textarea)
```

### Крок 2 — Відправка форми та стан завантаження

```javascript
// Псевдокод фронтенду
async function handleSubmit(formData) {
  setLoading(true); // показати spinner

  const response = await fetch("/api/generate-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const { html, sessionId } = await response.json();

  setGeneratedHTML(html); // вставити HTML у preview
  setSessionId(sessionId); // зберегти для наступних дій
  setLoading(false);
}
```

### Крок 3 — Відображення Preview

```html
<!-- Preview Card — фіксований контейнер з прокруткою -->
<div
  class="preview-wrapper"
  style="
  width: 375px; /* або 100% для адаптивності */
  height: 600px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow-y: auto;  /* КЛЮЧОВО: прокрутка всередині */
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  position: relative;
"
>
  <!-- Сюди вставляємо згенерований HTML -->
  <div id="preview-content">
    <!-- Claude повертає сюди повний HTML -->
  </div>
</div>

<!-- Кнопки дій -->
<div class="action-buttons">
  <button onclick="approveDesign()">✅ Схвалити дизайн</button>
  <button onclick="requestConsultation()">📞 Хочу консультацію</button>
</div>
```

### Чому НЕ використовувати `<iframe>`:

- `<iframe>` з blob URL має обмеження безпеки (CSP)
- Вставка через `innerHTML` або `srcdoc` — простіша і контрольованіша
- Якщо потрібна ізоляція стилів → використовувати `<iframe srcdoc="...">`

---

## ⚙️ 3. Backend Flow (Node.js / Next.js API Routes)

### Маршрут 1: `/api/generate-preview`

```
1. Отримати дані форми (POST body)
2. Валідувати вхідні дані (sanitize)
3. Сформувати prompt для Claude
4. Викликати Claude API
5. Отримати HTML-відповідь
6. Зберегти в БД як чернетку (submissions + generated_designs)
7. Повернути { html, sessionId } клієнту
```

### Маршрут 2: `/api/approve-design`

```
1. Отримати { sessionId } від клієнта
2. Знайти запис у generated_designs за sessionId
3. Скопіювати запис в approved_designs
4. Позначити статус як 'approved'
5. Надіслати email/webhook адміну (опціонально)
6. Повернути { success: true, designId }
```

### Маршрут 3: `/api/request-consultation`

```
1. Отримати { sessionId, clientEmail, message }
2. Зберегти в таблиці consultations
3. Надіслати сповіщення в CRM або email
4. Повернути { success: true }
```

---

## 🤖 4. Інтеграція з Claude API

### Інсталяція:

```bash
npm install @anthropic-ai/sdk
```

### Приклад виклику:

````javascript
// lib/claude.js
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateWebsitePreview(formData) {
  const prompt = buildPrompt(formData);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Витягуємо тільки HTML з відповіді
  const rawText = message.content[0].text;
  const html = extractHTML(rawText);

  return html;
}

function extractHTML(text) {
  // Claude може обгортати код у ```html ... ```
  const match = text.match(/```html\n?([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}
````

### Чому `claude-sonnet-4-20250514`:

- Відмінно генерує структурований HTML
- Розуміє Tailwind CSS класи
- Підтримує довгі відповіді (до 8192 токенів)
- Оптимальний баланс якість/швидкість

---

## 📝 5. Приклади промптів для Claude

### Базовий промпт:

```javascript
function buildPrompt(formData) {
  return `
Ти — провідний веб-дизайнер та фронтенд-розробник.

Твоє завдання: згенерувати повний HTML-код лендінгу (одна сторінка) 
на основі наступних даних клієнта.

ДАНІ КЛІЄНТА:
- Тип бізнесу: ${formData.businessType}
- Назва компанії: ${formData.companyName}
- Слоган: ${formData.slogan || "не вказано"}
- Стиль дизайну: ${formData.style}
- Кольорова схема: ${formData.colorScheme}
- Сторінки/секції: ${formData.sections.join(", ")}
- Додаткові побажання: ${formData.notes || "немає"}

ТЕХНІЧНІ ВИМОГИ:
1. Використовуй Tailwind CSS (CDN: https://cdn.tailwindcss.com)
2. Код повинен бути повним — від <html> до </html>
3. Зроби красивий, сучасний дизайн з:
   - Hero секцією з заголовком і CTA-кнопкою
   - Секцією переваг/послуг
   - Секцією "Про нас" (якщо запитано)
   - Footer з контактами
4. Додай плейсхолдер зображення через https://placehold.co/
5. Всі тексти мають бути змістовними (не Lorem Ipsum)
6. Адаптивна верстка (mobile-first)
7. Плавні анімації (CSS transitions)

ВАЖЛИВО:
- Поверни ТІЛЬКИ HTML-код, без пояснень
- Код повинен починатися з <!DOCTYPE html>
- Увесь CSS — через Tailwind класи (мінімум кастомного CSS)

Згенеруй HTML:
  `;
}
```

### Покращений промпт (з прикладом структури):

```javascript
function buildAdvancedPrompt(formData) {
  const sectionsMap = {
    hero: "Hero секція з великим заголовком, підзаголовком і двома CTA-кнопками",
    about: 'Секція "Про нас" з текстом та зображенням',
    services: 'Секція "Послуги" з 3-4 картками',
    portfolio: 'Секція "Портфоліо" з сіткою зображень',
    contacts: 'Секція "Контакти" з формою та адресою',
    footer: "Footer з посиланнями та копірайтом",
  };

  const selectedSections = formData.sections
    .map((s) => sectionsMap[s] || s)
    .join("\n- ");

  return `
Ти — експерт з веб-дизайну. Створи HTML лендінг із такими секціями:
- ${selectedSections}

Бізнес: ${formData.businessType} | Компанія: ${formData.companyName}
Стиль: ${formData.style} | Кольори: ${formData.colorScheme}

Tailwind CDN: https://cdn.tailwindcss.com
Формат відповіді: тільки HTML від <!DOCTYPE html> до </html>
  `;
}
```

---

## 🗄️ 6. Схема бази даних (MongoDB + Mongoose)

### Чому MongoDB підходить для цього проєкту:

- HTML контент — це великий текстовий blob, MongoDB зберігає його нативно
- Дані форми мають змінну структуру (різні секції) → документна модель ідеальна
- Немає потреби в JOIN-ах — всі пов’язані дані можна вкласти в один документ
- MongoDB Atlas — хмарне рішення з безкоштовним тарифом для старту

### Інсталяція:

```bash
npm install mongoose
```

### Підключення до MongoDB:

```javascript
// lib/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI не вказано у .env.local");
}

// Кешуємо з'єднання між hot-reloads у Next.js dev режимі
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
```

### Mongoose Schemas:

```javascript
// models/Submission.js
// Зберігає дані форми від клієнта
import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true, // для швидкого пошуку за sessionId
    },
    businessType: { type: String, required: true },
    companyName: { type: String, required: true },
    slogan: { type: String, default: "" },
    style: { type: String, required: true },
    colorScheme: { type: String, required: true },
    sections: [{ type: String }], // масив: ['hero', 'about', 'services']
    notes: { type: String, default: "" },
    clientEmail: { type: String, default: "" },
    ipAddress: { type: String },
  },
  {
    timestamps: true, // автоматично додає createdAt і updatedAt
  },
);

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
```

```javascript
// models/GeneratedDesign.js
// Зберігає HTML згенерований Claude
import mongoose from "mongoose";

const GeneratedDesignSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    htmlContent: {
      type: String,
      required: true, // повний HTML від Claude (може бути 20-50KB)
    },
    promptUsed: { type: String }, // промпт, який ми відправили
    modelUsed: { type: String, default: "claude-sonnet-4-20250514" },
    tokensUsed: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "approved", "rejected"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.GeneratedDesign ||
  mongoose.model("GeneratedDesign", GeneratedDesignSchema);
```

```javascript
// models/ApprovedDesign.js
// Окрема колекція для схвалених дизайнів — зручно для адміна
import mongoose from "mongoose";

const ApprovedDesignSchema = new mongoose.Schema(
  {
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedDesign",
      required: true,
    },
    sessionId: { type: String, required: true, index: true },
    companyName: { type: String },
    htmlContent: { type: String, required: true }, // копія HTML для надійності
    adminNotes: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.ApprovedDesign ||
  mongoose.model("ApprovedDesign", ApprovedDesignSchema);
```

```javascript
// models/Consultation.js
// Запити на консультацію від клієнтів
import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
    },
    sessionId: { type: String, index: true },
    clientName: { type: String },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Consultation ||
  mongoose.model("Consultation", ConsultationSchema);
```

### Альтернатива: вкладений документ (embedded) замість окремих колекцій

```javascript
// Якщо хочеш простіше — один документ на весь lifecycle:
const WebsiteRequestSchema = new mongoose.Schema(
  {
    sessionId: { type: String, unique: true, index: true },
    // Дані форми
    formData: {
      businessType: String,
      companyName: String,
      slogan: String,
      style: String,
      colorScheme: String,
      sections: [String],
      notes: String,
      clientEmail: String,
    },
    // Результат генерації
    generatedHtml: { type: String },
    promptUsed: { type: String },
    modelUsed: { type: String },
    tokensUsed: { type: Number },
    // Статус
    status: {
      type: String,
      enum: ["pending", "generated", "approved", "consultation_requested"],
      default: "pending",
    },
    approvedAt: { type: Date },
    ipAddress: { type: String },
  },
  { timestamps: true },
);

// ✅ Перевага: один запит до БД замість кількох
// ⚠️ Недолік: складніше масштабувати окремо approved дизайни
```

---

## 🔒 7. Безпека

### Обов’язкові заходи:

```javascript
// 1. ВАЛІДАЦІЯ вхідних даних (ніколи не довіряй клієнту)
import { z } from 'zod';

const FormSchema = z.object({
  businessType: z.enum(['restaurant', 'agency', 'shop', 'it', 'medical', 'other']),
  companyName: z.string().min(1).max(100).trim(),
  slogan: z.string().max(200).optional(),
  style: z.enum(['minimal', 'corporate', 'bright', 'elegant']),
  colorScheme: z.string().max(50),
  sections: z.array(z.string()).min(1).max(10),
  notes: z.string().max(500).optional(),
  clientEmail: z.string().email().optional()
});

// 2. RATE LIMITING (захист від abuse)
// Використовуй upstash/ratelimit або express-rate-limit
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 запитів/годину з одного IP
});

// 3. SANITIZE HTML перед вставкою у DOM
// Ніколи не вставляй сирий HTML напряму без перевірки
import DOMPurify from 'isomorphic-dompurify';
const safeHTML = DOMPurify.sanitize(generatedHTML, {
  ALLOWED_TAGS: ['div', 'section', 'header', 'footer', 'nav', 'h1', 'h2', 'h3',
                  'p', 'a', 'button', 'img', 'ul', 'li', 'span', 'form', 'input'],
  FORCE_BODY: true
});

// 4. ENV VARIABLES — API ключі тільки на сервері
// .env.local (ніколи не комітити!)
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
SESSION_SECRET=...

// 5. CSRF захист для форм (якщо Next.js)
// Використовуй next-csrf або вбудований CSRF у Next.js 14+

// 6. ЛОГУВАННЯ без чутливих даних
console.log(`Generated design for session: ${sessionId.slice(0, 8)}...`);
// НЕ логуй: API ключі, email клієнтів, повний HTML (може бути великим)
```

### Content Security Policy:

```javascript
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
      style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
      img-src 'self' https://placehold.co data:;
    `.replace(/\n/g, ""),
  },
];
```

---

## 🔄 8. Повний Flow з кодом

### `/api/generate-preview` (Next.js App Router):

```javascript
// app/api/generate-preview/route.js
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import GeneratedDesign from "@/models/GeneratedDesign";
import { buildPrompt, extractHTML } from "@/lib/claude";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    // 1. Парсимо та валідуємо тіло запиту
    const body = await request.json();
    const validated = FormSchema.parse(body);

    // 2. Підключаємось до MongoDB
    await connectDB();

    // 3. Генеруємо унікальний sessionId
    const sessionId = uuidv4();

    // 4. Зберігаємо форму у колекцію submissions
    const submission = await Submission.create({
      sessionId,
      businessType: validated.businessType,
      companyName: validated.companyName,
      slogan: validated.slogan,
      style: validated.style,
      colorScheme: validated.colorScheme,
      sections: validated.sections,
      notes: validated.notes,
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    });

    // 5. Формуємо промпт і викликаємо Claude
    const prompt = buildPrompt(validated);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const html = extractHTML(message.content[0].text);

    // 6. Зберігаємо згенерований дизайн у MongoDB
    await GeneratedDesign.create({
      submissionId: submission._id,
      sessionId,
      htmlContent: html,
      promptUsed: prompt,
      modelUsed: "claude-sonnet-4-20250514",
      tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
      status: "draft",
    });

    // 7. Повертаємо результат клієнту
    return NextResponse.json({ html, sessionId });
  } catch (error) {
    console.error("Generate preview error:", error);
    return NextResponse.json(
      { error: "Помилка генерації. Спробуйте ще раз." },
      { status: 500 },
    );
  }
}
```

### `/api/approve-design`:

```javascript
// app/api/approve-design/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import GeneratedDesign from "@/models/GeneratedDesign";
import ApprovedDesign from "@/models/ApprovedDesign";
import Submission from "@/models/Submission";

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 },
      );
    }

    await connectDB();

    // Знаходимо чернетку дизайну
    const design = await GeneratedDesign.findOne({
      sessionId,
      status: "draft",
    }).lean(); // .lean() повертає plain JS об'єкт — швидше для читання

    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    // Знаходимо назву компанії із submission
    const submission = await Submission.findOne({ sessionId })
      .select("companyName")
      .lean();

    // Зберігаємо в approved колекцію
    const approved = await ApprovedDesign.create({
      designId: design._id,
      sessionId,
      companyName: submission?.companyName || "",
      htmlContent: design.htmlContent,
    });

    // Оновлюємо статус у generated_designs
    await GeneratedDesign.findByIdAndUpdate(design._id, { status: "approved" });

    return NextResponse.json({
      success: true,
      designId: approved._id.toString(),
    });
  } catch (error) {
    console.error("Approve design error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

---

## 🎨 9. Preview Card компонент

```jsx
// components/PreviewCard.jsx
"use client";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function PreviewCard({
  html,
  sessionId,
  onApprove,
  onConsultation,
}) {
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  // Очищаємо HTML перед вставкою
  const safeHTML = DOMPurify.sanitize(html);

  const handleApprove = async () => {
    setApproving(true);
    try {
      const res = await fetch("/api/approve-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        setApproved(true);
        onApprove?.();
      }
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Preview контейнер */}
      <div
        className="w-full max-w-sm mx-auto rounded-2xl border border-gray-200 
                   shadow-2xl overflow-y-auto bg-white"
        style={{ height: "600px" }}
      >
        {/* Вставляємо HTML напряму */}
        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      </div>

      {/* Кнопки дій */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleApprove}
          disabled={approving || approved}
          className="px-6 py-3 bg-green-600 text-white rounded-xl 
                     font-semibold hover:bg-green-700 disabled:opacity-50
                     transition-all duration-200"
        >
          {approved
            ? "✅ Схвалено!"
            : approving
              ? "Зберігаємо..."
              : "✅ Схвалити дизайн"}
        </button>

        <button
          onClick={onConsultation}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl 
                     font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          📞 Хочу консультацію
        </button>
      </div>
    </div>
  );
}
```

---

## 📊 10. Рекомендований стек та інструменти

| Категорія     | Технологія                   | Чому                                         |
| ------------- | ---------------------------- | -------------------------------------------- |
| Frontend      | Next.js 14 (App Router)      | SSR + API Routes в одному проєкті            |
| Стилі         | Tailwind CSS                 | Claude чудово його знає                      |
| AI            | Claude API (claude-sonnet-4) | Найкраща якість HTML-генерації               |
| База даних    | MongoDB (MongoDB Atlas)      | Гнучка документна БД, ідеальна для HTML/JSON |
| ODM           | Mongoose                     | Схеми, валідація, middleware для MongoDB     |
| Валідація     | Zod                          | TypeScript-friendly схеми                    |
| HTML sanitize | DOMPurify                    | Захист від XSS                               |
| Rate limit    | Upstash Ratelimit            | Serverless-friendly                          |
| Email         | Resend або Nodemailer        | Сповіщення адміну                            |
| Deploy        | Vercel + MongoDB Atlas       | Найлегша деплойментація Next.js              |

---

---

# ЧАСТИНА 2 — ПРАВИЛА ДЛЯ CURSOR AI

---

# 🤖 Cursor AI — Правила та інструкції для розробки

> Цей документ визначає, як AI-асистент (Cursor) повинен допомагати  
> в розробці проєкту **AI Website Preview Generator**

---

## 📋 Project Overview (Огляд проєкту)

**Назва проєкту:** AI Website Preview Generator  
**Мета:** Дати клієнтам можливість заповнити форму і отримати AI-згенерований прев’ю лендінгу  
**Основні технології:** Next.js 14, Claude API, Tailwind CSS, MongoDB  
**Мова коду:** TypeScript (preferred) або JavaScript  
**Мова коментарів у коді:** Англійська (стандарт)  
**Мова пояснень розробнику:** Українська

---

## 🏗️ Architecture (Архітектура)

```
ai-website-preview/
├── app/
│   ├── page.tsx                    # Головна сторінка з формою
│   ├── preview/page.tsx            # Сторінка прев'ю
│   └── api/
│       ├── generate-preview/route.ts  # Генерація через Claude
│       ├── approve-design/route.ts    # Збереження схваленого дизайну
│       └── request-consultation/route.ts
├── components/
│   ├── WebsiteForm.tsx             # Форма клієнта
│   ├── PreviewCard.tsx             # Контейнер прев'ю з прокруткою
│   └── ActionButtons.tsx           # Approve / Consultation кнопки
├── lib/
│   ├── claude.ts                   # Клієнт Claude API + prompts
│   ├── db.ts                       # Підключення до MongoDB (Mongoose)
│   └── validators.ts               # Zod схеми валідації
├── models/
│   ├── Submission.ts               # Mongoose schema: дані форми
│   ├── GeneratedDesign.ts          # Mongoose schema: згенеровані дизайни
│   ├── ApprovedDesign.ts           # Mongoose schema: схвалені дизайни
│   └── Consultation.ts             # Mongoose schema: запити на консультацію
└── .env.local                      # Секрети (НЕ комітити!)
```

### Принципи архітектури:

1. **Separation of concerns** — кожен файл має одну відповідальність
1. **API routes тільки на сервері** — Claude API ключ ніколи не потрапляє на клієнт
1. **Валідація на кожному рівні** — і на клієнті, і на сервері
1. **Оптимістичний UI** — показувати результат одразу, не чекати підтвердження БД

---

## 🔄 Development Workflow (Робочий процес)

### Порядок реалізації (покрокова розробка):

```
Крок 1: Налаштування проєкту
  └── next.js init → tailwind → env variables → mongoose

Крок 2: База даних
  └── Mongoose моделі → connectDB → тестове з'єднання з Atlas

Крок 3: Claude інтеграція
  └── lib/claude.ts → тестовий виклик → перевірка промпту

Крок 4: API Routes
  └── /generate-preview → /approve-design → /request-consultation

Крок 5: Frontend компоненти
  └── WebsiteForm → PreviewCard → ActionButtons

Крок 6: Збірка сторінок
  └── app/page.tsx → app/preview/page.tsx

Крок 7: Безпека та полішинг
  └── Rate limiting → DOMPurify → error handling → loading states

Крок 8: Тестування
  └── Unit тести → інтеграційні тести → end-to-end
```

### Git-конвенції:

```bash
feat: add claude integration
fix: sanitize html before rendering
refactor: extract prompt builder to separate function
docs: update api documentation
chore: update dependencies
```

---

## 🤖 AI Assistant Rules (Правила AI-асистента)

### ОБОВ’ЯЗКОВІ правила для Cursor AI:

---

### ПРАВИЛО 1: Завжди пояснюй код

Коли ти пишеш або змінюєш код, ЗАВЖДИ додавай пояснення:

- **Що робить цей код** (в 1-2 реченнях)
- **Чому обраний саме цей підхід** (альтернативи та причини вибору)
- **Які є підводні камені або обмеження**

````typescript
// ✅ ПРАВИЛЬНО — з поясненням
/**
 * Витягує чистий HTML з відповіді Claude.
 * Claude іноді обгортає код у ```html ... ```, тому потрібна додаткова обробка.
 * Використовуємо regex замість парсера, бо структура завжди однакова.
 */
function extractHTML(text: string): string {
  const match = text.match(/```html\n?([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}

// ❌ НЕПРАВИЛЬНО — без пояснення
function extractHTML(text: string): string {
  const match = text.match(/```html\n?([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}
````

---

### ПРАВИЛО 2: Питай перед зміною важливих файлів

Перед зміною наступних файлів — ЗАВЖДИ питай підтвердження:

```
⚠️  ФАЙЛИ, ЯКІ ПОТРЕБУЮТЬ ПІДТВЕРДЖЕННЯ:
- models/*.ts                 (зміна Mongoose схем — може зламати існуючі дані!)
- app/api/*/route.ts          (API routes — впливає на всіх клієнтів)
- lib/claude.ts               (промпти — впливає на якість генерації)
- lib/db.ts                   (підключення до MongoDB — критичний файл)
- .env.local / .env           (секрети — критична безпека)
- next.config.js              (конфіг — може зламати build)
- middleware.ts               (захист — може заблокувати доступ)
```

Формат питання:

```
Я збираюся змінити [назва файлу].
Причина: [що і чому потрібно змінити]
Зміни: [конкретний опис змін]
Ризики: [що може піти не так]
Продовжити? (так/ні)
```

---

### ПРАВИЛО 3: Розбивай на маленькі кроки

Ніколи не намагайся реалізувати все одразу. Кожне завдання розбивай:

```
✅ ПРАВИЛЬНИЙ підхід:
"Крок 1: Створю тип TypeScript для FormData
 Крок 2: Додам Zod валідацію
 Крок 3: Напишу API route
 Крок 4: Протестую з curl
 Крок 5: Підключу до фронтенду"

❌ НЕПРАВИЛЬНИЙ підхід:
"Зараз напишу весь бекенд одразу"
```

---

### ПРАВИЛО 4: Пропонуй покращення архітектури

Якщо бачиш можливість покращити код — скажи про це, але НЕ роби це автоматично:

```
💡 ПРОПОЗИЦІЯ ПОКРАЩЕННЯ:
Зараз ти зберігаєш HTML у MongoDB як рядок у документі.
Альтернатива: зберігати в S3/Cloudflare R2 для економії Atlas storage.
Причина: HTML може бути 20-50KB × тисячі записів = значні витрати.
Чи хочеш розглянути цей підхід?
```

---

### ПРАВИЛО 5: Дотримуйся стилю проєкту

```typescript
// TypeScript — завжди з типами
interface FormData {
  businessType: BusinessType;
  companyName: string;
  // ...
}

// Async/await замість .then()
const result = await generatePreview(data); // ✅
generatePreview(data).then(result => ...);   // ❌

// Named exports (не default де можливо)
export function buildPrompt(data: FormData): string { ... } // ✅

// Константи UPPER_CASE
const MAX_TOKENS = 4096;
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
```

---

## 💻 Code Generation Guidelines (Правила генерації коду)

### Стандарти якості коду:

```typescript
// 1. ЗАВЖДИ типізуй (TypeScript)
type DesignStatus = "draft" | "approved" | "rejected";

interface GeneratedDesign {
  id: string;
  sessionId: string;
  htmlContent: string;
  status: DesignStatus;
  createdAt: Date;
}

// 2. ЗАВЖДИ обробляй помилки
async function generatePreview(data: FormData): Promise<Result<string, Error>> {
  try {
    const html = await callClaudeAPI(data);
    return { success: true, data: html };
  } catch (error) {
    console.error("[Claude API Error]:", error);
    return { success: false, error: error as Error };
  }
}

// 3. ЗАВЖДИ валідуй на сервері
const validated = FormSchema.safeParse(body);
if (!validated.success) {
  return NextResponse.json(
    { error: "Invalid input", details: validated.error.flatten() },
    { status: 400 },
  );
}

// 4. НІКОЛИ не хардкодь секрети
const apiKey = process.env.ANTHROPIC_API_KEY; // ✅
const apiKey = "sk-ant-hardcoded"; // ❌ НІКОЛИ!

// 5. Використовуй early return
function processData(data: FormData | null): string {
  if (!data) return ""; // early return ✅
  if (!data.companyName) return "";

  return buildPrompt(data);
}
```

### Структура API Response:

```typescript
// Успішна відповідь
return NextResponse.json({
  success: true,
  data: { html, sessionId },
  message: "Preview generated successfully",
});

// Помилка
return NextResponse.json(
  {
    success: false,
    error: "Описова помилка для користувача",
    code: "CLAUDE_API_ERROR", // machine-readable код
  },
  { status: 500 },
);
```

### Іменування:

```typescript
// Файли: kebab-case
// preview-card.tsx, generate-preview.ts ✅

// Компоненти React: PascalCase
// PreviewCard, WebsiteForm ✅

// Функції: camelCase з дієслова
// generatePreview(), buildPrompt(), extractHTML() ✅

// Типи/Інтерфейси: PascalCase
// FormData, GeneratedDesign, ApiResponse ✅

// Constants: UPPER_SNAKE_CASE
// MAX_TOKENS, CLAUDE_MODEL, DEFAULT_TIMEOUT ✅
```

---

## 🔐 Security Rules (Правила безпеки)

### КРИТИЧНІ правила безпеки — НІКОЛИ не порушувати:

```
🚫 ЗАБОРОНЕНО:
1. Передавати ANTHROPIC_API_KEY на клієнт (у браузер)
2. Вставляти несанітований HTML через innerHTML
3. Довіряти даним форми без серверної валідації
4. Логувати API ключі, токени, паролі
5. Комітити .env файли з секретами
6. Передавати user input напряму у MongoDB query (NoSQL injection!)
7. Відображати деталі помилок сервера користувачу

✅ ОБОВ'ЯЗКОВО:
1. Валідувати ВСЕ через Zod на сервері
2. Санітувати HTML через DOMPurify перед рендерингом
3. Використовувати rate limiting на API endpoints
4. Перевіряти розмір вхідних даних (не > 10KB)
5. Логувати підозрілу активність (без чутливих даних)
6. Використовувати HTTPS (автоматично на Vercel)
7. Додавати CSP headers у next.config.js
8. Використовувати Mongoose схеми для автоматичної валідації типів
```

### Перевірка перед деплоєм:

```bash
# Чекліст безпеки
[ ] Чи є ANTHROPIC_API_KEY тільки в .env.local?
[ ] Чи встановлено rate limiting?
[ ] Чи санітується HTML перед вставкою?
[ ] Чи є Zod валідація на всіх API routes?
[ ] Чи налаштовано CSP headers?
[ ] Чи .env* є у .gitignore?
[ ] Чи є error boundaries у React?
```

---

## ✨ Best Practices (Найкращі практики)

### UX/UI:

```typescript
// 1. Loading states — завжди показуй стан завантаження
const [isGenerating, setIsGenerating] = useState(false);
// Показуй spinner під час очікування Claude (може бути 5-15 секунд!)

// 2. Оптимістичний UI — не блокуй користувача
// Схвалення дизайну: одразу показай "Схвалено!", потім зберігай у БД

// 3. Error messages — зрозумілі для користувача
// ❌ "Error 500: Internal Server Error"
// ✅ "Не вдалося згенерувати дизайн. Спробуйте ще раз або оберіть менше секцій."

// 4. Skeleton loaders для прев'ю
// Поки Claude генерує, показуй анімований skeleton замість порожнього місця
```

### Продуктивність:

```typescript
// 1. Streaming (покращений UX для повільної генерації)
// Claude підтримує streaming — можна показувати HTML по мірі генерації

// 2. Кешування промптів
// Схожі форми → схожий результат → можна кешувати (обережно!)

// 3. Оптимізація зображень Next.js
import Image from 'next/image'; // замість <img>

// 4. Lazy loading компонентів
const PreviewCard = dynamic(() => import('./PreviewCard'), {
  loading: () => <PreviewSkeleton />
});
```

### Тестування:

````typescript
// Кожна функція повинна мати тест:

// lib/__tests__/claude.test.ts
describe("extractHTML", () => {
  it("extracts HTML from markdown code blocks", () => {
    const input = "```html\n<div>Hello</div>\n```";
    expect(extractHTML(input)).toBe("<div>Hello</div>");
  });

  it("returns raw text if no code block found", () => {
    const input = "<div>Hello</div>";
    expect(extractHTML(input)).toBe("<div>Hello</div>");
  });
});
````

---

## 🚀 Quick Start для нового розробника

```bash
# 1. Клонуй репозиторій
git clone [repo-url]
cd ai-website-preview

# 2. Встанови залежності
npm install

# 3. Скопіюй env файл
cp .env.example .env.local
# Заповни: ANTHROPIC_API_KEY, MONGODB_URI

# 4. Підключи MongoDB Atlas
# Зареєструйся на mongodb.com/atlas → створи cluster → скопіюй URI
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai-preview

# 5. Запусти dev сервер
npm run dev

# 6. Відкрий http://localhost:3000
```

---

## 📞 Контакти та ресурси

- [Claude API Docs](https://docs.anthropic.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Mongoose Docs](https://mongoosejs.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Zod Docs](https://zod.dev)
- [DOMPurify](https://github.com/cure53/DOMPurify)

---

_Документ створено: 2025 | Версія: 1.1.0_  
_Мова: Українська | Стек: Next.js · Claude API · MongoDB · Tailwind CSS_
