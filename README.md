# 🌱 Vines & Views — Organic Gardening & Horticulturist Hub

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.5-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6.23-black?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)
[![Vercel AI SDK](https://img.shields.io/badge/AI_SDK-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://sdk.vercel.ai/)

**Vines & Views** is a modern, community-driven organic gardening, horticulture blog, and botanist platform. Designed with an organic botanical design system, it empowers gardeners, organic horticulturists, and plant enthusiasts to document cultivation journeys, discover eco-friendly growing techniques, generate AI-powered articles, summarize complex guides, and analyze engagement metrics via a personalized dashboard.

---

## 🌟 Key Features

### 🌿 Organic Community Feed (`/explore`)
- **Interactive Articles & Guides**: Discover seasonal advice, pest management, soil preparation, and urban container gardening techniques shared by certified growers.
- **Real-time Filter & Search**: Search articles instantly by title or tag (e.g., `#compost`, `#orchids`, `#pruning`).
- **Pagination & Performance**: Smooth server/client paginated grid locked to optimum browsing capacity.

### 🤖 AI-Powered Article Summarizer
- **Instant Botanical Summaries**: Summarize lengthy gardening guides into quick, readable takeaways in seconds via Google Gemini AI SDK (`@ai-sdk/google`).
- **One-Click Modal**: Interactive AI summary drawer available directly on article cards in the explore feed.

### ✨ Smart AI Post Generator (`/createpost`)
- **Automated Article Creation**: Generate full gardening journals complete with headings, content, tags, and suggested thumbnails by providing just a topic or title.
- **Word Count Customization**: Tailor AI generation to your desired article depth (200 – 500 words).
- **Auto-Fill Title Inspirations**: Instant curated title recommendations for beginner and master horticulturists.
- **Live Botanical Feed Preview**: Real-time visual side-by-side preview as you edit your journal entry.

### 📊 Horticulturist Dashboard (`/dashboard`)
- **Performance Metrics**: Monitor total published posts, community likes received, and active comments.
- **Post Management**: View recent articles with quick delete actions and real-time metric counters.
- **Community Activity Feed**: Track interaction logs on your gardening entries.

### 💡 AI Account Performance Overview (`/dashboard/overview`)
- **Executive AI Insights**: Generate deep AI-driven summaries and engagement analysis of your profile activity and reach.

### 🔐 Secure Authentication & User Sessions
- **Better Auth Integration**: Email & Password sign-in/sign-up powered by `@better-auth` with MongoDB persistence layer.
- **Protected Routes**: Middleware and session authorization safeguarding user dashboards and post creation.

### 🌗 Earthy Botanical Design System
- **Tailwind CSS v4 & Motion**: Organic palette featuring Emerald/Lime growth tones, Terracotta accents, soft stone backgrounds, and `rounded-3xl` soft curves.
- **Seamless Light & Dark Modes**: Full compliance across all UI components with the `dark:` modifier.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server & Client Components, API Routing, Metadata Optimization |
| **UI Library** | [React 19](https://react.dev/) | Core UI Component Framework |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-End Type Safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Pure Utility-First Styling with CSS Variables & Tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth UI Micro-Animations & Transitions |
| **Icons** | [Lucide React](https://lucide.dev/) | Botanical & Modern System Icons |
| **Database** | [MongoDB](https://www.mongodb.com/) | NoSQL Database for Users, Posts, Comments, & Likes |
| **Authentication** | [Better Auth](https://better-auth.com/) | Session Management & MongoDB Adapter |
| **AI Integration** | [Vercel AI SDK](https://sdk.vercel.ai/) & Render Backend | Google Gemini API integration for generation & summaries |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) | Non-blocking Toast Alerts |

---

## 📁 Project Directory Structure

```text
vines-and-views/
├── public/                    # Static assets, favicon, and images
├── src/
│   ├── app/                   # Next.js App Router Structure
│   │   ├── (auth)/            # Authentication Routes
│   │   │   ├── login/         # User Sign-In Page
│   │   │   └── register/      # User Registration Page
│   │   ├── aboutus/           # Platform Mission & Values
│   │   ├── api/               # API Routes & Better Auth Endpoints
│   │   ├── createpost/        # AI Post Generator & Publishing Form
│   │   ├── dashboard/         # Horticulturist Analytics & Overviews
│   │   │   ├── overview/      # AI Account Overview & Summary Page
│   │   │   └── DeletePostButton.tsx
│   │   ├── explore/           # Public Gardening Hub & AI Summaries
│   │   │   ├── [id]/          # Single Post Detail View
│   │   │   ├── Banner.tsx     # Hero Banner Component
│   │   │   └── PostCard.tsx   # Botanical Post Card Component
│   │   ├── howitworks/        # Platform Guide & FAQs
│   │   ├── globals.css        # Tailwind v4 Configuration & Base Styles
│   │   ├── layout.tsx         # Root Layout & Theme/Auth Wrappers
│   │   └── page.tsx           # Home Landing Page
│   ├── components/            # Reusable UI Components
│   │   ├── Footer.tsx         # Site Footer with Quick Links
│   │   ├── Header.tsx         # Responsive Navigation Bar & User Menu
│   │   ├── Hero.tsx           # Landing Page Hero Section
│   │   ├── LandingSections.tsx # Core Features & Testimonials
│   │   └── PostModal.tsx      # AI Summary Popup Modal
│   ├── lib/                   # Integrations & Database Connections
│   │   ├── auth.ts            # Server-side Better Auth Config
│   │   ├── auth-client.ts     # Client-side Better Auth Helper
│   │   └── mongodb.ts         # MongoDB Connection Client
│   ├── types.ts               # Shared TypeScript Interfaces
│   └── utils/                 # Utility & Helper Functions
├── .env                       # Environment Variables Configuration
├── next.config.ts             # Next.js Configuration
├── package.json               # Dependencies & Scripts
└── tsconfig.json              # TypeScript Compiler Options
```

---

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher
- **npm**, **pnpm**, or **yarn**
- **MongoDB Database**: Local instance or [MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/masumb30/vines-and-views.git
cd vines-and-views
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` or `.env.local` file in the root directory and add the necessary environment variables:

```env
# Better Auth Secret (Random secure 32+ character string)
BETTER_AUTH_SECRET=your_better_auth_secret_here

# App URLs
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# MongoDB Connection String
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/vinesandviews?retryWrites=true&w=majority

# Express Backend API URL (for AI generation & external endpoints)
NEXT_PUBLIC_BACKEND_URL=https://vine-and-views-backend.onrender.com

# ImgBB API Key (for image uploads)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## 🔑 Environment Variables Reference

| Variable Name | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | Yes | MongoDB Connection URI | `mongodb+srv://...` |
| `BETTER_AUTH_SECRET` | Yes | Secret key for encrypting user sessions | `a_super_secret_key` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Yes | Frontend base URL for auth callbacks | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Yes | Public URL of the frontend application | `http://localhost:3000` |
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Express REST API backend URL | `https://vine-and-views-backend.onrender.com` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Optional | ImgBB key for external thumbnail uploads | `e19301072de56...` |

---

## 🎨 Design System Principles

The Vines & Views UI follows strict botanical design guidelines:

- 🟢 **Primary Colors (Growth & Nature)**: Tailwind Emerald (`text-emerald-700` / `dark:text-emerald-400`) & Lime (`bg-lime-600` / `bg-lime-400`).
- 🟧 **Secondary Colors (Terracotta Accent)**: Orange spectrum (`bg-orange-100`, `text-orange-600` / `dark:text-orange-400`) for badges and category highlights.
- 🪨 **Backgrounds**: Stone spectrum (`bg-stone-50` for Light mode, `bg-stone-950` for Dark mode).
- 🪴 **Aesthetics**: Soft organic curves (`rounded-3xl` for hero sections, `rounded-2xl` for cards and inputs), focus ring accessibility, and smooth micro-hover transitions (`hover:scale-[1.01]`).

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the development server with Hot Reloading.
- `npm run build` — Compiles and builds the production application bundle.
- `npm run start` — Starts the Next.js production server.
- `npm run lint` — Runs ESLint to check for code quality and formatting issues.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/masumb30/vines-and-views/issues).

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p center align="center">
  Crafted with 💚 for plant lovers, organic gardeners, and horticulturists everywhere.
</p>
