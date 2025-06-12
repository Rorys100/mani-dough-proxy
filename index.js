const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const targetURL = "https://script.google.com/macros/s/AKfycbweorjb_7m4U_SXkmZ-8Z-l2OiluBCaP9KEv2mDkBMV0RHR0mrw3XvHUlFQ7-4cnKRB/exec";

app.post("/doughlog", async (req, res) => {
  try {
    const response = await axios.post(targetURL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.response?.data || error.message);
    res.status(500).send("Proxy failed to forward request");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
