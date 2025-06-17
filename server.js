import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 POST forwarding (used for logging entries)
app.post('/doughlog', async (req, res) => {
  try {
    const response = await fetch('https://hook.eu2.make.com/4bwc27pnou32dui6g04v619r9kcvc6ed03', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json({ success: true, forwarded: 'POST', response: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔁 GET forwarding (used for retrieving log data)
app.get('/getlog', async (req, res) => {
  try {
    const url = new URL('https://hook.eu2.make.com/3qextlv5hy7rdb0c2w3dcezp2ah1588e');
    for (const [key, value] of Object.entries(req.query)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url.toString());
    const data = await response.json();
    res.status(200).json({ success: true, forwarded: 'GET', response: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Required for Render to bind to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy listening on port ${PORT}`);
});

