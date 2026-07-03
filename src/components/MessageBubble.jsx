import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, text, accentColor }) {
  const rowClass = role === "user" ? "bubble-row bubble-row-end" : "bubble-row bubble-row-start";

  let bubbleClass = "bubble bubble-agent";
  let style = { borderColor: accentColor + "55" };

  if (role === "user") {
    bubbleClass = "bubble bubble-user";
    style = {};
  } else if (role === "error") {
    bubbleClass = "bubble bubble-error";
    style = {};
  }

  return (
    <div className={rowClass}>
      <div className={bubbleClass} style={style}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
