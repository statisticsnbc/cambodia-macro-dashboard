// Vercel serverless function — proxies "Ask" questions to the Claude API.
// The API key stays on the server (never exposed to the browser).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Missing prompt' });
      return;
    }
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Server not configured: ANTHROPIC_API_KEY is missing' });
      return;
    }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 900,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: (data && data.error && data.error.message) || 'Claude API error' });
      return;
    }
    const answer = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text : '(no answer returned)';
    res.status(200).json({ answer });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
}
