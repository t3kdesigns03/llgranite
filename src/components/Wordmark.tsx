/** "L&L Granite" set in the display serif with a brass italic ampersand. Pure text, so it stays crisp. */
export default function Wordmark({ className = "", small }: { className?: string; small?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 leading-none ${className}`}>
      <span className={`font-serif font-semibold tracking-[-0.02em] ${small ? "text-[1.55rem]" : "text-[1.85rem]"}`}>
        L<span className="mx-[0.04em] font-medium italic text-brass">&amp;</span>L
      </span>
      <span className={`kicker tracking-[0.32em] ${small ? "text-[0.6rem]" : "text-[0.66rem]"}`}>Granite</span>
    </span>
  );
}
