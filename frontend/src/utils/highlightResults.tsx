export function highlightResults(text: string, highlight?: string) {
  if (!highlight) return text;
  if (!text) return "";
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    ),
  );
}
