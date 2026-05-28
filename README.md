# LeadFinder

![Next.js](https://img.shields.io/badge/Next.js_15-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

An AI-powered lead intelligence platform that monitors LinkedIn engagement, scores prospects against your ICP, enriches contacts, and routes qualified leads straight to your CRM — automatically.

**Demo mode works without API keys.** Clone, `npm install`, `npm run dev`, and explore the full dashboard instantly.

## Why This Exists

SDRs spend hours scrolling LinkedIn, researching contacts, and deciding who to chase. LeadFinder automates the full top-of-funnel workflow: it watches profiles, detects engagement signals, scores every lead against your ICP, enriches contact data, and routes qualified leads to your CRM and sequencer — so your team only talks to the right people.

## Integrations

No rip-and-replace. Connect what you already use:

| Category | Tools |
|---|---|
| Data Sources | **LinkedIn** Public Data, **Apollo.io**, **Clearbit**, **ZoomInfo** |
| CRM | **Salesforce**, **HubSpot** |
| Sequencers | **Outreach**, **Salesloft** |
| Notifications | **Slack** (webhooks + bot), Custom Webhooks |
| LLM | **OpenAI GPT-4o / Claude 3.5 Sonnet** |

## Five Capabilities

### 1. Watchlist
Pin competitors, partners, and thought leaders. We index every public post and the people engaging with them.

### 2. Signal Detection
Likes, comments, reposts, profile visits, mentions. Every engagement is a buying signal — caught in real time.

### 3. ICP Match Score
Every engager is scored 0–100 against your ICP. Sort, filter, snooze. Only chase fits above the threshold you set.

### 4. Contact Enrichment
One click for verified email and direct dial via Apollo and Clearbit. Ship straight to your CRM or sequencer.

### 5. Lead Feed
Qualified leads surface automatically — enriched, scored, and ready to outreach.

## Architecture

```
src/
├── app/
│   ├── api/leads/          # REST + SSE streaming endpoints
│   ├── dashboard/          # 5 interactive dashboard views
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
├── lib/
│   ├── agent/
│   │   └── scorer.ts       # ICP scoring engine with async generators
│   ├── demo/               # Rich mock data for zero-config demo mode
│   ├── cache.ts            # In-memory TTL cache with expiration logic
│   ├── logger.ts           # Structured namespace-based logging
│   └── errors.ts           # Typed error hierarchy
```

### Pipeline Flow

```
LinkedIn Public Data
        ↓
   Profile Indexer
        ↓
  Engagement Detector
        ↓
    ICP Scoring Engine
        ↓
   ┌────────┼────────┐
   ↓        ↓        ↓
Apollo  Salesforce  Slack
Clearbit  HubSpot   Webhooks
Outreach Salesloft
```

### Engineering Decisions

- **ICP scoring engine** with configurable title/industry/company-size filters — leads scored 0–100 in real time
- **Server-Sent Events (SSE)** streaming pipeline — live progress from scan → score → enrich → surface
- **Structured error hierarchy** with typed stages — production-grade error handling and logging
- **Zero-config demo mode** — rich mock data means the full app works without API keys
- **Multi-stage Dockerfile** — optimized production build with standalone output
- **GitHub Actions CI** — lint, typecheck, and test with coverage on every push

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Validation:** Zod (structured LLM output parsing)
- **LLM:** OpenAI GPT-4o / Claude 3.5 Sonnet via streaming completions
- **Testing:** Jest + ts-jest
- **CI/CD:** GitHub Actions (lint, typecheck, test with coverage)
- **Deployment:** Multi-stage Docker build

## Dashboard Views

| View | What It Shows |
|---|---|
| **Overview** | Total leads, enriched count, average ICP score, high-intent leads, watched profiles |
| **Watchlist** | 4 monitored LinkedIn profiles with follower counts, qualified lead attribution, and signal types |
| **Lead Feed** | Scored leads (0–100) with engagement type, company info, enriched email/phone, LinkedIn links, expandable engagement timeline |
| **ICP Builder** | Interactive filters for titles, industries, and company sizes with live summary |
| **Notifications** | Slack/webhook/email routing rules with toggle switches and trigger history |

## Quick Start

```bash
# Clone and install
npm install

# Zero-config demo mode — works without any API keys
cp .env.example .env
npm run dev
```

Open `http://localhost:3000` and click **Open Dashboard**.

## Demo Mode

The app ships with rich mock data so it works instantly without configuration:

- **8 qualified leads** with ICP scores, engagement types (like/comment/repost/profile_view), enriched contacts, and engagement timelines
- **4 watched LinkedIn profiles** including industry thought leaders
- **Interactive ICP builder** with title, industry, and company size filters
- **Notification rules** with Slack/webhook/email routing simulation
- **Real-time streaming simulation** showing scan → score → enrich pipeline

## Testing

```bash
npm test
```

Covers cache expiration, ICP scoring engine streaming, and error hierarchy.

## Deployment

```bash
docker build -t leadfinder .
docker run -p 3000:3000 leadfinder
```

## License

MIT
