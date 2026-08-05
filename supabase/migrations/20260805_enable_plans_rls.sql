-- =============================================================================
-- SECURITY: Enable RLS on public.plans + owner-scoped policies
-- Project: msjmopofxzmtsnvitjen
-- Run AFTER backup-plans-before-rls.sql
-- Service role (server) bypasses RLS automatically — admin APIs keep working.
-- =============================================================================

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Drop legacy/open policies if any exist (safe no-ops when missing)
DROP POLICY IF EXISTS "Allow all" ON public.plans;
DROP POLICY IF EXISTS "Public access" ON public.plans;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.plans;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.plans;
DROP POLICY IF EXISTS "Enable update for all users" ON public.plans;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.plans;
DROP POLICY IF EXISTS "plans_select_own" ON public.plans;
DROP POLICY IF EXISTS "plans_insert_own" ON public.plans;
DROP POLICY IF EXISTS "plans_update_own" ON public.plans;
DROP POLICY IF EXISTS "plans_delete_own" ON public.plans;

-- Authenticated users: read only their own plan rows
CREATE POLICY "plans_select_own"
  ON public.plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users: create only rows for themselves
CREATE POLICY "plans_insert_own"
  ON public.plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users: update only their own rows
CREATE POLICY "plans_update_own"
  ON public.plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users: delete only their own rows
CREATE POLICY "plans_delete_own"
  ON public.plans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Explicitly no policies for anon role → anon denied by default when RLS is on.

-- Verify
SELECT
  c.relname,
  c.relrowsecurity AS rls_enabled,
  (
    SELECT count(*)
    FROM pg_policies p
    WHERE p.schemaname = 'public' AND p.tablename = 'plans'
  ) AS policy_count
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'plans';
