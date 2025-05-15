# Next.js Boilerplate Starter

A modern, feature-rich Next.js boilerplate with Supabase authentication, Shadcn/UI components, and TypeScript support. This template provides a solid foundation for building full-stack web applications.

## Features

- ⚡ Next.js 14 with App Router
- 🔐 Supabase Authentication
- 🎨 Shadcn/UI Components
- 🌟 TypeScript Support
- 📱 Responsive Design
- 🔄 State Management
- 🎯 ESLint & Prettier
- 🚀 Production-ready

## Getting Started

### Setup

1. Clone this repository:
```bash
git clone https://github.com/dustinbturner/nextjsboilerplate-starter.git my-project
cd my-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then update the `.env` file with your Supabase credentials.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

```
├── app/                # Next.js App Router pages
├── public/            # Static assets
├── src/
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   └── lib/           # Utility functions and configurations
└── types/             # TypeScript type definitions
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
