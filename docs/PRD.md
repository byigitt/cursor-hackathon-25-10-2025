Prisma Veritabanı Şeması

İstediğiniz gibi, öncelikle projenin temel ve gelecekteki özelliklerini destekleyecek Prisma şemasını aşağıda bulabilirsiniz. Bu şema, kullanıcıları, onların çalışma destelerini, belgelerini, yapay zeka tarafından oluşturulan özetleri, testleri ve oyunlaştırma öğelerini yönetmek için tasarlanmıştır.

code
Prisma
download
content_copy
expand_less
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// --- NextAuth Models (Mevcut) ---
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  // --- Uygulamaya Özel İlişkiler ---
  decks         Deck[]
  quizAttempts  QuizAttempt[]
  streak        Streak?
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}


// ==========================================
// Uygulamaya Özel Modeller
// ==========================================

// TEMEL: Doküman ve Çalışma
model Deck {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  documents   Document[]
  studySession StudySession?
  quizzes     Quiz[]
  flashcards  Flashcard[] // NICE TO HAVE
  @@index([userId])
}

model Document {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  name      String
  content   String   @db.Text // Dokümanın tam metin içeriği
  deckId    String
  deck      Deck     @relation(fields: [deckId], references: [id], onDelete: Cascade)
  @@index([deckId])
}

model StudySession {
  id           String   @id @default(cuid())
  createdAt    DateTime @default(now())
  summary      String   @db.Text // Gemini tarafından oluşturulan özet metin
  rsvpSpeedWPM Int      @default(300) // RSVP için varsayılan kelime/dakika hızı
  deckId       String   @unique // Her destenin bir ana çalışma oturumu olur
  deck         Deck     @relation(fields: [deckId], references: [id], onDelete: Cascade)
}

// TEMEL: Quiz
model Quiz {
  id           String   @id @default(cuid())
  createdAt    DateTime @default(now())
  deckId       String
  deck         Deck        @relation(fields: [deckId], references: [id], onDelete: Cascade)
  questions    Question[]
  quizAttempts QuizAttempt[]
  @@index([deckId])
}

model Question {
  id           String  @id @default(cuid())
  questionText String
  quizId       String
  quiz         Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  options      Option[]
  userAnswers  UserAnswer[]
  @@index([quizId])
}

model Option {
  id         String  @id @default(cuid())
  optionText String
  isCorrect  Boolean @default(false)
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  userAnswers UserAnswer[]
  @@index([questionId])
}

model QuizAttempt {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  score     Float // Yüzdelik olarak skor, örn: 85.5
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId    String
  quiz      Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  answers   UserAnswer[]
  @@index([userId, quizId])
}

model UserAnswer {
  id               String @id @default(cuid())
  quizAttemptId    String
  quizAttempt      QuizAttempt @relation(fields: [quizAttemptId], references: [id], onDelete: Cascade)
  questionId       String
  question         Question    @relation(fields: [questionId], references: [id], onDelete: Cascade)
  selectedOptionId String
  selectedOption   Option      @relation(fields: [selectedOptionId], references: [id], onDelete: Cascade)
  @@unique([quizAttemptId, questionId])
}

// NICE TO HAVE: Oyunlaştırma
model Streak {
  id               String   @id @default(cuid())
  currentStreak    Int      @default(0)
  longestStreak    Int      @default(0)
  lastActivityDate DateTime
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Flashcard {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  frontText String
  backText  String
  deckId    String
  deck      Deck     @relation(fields: [deckId], references: [id], onDelete: Cascade)
  @@index([deckId])
}

Şimdi, bu şemayı temel alarak istenen formatta tam proje yapısını ve planını oluşturuyorum.

1. Repo Tree (ASCII)
code
Code
download
content_copy
expand_less
.
├─ prisma/
│  ├─ schema.prisma             // extend with domain models from above
│  └─ migrations/
│     └─ 0000_initial_setup/     // placeholder for first migration folder
├─ public/                       // keep
├─ src/
│  ├─ app/
│  │  ├─ (app)/
│  │  │  ├─ deck/
│  │  │  │  └─ [id]/
│  │  │  │     ├─ page.tsx      // view deck, upload docs, start session
│  │  │  │     ├─ quiz/
│  │  │  │     │  └─ page.tsx   // quiz interface for a specific deck
│  │  │  │     └─ study/
│  │  │  │        └─ page.tsx   // rsvp study mode view
│  │  │  ├─ dashboard/
│  │  │  │  └─ page.tsx         // main authed view to list/create decks
│  │  │  ├─ leaderboard/
│  │  │  │  └─ page.tsx         // view user streaks leaderboard
│  │  │  └─ layout.tsx           // new authed shell layout with nav
│  │  ├─ (auth)/
│  │  │  └─ sign-in/
│  │  │     └─ page.tsx         // new auth page ui
│  │  ├─ (marketing)/
│  │  │  └─ page.tsx           // new public landing page
│  │  ├─ api/
│  │  │  ├─ auth/
│  │  │  │  └─ [...nextauth]/
│  │  │  │     └─ route.ts     // keep
│  │  │  └─ trpc/
│  │  │     └─ [trpc]/
│  │  │        └─ route.ts     // keep
│  │  ├─ layout.tsx             // keep
│  │  └─ page.tsx               // keep (demo)
│  ├─ components/
│  │  ├─ deck/
│  │  │  ├─ DeckCard.tsx       // component to show a single deck on dashboard
│  │  │  └─ DocumentUploader.tsx // component for file uploads
│  │  ├─ quiz/
│  │  │  └─ QuizInterface.tsx  // component to display questions and options
│  │  ├─ shared/
│  │  │  └─ RsvpReader.tsx     // core rsvp text display component
│  │  └─ ui/                    // keep (shadcn/radix components)
│  ├─ lib/
│  │  ├─ validations/
│  │  │  ├─ deck.ts            // zod schemas for deck/document inputs (client)
│  │  │  └─ quiz.ts            // zod schemas for quiz inputs (client)
│  │  └─ utils.ts               // keep
│  ├─ server/
│  │  ├─ api/
│  │  │  ├─ routers/
│  │  │  │  ├─ deck.ts          // trpc router for decks, docs, study sessions
│  │  │  │  ├─ gamification.ts  // trpc router for streaks and leaderboard
│  │  │  │  └─ quiz.ts          // trpc router for quiz generation and attempts
│  │  │  ├─ root.ts              // keep
│  │  │  └─ trpc.ts              // keep
│  │  ├─ auth/
│  │  │  ├─ config.ts            // keep
│  │  │  └─ index.ts             // keep
│  │  ├─ db.ts                  // keep
│  │  └─ schemas/
│  │     ├─ deck.ts              // zod schemas for deck/document inputs (server)
│  │     └─ quiz.ts              // zod schemas for quiz inputs (server)
│  ├─ styles/
│  │  └─ globals.css          // keep
│  ├─ trpc/
│  │  ├─ query-client.ts      // keep
│  │  ├─ react.tsx            // keep
│  │  └─ server.ts            // keep
│  └─ env.js                   // keep
├─ .env.example                  // list required env keys
├─ README.md                     // add setup and run instructions
├─ biome.jsonc                   // keep
├─ next.config.js                // keep
├─ package.json                  // keep
├─ postcss.config.js             // keep
├─ start-database.sh             // keep
└─ tsconfig.json                 // keep
2. Architecture (bullets)

Flow: Next.js Page (/deck/[id]) → TanStack Query hook (api.deck.getById.useQuery) → tRPC Client → Next.js Route Handler (/api/trpc/...) → tRPC Router (deck.ts) → Prisma Client (db.deck.findUnique).

Auth: NextAuth.js (/api/auth/[...nextauth]) yönetir, oturum bilgisi src/server/auth/ içindeki yardımcılarla alınır. Hassas tRPC prosedürleri protectedProcedure ile korunur.

Validation: Zod şemaları, hem istemci tarafında (src/lib/validations/*) form doğrulaması için hem de sunucu tarafında (src/server/schemas/*) API girdi doğrulaması için kullanılır.

Data Access: Tüm veritabanı işlemleri yalnızca sunucu tarafındaki dosyalarda Prisma Client aracılığıyla yapılır.

AI Integration: deck.ts tRPC router'ı, doküman içeriklerini alıp bir Gemini API istemcisine (ayrı bir yardımcı fonksiyonda soyutlanacak) göndererek özeti oluşturur ve StudySession modeline kaydeder.

3. tRPC Procedures (filenames + exports)

src/server/api/routers/deck.ts → exports: createDeck, getMyDecks, getDeckById, addDocumentToDeck, generateStudySession

src/server/api/routers/quiz.ts → exports: generateQuizForDeck, getQuizQuestions, submitQuizAttempt

src/server/api/routers/gamification.ts → exports: getMyStreak, getLeaderboard

4. Auth Files (filenames)

src/app/api/auth/[...nextauth]/route.ts

src/app/(auth)/sign-in/page.tsx

src/server/auth/config.ts

src/server/auth/index.ts

5. Env Variables (names only)

DATABASE_URL

AUTH_SECRET

AUTH_DISCORD_ID

AUTH_DISCORD_SECRET

GEMINI_API_KEY

NODE_ENV

NEXTAUTH_URL?

6. Run Scripts (names + purpose)

dev: Starts the development server.

build: Creates a production build.

start: Starts the production server.

lint: Lints the codebase.

prisma generate: (Rename from db:generate) Generates Prisma Client based on schema.

prisma studio: Opens Prisma Studio GUI.

prisma migrate dev: Creates and applies a new DB migration.

7. Team Plan (timeline & owners)

Dev A (App/Frontend): (90 dakika)

Sorumluluklar: Rota ve layout dosyalarını oluşturmak ((app), (auth), (marketing)). dashboard, deck/[id], study, quiz ve leaderboard sayfalarının temel iskeletini src/components/ui/* kullanarak oluşturmak. Boş tRPC kancalarını (useQuery, useMutation) sayfalara bağlamak.

Dev B (API/Auth): (90 dakika)

Sorumluluklar: deck.ts, quiz.ts, gamification.ts tRPC router dosyalarını oluşturmak. Tüm prosedür adlarını (örn: createDeck) ve Zod girdi şemalarını (src/server/schemas/*) tanımlamak. NextAuth yapılandırmasının yerinde olduğunu doğrulamak.

Dev C (DB/Prisma): (60 dakika)

Sorumluluklar: prisma/schema.prisma dosyasını yukarıda sağlanan şema ile güncellemek. İlk veritabanı migrasyonunu (prisma migrate dev) oluşturmak. .env.example dosyasına GEMINI_API_KEY dahil tüm ortam değişkenlerini eklemek.

Checkpoints:

T+60 min: Tüm yeni rota dosyaları ve tRPC router dosyaları oluşturulmuş. Prisma şeması tamamlanmış ve ilk migrasyon yapılmış. .env.example güncellenmiş.

T+120 min: Frontend iskeleti tamamlanmış ve boş tRPC kancaları bağlanmış. Tüm tRPC prosedürleri ve Zod şemaları tanımlanmış. Uçtan uca dosya yolları (sayfa → tRPC → prisma) mantıksal olarak birbirine bağlanmış.

T+180 min: Üç çalışma akışı da tamamlanmış, tüm yeni dosyalar boş olarak oluşturulmuş ve commit'lenmeye hazır.

8. JSON (machine-readable)
code
JSON
download
content_copy
expand_less
{
  "repoName": "study-rsvp-mvp",
  "rootFiles": ["package.json","tsconfig.json",".env.example","biome.jsonc","postcss.config.js","next.config.js","README.md","start-database.sh"],
  "files": [
    { "path": "prisma/schema.prisma", "purpose": "extend with domain models for decks, quizzes, and users" },
    { "path": "prisma/migrations/0000_initial_setup/", "purpose": "placeholder for first migration folder" },
    { "path": "src/app/(app)/deck/[id]/page.tsx", "purpose": "view deck, upload docs, start session" },
    { "path": "src/app/(app)/deck/[id]/quiz/page.tsx", "purpose": "quiz interface for a specific deck" },
    { "path": "src/app/(app)/deck/[id]/study/page.tsx", "purpose": "rsvp study mode view" },
    { "path": "src/app/(app)/dashboard/page.tsx", "purpose": "main authed view to list/create decks" },
    { "path": "src/app/(app)/leaderboard/page.tsx", "purpose": "view user streaks leaderboard" },
    { "path": "src/app/(app)/layout.tsx", "purpose": "new authed shell layout with nav" },
    { "path": "src/app/(auth)/sign-in/page.tsx", "purpose": "new auth page ui" },
    { "path": "src/app/(marketing)/page.tsx", "purpose": "new public landing page" },
    { "path": "src/app/api/auth/[...nextauth]/route.ts", "purpose": "keep" },
    { "path": "src/app/api/trpc/[trpc]/route.ts", "purpose": "keep" },
    { "path": "src/app/layout.tsx", "purpose": "keep" },
    { "path": "src/app/page.tsx", "purpose": "keep (demo)" },
    { "path": "src/components/deck/DeckCard.tsx", "purpose": "component to show a single deck on dashboard" },
    { "path": "src/components/deck/DocumentUploader.tsx", "purpose": "component for file uploads" },
    { "path": "src/components/quiz/QuizInterface.tsx", "purpose": "component to display questions and options" },
    { "path": "src/components/shared/RsvpReader.tsx", "purpose": "core rsvp text display component" },
    { "path": "src/lib/validations/deck.ts", "purpose": "zod schemas for deck/document inputs (client)" },
    { "path": "src/lib/validations/quiz.ts", "purpose": "zod schemas for quiz inputs (client)" },
    { "path": "src/lib/utils.ts", "purpose": "keep" },
    { "path": "src/server/api/routers/deck.ts", "purpose": "trpc router for decks, docs, study sessions" },
    { "path": "src/server/api/routers/gamification.ts", "purpose": "trpc router for streaks and leaderboard" },
    { "path": "src/server/api/routers/quiz.ts", "purpose": "trpc router for quiz generation and attempts" },
    { "path": "src/server/api/root.ts", "purpose": "keep" },
    { "path": "src/server/api/trpc.ts", "purpose": "keep" },
    { "path": "src/server/auth/config.ts", "purpose": "keep" },
    { "path": "src/server/auth/index.ts", "purpose": "keep" },
    { "path": "src/server/db.ts", "purpose": "keep" },
    { "path": "src/server/schemas/deck.ts", "purpose": "zod schemas for deck/document inputs (server)" },
    { "path": "src/server/schemas/quiz.ts", "purpose": "zod schemas for quiz inputs (server)" },
    { "path": "src/styles/globals.css", "purpose": "keep" },
    { "path": "src/trpc/query-client.ts", "purpose": "keep" },
    { "path": "src/trpc/react.tsx", "purpose": "keep" },
    { "path": "src/trpc/server.ts", "purpose": "keep" },
    { "path": "src/env.js", "purpose": "keep" }
  ],
  "env": {
    "required": ["DATABASE_URL", "AUTH_SECRET", "AUTH_DISCORD_ID", "AUTH_DISCORD_SECRET", "GEMINI_API_KEY", "NODE_ENV", "NEXTAUTH_URL?"],
    "notes": "GEMINI_API_KEY is required for the core summarization feature. NEXTAUTH_URL is recommended for production."
  },
  "workstreams": [
    {
      "owner": "App/Frontend",
      "timebox_minutes": 90,
      "deliverables": [
        "Create route files and layouts for (app), (auth), and (marketing) groups",
        "Build UI skeletons for dashboard, deck detail, study, and quiz pages",
        "Wire up empty tRPC query/mutation hooks to pages"
      ]
    },
    {
      "owner": "API/Auth",
      "timebox_minutes": 90,
      "deliverables": [
        "Create tRPC router files: deck.ts, quiz.ts, gamification.ts",
        "Define all procedure names and their Zod input schemas in src/server/schemas/*",
        "Ensure sensitive procedures are marked as protected"
      ]
    },
    {
      "owner": "DB/Prisma",
      "timebox_minutes": 60,
      "deliverables": [
        "Update prisma/schema.prisma with all required models",
        "Generate and verify the initial database migration",
        "Update .env.example with all required environment variables"
      ]
    }
  ],
  "definitionOfDone": [
    "End-to-end file paths are mapped: page → tRPC client → router → prisma",
    "All new folders and files are created as empty stubs and committed to the repository",
    "The README.md is updated with clear setup, environment variable, and run script instructions"
  ]
}