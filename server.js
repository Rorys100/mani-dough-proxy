import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// 🔁 POST to Make's webhook
app.post('/doughlog', async (req, res) => {
  try {
    const response = await fetch('https://hook.eu2.make.com/4bwc...6ed03', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // Make often returns plain text
    res.status(200).json({
      success: true,
      forwarded: 'POST',
      response: data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔁 GET to Make's webhook
app.get('/getlog', async (req, res) => {
  try {
    const url = new URL('https://hook.eu2.make.com/3qext...1588e');
    for (const [key, value] of Object.entries(req.query)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({
      success: true,
      forwarded: 'GET',
      response: data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy listening on port ${PORT}`);
});

