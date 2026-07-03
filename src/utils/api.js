export function makeSessionId() {
  return "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// n8n's Chat Trigger can return a few different shapes depending on how
// the workflow is configured. This normalizes them into a plain string.
function extractReply(data) {
  if (typeof data === "string") return data;
  if (!data) return "";
  if (typeof data.output === "string") return data.output;
  if (typeof data.text === "string") return data.text;
  if (typeof data.response === "string") return data.response;
  if (Array.isArray(data) && data[0]) return extractReply(data[0]);
  return JSON.stringify(data);
}

/**
 * Sends a message to an agent's n8n webhook and returns the reply text.
 * Throws on network failure or non-2xx response.
 */
export async function sendToAgent({ webhookUrl, chatInput, sessionId }) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendMessage",
      chatInput,
      sessionId,
    }),
  });

  if (!res.ok) {
    throw new Error("Request failed with status " + res.status);
  }

  const data = await res.json();
  return extractReply(data) || "No response received.";
}
