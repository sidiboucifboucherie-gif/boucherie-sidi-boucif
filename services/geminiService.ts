import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real scenario, ensure this is set safely.

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getCookingAdvice = async (productName: string): Promise<string> => {
  if (!ai) {
    return "Le service d'assistant culinaire est momentanément indisponible (Clé API manquante). Demandez conseil directement en magasin !";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Tu es Mohamed Sidi Boucif, un artisan boucher expert de Béziers (France).
      Un client te demande conseil pour cuisiner : "${productName}".
      Donne un conseil court, précis et chaleureux (max 80 mots).
      Mentionne une astuce de cuisson (temps, température) et une idée d'accompagnement simple.
      Ton ton doit être professionnel mais amical, comme un boucher de quartier.
      Rappelle que la viande est Halal et de qualité (Label Rouge ou VBF si applicable).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Désolé, je n'ai pas pu trouver de conseil pour le moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la récupération du conseil. Passez nous voir en boutique !";
  }
};