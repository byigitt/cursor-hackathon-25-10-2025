# tRPC Router Reference

This document summarizes every procedure exposed under `src/server/api/routers` as of October 25, 2025. Use it to wire the frontend to the correct tRPC calls. All procedures return Prisma model instances unless otherwise noted, including default timestamp fields (`createdAt`, `updatedAt`) and IDs.

- **Protected procedures** require the caller to be authenticated; they rely on `ctx.session.user.id` for ownership checks.
- **Public procedures** can be called without a session.
- When a procedure throws a `TRPCError`, the frontend receives it as a structured error with a `code` (e.g. `NOT_FOUND`, `FORBIDDEN`, `BAD_REQUEST`).

## deckRouter (`deck.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `create` | protected mutation | `{ name: string (1-100) }` | Creates a new deck owned by the session user. Returns the full deck record. |
| `getAll` | protected query | _none_ | Lists the user's decks ordered by `updatedAt desc`. Includes `_count` (documents, quizzes, flashcards) and the attached `studySession` (id, createdAt). |
| `getById` | protected query | `{ id: cuid }` | Returns the deck plus: ordered `documents`, `studySession`, ordered `quizzes` (with `_count.questions` and `_count.quizAttempts`), ordered `flashcards`. Validates ownership. |
| `getWithStats` | protected query | `{ id: cuid }` | Same base include as `getById`, plus user-scoped quiz attempt history. Response adds `stats` with `{ averageScore: number, totalAttempts: number, recentAttempts: Array<quizAttempt> }`. |
| `update` | protected mutation | `{ id: cuid, name: string (1-100) }` | Updates deck name. Fails if deck missing or not owned. |
| `delete` | protected mutation | `{ id: cuid }` | Deletes deck and cascades related records. Returns `{ success: true }`. Ownership enforced. |

## documentRouter (`document.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `create` | protected mutation | `{ deckId: cuid, name: string (1-255), fileUrl: url, fileKey: string, fileType: "pdf" \| "txt" \| "doc" \| "docx", fileSize: positive int }` | Validates deck ownership, stores metadata (files immutable). Returns document record. |
| `getByDeckId` | protected query | `{ deckId: cuid }` | Lists documents in ascending `createdAt` order after ownership check. |
| `getById` | protected query | `{ id: cuid }` | Returns document with `deck`. Enforces ownership via deck. |
| `update` | protected mutation | `{ id: cuid, name: string (1-255) }` | Renames document only. Ownership required. |
| `delete` | protected mutation | `{ id: cuid }` | Deletes document; Prisma cascades remove dependent records. Returns `{ success: true }`. Ownership required. |

## flashcardRouter (`flashcard.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `create` | protected mutation | `{ deckId: cuid, frontText: string (1-500), backText: string (1-1000) }` | Validates deck ownership, creates flashcard. |
| `getByDeckId` | protected query | `{ deckId: cuid }` | Lists flashcards ascending by `createdAt`. Ownership enforced. |
| `getById` | protected query | `{ id: cuid }` | Returns flashcard with `deck`. Ownership enforced. |
| `update` | protected mutation | `{ id: cuid, frontText?: string (1-500), backText?: string (1-1000) }` | Updates provided sides. Ownership enforced. |
| `delete` | protected mutation | `{ id: cuid }` | Removes flashcard. Returns `{ success: true }`. Ownership enforced. |

## gamificationRouter (`gamification.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `getMyStreak` | protected query | _none_ | Retrieves or auto-creates the caller's streak record `{ currentStreak, longestStreak, lastActivityDate }`. |
| `getLeaderboard` | public query | `{ limit?: number (1-100, default 10) }` | Returns top streaks sorted by `longestStreak desc` as array `{ rank, userId, userName, userImage, currentStreak, longestStreak, lastActivityDate }`. Only users with `longestStreak > 0` appear. |

## postRouter (`post.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `hello` | public query | `{ text: string }` | Returns `{ greeting: string }`. |
| `create` | protected mutation | `{ name: string (>=1) }` | Creates a `post` tied to current user. |
| `getLatest` | protected query | _none_ | Returns latest post created by the user or `null`. |
| `getSecretMessage` | protected query | _none_ | Returns the static string `"you can now see this secret message!"`. |

## quizRouter (`quiz.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `generate` | protected mutation | `{ deckId: cuid, questionCount?: number (5-30, default 10) }` | Validates deck ownership and presence of documents, then calls Gemini (`generateQuizQuestions`). Creates quiz with nested questions and options in one transaction; returns quiz including questions and options (with `isCorrect`). Errors include `BAD_REQUEST` if no documents and `INTERNAL_SERVER_ERROR` on generation failure. |
| `getByDeckId` | protected query | `{ deckId: cuid }` | Lists quizzes for the deck with `_count.questions` and `_count.quizAttempts`, ordered by `createdAt desc`. |
| `getById` | protected query | `{ id: cuid }` | Returns quiz with `deck` and questions/options but **excludes** `isCorrect`. Use for taking the quiz. Ownership enforced. |
| `getByIdWithAnswers` | protected query | `{ id: cuid }` | Same as `getById` but includes `isCorrect` flags for review flows. Ownership enforced. |
| `updateQuestion` | protected mutation | `{ id: cuid, questionText: string (1-500) }` | Updates question text. Ownership enforced via related deck. |
| `updateOption` | protected mutation | `{ id: cuid, optionText?: string (1-200), isCorrect?: boolean }` | Partially updates an option. Ownership enforced via deck. |
| `delete` | protected mutation | `{ id: cuid }` | Deletes quiz (questions/options cascade). Returns `{ success: true }`. |
| `deleteQuestion` | protected mutation | `{ id: cuid }` | Deletes a question (options cascade). Returns `{ success: true }`. |

## quizAttemptRouter (`quizAttempt.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `submit` | protected mutation | `{ quizId: cuid, answers: Array<{ questionId: cuid, selectedOptionId: cuid }> }` | Validates quiz ownership, answer count, and option IDs. Calculates percentage score, stores attempt with nested answers, updates streak via helper, and returns `{ attemptId, score, correctCount, totalCount, createdAt }`. |
| `getMyAttempts` | protected query | `{ quizId?: cuid }` | Lists the user's attempts (optionally filtered by quiz) with related quiz metadata (`deck` id/name, `_count.questions`). Ordered `createdAt desc`. |
| `getById` | protected query | `{ id: cuid }` | Returns full attempt with quiz (including questions/options) and answers. Adds `detailedResults` array per answer containing the question, selected option, correct option, and `allOptions`. Ownership enforced. |
| `getStats` | protected query | `{ userId?: cuid }` | Returns aggregate stats for the caller (or specified user if same as caller): `{ totalAttempts, averageScore, bestScore, recentAttempts (up to 5) }`. |
| `delete` | protected mutation | `{ id: cuid }` | Deletes an attempt and cascades answers. Returns `{ success: true }`. Ownership enforced. |

## studySessionRouter (`studySession.*`)

| Procedure | Type | Input | Notes |
| --- | --- | --- | --- |
| `generate` | protected mutation | `{ deckId: cuid }` | Requires deck with documents. Calls Gemini (`generateSummary`) to build summary. Upserts a study session with default `rsvpSpeedWPM: 300`. Returns session. |
| `getByDeckId` | protected query | `{ deckId: cuid }` | Fetches study session if it exists. Throws `NOT_FOUND` if missing. Ownership enforced. |
| `updateRsvpSpeed` | protected mutation | `{ deckId: cuid, rsvpSpeedWPM: number (100-1000) }` | Updates RSVP speed on existing session. Ownership enforced. |
| `regenerate` | protected mutation | `{ deckId: cuid }` | Requires existing session and documents. Regenerates summary via Gemini and updates session. |

---

### Usage Tips for Frontend Integration

- Use the fully qualified procedure names (e.g. `api.deck.getAll.useQuery()`) matching your tRPC client setup.
- Handle `TRPCClientError` instances to surface backend validation messages (e.g. deck ownership violations).
- For quiz and study session generation, show loading states—the Gemini calls are async and may return `INTERNAL_SERVER_ERROR` if upstream AI fails.
- When rendering quiz-taking flows, use `quiz.getById` (no answers). For review dashboards, use `quiz.getByIdWithAnswers`.
- After submitting a quiz attempt, refresh both `quizAttempt.getMyAttempts` and `gamification.getMyStreak` if you surface streak data.

