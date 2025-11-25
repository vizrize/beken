import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.FLIP_API_KEY;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Flip QRIS backend is running!");
});

app.post("/create-qris", async (req, res) => {
  try {
    const amount = req.body.amount;

    const result = await axios.post(
      "https://bigflip.id/api/v3/qris",
      {
        amount: amount,
        partner_tx_id: "trx_" + Date.now(),
        callback_url: process.env.WEBHOOK_URL
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(result.data);
  } catch (err) {
    console.log(err.response?.data || err);
    res.status(
