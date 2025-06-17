import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// 🔁 Forward POST to Make's doPOST webhook
app.post('/doughlog', async (req, res) => {
  try {
    const response = await fetch('https://hook.eu2.make.com/4bwcz7pnou32dui6g04v619rkcv6edo3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(200).json({ success: true, forwarded: 'POST', response: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔁 Forward GET to Make's doGET webhook
app.get('/getlog', async (req, res) => {
  try {
    const url = new URL('https://hook.eu2.make.com/3qextlv5hy7rdb0c2w3dcezp2ah1588e');
    for (const [key, value] of Object.entries(req.query)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      success: true,
      forwarded: 'GET',
      response: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

