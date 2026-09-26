import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import stoneSeamless from "@/assets/stone-seamless.png";
import logoMark from "@/assets/logo-mark.png";
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
  ["Domů", "#top"], ["O nás", "#o-nas"], ["Služby", "#sluzby"],
  ["Investice", "#investice"], ["Projekty", "#projekty"], ["Kontakt", "#kontakt"],
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header
        className={`nav-stone fixed inset-x-0 top-0 z-50 bg-stone text-stone-foreground transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-18px_oklch(0.25_0.02_70/0.5)]" : ""}`}
        style={{ "--nav-stone-image": `url(${stoneSeamless})` } as React.CSSProperties}
      >
        <div className="mx-auto flex h-24 max-w-[1480px] items-center justify-between px-5 md:h-28 md:px-10 lg:px-16">
          <a href="#top" aria-label="WIJURO Group — úvod" className="flex h-24 shrink-0 items-center md:h-28">
            <img src={logoMark} alt="WIJURO Group" className="h-[4.5rem] w-auto md:h-[5.5rem]" width="405" height="591" />
          </a>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Hlavní navigace">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
            <a href="#kontakt" className="ml-3 inline-flex h-11 items-center gap-2 rounded-[2px] bg-stone-foreground px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-stone transition-opacity hover:opacity-85">
              Pojďme se spojit <ArrowUpRight size={14} />
            </a>
          </nav>
          <button type="button" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={menuOpen} className="inline-flex h-11 w-11 items-center justify-center lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="nav-stone fixed inset-x-0 bottom-0 top-24 flex flex-col bg-stone px-5 pb-10 pt-6 md:top-28 lg:hidden" aria-label="Mobilní navigace" style={{ "--nav-stone-image": `url(${stoneSeamless})` } as React.CSSProperties}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-stone-foreground/15 py-4 text-3xl font-light tracking-tight">{label}</a>
            ))}
            <a href="#kontakt" onClick={() => setMenuOpen(false)} className="mt-auto inline-flex h-13 items-center justify-center gap-2 rounded-[2px] bg-stone-foreground py-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Pojďme se spojit <ArrowUpRight size={14} />
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative mx-auto grid min-h-[100svh] max-w-[1480px] items-center gap-12 px-5 pb-14 pt-32 md:px-10 md:pt-40 lg:grid-cols-12 lg:px-16 lg:pb-20">
          <div className="animate-fade-in lg:col-span-7">
            <p className="eyebrow">Marketing · Business Development · Investice</p>
            <h1 className="mt-8 text-[clamp(3rem,7.6vw,7.4rem)] font-light leading-[0.95] tracking-[-0.045em]">
              Building ideas.<br /><span className="text-muted-foreground">Growing value.</span>
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-muted-foreground">
              WIJURO Group propojuje marketing, business development a investice s cílem vytvářet příležitosti s dlouhodobou hodnotou.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a className="button-primary" href="#o-nas">Poznat WIJURO</a>
              <a className="button-ghost" href="#kontakt">Pojďme se spojit <ArrowUpRight size={14} className="ml-2" /></a>
            </div>
          </div>
          <div className="relative overflow-hidden lg:col-span-5">
            <img src={heroStone} alt="Travertinové schodiště v moderní architektuře" width={1200} height={1504} className="aspect-[4/5] h-full w-full object-cover animate-[fade-in_1.6s_ease]" />
          </div>
        </section>

        {/* INTRO */}
        <section className="section-shell border-t border-border" data-reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 className="display-heading lg:col-span-8">Nápady mají hodnotu, když se promění v něco skutečného.</h2>
            <p className="self-end text-lg leading-8 text-muted-foreground lg:col-span-4">
              WIJURO Group propojuje strategické myšlení, marketing, business development a investice. Hledáme příležitosti, propojujeme správné lidi a pomáháme vytvářet projekty s dlouhodobým potenciálem.
            </p>
          </div>
        </section>

        {/* O NÁS */}
        <section id="o-nas" className="scroll-mt-24 bg-stone/45" data-reveal>
          <div className="section-shell grid gap-12 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">O nás</p>
            <div className="lg:col-span-9">
              <h2 className="display-heading">Stavíme s výhledem do budoucna.</h2>
              <div className="mt-14 grid gap-8 border-t border-foreground/15 pt-8 md:grid-cols-2">
                <p className="text-xl leading-8">WIJURO Group vzniká na jednoduché myšlence: vytvářet hodnotu, která má dlouhodobý význam.</p>
                <p className="leading-7 text-muted-foreground">Propojujeme kreativitu s obchodním myšlením, strategii s realizací a ambici s odpovědností. Jsme aktivní business group, která vyhledává příležitosti, vytváří projekty a podílí se na jejich rozvoji.</p>
              </div>
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
        <section id="investice" className="scroll-mt-24 bg-footer text-footer-foreground" data-reveal>
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
        <section id="projekty" className="section-shell scroll-mt-24" data-reveal>
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
        <section className="border-t border-border" data-reveal>
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
        <section className="bg-stone/45" data-reveal>
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
        <section className="section-shell" data-reveal>
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
                  <li key={label as string} className="flex items-center justify-between border-b border-stone-foreground/20 py-6 first:border-t">
                    <span className="flex items-center gap-4"><I size={18} strokeWidth={1.4} />{label as string}</span>
                    <span className="text-sm opacity-60">Bude doplněno</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-footer text-footer-foreground">
        <div className="mx-auto max-w-[1480px] px-5 pb-10 pt-20 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <img src={logoAsset.url} alt="WIJURO Group" width="780" height="780" loading="lazy" className="h-28 w-28 object-contain" />
              <p className="mt-8 text-3xl font-light tracking-tight md:text-4xl">Marketing. Business. Investments.</p>
            </div>
            <nav className="grid grid-cols-2 gap-4 self-end lg:col-span-6 lg:justify-items-end" aria-label="Navigace v patičce">
              {navItems.map(([label, href]) => <a key={href} href={href} className="text-footer-foreground/70 transition-colors hover:text-footer-foreground">{label}</a>)}
            </nav>
          </div>
          <p className="mt-20 border-t border-footer-foreground/15 pt-8 text-sm text-footer-foreground/55">© 2026 WIJURO Group. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
