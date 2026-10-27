import { Reveal, SectionHeading } from "./Reveal";
import { personal } from "../config/personal";

function EmptyIllustration() {
  return (
    <Reveal>
      <div className="mx-auto max-w-md rounded-3xl border border-dashed border-lilac bg-paper/70 p-8 text-center">
        <svg viewBox="0 0 200 130" width="200" className="mx-auto" aria-hidden>
          <rect x="30" y="22" width="140" height="92" rx="6" fill="#fffdf8" stroke="#cdb9e8" strokeWidth="2" />
          <path d="M30 22 100 78 170 22" fill="none" stroke="#e1d2f1" strokeWidth="2" />
          <g fill="#d9a7b8">
            <path d="m100 8 2.4 5 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" transform="translate(0 -2)" />
          </g>
          <circle cx="52" cy="40" r="1.6" fill="#cdb9e8" />
          <circle cx="150" cy="96" r="1.6" fill="#cdb9e8" />
          <circle cx="62" cy="100" r="1.2" fill="#cdb9e8" />
        </svg>
        <p className="mt-4 font-serif text-lg text-plum-deep">Some pages are left blank on purpose.</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Only real moments belong here, and they should never be forced or borrowed. This space
          stays quiet and open instead.
        </p>
      </div>
    </Reveal>
  );
}

export default function Memories() {
  const { memories, notes } = personal;
  const empty = memories.length === 0 && notes.length === 0;

  return (
    <section id="memories" className="mx-auto max-w-5xl px-5 py-20">
      <SectionHeading
        eyebrow="chapter five"
        title="The Personal Touch"
        sub="A small place for things that are genuinely real."
      />
      {empty ? (
        <EmptyIllustration />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {memories.map((m, i) => (
            <Reveal key={`m${i}`} delay={(i % 2) * 100}>
              <article className="overflow-hidden rounded-3xl border border-lilac/60 bg-paper shadow-sm">
                {m.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt={m.photoAlt ?? m.title} loading="lazy" className="h-64 w-full object-cover" />
                )}
                <div className="p-6">
                  {m.date && <p className="text-xs text-ink-soft">{m.date}</p>}
                  <h3 className="font-serif text-xl text-plum-deep">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
          {notes.map((n, i) => (
            <Reveal key={`n${i}`}>
              <p className="rotate-[-1deg] rounded-sm bg-[#fff8e6] p-6 font-hand text-2xl leading-8 text-plum-deep shadow-md">
                {n}
              </p>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
