# AI Advisory Board

React aplikacija (Vite + React Router) sa 5 dugmića koja svaki otvaraju poseban chat povezan na svoj n8n AI agent workflow (Finance, Culture, Innovation, Operations, Strategy).

## Pokretanje

```bash
npm install
npm run dev
```

Aplikacija se pokreće na `http://localhost:5173`.

Za produkcioni build:

```bash
npm run build
npm run preview
```

## Struktura projekta

```
src/
  data/agents.js         -> konfiguracija svih 5 agenata (ime, boja, webhook URL)
  utils/api.js            -> poziv ka n8n webhook-u + parsiranje odgovora
  context/ChatContext.jsx -> čuva istoriju poruka i sessionId po agentu
  components/
    AgentCard.jsx          -> pločica na početnom ekranu
    MessageBubble.jsx       -> jedan chat balon
    TypingIndicator.jsx     -> "kuca..." indikator
    ChatInput.jsx           -> polje za unos + dugme Pošalji
  pages/
    Lobby.jsx               -> početni ekran sa 5 dugmića (ruta "/")
    Chat.jsx                -> chat ekran (ruta "/chat/:agentId")
  App.jsx                  -> rute
  main.jsx                 -> entry point (BrowserRouter)
  index.css                -> stilovi
```

## Podešavanje agenata

Sve što treba da izmeniš je `src/data/agents.js` — upiši `webhookUrl` za svakog od 5 agenata. Sve ostalo (rutiranje, sesije, UI) već radi.

```js
{
  id: "finance",
  code: "FIN",
  name: "Finance",
  tagline: "Budgets, forecasts, unit economics",
  color: "#4C9A72",
  webhookUrl: "https://tvoj-n8n.com/webhook/finance-advisor",
}
```

## Povezivanje sa n8n

Tvoj n8n workflow počinje sa **"When chat message received"** node-om (Chat Trigger). On radi i za poziv spolja preko svog webhook URL-a, uz par podešavanja:

1. **Aktiviraj workflow.** Toggle "Active" gore desno u n8n editoru mora biti uključen, inače produkcijski webhook ne radi.

2. **Uzmi Production URL.** Klikni na "When chat message received" node → kopiraj **Production URL** (ne Test URL — test URL radi samo dok si u editoru i klikneš "Listen for test event"). Taj URL ide u `webhookUrl` polje.

3. **Podesi CORS.** U istom node-u, sekcija "Options" → **Allowed Origins (CORS)**. Postavi na `*` za testiranje, ili na tačan domen frontenda za produkciju (npr. `https://tvoja-app.com`). Bez ovoga browser blokira pozive.

4. **Format zahteva koji frontend šalje** (ovo je već implementirano u `src/utils/api.js`):
   ```json
   {
     "action": "sendMessage",
     "chatInput": "poruka korisnika",
     "sessionId": "sess_xxxxx"
   }
   ```
   `sessionId` je bitan jer Simple Memory node u tvom workflow-u preko njega pamti kontekst konverzacije. Frontend generiše po jedan `sessionId` po agentu kad prvi put otvoriš taj chat i drži ga dok ne osvežiš stranicu.

5. **Format odgovora.** AI Agent node obično vraća `{ "output": "..." }` — `extractReply()` u `src/utils/api.js` to hvata automatski, kao i `text`/`response` varijante ako menjaš workflow.

6. **Ponovi za svih 5 workflow-a.** Svaki agent (finance, culture, innovation, operations, strategy) treba da bude poseban aktivan workflow sa svojim jedinstvenim webhook putem (npr. `/webhook/finance-advisor`, `/webhook/culture-advisor`...).

Ako n8n instanca zahteva autentifikaciju na webhook-u (header auth / basic auth), dodaj odgovarajuće header-e u `sendToAgent()` funkciji u `src/utils/api.js`.

## Deploy

Nakon `npm run build`, folder `dist/` je statičan sajt koji možeš da postaviš bilo gde (Vercel, Netlify, Cloudflare Pages, ili obični nginx/Apache). Ne treba backend server — sav saobraćaj ide direktno browser → n8n webhook.
