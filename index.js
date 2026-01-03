const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "verify_token_123";

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Receive messages
app.post("/webhook", (req, res) => {
  return res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

// 🚨 IMPORTANT FIX HERE
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webhook running on port ${PORT}`);
});
