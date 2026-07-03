import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAgentById } from "../data/agents.js";
import { useChat } from "../context/ChatContext.jsx";
import MessageBubble from "../components/MessageBubble.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";
import ChatInput from "../components/ChatInput.jsx";

export default function Chat() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const agent = getAgentById(agentId);
  const { ensureSession, sendMessage, getMessages, isLoading } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!agent) return;
    ensureSession(agent.id);
  }, [agent, ensureSession]);

  const messages = agent ? getMessages(agent.id) : [];
  const loading = agent ? isLoading(agent.id) : false;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!agent) {
    return (
      <div className="chat-wrap">
        <p>Agent nije pronađen.</p>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Nazad na tablu
        </button>
      </div>
    );
  }

  function handleSend() {
    if (!input.trim() || loading) return;
    sendMessage(agent, input);
    setInput("");
  }

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Tabla
        </button>
        <div className="chat-header-main">
          <div className="code-tag" style={{ borderColor: agent.color, color: agent.color }}>
            {agent.code}
          </div>
          <div>
            <div className="chat-title">{agent.name} savetnik</div>
            <div className="chat-subtitle">{agent.tagline}</div>
          </div>
        </div>
        <div className="header-line" style={{ background: agent.color }} />
      </div>

      <div ref={scrollRef} className="messages">
        {messages.length === 0 && (
          <div className="empty-state">
            Pitaj {agent.name.toLowerCase()} savetnika bilo šta. Sesija ostaje otvorena dok ne osvežiš stranicu.
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} accentColor={agent.color} />
        ))}
        {loading && <TypingIndicator accentColor={agent.color} />}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={loading}
        placeholder={`Poruka za ${agent.name.toLowerCase()} savetnika`}
        accentColor={agent.color}
      />
    </div>
  );
}
