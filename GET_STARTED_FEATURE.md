# Get Started Feature – Implementation Guide

This document describes how the **/get-started flow** should be implemented in the SolidLine Digital website.

The goal is to build a **multi-step onboarding form** that collects information from potential clients, generates draft website content using AI, and sends the results to the agency for review.

This guide is intended to help development without auto-generating full implementations.

---

# Feature Overview

The `/get-started` page is a **multi-step form** that collects structured information about a client's business.

After submission:

1. The data is sent to the backend API.
2. The backend stores the lead in the database.
3. The backend calls an AI service to generate draft website content.
4. The generated content is saved in the database.
5. A notification email is sent to the agency.
6. The team reviews the generated content and contacts the client.

This system helps reduce the biggest bottleneck in web development: **content collection from clients**.

---

# User Flow

User journey should look like this:

1. User clicks **Get Started**
2. User lands on `/get-started`
3. Multi-step form appears
4. User completes the form
5. User submits
6. Success screen appears

Backend processes:

- Save lead
- Generate website content with AI
- Notify team

---

# Tech Stack

Frontend:

- Next.js
- React
- TypeScript
- Tailwind (if used)

Backend:

- Next.js API routes
- Node.js
- MongoDB

External services:

- OpenAI API (content generation)
- Email service (Resend / Nodemailer / Sendgrid)

---

# Multi-Step Form Structure

The form should contain **4 steps**.

Progress indicator should be visible at the top.

Example:

Step 1 / 4  
Step 2 / 4  
Step 3 / 4  
Step 4 / 4

---

# Step 1 — Basic Information

Collect basic lead information.

Fields:

- Name
- Email
- Business Name
- Business Location

Business Type (select):

- Local service
- Online business
- Personal brand
- Company

Purpose:

Identify the client and categorize the business.

---

# Step 2 — Business Description

This step gathers content used to generate website text.

Fields:

What does your business do?

Describe your services or products.

Who are your typical customers?

What makes your business different?

Purpose:

These answers will be used to generate:

- Hero section
- About section
- Services section

---

# Step 3 — Website Preferences

This step helps understand the desired style.

Fields:

Do you have a logo?

- yes
- no

Do you have brand colors? (optional)

Preferred website style:

- modern
- minimal
- bold
- not sure

Optional fields:

Competitor websites (URLs)

Purpose:

Help guide the design direction.

---

# Step 4 — Contact & Final Details

Fields:

Phone number (optional)

Instagram (optional)

Existing website (optional)

Additional notes (textarea)

Submit button.

---

# Form State Management

Recommended approaches:

React state or a form library such as:

- React Hook Form
- Zod validation (optional)

Each step should validate its own fields before allowing the user to continue.

The final submit should send a single structured payload.

---

# API Endpoint

Create an API route.

Example:

POST /api/leads/create
Payload example:
{
name,
email,
businessName,
location,
businessType,
description,
services,
customers,
differentiation,
logo,
brandColors,
stylePreference,
competitors,
phone,
instagram,
website,
notes
}

---

# Database Model

Example MongoDB structure.

Collection: `leads`

Fields:

{
\_id,
name,
email,
businessName,
location,
businessType,
answers: {…},
generatedContent: {…},
createdAt
}

---

# AI Content Generation

After saving the lead, the backend should call OpenAI.

Purpose:

Generate draft website content based on user answers.

Example content sections:

Hero

About

Services

CTA

Example structure:
{
hero: {
headline,
subheadline
},
about,
services: [
{ title, description }
],
cta
}

Store the generated content in the lead document.

---

# Email Notification

After content generation, send a notification email to the agency.

Example subject:

New lead from SolidLine Digital

Include:

- Client name
- Business name
- Email
- Generated content summary

This allows the team to review the lead quickly.

---

# Success Page

After submission the user should see a confirmation screen.

Example message:

"Thanks! We've received your information.  
We'll review your details and contact you within 24 hours."

Optional:

Display next steps.

---

# UX Best Practices

Keep the form simple.

Avoid too many required fields.

Show:

- progress indicator
- step transitions
- loading state during submission

Ensure mobile friendliness.

Most users will fill the form from mobile.

---

# Future Improvements

Possible upgrades later:

- automatic proposal generation
- CRM integration
- client dashboard
- automatic wireframe generation
- AI website draft preview

But these are not required for the first version.

Focus on:

simple → reliable → fast.
