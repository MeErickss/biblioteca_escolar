const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

export async function getBookRecommendation(prompt) {
  const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9
      }
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro da API Hugging Face:", response.status, errorText);
    throw new Error("Erro na resposta da Hugging Face API");
  }

  const data = await response.json();
  return data[0]?.generated_text || "Sem resposta.";
}
