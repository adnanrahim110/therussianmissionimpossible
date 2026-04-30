import { Fragment } from "react";

const DEFAULT_ACCENT_WORDS = [
  "mission",
  "missions",
  "operation",
  "operations",
  "tunnel",
  "tunnels",
  "russian",
  "impossible",
  "stream",
  "classified",
  "declassified",
  "registry",
  "witness",
  "witnesses",
  "evidence",
  "dossier",
  "dossiers",
  "archive",
  "archives",
  "personnel",
  "press",
  "support",
  "intel",
  "intelligence",
  "fragment",
  "fragments",
  "covert",
  "secret",
  "redacted",
  "operatives",
  "stream",
  "3.0",
];

export function highlightWords(text, accentWords = DEFAULT_ACCENT_WORDS) {
  if (text == null || typeof text !== "string") return text;

  const lookup = new Set(accentWords.map((word) => word.toLowerCase()));
  const tokens = text.split(/(\s+)/);
  let highlighted = false;

  return tokens.map((token, index) => {
    if (!token.trim()) return <Fragment key={index}>{token}</Fragment>;

    const cleaned = token.toLowerCase().replace(/[^a-z0-9.]+/g, "");
    if (!highlighted && lookup.has(cleaned)) {
      highlighted = true;
      return (
        <span key={index} className="text-accent">
          {token}
        </span>
      );
    }

    return <Fragment key={index}>{token}</Fragment>;
  });
}
