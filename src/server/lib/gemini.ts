import { env } from "~/env";
import { AI_PROMPTS, AI_MODELS } from "~/server/config/prompts";

export interface QuizQuestion {
  questionText: string;
  options: Array<{
    optionText: string;
    isCorrect: boolean;
  }>;
}

export interface FlashcardData {
  frontText: string;
  backText: string;
}

interface GeminiFile {
  name: string;
  uri: string;
  mimeType: string;
}

/**
 * Upload a file to Gemini File API for processing
 * Gemini will handle PDF text extraction and other file processing automatically
 */
async function uploadFileToGemini(
  fileUrl: string,
  fileName: string
): Promise<GeminiFile> {
  try {
    // Step 1: Fetch the file from UploadThing CDN
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file from ${fileUrl}: ${fileResponse.statusText}`);
    }

    const fileBlob = await fileResponse.blob();
    const formData = new FormData();
    formData.append("file", fileBlob, fileName);

    // Step 2: Upload to Gemini Files API
    const uploadResponse = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Gemini file upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    const uploadData = await uploadResponse.json();
    
    // Return file metadata for use in generation requests
    return {
      name: uploadData.file.name,
      uri: uploadData.file.uri,
      mimeType: uploadData.file.mimeType,
    };
  } catch (error) {
    console.error(`Error uploading file ${fileName} to Gemini:`, error);
    throw new Error(
      `Failed to upload file to Gemini: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generate summary from documents using Gemini's native file processing
 * Gemini will automatically extract text from PDFs and other documents
 */
export async function generateSummary(
  documents: Array<{ name: string; fileUrl: string }>
): Promise<string> {
  if (documents.length === 0) {
    throw new Error("No documents provided for summary generation");
  }

  try {
    // Upload all files to Gemini
    console.log(`📤 Uploading ${documents.length} document(s) to Gemini...`);
    const uploadedFiles = await Promise.all(
      documents.map((doc) => uploadFileToGemini(doc.fileUrl, doc.name))
    );
    console.log(`✅ Successfully uploaded ${uploadedFiles.length} file(s)`);

    const prompt = AI_PROMPTS.GENERATE_SUMMARY;

    // Prepare the request with file references
    const parts = [
      { text: prompt.userPrompt },
      ...uploadedFiles.map((file) => ({
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri,
        },
      })),
    ];

    // Call Gemini with file references
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODELS.SUMMARY}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          systemInstruction: {
            parts: [{ text: prompt.systemInstruction }],
          },
          generationConfig: prompt.config,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("No summary generated from Gemini API");
    }

    console.log(`✅ Generated summary (${summary.length} characters)`);
    return summary;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    throw new Error(
      `Failed to generate summary: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generate quiz questions using Gemini's native file processing
 * Gemini will automatically extract text from PDFs and other documents
 */
export async function generateQuizQuestions(
  documents: Array<{ name: string; fileUrl: string }>,
  count: number = 10
): Promise<QuizQuestion[]> {
  if (documents.length === 0) {
    throw new Error("No documents provided for quiz generation");
  }

  if (count < 5 || count > 30) {
    throw new Error("Question count must be between 5 and 30");
  }

  try {
    // Upload all files to Gemini
    console.log(`📤 Uploading ${documents.length} document(s) to Gemini for quiz generation...`);
    const uploadedFiles = await Promise.all(
      documents.map((doc) => uploadFileToGemini(doc.fileUrl, doc.name))
    );
    console.log(`✅ Successfully uploaded ${uploadedFiles.length} file(s)`);

    const prompt = AI_PROMPTS.GENERATE_QUIZ(count);

    // Prepare the request with file references
    const parts = [
      { text: prompt.userPrompt },
      ...uploadedFiles.map((file) => ({
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri,
        },
      })),
    ];

    // Call Gemini with file references
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODELS.QUIZ}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          systemInstruction: {
            parts: [{ text: prompt.systemInstruction }],
          },
          generationConfig: prompt.config,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No quiz questions generated from Gemini API");
    }

    // Clean up markdown formatting if present
    generatedText = generatedText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Extract JSON array more reliably - find the actual JSON content
    let jsonText = generatedText;
    const firstBracket = generatedText.indexOf('[');
    const lastBracket = generatedText.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      jsonText = generatedText.substring(firstBracket, lastBracket + 1);
    }

    // Try parsing with fallback strategies
    let questions: QuizQuestion[];
    try {
      questions = JSON.parse(jsonText) as QuizQuestion[];
    } catch (parseError) {
      console.error("Initial JSON parse failed, attempting cleanup...");
      console.error("Raw response (first 500 chars):", generatedText.substring(0, 500));
      
      // Attempt common fixes
      try {
        // Remove potential trailing commas before closing brackets
        let cleanedJson = jsonText
          .replace(/,(\s*[}\]])/g, '$1')
          // Fix common escape issues
          .replace(/\\'/g, "'")
          .replace(/\n/g, " ")
          .replace(/\r/g, "");
        
        questions = JSON.parse(cleanedJson) as QuizQuestion[];
        console.log("✅ JSON parsed successfully after cleanup");
      } catch (fallbackError) {
        console.error("Fallback parsing also failed");
        console.error("Cleaned JSON (first 500 chars):", jsonText.substring(0, 500));
        throw new Error(
          `Failed to parse quiz JSON: ${parseError instanceof Error ? parseError.message : "Unknown error"}. ` +
          `Response preview: ${generatedText.substring(0, 200)}...`
        );
      }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid quiz format: expected array of questions");
    }

    // Validate each question
    for (const question of questions) {
      if (!question.questionText || !Array.isArray(question.options)) {
        throw new Error("Invalid question format");
      }

      if (question.options.length !== 4) {
        throw new Error("Each question must have exactly 4 options");
      }

      const correctCount = question.options.filter((opt) => opt.isCorrect).length;
      if (correctCount !== 1) {
        throw new Error("Each question must have exactly 1 correct answer");
      }

      for (const option of question.options) {
        if (!option.optionText || typeof option.isCorrect !== "boolean") {
          throw new Error("Invalid option format");
        }
      }
    }

    console.log(`✅ Generated ${questions.length} quiz questions`);
    return questions.slice(0, count);
  } catch (error) {
    console.error("Error generating quiz questions with Gemini:", error);
    throw new Error(
      `Failed to generate quiz questions: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generate flashcards using Gemini's native file processing
 * Gemini will automatically extract text from PDFs and other documents
 */
export async function generateFlashcards(
  documents: Array<{ name: string; fileUrl: string }>,
  count: number = 10
): Promise<FlashcardData[]> {
  if (documents.length === 0) {
    throw new Error("No documents provided for flashcard generation");
  }

  if (count < 5 || count > 50) {
    throw new Error("Flashcard count must be between 5 and 50");
  }

  try {
    // Upload all files to Gemini
    console.log(`📤 Uploading ${documents.length} document(s) to Gemini for flashcard generation...`);
    const uploadedFiles = await Promise.all(
      documents.map((doc) => uploadFileToGemini(doc.fileUrl, doc.name))
    );
    console.log(`✅ Successfully uploaded ${uploadedFiles.length} file(s)`);

    const prompt = AI_PROMPTS.GENERATE_FLASHCARDS(count);

    // Prepare the request with file references
    const parts = [
      { text: prompt.userPrompt },
      ...uploadedFiles.map((file) => ({
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri,
        },
      })),
    ];

    // Call Gemini with file references
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODELS.FLASHCARD}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          systemInstruction: {
            parts: [{ text: prompt.systemInstruction }],
          },
          generationConfig: prompt.config,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No flashcards generated from Gemini API");
    }

    // Clean up markdown formatting if present
    generatedText = generatedText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Parse and validate
    const flashcards = JSON.parse(generatedText) as FlashcardData[];

    if (!Array.isArray(flashcards) || flashcards.length === 0) {
      throw new Error("Invalid flashcard format: expected array of flashcards");
    }

    // Validate each flashcard
    for (const flashcard of flashcards) {
      if (!flashcard.frontText || !flashcard.backText) {
        throw new Error("Invalid flashcard format: missing frontText or backText");
      }

      if (flashcard.frontText.length > 500) {
        throw new Error("Front text too long (max 500 characters)");
      }

      if (flashcard.backText.length > 1000) {
        throw new Error("Back text too long (max 1000 characters)");
      }
    }

    console.log(`✅ Generated ${flashcards.length} flashcards`);
    return flashcards.slice(0, count);
  } catch (error) {
    console.error("Error generating flashcards with Gemini:", error);
    throw new Error(
      `Failed to generate flashcards: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
