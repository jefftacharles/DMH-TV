# StudyMate AI

StudyMate AI is a modern AI-powered education platform by **J & J Media**. It helps students study smarter with AI chat, notes summaries, quiz generation, study planning, past-paper explanations, authentication screens, and a responsive dashboard.

## Tech stack

- Next.js 15 and React 19
- Tailwind CSS and reusable shadcn-style UI components
- OpenAI API route integration with demo fallbacks
- Supabase-ready authentication utilities with Google OAuth
- Mobile-first responsive dashboard with dark and light mode

## Environment variables

Create a .env.local file for production integrations:

```bash
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these values are not configured, the app uses demo AI responses and demo auth routing so the UI remains explorable.

## Scripts

```bash
npm install
npm run dev
npm run build
```
