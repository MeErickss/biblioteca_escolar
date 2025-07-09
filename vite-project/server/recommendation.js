import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const HF_API_KEY = process.env.HF_API_KEY;

router.post('/', async (req, res) => {
  console.log(HF_API_KEY)
  try {
    const { prompt } = req.body;
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 100, temperature: 0.7, top_p: 0.9 },
        }),
      }
    );

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error('HF error:', hfRes.status, errText);
      return res.status(502).json({ error: 'Erro na Hugging Face API' });
    }

    const [data] = await hfRes.json();
    return res.json({ recommendation: data.generated_text || 'Sem resposta.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

export default router;
