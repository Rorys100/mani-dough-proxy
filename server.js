const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Use your latest Apps Script endpoint here
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlb5JhZFROSIAsFaJUxK5Qrk6insycAncovhCSBB10uF2h_SsMttoUq2kfpPY7yynh/exec";

// POST: Forward dough log or weekly plan data
app.post("/doughlog", async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error forwarding to Google Script:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to log entry" });
  }
});

// GET: Retrieve all sheet data
app.get("/getlog", async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching sheet data:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
