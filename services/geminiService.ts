import { GoogleGenAI } from "@google/genai";
import { GeminiResponse } from "../types";

// Initialize Gemini API
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateWithGemini = async (prompt: string, modelType: string): Promise<GeminiResponse> => {
  if (!apiKey) {
    return {
        text: "API Key not found. Please set process.env.API_KEY to use Gemini features.",
        isLoading: false,
        error: "Missing API Key"
    };
  }

  // Select appropriate Gemini model based on the "Claude" recommendation in the prompt metadata
  // If the prompt asks for "Opus" (Complex), we use Gemini Pro 3
  // If the prompt asks for "Sonnet" (Speed/Code), we use Gemini 2.5 Flash (or Pro depending on complexity)
  
  let geminiModel = 'gemini-2.5-flash';
  if (modelType.includes('Opus')) {
      geminiModel = 'gemini-3-pro-preview';
  }

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });
    
    return {
      text: response.text || "No response generated.",
      isLoading: false
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return {
      text: "",
      isLoading: false,
      error: error.message || "Failed to generate content."
    };
  }
};