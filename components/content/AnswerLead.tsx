/** The direct answer under the h1: the passage search engines and AI assistants are meant to quote. */
export function AnswerLead({ text }: { text: string }) {
  return (
    <p data-testid="answer" className="m-0 max-w-[62ch] text-[18px] text-soft">
      {text}
    </p>
  );
}
