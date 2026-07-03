import React from "react";
import { useNavigate } from "react-router-dom";
import { AGENTS } from "../data/agents.js";
import AgentCard from "../components/AgentCard.jsx";

export default function Lobby() {
  const navigate = useNavigate();

  return (
    <div className="lobby-wrap">
      {/* <div className="eyebrow">Interni savetodavni panel</div> */}
      <h1 className="title">AI Advisory Board</h1>
      {/* <p className="subtitle">
        Pet stručnih savetnika, svaki povezan sa svojim n8n workflow-om. Izaberi jednog da započneš razgovor.
      </p> */}

      <div className="grid">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onClick={() => navigate(`/chat/${agent.id}`)} />
        ))}
      </div>
    </div>
  );
}
