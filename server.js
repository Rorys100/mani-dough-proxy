const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const GOOGLE_SCRIPT_URL = const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlb5JhZFROSIAsFaJUxK5Qrk6insycAncovhCSBB10uF2h_SsMttoUq2kfpPY7yynh/exec";

// POST to log dough entry
app.post("/doughlog", async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error forwarding to Google Script:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to log dough entry" });
  }
});

// GET to fetch all dough logs
app.get("/getlog", async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error retrieving data:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to retrieve log data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
