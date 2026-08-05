-- List all policies on public.plans (run in SQL Editor)
SELECT policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'plans'
ORDER BY policyname;
