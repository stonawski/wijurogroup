import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import stoneSeamless from "@/assets/stone-raw.jpg";
import logoMark from "@/assets/logo-mark.png";
import heroVineyard from "@/assets/hero-pavilion-clean.jpg";
import heroVideo from "@/assets/hero-pavilion-cinematic.mp4.asset.json";

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
  ["O nás", "#o-nas"], ["Co děláme", "#sluzby"], ["Projekty", "#projekty"],
  ["Odpovědnost", "#odpovednost"], ["Kontakt", "#kontakt"],
];

const moreItems = [
  ["Investice", "#investice"], ["Náš přístup", "#pristup"], ["Hodnoty", "#hodnoty"],
];

const services = [
  ["01", "Marketing", "Tvoříme značky, které si lidé pamatují.", "Strategický marketing, branding, digitální prezentace a komunikace zaměřené na skutečný obchodní dopad."],
  ["02", "Business Development", "Proměňujeme kontakty v příležitosti.", "Vyhledáváme příležitosti, budujeme vztahy a propojujeme lidi, nápady a společnosti s potenciálem růstu."],
  ["03", "Investice", "Kapitál s dlouhodobou perspektivou.", "Vyhledáváme vybrané příležitosti, kde může kombinace kapitálu, strategie a aktivního přístupu vytvářet dlouhodobou hodnotu."],
  ["04", "Strategické projekty", "Od myšlenky k realizaci.", "Rozvíjíme a podporujeme vybrané projekty od prvotního konceptu až po realizaci a růst."],
];

const investPrinciples = [
  ["01", "Potenciál", "Díváme se za současný stav a hledáme, čím se může příležitost stát."],
  ["02", "Strategie", "Věříme, že kapitál vytváří větší hodnotu, pokud je spojený s jasným strategickým myšlením."],
  ["03", "Dlouhodobá hodnota", "Soustřeďujeme se na udržitelný růst, ne na krátkodobý hluk."],
];

const founders = [
  { name: "David W. Juras", role: "Co-Founder", initials: "D", text: "David se zaměřuje na business development, obchod, strategické příležitosti a investice. Baví ho hledat nové možnosti, propojovat lidi a přemýšlet nad tím, jak jednotlivé příležitosti rozvíjet v dlouhodobě hodnotné projekty." },
  { name: "Julie W. Juras", role: "Co-Founder", initials: "J", text: "Julie se zaměřuje především na marketing, branding, kreativní projekty a komunikaci. Baví ji budovat značky s vlastní identitou a hledat způsoby, jak dobrý nápad proměnit v něco, co má skutečný potenciál a funguje i v praxi." },
];

const projects = ["Ve vývoji", "Vybraná příležitost", "Coming soon"];

const approach = [
  ["01", "Vidíme", "Identifikujeme nápady, příležitosti a potenciál."],
  ["02", "Propojujeme", "Spojujeme správné lidi, zdroje a perspektivy."],
  ["03", "Budujeme", "Proměňujeme příležitosti v konkrétní projekty."],
  ["04", "Rozvíjíme", "Zaměřujeme se na dlouhodobou a udržitelnou hodnotu."],
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
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="nav-stone pointer-events-none absolute inset-y-0 left-0 z-40 w-3 bg-stone md:w-5" style={barStyle} aria-hidden="true" />
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
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section ref={heroRef} className="relative mx-auto grid min-h-[100svh] max-w-[1480px] items-center gap-10 px-5 pb-14 pt-28 md:px-10 md:pt-36 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:pb-16 lg:pt-32">
          <div className="hero-text relative z-10 lg:col-span-6">
            <p className="eyebrow intro-up" style={{ "--d": "1.2s" } as React.CSSProperties}>Marketing · Business Development · Investice</p>
            <h1 className="mt-7 text-[2.75rem] font-light leading-[0.98] sm:text-6xl md:mt-8 md:text-7xl lg:text-[clamp(3.2rem,5vw,6rem)]">
              <span className="intro-line"><span style={{ "--d": "1.4s" } as React.CSSProperties}>Tvoříme to,</span></span>
              <span className="intro-line"><span className="text-muted-foreground" style={{ "--d": "1.65s" } as React.CSSProperties}>co přichází.</span></span>
            </h1>
            <p className="intro-up mt-9 max-w-xl text-lg leading-8 text-muted-foreground" style={{ "--d": "2.05s" } as React.CSSProperties}>
              WIJURO Group propojuje kreativitu, strategii a investiční myšlení.
            </p>
            <div className="intro-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "2.3s" } as React.CSSProperties}>
              <a className="button-hero-light lux-hover" href="#o-nas">Poznat WIJURO</a>
            </div>
          </div>
          <div className="relative lg:col-span-6 lg:-mr-16 lg:-mt-10 xl:-mr-24">
            <div className="hero-media">
              <div className="intro-clip relative overflow-hidden">
                <video src={heroVideo.url} poster={heroVineyard} autoPlay muted loop playsInline preload="auto" aria-label="Prosklený prostor s logem WIJURO vyleptaným do skla" className="intro-zoom aspect-[4/5] max-h-[68svh] w-full object-cover md:max-h-[72svh] lg:aspect-[5/6] lg:max-h-[82svh]" />
                <div className="hero-glass-logo" aria-hidden="true">
                  <img src={logoMark} alt="" />
                </div>
                <div className="hero-light" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="hero-cue intro-up pointer-events-none absolute bottom-6 left-16 hidden flex-col items-center gap-3 lg:flex" style={{ "--d": "2.8s" } as React.CSSProperties} aria-hidden="true">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
            <span className="h-10 w-px bg-foreground/30" />
          </div>
        </section>

        {/* INTRO */}
        <section className="section-shell relative z-10 border-t border-border bg-background" data-reveal="none">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 className="display-heading lg:col-span-8">
              {["Nápady mají hodnotu,", "když se promění", "v něco skutečného."].map((l, i) => (
                <span key={l} className="mask-line" style={{ "--i": i } as React.CSSProperties}><span>{l}</span></span>
              ))}
            </h2>
            <p className="reveal-item self-end text-lg leading-8 text-muted-foreground lg:col-span-4" style={{ "--i": 4 } as React.CSSProperties}>
              WIJURO Group propojuje strategické myšlení, marketing, business development a investice. Hledáme příležitosti, propojujeme správné lidi a pomáháme vytvářet projekty s dlouhodobým potenciálem.
            </p>
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
                  <p>WIJURO je pro nás rodinná firma v pravém slova smyslu. Chceme ji budovat dlouhodobě, společně a způsobem, který bude odrážet to, kým jsme a čemu věříme. Naším cílem je vytvářet vlastní projekty, rozvíjet zajímavé příležitosti a investovat do toho, co podle nás má skutečný potenciál.</p>
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
          <div className="mb-16 grid gap-6 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">Služby</p>
            <h2 className="display-heading lg:col-span-9">Co děláme</h2>
          </div>
          <div className="border-t border-border">
            {services.map(([no, name, claim, text]) => (
              <article key={no} className="group grid gap-4 border-b border-border py-10 transition-colors duration-500 hover:bg-stone/25 md:grid-cols-12 md:gap-8 md:px-4">
                <span className="text-5xl font-extralight tracking-tight text-muted-foreground md:col-span-2 md:text-6xl">{no}</span>
                <h3 className="text-2xl font-normal tracking-tight md:col-span-4 md:text-3xl">{name}</h3>
                <div className="md:col-span-6">
                  <p className="text-lg">{claim}</p>
                  <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* INVESTICE */}
        <section id="investice" className="scroll-mt-24 bg-footer text-footer-foreground" data-reveal="clip">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-12">
              <p className="eyebrow !text-footer-foreground/60 lg:col-span-3">Investice</p>
              <div className="lg:col-span-9">
                <h2 className="display-heading">Investujeme do potenciálu.</h2>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-footer-foreground/70">Zajímají nás příležitosti, kde může kapitál, strategické myšlení a aktivní přístup společně vytvářet dlouhodobou hodnotu.</p>
              </div>
            </div>
            <div className="mt-20 grid border-t border-footer-foreground/15 md:grid-cols-3">
              {investPrinciples.map(([no, name, text]) => (
                <div key={no} className="border-b border-footer-foreground/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <span className="text-sm text-footer-foreground/50">{no}</span>
                  <h3 className="mt-10 text-2xl font-light tracking-tight">{name}</h3>
                  <p className="mt-4 leading-7 text-footer-foreground/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJEKTY */}
        <section id="projekty" className="section-shell scroll-mt-24" data-reveal="scale">
          <div className="mb-16 grid gap-6 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">Projekty</p>
            <div className="lg:col-span-9">
              <h2 className="display-heading">Vybrané projekty</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Výběr projektů, nápadů a příležitostí, které vytváříme, rozvíjíme nebo prozkoumáváme.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((label, i) => (
              <div key={label} className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-border bg-stone/35 p-7 ${i === 1 ? "md:translate-y-12" : ""}`}>
                <span className="text-sm text-muted-foreground">0{i + 1}</span>
                <div className="pointer-events-none absolute inset-10 border border-foreground/10" />
                <div className="relative">
                  <p className="eyebrow">WIJURO Group</p>
                  <p className="mt-3 text-2xl font-light tracking-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PŘÍSTUP */}
        <section id="pristup" className="scroll-mt-24 border-t border-border" data-reveal>
          <div className="section-shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Přístup</p>
              <h2 className="display-heading mt-6">Náš přístup</h2>
            </div>
            <ol className="lg:col-span-8">
              {approach.map(([no, name, text]) => (
                <li key={no} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-8 first:border-t md:grid-cols-[5rem_14rem_1fr] md:items-baseline">
                  <span className="text-sm text-muted-foreground">{no}</span>
                  <h3 className="text-3xl font-light tracking-tight md:text-4xl">{name}</h3>
                  <p className="col-start-2 leading-7 text-muted-foreground md:col-start-3">{text}</p>
                </li>
              ))}
            </ol>
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
              <a href="#kontakt" className="button-primary mt-10">Pojďme se spojit <ArrowUpRight size={14} /></a>
            </div>
            <ul className="self-end lg:col-span-5">
              {[[Mail, "E-mail"], [Phone, "Telefon"], [Linkedin, "LinkedIn"]].map(([Icon, label]) => {
                const I = Icon as typeof Mail;
                return (
                  <li key={label as string} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-stone-foreground/20 py-6 first:border-t">
                    <span className="flex items-center gap-4"><I size={18} strokeWidth={1.4} />{label as string}</span>
                    <span className="text-sm opacity-60">Bude doplněno</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="nav-stone bg-stone text-stone-foreground" style={{ "--nav-stone-image": `url(${stoneSeamless})` } as React.CSSProperties}>
        <div className="mx-auto max-w-[1480px] px-5 pb-10 pt-20 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-3xl font-light tracking-tight md:text-4xl">Marketing. Business. Investments.</p>
            </div>
            <nav className="grid grid-cols-2 gap-4 self-end lg:col-span-6 lg:justify-items-end" aria-label="Navigace v patičce">
              {navItems.map(([label, href]) => <a key={href} href={href} className="text-stone-foreground/70 transition-colors hover:text-stone-foreground">{label}</a>)}
            </nav>
          </div>
          <p className="mt-20 border-t border-stone-foreground/15 pt-8 text-sm text-stone-foreground/55">© 2026 WIJURO Group. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
