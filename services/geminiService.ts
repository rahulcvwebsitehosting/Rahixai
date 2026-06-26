import { GoogleGenAI, Type } from "@google/genai";
import { Role, ChatMessage, FileData } from "../types";

export class GeminiService {
  /**
   * Initializing the Google GenAI SDK for AI Studio.
   * Uses process.env.API_KEY exclusively for authentication.
   */
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async sendMessage(
    message: string, 
    history: ChatMessage[], 
    files: FileData[] = [],
    useWebSearch: boolean = false,
    language: string = 'en'
  ) {
    const ai = this.getClient();
    
    try {
      // Prepare multi-turn conversation history for AI Studio format
      const contents = history.map(msg => ({
        role: msg.role === Role.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Build current turn parts including multi-modal data (images/PDFs)
      const currentParts: any[] = [{ text: message }];
      files.forEach(file => {
        currentParts.push({
          inlineData: {
            mimeType: file.type,
            data: file.data.split(',')[1] // Extract base64 payload
          }
        });
      });

      contents.push({ role: 'user', parts: currentParts });

      // Search tool configuration for Deep Research mode
      const tools = useWebSearch ? [{ googleSearch: {} }] : undefined;

      const languageNote = language === 'hi' ? 'ALWAYS respond in Hindi (हिन्दी).' : 
                           language === 'ta' ? 'ALWAYS respond in Tamil (தமிழ்).' : 
                           'Respond in English by default, but adapt to the user\'s language if they switch.';

      const now = new Date();
      const currentDateTime = `Current Timestamp: ${now.toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;

      // System Instructions tailored for the Rahix persona
      const systemInstruction = `
        Act as the Rahix AI Engine v2.5. You are a high-performance workspace assistant.
        LOGIC PROTOCOLS:
        1. Temporal Accuracy: Use the provided timestamp for all time-relative queries. ${currentDateTime}
        2. Engineering UX: Prioritize structured Markdown, tables, and Fira Code blocks for technical data.
        3. Web-Access: When search tools are active, prioritize citations from the grounding metadata.
        4. Performance: Keep responses concise, avoiding unnecessary conversational filler.
        5. Identity: You are RAHIX, engineered by Rahul S.
        
        ${languageNote}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', // Optimal for Free Tier high RPM
        contents: contents,
        config: {
          tools: tools,
          systemInstruction: systemInstruction.trim()
        }
      });

      // Extract Grounding sources if available
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter((chunk: any) => chunk.web)
        ?.map((chunk: any) => ({
          title: chunk.web.title || 'Source',
          uri: chunk.web.uri
        })) || [];

      return {
        text: response.text || "Neural link stable, but response payload was empty.",
        sources: sources
      };
    } catch (error: any) {
      console.error("RAHIX Core Error:", error);
      
      // Handle Free Tier 429 (Too Many Requests) gracefully
      if (error?.message?.includes('429')) {
        return {
          text: "### [ENGINE THROTTLED]\nThe Free Tier link is currently at capacity (RPM Limit). Please pause for 30-60 seconds to allow the neural reset. Rapid-fire queries may lead to temporary session suspension.",
          sources: []
        };
      }

      return {
        text: "Critical synchronization error. Please check your network or refresh the terminal.",
        sources: []
      };
    }
  }

  async generateImage(prompt: string) {
    const ai = this.getClient();
    try {
      // Use Nano Banana series for free tier image generation
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Professional engineering render: ${prompt}. High resolution, clean 3D aesthetics, cinematic lighting.` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      if (!response.candidates?.[0]?.content?.parts) return null;

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Imaging Engine Error:", error);
      return null;
    }
  }

  async refineCanvasContent(content: string, instruction: string, mode: 'text' | 'code') {
    const ai = this.getClient();
    const prompt = `As Rahix AI, refine the following ${mode} content based on this instruction: "${instruction}".
    
    CONTENT:
    ${content}
    
    Output ONLY the refined content. No explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    return response.text || content;
  }
}

export const geminiService = new GeminiService();
