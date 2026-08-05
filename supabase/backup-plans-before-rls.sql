-- =============================================================================
-- BACKUP: Run this FIRST in Supabase SQL Editor (project msjmopofxzmtsnvitjen)
-- Creates a full snapshot of public.plans before enabling RLS.
-- Safe to re-run: uses a dated table name with IF NOT EXISTS pattern via timestamp.
-- =============================================================================

-- 1) Snapshot data + structure into a backup table
CREATE TABLE IF NOT EXISTS public.plans_backup_20260805 AS
SELECT *
FROM public.plans;

-- 2) Quick verification
SELECT
  (SELECT count(*) FROM public.plans) AS plans_count,
  (SELECT count(*) FROM public.plans_backup_20260805) AS backup_count;

-- Optional: export later via Table Editor → plans_backup_20260805 → Export CSV
-- Optional cleanup AFTER you confirm RLS + admin APIs work in production:
--   DROP TABLE public.plans_backup_20260805;
