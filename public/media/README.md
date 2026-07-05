# Media assets

Drop client-provided files into these folders, matching the placeholders in `app/page.tsx`:

- `hero/` — coach photo or training clip used in the hero section
- `transformations/` — client before/after photos for the Results section
- `training-clips/` — demo footage (silent or English narration preferred for the UK/US audience)

Once files are added, swap the corresponding `<MediaPlaceholder />` in `app/page.tsx` for a real `<Image />` or `<video>` element.
