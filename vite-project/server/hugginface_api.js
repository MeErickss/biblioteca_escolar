export async function getBookRecommendation(prompt) {
  const res = await fetch('http://localhost:5000/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro desconhecido');
  }

  const { generated_text } = await res.json();
  return generated_text;
}
