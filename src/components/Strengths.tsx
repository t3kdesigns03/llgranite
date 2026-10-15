import { PlusIcon } from "./icons";

type Item = { title: string; text: string };

/**
 * The six "why L&L" promises. Phones get a compact tap-to-expand list (native <details>, no JS) so the
 * section is a few lines tall instead of a screen and a half; wider screens show everything in a grid.
 */
export default function Strengths({ items, dark, numbered, cols = 2 }: { items: Item[]; dark?: boolean; numbered?: boolean; cols?: 2 | 3 }) {
  const line = dark ? "border-linen/10" : "border-stone-200";
  return (
    <>
      <div className={`border-b ${line} sm:hidden`} data-reveal>
        {items.map((s, i) => (
          <details key={s.title} className={`group border-t ${line}`}>
            <summary className="flex min-h-14 items-center justify-between gap-4 py-3">
              <span className="flex items-baseline gap-3">
                {numbered && <span className="kicker text-[0.6rem] text-brass">{`0${i + 1}`}</span>}
                <span className={`font-serif text-[1.4rem] font-semibold leading-tight ${dark ? "text-linen" : "text-ink"}`}>{s.title}</span>
              </span>
              <span
                className={`chev grid h-9 w-9 shrink-0 place-items-center rounded-full border ${
                  dark ? "border-linen/20 text-linen group-open:border-brass group-open:bg-brass group-open:text-onyx-950" : "border-stone-300 text-ink group-open:border-brass group-open:bg-brass"
                }`}
              >
                <PlusIcon className="h-4 w-4" />
              </span>
            </summary>
            <p className={`pb-5 pr-10 leading-relaxed ${dark ? "text-stone-300" : "text-stone-600"}`}>{s.text}</p>
          </details>
        ))}
      </div>

      <ul className={`grid gap-x-10 max-sm:hidden sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
        {items.map((s, i) => (
          <li key={s.title} className={`border-t ${line} py-7`} data-reveal style={{ ["--d" as string]: i % cols }}>
            {numbered && <p className="kicker mb-3 text-[0.62rem] text-brass">{`0${i + 1}`}</p>}
            <h3 className={`font-serif text-[1.65rem] font-semibold leading-tight ${dark ? "text-linen" : "text-ink"}`}>{s.title}</h3>
            <p className={`mt-3 leading-relaxed ${dark ? "text-stone-300" : "text-[0.98rem] text-stone-600"}`}>{s.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
