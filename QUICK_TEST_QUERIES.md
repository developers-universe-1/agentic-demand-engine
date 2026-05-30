# Quick Test Queries

Run through these in under 5 minutes to validate the system end-to-end.

## Prerequisites

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

---

## 1. Dashboard Overview

**Action:** Click **Open Dashboard** on the landing page.

**Expected:** Overview view loads with total leads, enriched count, average ICP score, high-intent leads, and watched profiles.

**Validation:** All numbers should be non-zero.

---

## 2. Watchlist

**Action:** Navigate to **Watchlist**.

**Expected:** 4 monitored LinkedIn profiles render with follower counts, qualified lead attribution, and signal types.

**Validation:** Each profile card should be clickable and show signal history.

---

## 3. Lead Feed

**Action:** Navigate to **Lead Feed**. Click the first lead card.

**Expected:** Expandable card reveals engagement timeline, ICP score breakdown, and enriched contact info.

**Validation:** ICP score should be between 0–100. Enrichment status should be visible.

---

## 4. ICP Builder

**Action:** Navigate to **ICP Builder**. Toggle filters for "VP" titles and "SaaS" industry.

**Expected:** Live summary updates with matching lead count and average score.

**Validation:** Matching count should decrease as filters narrow. Summary should update in real time.

---

## 5. Notifications

**Action:** Navigate to **Notifications**. Toggle a Slack webhook rule on/off.

**Expected:** Toggle switches smoothly. Trigger history updates.

**Validation:** No full-page reload. State persists on navigation.

---

## 6. REST API

**Action:** Run:

```bash
curl http://localhost:3000/api/leads
```

**Expected:** JSON response with `leads` array, each containing `id`, `name`, `company`, `icpScore`, `enrichmentStatus`, and `engagementSignals`.

**Validation:** `leads.length` should be 8. All scores between 0–100.

---

## 7. SSE Stream

**Action:** Run:

```bash
curl -N http://localhost:3000/api/leads/stream
```

**Expected:** SSE stream with scan → score → enrich events.

**Validation:** Stream ends with a `complete` event. No connection drops.

---

## 8. npm test

**Action:** Run:

```bash
npm test
```

**Expected:** All tests pass.

**Validation:** Jest output shows green checkmarks. No failures.

---

## All Green?

If all 8 pass, the MCP Demand Engine is running correctly. Ready to wire real LinkedIn and Apollo integrations.
