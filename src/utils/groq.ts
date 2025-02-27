import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"; // Replace with the actual Groq API endpoint

export const generateTodoWithGroq = async (prompt: string) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile", // Choose the model Groq provides
        messages: [{ role: "user", content: `Generate a list of todo items based on: ${prompt}. only return a list with no serial numbers.` }],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // return response.data.choices[0].message.content;

    // const data = await response.json();
    console.log("Groq API response:", response.data);
    return response.data.choices[0].message.content?.trim().split("\n") || [];
  } catch (error) {
    console.error("Groq API error:", error);
    return "AI Suggestion failed.";
  }
};


export const fetchGroqSuggestions = async (input: string) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Generate a list of todo items based on: ${input}`,
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI suggestions");
  }

  const data = await response.json();
  return data.choices?.[0]?.text?.trim().split("\n") || [];
};
