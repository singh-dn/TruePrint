# TruePrint chat launcher

This folder contains only the website UI integration. The assistant application, API, private uploads, lead database, model configuration, and admin remain deployed separately at https://trueprint-assistant.harshwardensingh.chatgpt.site. Admin: /chatbot-admin on that host.

The iframe is prepared during idle time after website assets finish loading, retained when closed, and isolated from website CSS. Close messages require the exact assistant origin and iframe source. No API keys, shared database connection, or model code are included in this project. The existing WhatsApp shortcut is displayed as a matching circular button to the left of the launcher while it is mounted. Main admin pages do not mount the launcher.

The assistant allows public customer chat. The registered admin owner remains protected by ChatGPT sign-in and server-side authorization; first-owner bootstrap is disabled. A same-site custom assistant domain must still be configured and tested before embedding on thetrueprint.com to avoid third-party cookie restrictions. Customer chat stays in the bottom-right widget. Standalone chat routes return visitors to this website; the assistant admin stays separate. No authentication bypass token is used or exposed.

The panel animates with opacity and a short scale/slide transition. Closed panels are inert and hidden from assistive technology, with pointer interaction disabled. The iframe stays mounted to preserve the conversation. Reduced-motion preferences disable the transitions.

Startup now preconnects to the assistant host and warms the iframe on hover, focus or touch intent. The website renders an immediate local chat shell, retains a typed draft in memory, and hands it to the assistant only after an origin- and source-checked ready event. It never sends the draft automatically. An 8-second delay shows explicit retry options instead of an indefinite empty panel. Customer chat does not require sign-in. Admin sign-in and authorization remain enforced.

Background startup waits for the website load event and an idle callback, with a timeout fallback. Hover, focus, touch or opening can still prepare it earlier. The spinner remains truthful during the first connection; ready chat stays mounted between opens.
