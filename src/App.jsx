import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext.jsx";
import Lobby from "./pages/Lobby.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
  return (
    <ChatProvider>
      <div className="page">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/chat/:agentId" element={<Chat />} />
        </Routes>
      </div>
    </ChatProvider>
  );
}
