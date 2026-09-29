import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import stoneSeamless from "@/assets/stone-raw.jpg";
import logoMark from "@/assets/logo-mark.png";
import heroWordmark from "@/assets/wijuro-wordmark-light.png";
import heroVineyard from "@/assets/hero-pavilion-poster.jpg";
import heroVideo from "@/assets/hero-pavilion-portrait.mp4.asset.json";

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
  ["O nás", "#o-nas"], ["Co děláme", "#sluzby"],
  ["Odpovědnost", "#odpovednost"], ["Kontakt", "#kontakt"],
];

const moreItems = [
  ["Hodnoty", "#hodnoty"],
];

const founders = [
  { name: "David W. Juras", role: "Co-Founder", initials: "D", text: "Dívám se na svět s otevřenou myslí cestovatele, tvořím s citem umělce, bojuji s vytrvalostí sportovce a nechávám věci zrát s trpělivostí vinaře." },
  { name: "Julie W. Juras", role: "Co-Founder", initials: "J", text: "Kreativita je mou přirozenou součástí, cit pro detail a strategické myšlení mou silnou stránkou. Ráda propojuji nápady se souvislostmi a hledám cestu, která dává smysl." },
];

const values = [
  ["Vize", "Přemýšlíme dál než za okamžitou příležitost."],
  ["Integrita", "Důvěra je základem každého vztahu."],
  ["Růst", "Věříme, že dobré nápady mají mít prostor růst."],
  ["Dlouhodobost", "Zaměřujeme se na hodnotu, ne na krátkodobý hluk."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Hide the top bar when scrolling down, reveal it when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY && y - lastY > 4;
        const goingUp = y < lastY && lastY - y > 4;
        if (goingDown && y > 140) setNavHidden(true);
        else if (goingUp || y <= 140) setNavHidden(false);
        lastY = y;
        ticking = false;
      });
    };
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

  // Cinematic hero: scroll + cursor driven camera (lerped via rAF)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let tx = 0, ty = 0, cx = 0, cy = 0, cp = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      const tp = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.9), 0), 1);
      cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05; cp += (tp - cp) * 0.12;
      hero.style.setProperty("--mx", cx.toFixed(4));
      hero.style.setProperty("--my", cy.toFixed(4));
      hero.style.setProperty("--p", cp.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    if (fine) window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
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

  const barStyle = { "--nav-stone-image": `url(${stoneSeamless})` } as React.CSSProperties;
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background pl-4 text-foreground md:pl-5">
      {/* Vertical natural-stone left rail, matching top bar and footer */}
      <div
        className="nav-stone pointer-events-none fixed inset-y-0 left-0 z-[60] w-4 bg-stone md:w-5"
        style={barStyle}
        aria-hidden="true"
      />
      {/* Horizontal natural-stone top bar */}
      <header
        className={`nav-stone fixed inset-x-0 top-0 z-50 isolate bg-stone text-stone-foreground transition-transform duration-500 ease-[cubic-bezier(.19,.8,.18,1)] ${navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
        style={barStyle}
      >
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:h-24 md:px-10 lg:px-16">
          <a href="#top" aria-label="WIJURO Group — úvod" className="intro-logo flex items-center">
            <img src={logoMark} alt="WIJURO Group" className="h-14 w-auto md:h-[4.25rem]" width="406" height="567" />
          </a>
          <nav className="intro-up hidden items-center gap-9 lg:flex" style={{ "--d": "0.5s" } as React.CSSProperties} aria-label="Hlavní navigace">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <button type="button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav id="mobile-menu" className={`mobile-menu nav-stone fixed inset-x-0 bottom-0 top-20 flex flex-col overflow-y-auto bg-stone px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 md:top-24 md:px-10 lg:hidden ${menuOpen ? "is-open" : "invisible pointer-events-none"}`} aria-label="Mobilní navigace" aria-hidden={!menuOpen} style={barStyle}>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mobile-menu-link border-b border-stone-foreground/15 py-4 text-2xl font-light sm:text-3xl">{label}</a>
          ))}
          {moreItems.map(([label, href]) => (
            <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mobile-menu-link border-b border-stone-foreground/15 py-4 text-xl font-light text-stone-foreground/70 sm:text-2xl">{label}</a>
          ))}
          <a href="#kontakt" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-stone-foreground px-4 py-3 text-center text-xs font-semibold uppercase text-stone">
            Pojďme se spojit <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section ref={heroRef} className="relative mx-auto grid min-h-[100svh] max-w-[1480px] items-center gap-10 px-5 pb-14 pt-28 md:px-10 md:pt-36 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:pb-16 lg:pt-32">
          <div className="hero-text relative z-10 lg:col-span-6">
            <p className="eyebrow intro-up" style={{ "--d": "1.2s" } as React.CSSProperties}>MARKETING · BUSINESS DEVELOPMENT · PROJECTS</p>
            <h1 className="mt-7 text-[2.75rem] font-light leading-[0.98] sm:text-6xl md:mt-8 md:text-7xl lg:text-[clamp(3.2rem,5vw,6rem)]">
              <span className="intro-line"><span style={{ "--d": "1.4s" } as React.CSSProperties}>Tvoříme to,</span></span>
              <span className="intro-line"><span className="text-muted-foreground" style={{ "--d": "1.65s" } as React.CSSProperties}>co přichází.</span></span>
            </h1>
            <p className="intro-up mt-9 max-w-xl text-lg leading-8 text-muted-foreground" style={{ "--d": "2.05s" } as React.CSSProperties}>
              WIJURO Group propojuje kreativitu, strategii a investiční myšlení.
            </p>
            <div className="intro-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "2.3s" } as React.CSSProperties}>
              <a className="button-primary lux-hover" href="#o-nas">Poznat WIJURO</a>
            </div>
          </div>
          <div className="relative lg:col-span-6 lg:-mr-16 lg:-mt-8 lg:self-start xl:-mr-24">
            <div className="hero-media">
              <div className="intro-clip relative overflow-hidden">
                <video src={heroVideo.url} poster={heroVineyard} autoPlay muted loop playsInline preload="auto" aria-label="Prosklený prostor s logem WIJURO vyleptaným do skla" className="intro-zoom aspect-[4/5] max-h-[68svh] w-full object-cover md:max-h-[72svh] lg:aspect-[5/6] lg:max-h-[82svh]" />
                 <span className="hero-symbol-cover" aria-hidden="true"><img src={heroWordmark} alt="" /></span>
                <div className="hero-light" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="hero-cue intro-up pointer-events-none absolute bottom-6 left-16 hidden flex-col items-center gap-3 lg:flex" style={{ "--d": "2.8s" } as React.CSSProperties} aria-hidden="true">
            <span aria-hidden="true" />
            <span className="h-10 w-px bg-foreground/30" />
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
                  Naším úkolem ve WIJURO Group je vzít váš podnikatelský záměr, vizi nebo majetek, připravit z nich srozumitelný obchodní projekt a úspěšně jej uplatnit na trhu. Jsme obchodní firma, která pomáhá podnikům se zajištěním kapitálu, prodejem a nákupem. Nejsme finanční makléři ani regulovaná instituce – zaměřujeme se na reálné propojení vašeho byznysu s tržními příležitostmi.
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
                  <p>WIJURO vzniklo z naší společné vize budovat něco vlastního. Jako manželský pár jsme se rozhodli spojit své zkušenosti, energii a společné hodnoty a vytvořit firmu, která bude od začátku stát na pevných základech. Důvěra, individualita, svoboda rozhodování a osobní odpovědnost jsou pro nás hodnoty, na kterých chceme WIJURO stavět. Věříme, že každý člověk má svou vlastní cestu, nápady a potenciál – a právě prostor pro vlastní iniciativu považujeme za důležitou součást podnikání.</p>
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
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-8">Právě rozdílné pohledy považujeme za jednu z našich největších výhod. Kreativita a strategie. Marketing a obchod. Nápad a jeho realizace.</p>
              <p className="mx-auto mt-6 max-w-2xl leading-7 text-muted-foreground">WIJURO vzniklo z touhy tyto světy propojit a postupně kolem nich vybudovat něco vlastního.</p>
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
            <p className="mt-6 text-sm uppercase leading-6 tracking-[0.18em] text-muted-foreground md:text-base">Korporátní fundraising &amp; expanze</p>
            <h3 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">Kapitál pro růst. Strategie pro expanzi.</h3>

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
            <p className="mt-6 text-sm uppercase leading-6 tracking-[0.18em] text-muted-foreground md:text-base">M&amp;A</p>
            <h3 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">Prodej firmy. Strategický kupující. Nová kapitola.</h3>

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
          <div className="section-shell">
            <h2 className="display-heading mb-16">Na čem nám záleží</h2>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(([name, text]) => (
                <div key={name} className="border-t border-foreground/20 pt-6">
                  <h3 className="text-2xl font-normal tracking-tight">{name}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ODPOVĚDNOST */}
        <section id="odpovednost" className="section-shell" data-reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">Odpovědnost</p>
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-light tracking-tight md:text-4xl">Business s odpovědností</h2>
              <p className="mt-8 text-xl leading-9 text-muted-foreground">Věříme, že odpovědné podnikání začíná způsobem, jakým pracujeme — férově, promyšleně a s respektem k lidem, partnerům i prostředí kolem nás. S růstem WIJURO chceme postupně rozvíjet i pozitivní dopad, který může naše podnikání vytvářet.</p>
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
                      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
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
                      <button type="submit" className="button-primary !mt-5 !px-5 !py-2 text-xs">Odeslat</button>
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

      <footer className="nav-stone bg-stone text-stone-foreground" style={{ "--nav-stone-image": `url(${stoneSeamless})` } as React.CSSProperties}>
        <div className="mx-auto max-w-[1480px] px-5 pb-5 pt-5 md:px-10 lg:px-16">
          <p className="text-sm text-stone-foreground/55">© 2026 WIJURO Group. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
