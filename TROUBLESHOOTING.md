# Troubleshooting

Common setup issues and how to fix them.

---

## `npm install` fails with peer dependency errors

**Symptom:**
```
npm ERR! ERESOLVE could not resolve
```

**Cause:** npm strict peer dependency resolution with React 19.

**Fix:**
```bash
npm install --legacy-peer-deps
```

Or use the included lockfile:
```bash
npm ci
```

---

## `npm run dev` fails with "Cannot find module"

**Symptom:**
```
Error: Cannot find module '@/lib/demo/leads'
```

**Cause:** TypeScript path aliases not resolved.

**Fix:**
1. Check that `tsconfig.json` has `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }`.
2. Restart the dev server: `Ctrl+C`, then `npm run dev`.

---

## Dashboard shows blank screen

**Symptom:** White screen or infinite spinner.

**Cause:** Client-side JavaScript error in a chart component.

**Fix:**
1. Open browser DevTools → Console.
2. Look for errors from `recharts` or `framer-motion`.
3. Clear `.next` cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## `/api/leads/stream` hangs

**Symptom:** `curl` hangs indefinitely.

**Cause:** Next.js dev server buffers SSE responses.

**Fix:** Wait 2–3 seconds. In production (`npm run build && npm start`), SSE works without buffering.

---

## `npm test` fails with path alias error

**Symptom:**
```
Cannot find module '@/lib/cache'
```

**Cause:** Jest does not read `tsconfig.json` paths by default.

**Fix:** Add to `jest.config.js`:
```js
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1'
}
```

---

## Docker build fails

**Symptom:**
```
npm ERR! code EUSAGE
```

**Cause:** `package-lock.json` is out of sync with `package.json`.

**Fix:**
```bash
npm install
docker build -t mcp-demand-engine .
```

---

## Still stuck?

Open an issue with:
1. Your Node version (`node -v`)
2. Your OS
3. The full error message (copy-paste, not screenshot)
4. What you've already tried from this guide
