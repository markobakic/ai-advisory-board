import React from "react";

export default function TypingIndicator({ accentColor }) {
  return (
    <div className="bubble-row bubble-row-start">
      <div className="bubble bubble-agent typing" style={{ borderColor: accentColor + "55" }}>
        <span className="typing-dot" />
        <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
        <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}
