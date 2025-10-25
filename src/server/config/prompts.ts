/**
 * Centralized AI Prompt Configuration
 * 
 * Edit these prompts to change AI behavior without modifying code.
 * All prompts use Gemini's native file processing capabilities.
 */

export const AI_PROMPTS = {
  /**
   * Summary Generation Prompt
   * Used when generating study session summaries from documents
   */
  GENERATE_SUMMARY: {
    systemInstruction: "You are an educational assistant specialized in creating concise, well-structured study summaries optimized for learning and retention.",
    
    userPrompt: `Analyze all the provided documents and create a comprehensive summary suitable for studying.

Your summary should:
- Extract and organize key concepts and main ideas
- Highlight important facts, definitions, and principles
- Identify critical relationships between concepts
- Use clear headings and bullet points for structure
- Be optimized for RSVP (Rapid Serial Visual Presentation) reading
- Focus on information that students need to remember and understand

Create a summary that helps students quickly grasp and retain the essential information.`,

    config: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  },

  /**
   * Quiz Generation Prompt
   * Used when generating quiz questions from documents
   */
  GENERATE_QUIZ: (questionCount: number) => ({
    systemInstruction: "You are an expert educational assessment creator who generates high-quality multiple-choice questions.",
    
    userPrompt: `Based on all the provided study materials, generate exactly ${questionCount} multiple-choice quiz questions.

Requirements:
1. Generate EXACTLY ${questionCount} questions
2. Each question MUST have exactly 4 answer options
3. Each question MUST have exactly ONE correct answer
4. Cover different topics and difficulty levels from the material
5. Create plausible wrong answers (distractors) that test real understanding
6. Avoid trivial, trick, or poorly worded questions
7. Mix question types: factual recall, conceptual understanding, application, and analysis

CRITICAL OUTPUT FORMAT: Respond ONLY with valid JSON (no markdown, no code blocks, no extra text):
[
  {
    "questionText": "Your question here?",
    "options": [
      {"optionText": "First option", "isCorrect": false},
      {"optionText": "Correct answer", "isCorrect": true},
      {"optionText": "Third option", "isCorrect": false},
      {"optionText": "Fourth option", "isCorrect": false}
    ]
  }
]

Generate ${questionCount} questions now.`,

    config: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  }),

  /**
   * Flashcard Generation Prompt
   * Used when generating flashcards from documents
   */
  GENERATE_FLASHCARDS: (cardCount: number) => ({
    systemInstruction: "You are an expert educator specialized in creating effective study flashcards that enhance memory retention and understanding.",
    
    userPrompt: `Based on all the provided study materials, generate exactly ${cardCount} high-quality flashcards.

Requirements:
1. Generate EXACTLY ${cardCount} flashcards
2. Each flashcard has a FRONT (question/term/concept) and BACK (answer/definition/explanation)
3. Cover key concepts, definitions, facts, and important relationships from the material
4. Front should be concise and clear (question, term, or prompt)
5. Back should provide complete, accurate information (answer, definition, or explanation)
6. Vary difficulty levels and topics across all flashcards
7. Make cards effective for active recall and spaced repetition
8. Avoid overly complex or ambiguous questions

CRITICAL OUTPUT FORMAT: Respond ONLY with valid JSON (no markdown, no code blocks, no extra text):
[
  {
    "frontText": "Question, term, or concept here",
    "backText": "Answer, definition, or explanation here"
  }
]

Generate ${cardCount} flashcards now.`,

    config: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  }),
};

/**
 * AI Model Configuration
 * Choose which Gemini model to use for different tasks
 */
export const AI_MODELS = {
  SUMMARY: "gemini-2.5-flash", // Fast and efficient for summaries
  QUIZ: "gemini-2.5-flash", // Good balance for quiz generation
  FLASHCARD: "gemini-2.5-flash", // Fast and efficient for flashcard generation
  // Alternative: "gemini-1.5-pro" for higher quality at higher cost
};
