import { Reveal, SectionHeading } from "./Reveal";

const PARAS: { text: string; strong?: boolean }[] = [
  { text: "Fatima, I know there were moments when I didn't handle things the way I should have." },
  {
    text: "I sometimes let my emotions take over instead of listening properly. I pushed conversations when I should have given you space, and there were times I didn't respect your boundaries the way I needed to.",
  },
  { text: "I'm sorry for that.", strong: true },
  { text: "You deserved to have your words heard without having to repeat yourself." },
  {
    text: "I can't ask you to trust me just because I say the right things. Trust takes time, consistency, and actions.",
  },
  { text: "I'm working on understanding that better." },
  {
    text: "You don't owe me forgiveness, a reply, or another chance. I simply wanted to acknowledge my part honestly.",
  },
];

export default function Apology() {
  return (
    <section id="apology" className="bg-lavender/50 px-5 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="chapter two"
          title="The Apology I Should Have Expressed Better"
        />
        <article
          className="relative rotate-[-0.4deg] rounded-sm border border-lilac/50 bg-paper px-6 py-10 shadow-xl shadow-plum/10 sm:px-12"
          style={{ boxShadow: "0 1px 0 #fff inset, 0 24px 50px -24px rgba(59,35,80,.35)" }}
        >
          <span aria-hidden className="absolute left-5 top-0 h-full w-px bg-dusty/40 sm:left-9" />
          <div className="letter-lines space-y-[2.1rem] pl-3 font-hand text-[1.55rem] leading-[2.1rem] text-plum-deep sm:pl-4 sm:text-[1.7rem]">
            {PARAS.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className={p.strong ? "text-plum" : ""}>
                  {p.strong ? <strong className="font-bold">{p.text}</strong> : p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
