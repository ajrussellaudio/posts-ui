// https://fzf.netlify.app/docs/latest#usage-highlighting-matched-characters

type HighlightedTitleProps = {
  indices: Set<number>;
  children: string;
};

export function HighlightedTitle({ indices, children }: HighlightedTitleProps) {
  const chars = children.normalize().split("");

  const nodes = chars.map((char, i) => {
    if (indices.has(i)) {
      return (
        <b key={i} className="bg-yellow-200 dark:bg-yellow-900">
          {char}
        </b>
      );
    }
    return char;
  });

  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden>{nodes}</span>
    </>
  );
}
