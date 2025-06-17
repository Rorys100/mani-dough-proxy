import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 POST proxy to Make
app.post('/doughlog', async (req, res) => {
  try {
    const response = await fetch('https://hook.eu2.make.com/4bwcz7pnou32dui60g4v619r9kcvc6ed03', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();

    try {
      const json = JSON.parse(data);
      res.status(200).json({ success: true, forwarded: 'POST', response: json });
    } catch {
      res.status(200).send(data); // fallback if not valid JSON
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔁 GET proxy to Make (routes via query string, returns JSON or plain text)
app.get('/getlog', async (req, res) => {
  try {
    const url = new URL('https://hook.eu2.make.com/3qextlv5hy7rdb0c2w3dcezp2ah1588e');
    for (const [key, value] of Object.entries(req.query)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url);
    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.status(200).json({ success: true, forwarded: 'GET', response: json });
    } catch {
      res.status(200).send(text); // fallback for "Not found" etc.
    }

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy listening on port ${PORT}`);
});

