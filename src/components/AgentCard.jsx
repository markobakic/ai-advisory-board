import React from "react";

export default function AgentCard({ agent, onClick }) {
  return (
    <button className="plaque" style={{ "--accent": agent.color }} onClick={onClick}>
      <div className="code-tag">{agent.code}</div>
      <div className="plaque-name">{agent.name}</div>      
      <div className="plaque-tagline">{agent.tagline}</div>
      <div className="plaque-bar" style={{ background: agent.color }} />
    </button>
  );
}
