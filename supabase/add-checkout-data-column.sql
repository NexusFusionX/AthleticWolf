-- Run once in Supabase SQL Editor so checkout contact shows in the admin panel.
ALTER TABLE plans ADD COLUMN IF NOT EXISTS checkout_data text;
