import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });

    res.json({ reply: completion.choices[0].message });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI response failed" });
  }
});

app.listen(8000, () => console.log("AI server running on 8000"));
