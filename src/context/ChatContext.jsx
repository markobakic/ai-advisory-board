import React, { createContext, useContext, useState, useCallback } from "react";
import { makeSessionId, sendToAgent } from "../utils/api.js";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messagesByAgent, setMessagesByAgent] = useState({});
  const [sessionsByAgent, setSessionsByAgent] = useState({});
  const [loadingByAgent, setLoadingByAgent] = useState({});

  const ensureSession = useCallback((agentId) => {
    setSessionsByAgent((prev) => (prev[agentId] ? prev : { ...prev, [agentId]: makeSessionId() }));
    setMessagesByAgent((prev) => (prev[agentId] ? prev : { ...prev, [agentId]: [] }));
  }, []);

  const sendMessage = useCallback(
    async (agent, text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setMessagesByAgent((prev) => ({
        ...prev,
        [agent.id]: [...(prev[agent.id] || []), { role: "user", text: trimmed }],
      }));
      setLoadingByAgent((prev) => ({ ...prev, [agent.id]: true }));

      try {
        const sessionId = sessionsByAgent[agent.id] || makeSessionId();
        const reply = await sendToAgent({
          webhookUrl: agent.webhookUrl,
          chatInput: trimmed,
          sessionId,
        });
        setMessagesByAgent((prev) => ({
          ...prev,
          [agent.id]: [...(prev[agent.id] || []), { role: "agent", text: reply }],
        }));
      } catch (err) {
        setMessagesByAgent((prev) => ({
          ...prev,
          [agent.id]: [
            ...(prev[agent.id] || []),
            {
              role: "error",
              text: `Ne mogu da dobijem odgovor od ${agent.name} savetnika. Proveri webhook URL i da li je n8n workflow aktivan.`,
            },
          ],
        }));
      } finally {
        setLoadingByAgent((prev) => ({ ...prev, [agent.id]: false }));
      }
    },
    [sessionsByAgent]
  );

  const value = {
    ensureSession,
    sendMessage,
    getMessages: (agentId) => messagesByAgent[agentId] || [],
    isLoading: (agentId) => !!loadingByAgent[agentId],
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
