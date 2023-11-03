import { useEffect, useState } from "react";

import axios from "axios";



function Polly() {

  const [text, setText] = useState("");
  //   const [voice, setVoice] = useState("Joanna");

  const [audio, setAudio] = useState("http://localhost:3000/api/getAudio");


  const sendText = () => { 

    axios.post("/api/ConvertToSpeech", {text: text})
    .then((res) => {
      console.log(res.data);
      setAudio(res.data);
    })

    .catch((err) => {
      console.log(err);
    });
    
   };



// *****************************************************

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
          <button className="btn btn-primary mx-2 " onClick={sendText}>
            Convert
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {/* <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio> */}
        <a href={audio} className="link">Get your audio Here!</a>
      </div>
      <p className="italic text-center mt-2 text-gray-500">Please Reload the page after convert to get your Audio!</p>convert zala var link
    </div>
  );
}

export default Polly;

