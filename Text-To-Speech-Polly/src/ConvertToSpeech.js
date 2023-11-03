import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
// import { WriteStream } from "fs";

async function ConvertToSpeech({ text }) {
  
  const client = new PollyClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIAUQTJCEWAJM2MZHXK",
      secretAccessKey: "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",
    },
    
  });

  const command = new SynthesizeSpeechCommand({
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Joanna",
  });

  try {
    const response = await client.send(command);
    if (response.AudioStream) {
      // Blob: collection of bytes that contains data stored in a file.
      
      console.log(response.AudioStream)
    

      const audioBlob = new Blob([response.AudioStream], {
        type: "audio/mpeg",
      });

      // const outStream = new WriteStream("Polly.mp3")
      // response.AudioStream.pipe(outStream)

      // outStream.on("finish", () =>{
      //   console.log("Speech synthesis successful!");
      // })

      const audioURL = URL.createObjectURL(audioBlob);
      console.log(audioURL);
      
      
    }
  } catch (error) {
    console.log(error);
  }
}
// ConvertToSpeech({text: "Hello World"})

export default ConvertToSpeech;
