// polly.jsx (frontend)

import { useState } from "react";
import axios from "axios";

function Polly() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const sendText = () => {
    axios
      .post("/api/ConvertToSpeech", { text }, { responseType: "blob" }) // Important to set responseType to 'blob'
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url);
        console.log(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1 className="text-5xl mt-4 text-center">Text To Speech</h1>

      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-center mt-16">
          <textarea
            cols={30}
            className="textarea-md"
            type="text-area"
            placeholder="Enter Text.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary mx-2" onClick={sendText}>
            Convert
          </button>
        </div>
      </div>
      {audioUrl && (
        <div className="flex justify-center mt-4">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {audioUrl && (
        <div className="flex justify-center mt-4">
          <a href={audioUrl} download="speech.mp3" className="link">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default Polly;