/**
 * Central config for all 5 advisory agents.
 *
 * EDIT `webhookUrl` for each agent to point at your n8n PRODUCTION
 * webhook URL (Chat Trigger node -> "Production URL"). The workflow
 * must be Active for the URL to respond. See README.md for full
 * n8n setup instructions.
 */

export const AGENTS = [
  {
    id: "finance",
    code: "FIN",
    name: "Finance",
    tagline: "Budgets, forecasts, unit economics",
    color: "#4C9A72",
    webhookUrl: "import.meta.env.VITE_WEBHOOK_FINANCE",
  },
  {
    id: "culture",
    code: "CUL",
    name: "Culture",
    tagline: "People, values, org health",
    color: "#9B72CF",
    webhookUrl: import.meta.env.VITE_WEBHOOK_CULTURE,
  },
  {
    id: "innovation",
    code: "INV",
    name: "Innovation",
    tagline: "New bets, R&D, emerging tech",
    color: "#D9A441",
    webhookUrl: import.meta.env.VITE_WEBHOOK_INNOVATION,
  },
  {
    id: "operations",
    code: "OPS",
    name: "Operations",
    tagline: "Process, delivery, execution",
    color: "#4A93A8",
    webhookUrl: import.meta.env.VITE_WEBHOOK_OPERATIONS,
  },
  {
    id: "strategy",
    code: "STR",
    name: "Strategy",
    tagline: "Market position, long-range plans",
    color: "#C2564A",
    webhookUrl: import.meta.env.VITE_WEBHOOK_STRATEGY,
  },
];

export function getAgentById(id) {
  return AGENTS.find((a) => a.id === id);
}
