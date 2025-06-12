const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

app.post('/doughlog', async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(200).send({ status: 'success', data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).send({
      status: 'error',
      message: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
