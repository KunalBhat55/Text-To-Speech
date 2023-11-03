import express from "express";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { WriteStream } from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// const filePath = path.join(__dirname , "Polly.mp3");
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.get("/api/test", (req, res) => {
  const data = "Hello from the server!"

  res.send(data);

  
});


app.post("/api/ConvertToSpeech", (req, res) => {

  // const text = req.body.text;
  const text = req.body.text;
  console.log(text);

  ConvertToSpeech({ text });

  async function ConvertToSpeech({ text }) {
    const client = new PollyClient({ region: "us-east-1" });

    const command = new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      VoiceId: "Raveena",
    });

    try {
      const response = await client.send(command);
      if (response.AudioStream) {
        // Blob: collection of bytes that contains data stored in a file.

        const audioBlob = new Blob([response.AudioStream], {
          type: "audio/mpeg",
        });
        const outputStream = new WriteStream("public/Polly.mp3");

        const audioRes = response.AudioStream.pipe(outputStream);
        console.log(audioRes.path);

        // const audioURL = URL.createObjectURL(audioBlob);

        // console.log(audioURL);
        
        res.send(`http://localhost:3000/api/getAudio`);
  

      }
    } catch (error) {
      console.log(error);
    }
  }
});

app.get("/api/getAudio", (req, res) => {
   
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "no-store"); 
  res.setHeader("Cache-Control", "max-age=0");
  res.sendFile(__dirname + "/public/Polly.mp3");


});

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});
