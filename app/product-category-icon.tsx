const paths = {
  card: "M3 5h18v14H3z M6 9h4v4H6z M13 9h5 M13 13h5 M6 16h12",
  diary: "M5 3h14v18H5z M8 3v18 M11 8h5 M11 12h5",
  pen: "m4 20 4-1L20 7l-3-3L5 16l-1 4Z M14 7l3 3",
  gift: "M3 8h18v4H3z M5 12v9h14v-9 M12 8v13 M12 8H8a3 3 0 1 1 3-3l1 3Z M12 8h4a3 3 0 1 0-3-3l-1 3Z",
  tech: "M4 3h16v13H4z M2 20h20 M8 16v4 M16 16v4 M8 7h8 M8 11h4",
  bag: "M4 7h16l1 14H3L4 7Z M8 8V6a4 4 0 0 1 8 0v2",
  bottle: "M9 2h6v4l3 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10l3-4V2Z M9 6h6 M6 12h12 M6 18h12",
  shirt: "m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4a4 4 0 0 1-8 0Z",
  hoodie: "M8 6a4 4 0 1 1 8 0l5 4-2 10-3-1v3H8v-3l-3 1-2-10 5-4Z M8 6l4 4 4-4 M10 10v4 M14 10v4 M9 18h6",
  cap: "M3 14a8 8 0 0 1 16 0 M3 14h16l3 4H3v-4Z M11 6v8",
  keychain: "M9 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M13 13l8 8 M17 17l3-3 M19 19l3-3",
  lanyard: "M7 2l5 10 5-10 M7 2h10 M12 12v3 M7 15h10v7H7z M10 18h4",
  trophy: "M7 3h10v6a5 5 0 0 1-10 0V3Z M7 5H3v3a4 4 0 0 0 4 4 M17 5h4v3a4 4 0 0 1-4 4 M12 14v5 M8 21h8 M10 19h4",
  phone: "M8 2h9v15H8z M11 14h3 M11 17l-3 5h12 M8 19H4v3h4",
  notebook: "M6 3h14v18H6z M3 6h5 M3 10h5 M3 14h5 M3 18h5 M11 7h6 M11 11h6 M11 15h4",
  box: "m3 7 9-5 9 5-9 5-9-5Z M3 7v10l9 5 9-5V7 M12 12v10 M7 5l10 5",
  sticker: "M4 3h16v11l-7 7H4V3Z M13 21v-7h7 M8 7h8 M8 11h4",
  umbrella: "M2 12a10 10 0 0 1 20 0H2Z M12 2v17a3 3 0 0 0 6 0 M8 12C8 6 10 2 12 2s4 4 4 10",
} as const;

export type ProductCategoryIconName = keyof typeof paths;

export default function ProductCategoryIcon({ name }: { name: ProductCategoryIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
