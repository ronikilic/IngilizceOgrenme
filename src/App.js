import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chat", { prompt });
      setReply(res.data.reply);
    } catch (err) {
      setReply("System Error: Critical failure in neural link.");
    }
    setLoading(false);
  };

  return (
    <div className="app-viewport">
      <div className="nebula-bg"></div>
      
      <div className="glass-panel">
        <div className="scanner-line"></div>
        
        <header className="terminal-header">
          <div className="status-dot"></div>
          <span className="version-tag">SYSTEM v7.3</span>
          <h1>Grammar Coach</h1>
          <div className="topic-badge">CONJUNCTIONS OF CONTRAST</div>
        </header>

        <section className="terminal-body">
          <div className="instruction-text">
            {">"} Practice: Although, Despite, However...
          </div>

          <div className="input-wrapper">
            <textarea
              placeholder="Inject sentence here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="input-decor"></div>
          </div>

          <button 
            className={`action-btn ${loading ? "busy" : ""}`} 
            onClick={sendPrompt} 
            disabled={loading || !prompt}
          >
            {loading ? "PROCESSING..." : "ANALYZE DATA"}
          </button>

          {reply && (
            <div className="output-container">
              <div className="output-header">FEEDBACK LOG</div>
              <div className="output-content">
                <p>{reply}</p>
              </div>
            </div>
          )}
        </section>

        <footer className="terminal-footer">
          <span className="encryption-text">ENCRYPTED CONNECTION ACTIVE</span>
        </footer>
      </div>
    </div>
  );
}

export default App;