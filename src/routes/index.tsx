import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import { submitContact } from "@/lib/contact.functions";

import stoneTexture from "@/assets/stone-raw.jpg";
import logoMark from "@/assets/logo-mark.png";
import heroWijuro from "@/assets/hero-wijuro.webp";
import heroStone from "@/assets/hero-stone.jpg";

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

const values = ["Vize", "Integrita", "Růst", "Férovost", "Dlouhodobost"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [activeDivision, setActiveDivision] = useState<1 | 2 | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const onScroll = () => setHeaderCompact(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header className={`wijuro-ref-header fixed inset-x-0 top-0 z-50 ${headerCompact ? "is-compact" : ""}`}>
        <div className="wijuro-header-inner mx-auto flex h-[132px] max-w-[1600px] items-start px-5 pt-6 md:h-[140px] md:px-10 md:pt-7 lg:px-14 lg:pt-8 xl:px-16">
          <a href="#top" aria-label="WIJURO Group — úvod" className="intro-logo flex shrink-0 items-start">
            <img src={logoMark} alt="WIJURO Group" className="ref-header-logo w-auto" width="406" height="567" />
          </a>

          <nav className="wijuro-desktop-nav intro-up ml-auto hidden items-center gap-8 pt-6 lg:flex xl:gap-11" style={{ "--d": "0.45s" } as React.CSSProperties} aria-label="Hlavní navigace">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="ref-nav-link">{label}</a>
            ))}
            <span className="header-divider ml-3 h-px w-16 bg-foreground/25 xl:w-20" aria-hidden="true" />
            <span className="ref-nav-link ref-lang pointer-events-none opacity-70">CZ</span>
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
              <div className="ref-hero-content">
                <h1 className="ref-hero-title">
                  <span className="intro-line"><span style={{ "--d": "0.75s" } as React.CSSProperties}>Tvoříme</span></span>
                  <span className="intro-line"><span style={{ "--d": "0.95s" } as React.CSSProperties}>lepší</span></span>
                  <span className="intro-line"><span style={{ "--d": "1.15s" } as React.CSSProperties}>zítřky.</span></span>
                </h1>

                <p className="intro-up mt-7 max-w-[390px] font-display text-[1.03rem] leading-[1.48] text-foreground/88 md:text-[1.12rem]" style={{ "--d": "1.4s" } as React.CSSProperties}>
                  WIJURO Group propojuje kreativitu, strategii a investiční myšlení.
                </p>

                <div className="ref-hero-cta intro-up" style={{ "--d": "1.65s" } as React.CSSProperties}>
                  <a className="ref-hero-button group" href="#o-nas">
                    <span>Poznat WIJURO</span>
                    <ArrowRight size={16} strokeWidth={1.3} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O NÁS */}
        <section id="o-nas" className="editorial-about-story-section scroll-mt-24" data-reveal>
          <div className="editorial-shell">
            <div className="editorial-story-grid">
              <div className="editorial-story-heading">
                <p className="editorial-eyebrow">O nás</p>
                <h2>WIJURO Group</h2>
                <p className="editorial-story-kicker">Dva lidé, jedna společná vize.</p>
              </div>

              <figure className="editorial-story-visual">
                <img src={heroStone} alt="" className="editorial-about-image" width="409" height="544" loading="lazy" />
                <div className="editorial-about-mark" aria-hidden="true">
                  <img src={logoMark} alt="" />
                </div>
              </figure>

              <div className="editorial-story-copy">
                <p className="editorial-story-lead">
                  Naším úkolem ve WIJURO Group je vzít váš podnikatelský záměr, vizi nebo majetek, připravit z nich srozumitelný obchodní projekt a úspěšně jej uplatnit na trhu. Jsme obchodní skupina, která pomáhá podnikům se zajištěním kapitálu, prodejem a nákupem. Nejsme finanční makléři ani regulovaná instituce – zaměřujeme se na reálné propojení vašeho byznysu s tržními příležitostmi.
                </p>

                <button
                  type="button"
                  className={`editorial-story-toggle ${aboutOpen ? "is-open" : ""}`}
                  aria-expanded={aboutOpen}
                  aria-controls="about-details"
                  onClick={() => setAboutOpen((open) => !open)}
                >
                  <span>{aboutOpen ? "Skrýt detail" : "Zjistit více"}</span>
                  <ArrowRight size={16} strokeWidth={1.3} />
                </button>
              </div>
            </div>

            <div
              id="about-details"
              className={`editorial-story-details-shell ${aboutOpen ? "is-open" : ""}`}
              aria-hidden={!aboutOpen}
            >
              <div className="editorial-story-details-inner">
                <div className="editorial-story-columns">
                  <p>WIJURO vzniklo z naší společné vize budovat něco vlastního. Jako manželský pár jsme se rozhodli spojit své zkušenosti, energii a společné hodnoty a vytvořit skupinu, která bude od začátku stát na pevných základech. Důvěra, individualita, svoboda rozhodování a osobní odpovědnost jsou pro nás hodnoty, na kterých chceme WIJURO stavět. Věříme, že každý člověk má svou vlastní cestu, nápady a potenciál – a právě prostor pro vlastní iniciativu považujeme za důležitou součást podnikání.</p>
                  <p>Je to pro nás rodinná firma v pravém slova smyslu. Chceme ji budovat dlouhodobě, společně a způsobem, který bude odrážet to, kým jsme a čemu věříme. Naším cílem je vytvářet vlastní projekty, rozvíjet zajímavé příležitosti a investovat do toho, co podle nás má skutečný potenciál.</p>
                </div>

                <div className="editorial-story-manifesto">
                  <p className="editorial-eyebrow">WIJURO</p>
                  <h3>Dvě perspektivy. Jeden směr.</h3>
                  <div>
                    <p>Právě rozdílné pohledy považujeme za jednu z našich největších výhod. Kreativita a strategie. Marketing a obchod. Nápad a jeho realizace.</p>
                    <p>WIJURO vzniklo z touhy tyto světy propojit a postupně kolem nich vybudovat něco vlastního.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ZAKLADATELÉ */}
        <section className="editorial-founders-section" data-reveal>
          <div className="editorial-shell">
            <div className="editorial-founders-heading">
              <p className="editorial-eyebrow">Zakladatelé</p>
              <h2>Lidé za WIJURO.</h2>
            </div>

            <div className="editorial-founders-grid">
              {founders.map((f, k) => (
                <article key={f.name} className="editorial-founder-profile reveal-item" style={{ "--i": k } as React.CSSProperties}>
                  <div
                    className="editorial-founder-profile-mark"
                    style={{ backgroundImage: `linear-gradient(145deg, rgba(247,242,235,.82), rgba(203,190,174,.76)), url(${stoneTexture})` }}
                    aria-hidden="true"
                  >
                    <span>{f.initials}</span>
                  </div>

                  <div className="editorial-founder-profile-copy">
                    <div>
                      <p className="editorial-founder-role">{f.role}</p>
                      <h3>{f.name}</h3>
                    </div>
                    <p>{f.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <section id="sluzby" className="editorial-services scroll-mt-24">
          <div className="editorial-shell">
            <div className="editorial-heading-grid editorial-services-heading">
              <span aria-hidden="true" />
              <h2 className="editorial-display-title">Co děláme</h2>
            </div>

            <div className={`editorial-division-switcher ${activeDivision ? "has-selection" : ""}`}>
              <button
                type="button"
                aria-expanded={activeDivision === 1}
                onClick={() => setActiveDivision((current) => current === 1 ? null : 1)}
                className={`editorial-division-card ${activeDivision === 1 ? "is-active" : activeDivision === 2 ? "is-dimmed" : ""}`}
              >
                <span className="editorial-division-card-no">01</span>
                <div>
                  <p className="editorial-eyebrow">Divize 01</p>
                  <h3>Korporátní fundraising &amp; expanze</h3>
                  <p>Zvyšujeme tržní hodnotu firem. Propojujeme strategický marketing s akvizicí rozvojového kapitálu.</p>
                </div>
                <ArrowRight className="editorial-division-card-arrow" size={24} strokeWidth={1.2} />
              </button>

              <button
                type="button"
                aria-expanded={activeDivision === 2}
                onClick={() => setActiveDivision((current) => current === 2 ? null : 2)}
                className={`editorial-division-card ${activeDivision === 2 ? "is-active" : activeDivision === 1 ? "is-dimmed" : ""}`}
              >
                <span className="editorial-division-card-no">02</span>
                <div>
                  <p className="editorial-eyebrow">Divize 02</p>
                  <h3>Fůze &amp; akvizice</h3>
                  <p>Zajišťujeme kompletní proces při realizaci prodeje firem. Zastupujeme majitele, kteří plánují kapitálový exit, a aktivně vyhledáváme strategické kupující.</p>
                </div>
                <ArrowRight className="editorial-division-card-arrow" size={24} strokeWidth={1.2} />
              </button>
            </div>

            <div
              className={`editorial-division-detail-shell ${activeDivision ? "is-open" : ""}`}
              aria-hidden={!activeDivision}
            >
              {activeDivision === 1 ? (
                <div key="division-1" className="editorial-division-detail">
                  <div className="editorial-division-detail-head">
                    <p className="editorial-eyebrow">Divize 01 — detail</p>
                    <h3>Korporátní fundraising &amp; expanze</h3>
                  </div>

                  <div className="editorial-how">
                    <p className="editorial-eyebrow">Jak to funguje?</p>
                    <p>Prostřednictvím cílených marketingových kampaní oslovujeme relevantní investorské skupiny a zajišťujeme externí financování pro malé a střední podniky. Alokovaný kapitál následně efektivně transformujeme do realizace projektů a tržní expanze.</p>
                  </div>

                  <div className="editorial-steps">
                    {[
                      ["1", "Strategie", "Propojení strategického marketingu s kapitálovou strategií společnosti."],
                      ["2", "Kapitál", "Vyhledání a oslovení relevantních investorských skupin a zajištění externího financování."],
                      ["3", "Expanze", "Transformace získaného kapitálu do realizace projektů, rozvoje společnosti a tržní expanze."],
                    ].map(([no, name, text]) => (
                      <div key={no} className="editorial-step">
                        <span>{no}</span>
                        <h4>{name}</h4>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeDivision === 2 ? (
                <div key="division-2" className="editorial-division-detail">
                  <div className="editorial-division-detail-head">
                    <p className="editorial-eyebrow">Divize 02 — detail</p>
                    <h3>Fůze &amp; akvizice</h3>
                  </div>

                  <div className="editorial-how">
                    <p className="editorial-eyebrow">Jak to funguje?</p>
                    <p>Spolupracujeme s vlastníky podniků v jakékoliv fázi jejich cyklu. Pomáháme úspěšným a profitabilním firmám, kde majitelé chtějí bezpečně prodat svůj byznys a zhodnotit tržní hodnotu dlouholeté práce.</p>
                  </div>

                  <div className="editorial-cases">
                    {[
                      ["01", "Kapitálový exit", "Úspěšná a profitabilní společnost, jejíž majitel chce bezpečně prodat svůj byznys a zhodnotit tržní hodnotu dlouholeté práce."],
                      ["02", "Kapitálová tíseň", "Podnik, který se ocitl v kapitálové tísni a potřebuje strategického investora pro zachování kontinuity provozu, hodnoty značky a dalšího fungování společnosti."],
                    ].map(([no, name, text]) => (
                      <div key={no} className="editorial-case">
                        <span>{no}</span>
                        <h4>{name}</h4>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="editorial-ma">
                    <p className="editorial-eyebrow">M&amp;A proces</p>
                    <ol>
                      {[
                        ["01", "Analýza"],
                        ["02", "Strategie"],
                        ["03", "Vyhledání investora"],
                        ["04", "Vyjednávání"],
                        ["05", "Transakce"],
                      ].map(([no, name]) => (
                        <li key={no}>
                          <span>{no}</span>
                          <p>{name}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* HODNOTY */}
        <section id="hodnoty" className="editorial-values scroll-mt-24" data-reveal>
          <div className="editorial-shell">
            <div className="editorial-heading-grid">
              <p className="editorial-eyebrow">Hodnoty</p>
              <h2 className="editorial-display-title">Na čem nám<br />záleží.</h2>
            </div>

            <div className="editorial-values-cluster" aria-label="Hodnoty WIJURO Group">
              <img src={logoMark} alt="" className="editorial-values-watermark" aria-hidden="true" />

              <div className="editorial-value-center" aria-hidden="true">
                <span>WIJURO</span>
                <small>GROUP</small>
              </div>

              {values.map((name, i) => (
                <div key={name} className={`editorial-value-orbit editorial-value-orbit-${i + 1}`}>
                  <div className="editorial-value-circle">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAKT */}
        <section id="kontakt" className="editorial-contact scroll-mt-24" data-reveal>
          <img
            src={logoMark}
            alt=""
            className="editorial-contact-watermark"
            width="406"
            height="567"
            aria-hidden="true"
          />

          <div className="editorial-shell editorial-contact-grid">
            <div className="editorial-contact-main">
              <p className="editorial-eyebrow">Kontakt</p>
              <h2>Máte nápad,<br />který stojí za to rozvíjet?</h2>
              <p className="editorial-contact-lead">Řekněte nám, na čem pracujete. Zajímají nás zajímaví lidé, nápady a příležitosti.</p>

              <button type="button" onClick={() => setFormOpen((v) => !v)} className="editorial-contact-button">
                Pojďme se spojit <ArrowUpRight size={15} strokeWidth={1.4} />
              </button>

              <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.19,.8,.18,1)]" style={{ gridTemplateRows: formOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  {sent ? (
                    <p className="editorial-form-message">Děkujeme, ozveme se vám.</p>
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
                      className="editorial-contact-form"
                    >
                      {[["name", "Jméno a příjmení", "text"], ["email", "E-mail", "email"], ["phone", "Telefonní číslo", "tel"]].map(([n, label, type]) => (
                        <input key={n} required name={n} type={type} placeholder={label} />
                      ))}
                      {error ? <p className="editorial-form-error">{error}</p> : null}
                      <button type="submit" disabled={sending}>{sending ? "Odesílám…" : "Odeslat"}</button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="editorial-contact-side">
              <ul>
                {[[Mail, "E-mail", "info@wijurogroup.com", "mailto:info@wijurogroup.com"], [Phone, "Telefon", "+420 771 190 429", "tel:+420771190429"]].map(([Icon, label, value, href]) => {
                  const I = Icon as typeof Mail;
                  return (
                    <li key={label as string}>
                      <span><I size={18} strokeWidth={1.3} />{label as string}</span>
                      <a href={href as string}>{value as string}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="editorial-footer" style={{ "--footer-stone": `url(${stoneTexture})` } as React.CSSProperties}>
        <div className="editorial-footer-inner">
          <img src={logoMark} alt="WIJURO Group" width="406" height="567" />
          <p>© 2026 WIJURO Group. Všechna práva vyhrazena.</p>
          <a href="#top">Nahoru <ArrowUpRight size={13} strokeWidth={1.3} /></a>
        </div>
      </footer>
    </div>
  );
}
