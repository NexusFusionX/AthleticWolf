# Apply Supabase RLS + admin env (required)

Project: `msjmopofxzmtsnvitjen`

## 1. Backup (SQL Editor)

Run `supabase/backup-plans-before-rls.sql`.

## 2. Enable RLS (SQL Editor)

Run `supabase/migrations/20260805_enable_plans_rls.sql`.

## 3. Server env (local `.env.local` + Vercel)

```
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

- Never prefix these with `NEXT_PUBLIC_`.
- Rotate `ADMIN_PASSWORD` — the old password was previously hardcoded in client JS.

## 4. Verify anon is locked

```bash
node scripts/rls-probe.js
```

Expect SELECT body `[]` (or no row data) after RLS is enabled.
