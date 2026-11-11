/** The guide's direct answer, highlighted: the passage meant to be quoted. */
export function ShortAnswer({ label, text }: { label: string; text: string }) {
  return (
    <div data-testid="short-answer" className="max-w-[70ch] border-l-2 border-mint bg-mint/5 px-[18px] py-4">
      <p className="eyebrow m-0 mb-2 text-mint">{label}</p>
      <p data-testid="answer" className="m-0 text-[18px] text-paper">
        {text}
      </p>
    </div>
  );
}
