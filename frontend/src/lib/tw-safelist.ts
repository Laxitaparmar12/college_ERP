// Tailwind v4 scans source files for class strings. Dynamic interpolations like
// `bg-[color:var(--${c})]` are invisible to the scanner, so we list every
// concrete variant here to ensure the utilities get generated.
export const _safelist = [
  "bg-[color:var(--ice)]", "bg-[color:var(--lavender)]", "bg-[color:var(--teal)]", "bg-[color:var(--mint)]",
  "bg-[color:var(--ice)]/25", "bg-[color:var(--lavender)]/25", "bg-[color:var(--teal)]/25", "bg-[color:var(--mint)]/25",
  "bg-[color:var(--ice)]/30", "bg-[color:var(--lavender)]/30", "bg-[color:var(--teal)]/30", "bg-[color:var(--mint)]/30",
  "bg-[color:var(--ice)]/40", "bg-[color:var(--lavender)]/40", "bg-[color:var(--teal)]/40", "bg-[color:var(--mint)]/40",
  "bg-[color:var(--ice)]/60", "bg-[color:var(--lavender)]/60", "bg-[color:var(--teal)]/60", "bg-[color:var(--mint)]/60",
  "text-[color:var(--ice)]", "text-[color:var(--lavender)]", "text-[color:var(--teal)]", "text-[color:var(--mint)]",
  "border-[color:var(--ice)]", "border-[color:var(--lavender)]", "border-[color:var(--teal)]", "border-[color:var(--mint)]",
  "from-[color:var(--ice)]/40", "from-[color:var(--lavender)]/40", "from-[color:var(--teal)]/40", "from-[color:var(--mint)]/40",
  "from-[color:var(--ice)]/30", "from-[color:var(--lavender)]/30", "from-[color:var(--teal)]/30", "from-[color:var(--mint)]/30",
];
