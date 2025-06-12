const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/doughlog', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbxQQj-XIVy7rrZlXrMmKpjhkPj51MUUF-hw0CVUtuMjLI1PnReMeKgpZi3hi2Xeqto8yg/exec',
      req.body
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Logging failed:', error.message);
    res.status(500).send('Logging failed');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
