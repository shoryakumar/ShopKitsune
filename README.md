This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ShopKitsune Frontend Structure

This project is the Next.js frontend for ShopKitsune, an AI-powered shopping assistant.

## Main Navigation & Pages
- **Home**: Welcome and feature highlights
- **Style Profile**: Upload image/text for style analysis
- **Recommendations**: AI-driven fashion suggestions
- **Virtual Try-On**: AR.js-based try-on experience
- **Chatbot**: Conversational shopping assistant (Rasa integration)
- **Loyalty Dashboard**: Points, badges, rewards, and progress

All pages are accessible via the top navigation bar. Add new features as separate pages or components in the `app/` directory.

## Backend

The backend is located in the `backend/` folder and is built with Python (FastAPI), ready for AI, AR, and e-commerce integrations. It will provide REST APIs for:
- Style profiling (image/text analysis)
- AI-driven recommendations
- Virtual try-on endpoints
- Chatbot (Rasa integration)
- Loyalty program management
- User and session management (future)

Database: PostgreSQL (with SQLAlchemy/asyncpg)

To run the backend, see `backend/README.md` (to be created).
