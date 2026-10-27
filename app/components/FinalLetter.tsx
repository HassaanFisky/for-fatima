import { Reveal, SectionHeading } from "./Reveal";

const LINES = [
  "Fatima,",
  "I don't know what the future holds, and I don't want to pretend that a website can fix everything.",
  "I just wanted to do something different and put genuine effort into expressing what I couldn't always communicate properly.",
  "You matter as a person, regardless of what happens between us.",
  "I hope life brings you peace, happiness, and the things you genuinely want for yourself.",
  "Take your time, live your life, and look after yourself.",
  "No pressure to reply.\nJust something I made with care.",
];

export default function FinalLetter() {
  return (
    <section id="letter" className="mx-auto max-w-2xl px-5 py-20">
      <SectionHeading eyebrow="final chapter" title="A Letter With No Expectations" />
      <article className="rounded-3xl border border-lilac/60 bg-paper px-7 py-10 text-center shadow-lg shadow-plum/10 sm:px-12">
        <div className="space-y-6 font-serif text-lg leading-relaxed text-ink sm:text-xl">
          {LINES.map((l, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className={`whitespace-pre-line ${i === 0 ? "text-left text-plum" : ""} ${i === LINES.length - 1 ? "italic text-ink-soft" : ""}`}>
                {l}
              </p>
            </Reveal>
          ))}
          <Reveal delay={LINES.length * 80}>
            <p className="pt-2 font-hand text-4xl text-plum-deep">— Hassaan 💜</p>
          </Reveal>
        </div>
      </article>
      <p className="mt-10 text-center text-xs text-ink-soft">
        Made with care, and no timers, trackers or tricks. Visit whenever you like, or never. Either is okay.
      </p>
    </section>
  );
}
