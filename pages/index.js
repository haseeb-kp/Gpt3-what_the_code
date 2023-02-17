import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 code summarizer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>What The CODE!!!</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Introducing GPT-3 powered code summarization tool - the easy
              way to quickly summarize complex code files or functions. Get
              concise and readable summaries, speed up your workflows and
              improve team communication. Try out now!
            </h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="Paste your code here..."
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;
