import { ExternalLink } from "lucide-react";

const SourceCard = ({ source }) => (
  <a
    href={source.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 12,
      color: "var(--accent)",
      borderBottom: "1px solid rgba(37,99,235,.25)",
    }}
    title={source.url}
  >
    <ExternalLink size={10} />
    {source.title || source.url}
  </a>
);

export default SourceCard;