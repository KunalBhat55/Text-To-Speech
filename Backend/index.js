// index.js (backend)

import express from "express";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors(
  {
    origin: "*", // Allow all origins for simplicity; adjust as needed for security
    methods: ["GET", "POST"],
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is up!" });
});

app.post("/api/ConvertToSpeech", async (req, res) => {
  const text = req.body.text;
  console.log(text);

  // Create Polly client
  const client = new PollyClient(
    { region: "ap-south-1" },
    {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }
  );

  // Create speech synthesis command
  const command = new SynthesizeSpeechCommand({
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Joanna",
    Engine: "neural", // Use "neural" for better quality
  });
 
  // Send command to Polly
  try {
    const response = await client.send(command);
    console.log(response);
    if (response.AudioStream) {
      res.set("Content-Type", "audio/mpeg");
      response.AudioStream.pipe(res);
    } else {
      res.status(500).json({ error: "No audio stream received" });
    }
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});