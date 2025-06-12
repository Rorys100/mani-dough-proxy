const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweorjb_7m4U_SXkmZ-8Z-l2OiluBCaP9KEv2mDkBMV0RHR0mrw3XvHUlFQ7-4cnKRB/exec";

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

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
