import React from "react";

export default function ChatInput({ value, onChange, onSend, disabled, placeholder, accentColor }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }



  return (
    <div className="input-row">
      <textarea
        rows={1}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="send-btn"
        style={{ background: accentColor }}
        onClick={onSend}
        disabled={disabled || !value.trim()}
      >
        Pošalji
      </button>
    </div>
  );
}
