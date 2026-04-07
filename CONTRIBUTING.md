## Contributing

## Codebase conventions

- **Styling**: prefer inline `style` props for layout and visual styling. Tailwind utilities are used only for the small animation utilities defined in `app/globals.css`.
- **Data**: project/case-study data lives in `lib/projects.ts`.
- **Next.js App Router**: pages are Server Components by default.

## Development

```bash
npm ci
npm run dev
```

Before opening a PR, run:

```bash
npm run lint
npm run build
```

