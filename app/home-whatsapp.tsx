"use client";

import { useEffect, useState } from "react";

const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
  "Hello TruePrint, I would like to speak with a print expert about a custom requirement.",
)}`;

export default function HomeWhatsApp() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <aside className="homeWhatsappFloat" aria-label="WhatsApp support">
      {showHint ? (
        <p className="homeWhatsappHint" role="status">
          Looking for something specific? <strong>Talk with an expert.</strong>
        </p>
      ) : null}
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Talk with a TruePrint expert on WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 11.8a8.3 8.3 0 0 1-12.2 7.3L4 20.2l1.2-4.1a8.3 8.3 0 1 1 15.3-4.3Zm-8.3-6.6a6.6 6.6 0 0 0-5.6 10.2l.2.3-.7 2.3 2.4-.6.3.2a6.6 6.6 0 1 0 3.4-12.4Zm-2.8 3.2c.2 0 .3 0 .4.3l.6 1.5c.1.2.1.3 0 .5l-.5.7c-.1.1-.2.3 0 .5.4.8 1.1 1.5 2 2 .2.1.4.1.5-.1l.8-1c.1-.2.3-.2.5-.1l1.6.7c.2.1.4.2.4.4 0 .2-.1 1.1-.7 1.6-.5.5-1.2.7-1.9.5-1.1-.3-2.5-.9-3.7-2-1-1-1.8-2.2-2-3.1-.3-1 0-1.8.4-2.3.4-.4.8-.5 1.1-.5Z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
