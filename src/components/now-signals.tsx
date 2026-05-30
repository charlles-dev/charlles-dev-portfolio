import { IconGlyph } from "@/components/icon-glyph";
import { nowSignals } from "@/lib/portfolio";

const cardClassName =
  "project-shimmer group relative flex min-h-[360px] flex-col overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#07100d]/82 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0b1713] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-7";

function DescriptionText() {
  return (
    <p className="mt-6 max-w-[620px] text-[1.02rem] leading-8 text-white/56">
      Um recorte pequeno e verificável do que está avançando agora, sem transformar o
      portfólio em promessa editorial, lista infinita ou interface encenada.
    </p>
  );
}

export function NowSignals() {
  return (
    <section
      aria-labelledby="now-signals-heading"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="absolute left-0 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-accent/7 blur-[130px]" />
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 border-y border-white/10 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:py-16">
          <div>
            <p className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-accent">
              Agora
            </p>
            <h2
              id="now-signals-heading"
              className="mt-5 max-w-[820px] text-[2.35rem] font-semibold leading-[1] text-white sm:text-[3.45rem] lg:text-[4.35rem]"
            >
              O que está em construção.
            </h2>
          </div>
          <DescriptionText />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {nowSignals.map((signal, index) => {
            const number = String(index + 1).padStart(2, "0");
            const cardContent = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 font-mono text-[5rem] font-bold leading-none text-white/[0.045] transition duration-300 group-hover:text-accent/[0.08]"
                >
                  {number}
                </span>
                <span className="absolute inset-x-6 top-24 h-px bg-gradient-to-r from-transparent via-accent/24 to-transparent" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition duration-300 group-hover:scale-105 group-hover:border-accent/35">
                      <IconGlyph name={signal.icon} className="size-6" />
                    </span>
                    {signal.href ? (
                      <IconGlyph
                        name="external-link"
                        className="mt-1 size-5 text-white/30 transition duration-300 group-hover:text-accent"
                      />
                    ) : null}
                  </div>

                  <p className="mt-9 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-accent">
                    {signal.label}
                  </p>
                  <h3 className="mt-4 text-[1.65rem] font-semibold leading-tight text-white">
                    {signal.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-white/54">
                    {signal.description}
                  </p>

                  <div className="relative z-10 mt-auto pt-8">
                    <div className="mb-4 h-px w-full bg-white/10" />
                    <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                      {signal.proof}
                    </p>
                  </div>
                </div>
              </>
            );

            return signal.href ? (
              <a
                className={cardClassName}
                href={signal.href}
                key={signal.title}
                target="_blank"
                rel="noreferrer"
              >
                {cardContent}
              </a>
            ) : (
              <article className={cardClassName} key={signal.title}>
                {cardContent}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
