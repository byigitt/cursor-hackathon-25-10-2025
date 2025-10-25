<div align="center">
  <img src="public/synapp-banner.png" alt="Synapp Banner" width="100%">
  
# Synapp

  ### Learn Smarter, Achieve Faster
  
  **An AI-powered learning platform that accelerates your learning speed by 20x**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![tRPC](https://img.shields.io/badge/tRPC-11.0-2596BE?style=flat&logo=trpc)](https://trpc.io/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

  [Demo](https://synapp.example.com) · [Documentation](docs/) · [Report Bug](https://github.com/byigitt/synapp/issues) · [Request Feature](https://github.com/byigitt/synapp/issues)
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🌟 Overview

**Synapp** is a revolutionary AI-powered learning platform designed to transform the way you consume and retain information. By combining cutting-edge technologies like RSVP (Rapid Serial Visual Presentation) speed reading, AI-generated content analysis, and gamification, Synapp helps you learn **20 times faster** while ensuring better comprehension and retention.

### The Problem

Traditional learning methods are:
- ⏰ **Time-consuming** - Reading at average speeds of 200-300 WPM
- 📉 **Inefficient** - Low retention rates without active recall
- 😫 **Boring** - Lack of engagement and motivation
- 🎯 **Unfocused** - Difficulty identifying key concepts

### The Solution

Synapp addresses these challenges through:
- ⚡ **Speed Reading Technology** - Read up to 800 WPM with RSVP
- 🤖 **AI-Powered Analysis** - Automatic summaries, quizzes, and flashcards
- 🎮 **Gamification** - Streaks, badges, and leaderboards for motivation
- 📊 **Progress Tracking** - Detailed analytics and insights
- 🎯 **Personalized Learning** - Adaptive content based on your performance

---

## ✨ Key Features

### 📄 Document Management
- **Multi-format Support**: Upload PDF, Word (DOCX), and text files
- **Drag & Drop**: Easy file upload interface
- **Organization**: Organize documents into decks by topic
- **Search**: Full-text search across all documents
- **Cloud Storage**: Secure storage with UploadThing integration

### ⚡ Speed Reading (RSVP)
- **Adjustable Speed**: 200-800 words per minute
- **RSVP Technology**: Display one word at a time for maximum focus
- **AI Summaries**: Get condensed versions before full reading
- **Progress Tracking**: See how much you've read in real-time
- **Customizable Settings**: Font size, color themes, and more

### 🤖 AI-Powered Features
- **Automatic Summarization**: Gemini AI creates concise summaries
- **Quiz Generation**: Multiple-choice questions from document content
- **Flashcard Creation**: Key concepts turned into study cards
- **Smart Analysis**: Identifies main topics and key points
- **Context Understanding**: Deep comprehension of document structure

### 🎴 Flashcard System
- **AI-Generated Cards**: Automatic flashcard creation
- **Manual Creation**: Create your own custom flashcards
- **Spaced Repetition**: Scientifically-proven review intervals
- **Study Sessions**: Organized review mode
- **Progress Tracking**: Monitor which cards you know well

### ❓ Quiz System
- **Auto-Generated Quizzes**: AI creates relevant questions
- **Multiple Choice**: 4-option questions with explanations
- **Instant Feedback**: Know your answers immediately
- **Score History**: Track your performance over time
- **Difficulty Levels**: Questions adapted to your knowledge

### 🏆 Gamification & Progress
- **Daily Streaks**: Maintain consecutive days of learning
- **Achievement Badges**: Earn rewards for milestones
- **XP System**: Gain experience points for activities
- **Leaderboard**: Compete with other learners
- **Study Goals**: Set and track personal objectives

### 👤 User Management
- **Authentication**: Secure login with NextAuth.js
- **Profile Settings**: Customize your learning experience
- **Privacy Controls**: Manage your data and preferences
- **Social Features**: Optional community interaction

---

## 🛠 Technology Stack

### Frontend
- **[Next.js 15.2](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Backend
- **[tRPC 11](https://trpc.io/)** - End-to-end typesafe APIs
- **[Prisma 6.18](https://www.prisma.io/)** - Next-generation ORM
- **[NextAuth.js 5](https://next-auth.js.org/)** - Authentication solution
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### AI & ML
- **[Google Gemini AI](https://ai.google.dev/)** - Content analysis and generation
- **Custom RSVP Engine** - Speed reading implementation
- **Spaced Repetition Algorithm** - Optimized learning intervals

### File Management
- **[UploadThing](https://uploadthing.com/)** - File uploads made easy
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **PDF.js** - PDF parsing and rendering

### State Management
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **React Context** - Global state for UI components

### Testing
- **[Vitest](https://vitest.dev/)** - Unit and integration testing
- **[React Testing Library](https://testing-library.com/)** - Component testing
- **[Prisma Mock](https://www.prisma.io/docs/guides/testing)** - Database testing

### DevOps & Tools
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turbopack](https://turbo.build/)** - Fast bundler for development
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

---

## 🏗 Architecture

Synapp follows a modern, scalable architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │    React     │  │  Tailwind    │      │
│  │  App Router  │  │  Components  │  │     CSS      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         API Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    tRPC Router                        │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐   │   │
│  │  │Document│ │  Quiz  │ │Flashcard││Gamification│   │   │
│  │  │ Router │ │ Router │ │ Router │ │   Router   │   │   │
│  │  └────────┘ └────────┘ └────────┘ └────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  AI Service │  │   Auth      │  │  File       │         │
│  │  (Gemini)   │  │  Service    │  │  Service    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Prisma     │  │  PostgreSQL  │  │ UploadThing  │      │
│  │     ORM      │  │   Database   │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Patterns

- **Server Components**: Leverage React Server Components for better performance
- **tRPC Procedures**: Type-safe API calls without code generation
- **Middleware Pattern**: Authentication and authorization layers
- **Repository Pattern**: Data access abstraction with Prisma
- **Service Layer**: Business logic separation
- **Factory Pattern**: Component composition with Radix UI

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **pnpm 10+** - Install: `npm install -g pnpm`
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Google Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **UploadThing Account** - Sign up at [uploadthing.com](https://uploadthing.com/)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/byigitt/synapp.git
cd synapp

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Set up the database
pnpm db:push

# Generate Prisma client
pnpm db:generate

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📦 Installation

### Detailed Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/byigitt/synapp.git
cd synapp
```

#### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

#### 3. Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE synapp;
CREATE USER synapp_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE synapp TO synapp_user;
```

#### 4. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

#### 5. Database Migration

Generate Prisma client and push schema:
```bash
pnpm db:generate
pnpm db:push
```

#### 6. Seed Database (Optional)

```bash
pnpm db:seed
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://synapp_user:your_password@localhost:5432/synapp"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### Generating Secrets

Generate a secure NextAuth secret:
```bash
openssl rand -base64 32
```

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

---

## 💻 Usage

### Running the Application

#### Development Mode
```bash
pnpm dev
```
Runs on `http://localhost:3000` with hot reload.

#### Production Build
```bash
pnpm build
pnpm start
```

#### Database Studio
```bash
pnpm db:studio
```
Opens Prisma Studio on `http://localhost:5555`.

### User Workflows

#### 1. Sign Up / Sign In
- Visit the homepage
- Click "Start Free Trial"
- Sign up with email or OAuth providers
- Verify email (if email auth is enabled)

#### 2. Upload a Document
- Navigate to Documents page
- Click "Upload Document" or drag & drop
- Select PDF, DOCX, or TXT file
- Wait for AI analysis (automatic)

#### 3. Speed Read with RSVP
- Open any document
- Click "Fast Reading" mode
- Adjust reading speed (200-800 WPM)
- Use play/pause controls
- See AI-generated summary

#### 4. Take Quizzes
- Go to Quizzes page
- Select a document
- Answer AI-generated questions
- Get instant feedback
- View your score and explanations

#### 5. Study Flashcards
- Navigate to Flashcards
- Review AI-generated cards
- Mark cards as known/unknown
- Follow spaced repetition schedule
- Create custom flashcards

#### 6. Track Progress
- Visit Dashboard
- See daily streaks
- Check XP and badges
- View leaderboard rankings
- Analyze study statistics

---

## 📚 API Documentation

### tRPC Routers

#### Document Router

```typescript
// Get all documents
const documents = await api.document.getAll.useQuery();

// Upload document
const uploadMutation = api.document.create.useMutation();
await uploadMutation.mutateAsync({
  title: "My Document",
  fileUrl: "https://...",
  deckId: "deck-id",
});

// Get document by ID
const document = await api.document.getById.useQuery({ id: "doc-id" });

// Delete document
const deleteMutation = api.document.delete.useMutation();
await deleteMutation.mutateAsync({ id: "doc-id" });
```

#### Quiz Router

```typescript
// Get quizzes for a document
const quizzes = await api.quiz.getByDocumentId.useQuery({ 
  documentId: "doc-id" 
});

// Submit quiz attempt
const submitMutation = api.quizAttempt.create.useMutation();
await submitMutation.mutateAsync({
  quizId: "quiz-id",
  answers: [
    { questionId: "q1", selectedAnswer: "A" },
    { questionId: "q2", selectedAnswer: "B" },
  ],
});

// Get quiz results
const results = await api.quizAttempt.getByUserId.useQuery();
```

#### Flashcard Router

```typescript
// Get flashcards for a deck
const flashcards = await api.flashcard.getByDeckId.useQuery({ 
  deckId: "deck-id" 
});

// Create flashcard
const createMutation = api.flashcard.create.useMutation();
await createMutation.mutateAsync({
  front: "Question",
  back: "Answer",
  deckId: "deck-id",
});

// Update flashcard confidence
const updateMutation = api.flashcard.updateConfidence.useMutation();
await updateMutation.mutateAsync({
  id: "card-id",
  confidence: "KNOWN",
});
```

#### Gamification Router

```typescript
// Get user stats
const stats = await api.gamification.getUserStats.useQuery();

// Update daily streak
const streakMutation = api.gamification.updateStreak.useMutation();
await streakMutation.mutateAsync();

// Get leaderboard
const leaderboard = await api.gamification.getLeaderboard.useQuery({
  limit: 10,
});

// Award badge
const badgeMutation = api.gamification.awardBadge.useMutation();
await badgeMutation.mutateAsync({
  badgeType: "FIRST_QUIZ",
});
```

### API Response Types

```typescript
type Document = {
  id: string;
  title: string;
  content: string;
  summary?: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type Quiz = {
  id: string;
  title: string;
  documentId: string;
  questions: Question[];
  createdAt: Date;
};

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

type Flashcard = {
  id: string;
  front: string;
  back: string;
  confidence: "UNKNOWN" | "LEARNING" | "KNOWN";
  nextReview: Date;
  reviewCount: number;
};

type UserStats = {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  rank: number;
};
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# End-to-end tests
pnpm test:e2e

# Integration tests
pnpm test:integration

# Schema validation tests
pnpm test:schemas

# UI mode (interactive)
pnpm test:ui
```

### Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   ├── document.test.ts
│   ├── quiz.test.ts
│   └── flashcard.test.ts
├── integration/            # Integration tests
│   └── gemini.test.ts
├── schemas/                # Schema validation tests
│   └── validation.test.ts
├── fixtures/               # Test data
│   ├── documents.fixture.ts
│   └── users.fixture.ts
├── mocks/                  # Mock implementations
│   ├── next-headers.ts
│   └── next-server.ts
└── setup/                  # Test configuration
    ├── db.setup.ts
    └── vitest.setup.ts
```

### Writing Tests

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { api } from '~/trpc/server';

describe('Document API', () => {
  it('should create a document', async () => {
    const document = await api.document.create({
      title: 'Test Document',
      content: 'Test content',
      deckId: 'test-deck',
    });

    expect(document).toBeDefined();
    expect(document.title).toBe('Test Document');
  });

  it('should retrieve document by ID', async () => {
    const document = await api.document.getById({ 
      id: 'existing-id' 
    });

    expect(document).toBeDefined();
    expect(document.id).toBe('existing-id');
  });
});
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

```bash
# Or use Vercel CLI
vercel --prod
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t synapp .
docker run -p 3000:3000 synapp
```

### Environment Variables for Production

Ensure all production environment variables are set:
- Use production database URL
- Set `NODE_ENV=production`
- Use secure NEXTAUTH_SECRET
- Configure proper CORS settings
- Enable rate limiting
- Set up monitoring and logging

---

## 📁 Project Structure

```
synapp/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── synapp-banner.png      # Project banner
│   ├── synapp-logo-white.svg  # Logo (light)
│   └── synapp-logo-black.svg  # Logo (dark)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (marketing)/       # Marketing pages
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx       # Landing page
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── trpc/          # tRPC API
│   │   │   └── uploadthing/   # File upload
│   │   ├── auth/              # Auth pages
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── dashboard/         # Main app
│   │   │   ├── documents/
│   │   │   ├── fast-reading/
│   │   │   ├── flashcards/
│   │   │   ├── how-to-use/
│   │   │   ├── profile/
│   │   │   ├── quizzes/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout
│   │   └── providers.tsx      # App providers
│   ├── components/
│   │   ├── ui/                # Radix UI components
│   │   └── theme-toggle.tsx
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── uploadthing.ts
│   │   └── utils.ts           # Utility functions
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/       # tRPC routers
│   │   │   │   ├── deck.ts
│   │   │   │   ├── document.ts
│   │   │   │   ├── flashcard.ts
│   │   │   │   ├── gamification.ts
│   │   │   │   ├── quiz.ts
│   │   │   │   ├── quizAttempt.ts
│   │   │   │   └── studySession.ts
│   │   │   ├── root.ts        # Root router
│   │   │   └── trpc.ts        # tRPC setup
│   │   ├── auth/
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   ├── config/
│   │   │   └── prompts.ts     # AI prompts
│   │   ├── lib/
│   │   │   └── gemini.ts      # Gemini AI client
│   │   ├── schemas/           # Zod schemas
│   │   │   ├── deck.ts
│   │   │   ├── flashcard.ts
│   │   │   ├── gamification.ts
│   │   │   └── quiz.ts
│   │   ├── db.ts              # Prisma client
│   │   └── uploadthing.ts
│   ├── styles/
│   │   └── globals.css        # Global styles
│   ├── trpc/
│   │   ├── query-client.ts
│   │   ├── react.tsx          # Client tRPC
│   │   └── server.ts          # Server tRPC
│   └── env.js                 # Environment validation
├── tests/
│   ├── e2e/                   # E2E tests
│   ├── integration/           # Integration tests
│   ├── schemas/               # Schema tests
│   ├── fixtures/              # Test data
│   ├── mocks/                 # Test mocks
│   └── setup/                 # Test setup
├── docs/                      # Documentation
│   ├── HOW_TO_USE_FEATURE.md
│   └── IMPLEMENTATION_SUMMARY.md
├── .env.example               # Environment template
├── .gitignore
├── biome.jsonc                # Biome config
├── components.json            # Shadcn config
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tsconfig.json
└── vitest.config.ts
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the project
- 🗣 Spread the word

### Development Process

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   pnpm test
   pnpm typecheck
   pnpm check
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
   
   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `test:` Tests
   - `chore:` Maintenance

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Link related issues
   - Wait for review

### Code Style

We use Biome for code formatting and linting:

```bash
# Format code
pnpm check:write

# Lint code
pnpm check

# Auto-fix (with unsafe changes)
pnpm check:unsafe
```

### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Example:
```
feat(quiz): add timer functionality

- Add countdown timer to quiz interface
- Store time taken in database
- Display time in results

Closes #123
```

---

## 🗺 Roadmap

### Phase 1: Core Features ✅
- [x] Document upload and management
- [x] RSVP speed reading
- [x] AI-powered summarization
- [x] Quiz generation
- [x] Flashcard system
- [x] Basic gamification

### Phase 2: Enhanced Features 🚧
- [ ] Mobile apps (iOS & Android)
- [ ] Collaborative learning (study groups)
- [ ] Advanced analytics dashboard
- [ ] Custom AI model training
- [ ] Offline mode support
- [ ] Browser extension

### Phase 3: Advanced Features 📋
- [ ] Video content support
- [ ] Audio transcription
- [ ] Multiple language support
- [ ] API for third-party integrations
- [ ] Marketplace for shared content
- [ ] AI-powered study recommendations

### Phase 4: Enterprise Features 🎯
- [ ] Team management
- [ ] Organization dashboard
- [ ] SSO authentication
- [ ] Custom branding
- [ ] Advanced reporting
- [ ] Dedicated support

### Future Ideas 💭
- Voice-controlled learning
- AR/VR study environments
- AI tutor chat interface
- Integration with learning platforms
- Blockchain-based certificates
- Peer-to-peer knowledge sharing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Synapp Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies & Libraries
- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Prisma](https://www.prisma.io/) - Database toolkit
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled components
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [UploadThing](https://uploadthing.com/) - File uploads

### Inspiration
- Speed reading research by Dr. Keith Rayner
- Spaced repetition algorithm by Piotr Wozniak
- Gamification principles from game design literature
- Modern learning science and cognitive psychology

### Contributors
Thank you to all the amazing people who have contributed to this project! 🎉

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Add contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📞 Contact

### Project Links
- **Website**: [synapp.example.com](https://synapp.example.com)
- **Documentation**: [docs.synapp.example.com](https://docs.synapp.example.com)
- **GitHub**: [github.com/byigitt/synapp](https://github.com/byigitt/synapp)

### Social Media
- **Twitter**: [@synapp_learn](https://twitter.com/synapp_learn)
- **Discord**: [Join our community](https://discord.gg/synapp)
- **LinkedIn**: [Synapp](https://linkedin.com/company/synapp)

### Support
- **Email**: support@synapp.com
- **Issues**: [GitHub Issues](https://github.com/byigitt/synapp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/byigitt/synapp/discussions)

---

## 📊 Statistics

<div align="center">
  
  ![GitHub stars](https://img.shields.io/github/stars/byigitt/synapp?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/byigitt/synapp?style=social)
  ![GitHub watchers](https://img.shields.io/github/watchers/byigitt/synapp?style=social)
  
  ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/byigitt/synapp)
  ![GitHub last commit](https://img.shields.io/github/last-commit/byigitt/synapp)
  ![GitHub issues](https://img.shields.io/github/issues/byigitt/synapp)
  ![GitHub pull requests](https://img.shields.io/github/issues-pr/byigitt/synapp)

</div>

---

<div align="center">
  
  **Made with ❤️ by the Synapp Team**
  
  [⬆ Back to Top](#synapp)
  
</div>
