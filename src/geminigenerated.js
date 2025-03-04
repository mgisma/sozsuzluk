import { addEntry } from './firebase/operations';

export const generateContent = async (prompt, title) => {
    console.log(import.meta.env.VITE_GEMINI_API_KEY);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "contents": [
            {
              "parts": [
                {
                  "text": prompt
                }
              ]
            }
          ]
        })
      });
  
      const data = await response.json();
      const geminiEntry = data.candidates[0].content.parts[0].text;
  
      const gr = await addEntry(title, geminiEntry, { displayName: 'gemini-ai' }, true);
      return gr;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  