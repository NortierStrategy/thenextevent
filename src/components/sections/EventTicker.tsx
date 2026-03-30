"use client";

const items = [
  "FASHION WEEK PARIS",
  "ÉVÉNEMENT PRESSE DIOR",
  "LANCEMENT PORSCHE",
  "GALA VEUVE CLICQUOT",
  "SOMMET GOOGLE",
  "DINER GIVENCHY HAUTE COUTURE",
  "CONFÉRENCE LINKEDIN",
  "SOMMETS WORLD ECONOMIC FORUM",
];

const tripled = [...items, ...items, ...items];

export default function EventTicker() {
  return (
    <div className="bg-dark border-y border-red/[0.06] py-3 overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap ticker-events"
      >
        {tripled.map((item, i) => (
          <span key={`${item}-${i}`} className="shrink-0 mx-4">
            <span className="font-outfit text-[11px] uppercase tracking-[4px] font-medium text-gold">
              {item}
            </span>
            <span className="font-outfit text-[11px] uppercase tracking-[4px] font-medium text-gold/50 mx-4">
              —
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
