## Shubham Joshi — Animated Portfolio (React + Vite + Tailwind + Framer Motion)

Commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Tech:
- React + Vite + TypeScript
- Tailwind CSS (v4 via `@import "tailwindcss"` in `src/index.css`)
- Framer Motion for animations
- React Hook Form + Zod for contact form validation
- EmailJS for message delivery (optional)

Environment variables (create `.env`):
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Customize:
- Name/brand: `src/components/Navbar.tsx`
- Hero copy and CTAs: `src/components/Hero.tsx`
- Experience items: `src/components/Experience.tsx`
- Skills list: `src/components/Skills.tsx`
- Projects data: `src/components/Projects.tsx`
- Contact handling: `src/components/Contact.tsx`

Deploy (Vercel):
1. Push to GitHub
2. Import repo on Vercel and deploy
3. Add the above env vars in Vercel Project Settings if using EmailJS

Notes:
- Animation variants are shared in `src/utils/animations.ts`.
- Tailwind utilities drive layout and glassmorphism (`.glass` class`).
# NJ
