import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import { submitContact } from "@/lib/contact.functions";

import stoneTexture from "@/assets/stone-raw.jpg";
import logoMark from "@/assets/logo-mark.png";
import heroWijuro from "@/assets/hero-wijuro.webp";

const title = "WIJURO Group | Marketing, Business & Investments";
const description =
  "WIJURO Group propojuje marketing, business development, strategické projekty a investiční příležitosti s cílem vytvářet dlouhodobou hodnotu.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["O nás", "#o-nas"],
  ["Co děláme", "#sluzby"],
  ["Hodnoty", "#hodnoty"],
  ["Kontakt", "#kontakt"],
];


const founders = [
  { name: "David W. Juras", role: "Co-Founder", initials: "D", text: "Dívám se na svět s otevřenou myslí cestovatele, tvořím s citem umělce, bojuji s vytrvalostí sportovce a nechávám věci zrát s trpělivostí vinaře." },
  { name: "Julie W. Juras", role: "Co-Founder", initials: "J", text: "Kreativita je mou přirozenou součástí, cit pro detail a strategické myšlení mou silnou stránkou. Ráda propojuji nápady se souvislostmi a hledám cestu, která dává smysl." },
];

const valuesTop = ["Vize", "Integrita", "Růst"];
const valuesBottom = ["Férovost", "Dlouhodobost"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="wijuro-ref-header absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[132px] max-w-[1600px] items-start px-5 pt-6 md:h-[140px] md:px-10 md:pt-7 lg:px-14 lg:pt-8 xl:px-16">
          <a href="#top" aria-label="WIJURO Group — úvod" className="intro-logo flex shrink-0 items-start">
            <img src={logoMark} alt="WIJURO Group" className="ref-header-logo w-auto" width="406" height="567" />
          </a>

          <nav className="intro-up ml-auto hidden items-center gap-8 pt-6 lg:flex xl:gap-11" style={{ "--d": "0.45s" } as React.CSSProperties} aria-label="Hlavní navigace">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="ref-nav-link">{label}</a>
            ))}
            <span className="ml-3 h-px w-16 bg-foreground/25 xl:w-20" aria-hidden="true" />
            <span className="ref-nav-link pointer-events-none opacity-70">CZ</span>
          </nav>

          <button type="button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" className="relative z-10 ml-auto mt-3 inline-flex h-11 w-11 shrink-0 items-center justify-center lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav id="mobile-menu" className={`mobile-menu fixed inset-x-0 bottom-0 top-20 flex flex-col overflow-y-auto border-t border-foreground/10 bg-[#f3eee6] px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 md:top-24 md:px-10 lg:hidden ${menuOpen ? "is-open" : "invisible pointer-events-none"}`} aria-label="Mobilní navigace" aria-hidden={!menuOpen}>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mobile-menu-link border-b border-foreground/12 py-4 text-2xl font-light sm:text-3xl">{label}</a>
          ))}
          <a href="#kontakt" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="ref-hero-button mt-auto inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3 text-center">
            Pojďme se spojit <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO — customer reference using final WIJURO background */}
        <section className="ref-hero relative min-h-[100svh] overflow-hidden">
          <div className="ref-hero-media" aria-hidden="true">
            <img
              src={heroWijuro}
              alt=""
              className="ref-hero-background"
              width="1620"
              height="971"
              fetchPriority="high"
            />
          </div>
          <div className="ref-hero-wash" aria-hidden="true" />

          <div className="relative z-10 mx-auto min-h-[100svh] max-w-[1600px] px-5 md:px-10 lg:px-14 xl:px-16">
            <div className="ref-hero-copy flex min-h-[100svh] w-full max-w-[590px] flex-col pt-[190px] md:pt-[205px] lg:pt-[215px] xl:pt-[225px]">
              <h1 className="ref-hero-title">
                <span className="intro-line"><span style={{ "--d": "0.75s" } as React.CSSProperties}>Tvoříme to,</span></span>
                <span className="intro-line"><span style={{ "--d": "0.95s" } as React.CSSProperties}>co</span></span>
                <span className="intro-line"><span style={{ "--d": "1.15s" } as React.CSSProperties}>přichází.</span></span>
              </h1>

              <p className="intro-up mt-9 max-w-[390px] font-display text-[1.03rem] leading-[1.48] text-foreground/88 md:text-[1.12rem]" style={{ "--d": "1.4s" } as React.CSSProperties}>
                WIJURO Group propojuje kreativitu, strategii a investiční myšlení.
              </p>

              <div className="intro-up mt-9" style={{ "--d": "1.65s" } as React.CSSProperties}>
                <a className="ref-hero-button group" href="#o-nas">
                  <span>Poznat WIJURO</span>
                  <ArrowRight size={16} strokeWidth={1.3} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                </a>
              </div>

              <div className="intro-up mt-auto hidden items-center gap-4 pb-9 text-[0.62rem] font-semibold tracking-[0.18em] text-foreground/58 lg:flex" style={{ "--d": "1.9s" } as React.CSSProperties} aria-hidden="true">
                <span>01</span>
                <span className="h-px w-24 bg-foreground/30" />
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="section-shell relative z-10 border-t border-border bg-background" data-reveal="none">
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">O nás</p>
            <div className="lg:col-span-9">
              <h2 className="display-heading">WIJURO Group</h2>
              <div className="mt-12 max-w-2xl space-y-6 leading-8 text-muted-foreground">
                <p>
                  Naším úkolem ve WIJURO Group je vzít váš podnikatelský záměr, vizi nebo majetek, připravit z nich srozumitelný obchodní projekt a úspěšně jej uplatnit na trhu. Jsme obchodní skupina, která pomáhá podnikům se zajištěním kapitálu, prodejem a nákupem. Nejsme finanční makléři ani regulovaná instituce – zaměřujeme se na reálné propojení vašeho byznysu s tržními příležitostmi.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* O NÁS */}
        <section id="o-nas" className="scroll-mt-24 bg-stone/45" data-reveal="scale">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-12">
              <p className="eyebrow lg:col-span-3">O nás</p>
              <div className="lg:col-span-9">
                <h2 className="display-heading">Dva lidé, jedna společná vize.</h2>
                <div className="mt-12 max-w-2xl space-y-6 leading-8 text-muted-foreground">
                  <p>WIJURO vzniklo z naší společné vize budovat něco vlastního. Jako manželský pár jsme se rozhodli spojit své zkušenosti, energii a společné hodnoty a vytvořit skupinu, která bude od začátku stát na pevných základech. Důvěra, individualita, svoboda rozhodování a osobní odpovědnost jsou pro nás hodnoty, na kterých chceme WIJURO stavět. Věříme, že každý člověk má svou vlastní cestu, nápady a potenciál – a právě prostor pro vlastní iniciativu považujeme za důležitou součást podnikání.</p>
                  <p>Je to pro nás rodinná firma v pravém slova smyslu. Chceme ji budovat dlouhodobě, společně a způsobem, který bude odrážet to, kým jsme a čemu věříme. Naším cílem je vytvářet vlastní projekty, rozvíjet zajímavé příležitosti a investovat do toho, co podle nás má skutečný potenciál.</p>
                </div>
              </div>
            </div>

            <div className="mt-24 grid gap-20 md:grid-cols-2 md:gap-12 lg:gap-28" data-reveal="none">
              {founders.map((f, k) => (
                <article key={f.name} className="text-center">
                  <div className="reveal-item img-hover mx-auto aspect-square w-52 rounded-full border border-foreground/15 bg-stone md:w-64" style={{ "--i": k } as React.CSSProperties}>
                    <div className="img-inner flex h-full w-full items-center justify-center">
                      <span className="font-display text-5xl font-light tracking-[0.12em] text-stone-foreground/25">{f.initials}</span>
                    </div>
                  </div>
                  <h3 className="reveal-item mt-10 text-2xl font-medium tracking-tight md:text-3xl" style={{ "--i": k + 2 } as React.CSSProperties}>{f.name}</h3>
                  <p className="reveal-item mt-3 eyebrow" style={{ "--i": k + 3 } as React.CSSProperties}>{f.role}</p>
                  <p className="reveal-item mx-auto mt-6 max-w-md leading-7 text-muted-foreground" style={{ "--i": k + 4 } as React.CSSProperties}>{f.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-28 border-t border-foreground/15 pt-14 text-center md:pt-20">
              <h3 className="text-3xl font-light tracking-tight md:text-4xl">Dvě perspektivy. Jeden směr.</h3>
              <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-[1.9] text-muted-foreground">Právě rozdílné pohledy považujeme za jednu z našich největších výhod. Kreativita a strategie. Marketing a obchod. Nápad a jeho realizace.</p>
              <p className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-[1.9] text-muted-foreground">WIJURO vzniklo z touhy tyto světy propojit a postupně kolem nich vybudovat něco vlastního.</p>
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <section id="sluzby" className="section-shell scroll-mt-24" data-reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">Co děláme</p>
          </div>

          {/* DIVIZE 01 */}
          <div className="border-t border-border pt-14 md:pt-20">
            <p className="eyebrow">Divize 01</p>
            <p className="mt-6 text-sm uppercase leading-6 tracking-[0.18em] text-muted-foreground md:text-base">{"\n"}</p>
            <h3 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">Korporátní fundraising &amp; expanze</h3>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              Zvyšujeme tržní hodnotu firem. Propojujeme strategický marketing s akvizicí rozvojového kapitálu.
            </p>

            <div className="mt-16 grid gap-6 border-t border-border pt-10 md:mt-24 md:grid-cols-12 md:gap-8 md:pt-14">
              <h4 className="eyebrow md:col-span-4">Jak to funguje?</h4>
              <p className="text-lg leading-8 text-muted-foreground md:col-span-8">
                Prostřednictvím cílených marketingových kampaní oslovujeme relevantní investorské skupiny a zajišťujeme externí financování pro malé a střední podniky. Alokovaný kapitál následně efektivně transformujeme do realizace projektů a tržní expanze.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4 md:mt-24 md:gap-10">
              {[
                ["1", "Strategie", "Propojení strategického marketingu s kapitálovou strategií společnosti."],
                ["2", "Kapitál", "Vyhledání a oslovení relevantních investorských skupin a zajištění externího financování."],
                ["3", "Expanze", "Transformace získaného kapitálu do realizace projektů, rozvoje společnosti a tržní expanze."],
              ].map(([no, name, text]) => (
                <div key={no}>
                  <span className="text-xs text-muted-foreground md:text-sm">{no}</span>
                  <h4 className="mt-3 text-base font-light tracking-tight md:mt-6 md:text-2xl">{name}</h4>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground md:mt-4 md:text-sm md:leading-6">{text}</p>
                </div>
              ))}
            </div>

          </div>

          {/* DIVIZE 02 */}
          <div className="mt-28 border-t border-border pt-14 md:mt-40 md:pt-20">
            <p className="eyebrow">Divize 02</p>
            <p className="mt-6 text-sm uppercase leading-6 tracking-[0.18em] text-muted-foreground md:text-base">{"\n"}</p>
            <h3 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">Fůze &amp; akvizice</h3>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              Zajišťujeme kompletní proces při realizaci prodeje firem. Zastupujeme majitele, kteří plánují kapitálový exit, a aktivně vyhledáváme strategické kupující.
            </p>

            <div className="mt-16 grid gap-6 border-t border-border pt-10 md:mt-24 md:grid-cols-12 md:gap-8 md:pt-14">
              <h4 className="eyebrow md:col-span-4">Jak to funguje?</h4>
              <p className="text-lg leading-8 text-muted-foreground md:col-span-8">
                Spolupracujeme s vlastníky podniků v jakékoliv fázi jejich cyklu. Pomáháme úspěšným a profitabilním firmám, kde majitelé chtějí bezpečně prodat svůj byznys a zhodnotit tržní hodnotu dlouholeté práce.
              </p>
            </div>

            <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-16">
              {[
                ["01", "Kapitálový exit", "Úspěšná a profitabilní společnost, jejíž majitel chce bezpečně prodat svůj byznys a zhodnotit tržní hodnotu dlouholeté práce."],
                ["02", "Kapitálová tíseň", "Podnik, který se ocitl v kapitálové tísni a potřebuje strategického investora pro zachování kontinuity provozu, hodnoty značky a dalšího fungování společnosti."],
              ].map(([no, name, text]) => (
                <div key={no}>
                  <span className="text-sm text-muted-foreground">{no}</span>
                  <h4 className="mt-6 font-display text-3xl font-light tracking-tight md:text-4xl">{name}</h4>
                  <p className="mt-5 max-w-md leading-7 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            {/* M&A PROCES */}
            <div className="mt-20 border-t border-border pt-10 md:mt-28 md:pt-14">
              <h4 className="eyebrow">M&amp;A proces</h4>
              <ol className="mt-10 grid grid-cols-5 gap-1.5 md:gap-0">
                {[
                  ["01", "Analýza"],
                  ["02", "Strategie"],
                  ["03", "Vyhledání investora"],
                  ["04", "Vyjednávání"],
                  ["05", "Transakce"],
                ].map(([no, name]) => (
                  <li key={no} className="border-r border-border pr-1.5 last:border-r-0 last:pr-0 md:px-6 md:first:pl-0 md:last:pr-0">
                    <span className="text-xs text-muted-foreground md:text-sm">{no}</span>
                    <p className="mt-3 break-words text-[0.63rem] font-light leading-[1.6] tracking-tight md:mt-4 md:text-sm md:leading-6">{name}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </section>

        {/* HODNOTY */}
        <section id="hodnoty" className="scroll-mt-24 bg-stone/45" data-reveal="clip">
          <div className="section-shell !py-12 md:!py-16 lg:!py-20">
            <h2 className="mb-7 font-display text-3xl font-light tracking-tight md:mb-9 md:text-4xl">Na čem nám záleží</h2>
            <div
              className="mx-auto flex flex-col items-center py-2"
              style={{ ["--ring" as string]: "clamp(5.6rem, 21vw, 11.5rem)" }}
            >
              <div className="flex">
                {valuesTop.map((name, i) => (
                  <div key={name} className="value-ring" style={i > 0 ? { marginLeft: "calc(var(--ring) * -0.2)" } : undefined}>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex" style={{ marginTop: "calc(var(--ring) * -0.44)" }}>
                {valuesBottom.map((name, i) => (
                  <div key={name} className="value-ring" style={i > 0 ? { marginLeft: "calc(var(--ring) * -0.2)" } : undefined}>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KONTAKT */}
        <section id="kontakt" className="scroll-mt-24 bg-stone text-stone-foreground" data-reveal>
          <div className="section-shell grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-stone-foreground/70">Kontakt</p>
              <h2 className="display-heading mt-6">Máte nápad, který stojí za to rozvíjet?</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 opacity-80">Řekněte nám, na čem pracujete. Zajímají nás zajímaví lidé, nápady a příležitosti.</p>
              <button type="button" onClick={() => setFormOpen((v) => !v)} className="button-primary mt-10">Pojďme se spojit <ArrowUpRight size={14} /></button>
              <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.19,.8,.18,1)]" style={{ gridTemplateRows: formOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  {sent ? (
                    <p className="mt-6 max-w-[360px] text-sm opacity-80">Děkujeme, ozveme se vám.</p>
                  ) : (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        setSending(true);
                        setError(null);
                        try {
                          await submitContact({
                            data: {
                              name: String(fd.get("name") ?? ""),
                              email: String(fd.get("email") ?? ""),
                              phone: String(fd.get("phone") ?? ""),
                            },
                          });
                          setSent(true);
                        } catch {
                          setError("Odeslání se nepodařilo, zkuste to prosím znovu.");
                        } finally {
                          setSending(false);
                        }
                      }}
                      className="mt-6 max-w-[360px] space-y-3"
                    >
                      {[["name", "Jméno a příjmení", "text"], ["email", "E-mail", "email"], ["phone", "Telefonní číslo", "tel"]].map(([n, label, type]) => (
                        <input
                          key={n}
                          required
                          name={n}
                          type={type}
                          placeholder={label}
                          className="w-full border-b border-stone-foreground/25 bg-transparent py-2 text-sm placeholder:text-stone-foreground/45 focus:border-stone-foreground/70 focus:outline-none"
                        />
                      ))}
                      {error ? <p className="text-xs opacity-80">{error}</p> : null}
                      <button type="submit" disabled={sending} className="button-primary !mt-5 !px-5 !py-2 text-xs disabled:opacity-60">{sending ? "Odesílám…" : "Odeslat"} </button>
                    </form>
                  )}

                </div>
              </div>
            </div>
            <ul className="self-end lg:col-span-5">
              {[[Mail, "E-mail", "info@wijurogroup.com", "mailto:info@wijurogroup.com"], [Phone, "Telefon", "+420 771 190 429", "tel:+420771190429"]].map(([Icon, label, value, href]) => {
                const I = Icon as typeof Mail;
                return (
                  <li key={label as string} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-stone-foreground/20 py-6 first:border-t">
                    <span className="flex items-center gap-4"><I size={18} strokeWidth={1.4} />{label as string}</span>
                    <a href={href as string} className="text-sm opacity-60 transition-opacity hover:opacity-100">{value as string}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="nav-stone bg-stone text-stone-foreground" style={{ "--nav-stone-image": `url(${stoneTexture})` } as React.CSSProperties}>
        <div className="mx-auto max-w-[1480px] px-5 pb-5 pt-5 md:px-10 lg:px-16">
          <p className="text-sm text-stone-foreground/55">© 2026 WIJURO Group. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
