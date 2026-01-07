
import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => process.env.API_KEY || "";

export const generateSafetyImage = async (prompt: string, stage: string): Promise<string | null> => {
  const apiKey = getAPIKey();
  
  const fallbackImages: Record<string, string> = {
    'HOME': 'https://illustrations.popsy.co/amber/stay-at-home.svg',
    'STREET': 'https://illustrations.popsy.co/amber/shipped.svg'
  };
  const fallbackUrl = fallbackImages[stage] || fallbackImages['HOME'];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality 3D Disney/Pixar style cartoon illustration for a children's game. 
            Vibrant friendly colors, rounded shapes, expressive character faces. 
            No text, no watermarks. 
            Scene: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        },
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }
    
    return fallbackUrl;
  } catch (error: any) {
    console.error("Gemini Image Gen Error:", error);
    return fallbackUrl;
  }
};
