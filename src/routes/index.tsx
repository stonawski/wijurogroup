import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/Logo_WIJURO.png.asset.json";
import royalSweet from "@/assets/royal-sweet.jpg";
import panTrdelnik from "@/assets/pan-trdelnik.jpg";
import sushiPoint from "@/assets/sushi-point.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WIJURO Group — Tvoříme to, co přichází" },
      { name: "description", content: "WIJURO Group propojuje marketing, investiční myšlení a business development. Budujeme a rozvíjíme projekty s potenciálem." },
      { property: "og:title", content: "WIJURO Group — Tvoříme to, co přichází" },
      { property: "og:description", content: "Moderní česká business group zaměřená na marketing, investice a business development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["O nás", "#o-nas"], ["Co děláme", "#co-delame"], ["Projekty", "#projekty"],
  ["Odpovědnost", "#odpovednost"], ["Kontakt", "#kontakt"],
];

const services = [
  { no: "01", title: "Marketing", text: "Budujeme značky, které mají důvod být vidět." },
  { no: "02", title: "Investice", text: "Hledáme příležitosti s potenciálem dlouhodobého růstu." },
  { no: "03", title: "Business development", text: "Propojujeme nápady, lidi a příležitosti." },
];

const projects = [
  { image: royalSweet, category: "Brand development", name: "Royal Sweet Bakery", text: "Rozvoj značky v segmentu prémiového pekařství s důrazem na jasný koncept a dlouhodobou hodnotu." },
  { image: panTrdelnik, category: "Business concept", name: "Pan Trdelník", text: "Projekt propojující výraznou identitu, tradici a současné obchodní uvažování." },
  { image: sushiPoint, category: "Growth strategy", name: "Sushi Point", text: "Značka rozvíjená s důrazem na konzistentní zkušenost a prostor pro další růst." },
];

const principles = [
  ["01", "Strategie", "Směr, který dává každému kroku smysl."],
  ["02", "Kreativita", "Nový pohled mění možnosti v příležitosti."],
  ["03", "Příležitosti", "Potenciál hledáme tam, kde má co růst."],
  ["04", "Dlouhodobý růst", "Rozhodujeme se s výhledem za další horizont."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[auto_1fr_auto] items-center px-5 md:h-24 md:px-10 lg:px-16">
          <a href="#top" aria-label="WIJURO Group — úvod" className="relative h-14 w-14 shrink-0 overflow-hidden md:h-17 md:w-17">
            <img src={logoAsset.url} alt="WIJURO Group" className="h-full w-full object-cover" width="768" height="768" />
          </a>
          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Hlavní navigace">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
          </nav>
          <a href="#kontakt" className="hidden h-11 items-center border border-primary px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex">Kontakt</a>
          <Button variant="ghost" aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"} className="ml-auto h-11 w-11 px-0 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobilní navigace">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-serif text-2xl">{label}</a>)}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-border px-5 pb-12 pt-36 md:px-10 md:pb-16 lg:px-16">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l border-border lg:block" />
          <div className="pointer-events-none absolute -right-32 top-28 h-[42rem] w-[42rem] rounded-full border border-border/70 lg:block" />
          <div className="pointer-events-none absolute right-16 top-44 h-[28rem] w-[28rem] rounded-full border border-border/60 lg:block" />
          <div className="relative mx-auto grid w-full max-w-[1480px] items-end gap-14 lg:grid-cols-[1.45fr_.55fr]">
            <div className="animate-fade-in">
              <p className="eyebrow">Marketing · Investice · Business development</p>
              <h1 className="mt-7 max-w-5xl font-serif text-[clamp(4rem,9vw,9.5rem)] leading-[0.86] font-normal">Tvoříme to,<br /><em className="text-accent">co přichází.</em></h1>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a className="button-primary" href="#projekty">Naše projekty <ArrowUpRight size={15} /></a>
                <a className="button-ghost" href="#o-nas">Poznejte WIJURO</a>
              </div>
            </div>
            <div className="relative border-l border-border pl-6 lg:mb-4 lg:pl-9">
              <p className="max-w-md text-base leading-7 text-muted-foreground">WIJURO Group propojuje kreativitu, strategii a investiční myšlení. Budujeme, rozvíjíme a propojujeme projekty s potenciálem.</p>
              <a href="#o-nas" aria-label="Pokračovat na sekci O nás" className="mt-10 inline-flex h-12 w-12 items-center justify-center border border-border transition-colors hover:bg-primary hover:text-primary-foreground"><ArrowDown size={17} /></a>
            </div>
          </div>
        </section>

        <section id="o-nas" className="section-shell" data-reveal>
          <div className="section-grid">
            <div><p className="eyebrow">01 — O nás</p></div>
            <div>
              <h2 className="display-heading">Vidíme potenciál tam, kde jiní vidí pouze nápad.</h2>
              <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
                <p className="text-lg leading-8">WIJURO je česká business skupina, která propojuje marketing, investiční myšlení a business development.</p>
                <p className="leading-7 text-muted-foreground">Díváme se za horizont jednotlivých oborů. Hledáme souvislosti, tvoříme strategie a rozvíjíme projekty, které mají skutečný potenciál.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="co-delame" className="border-y border-border bg-secondary" data-reveal>
          <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-10 lg:px-16 lg:py-36">
            <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_3fr]"><p className="eyebrow">02 — Co děláme</p><h2 className="display-heading max-w-4xl">Tři disciplíny.<br />Jeden směr.</h2></div>
            <div className="grid border-t border-border lg:grid-cols-3">
              {services.map((item) => (
                <article key={item.no} className="group flex min-h-80 flex-col border-b border-border py-8 transition-colors hover:bg-background lg:border-b-0 lg:border-r lg:px-8 first:lg:pl-0 last:lg:border-r-0">
                  <span className="text-xs text-muted-foreground">{item.no}</span>
                  <h3 className="mt-auto max-w-xs font-serif text-4xl uppercase leading-tight md:text-5xl">{item.title}</h3>
                  <p className="mt-6 max-w-sm leading-7 text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projekty" className="section-shell" data-reveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_3fr]"><p className="eyebrow">03 — Portfolio</p><div><h2 className="display-heading">Projekty</h2><p className="mt-6 text-lg text-muted-foreground">Od nápadu k projektu. Od projektu k růstu.</p></div></div>
          <div className="space-y-20 lg:space-y-28">
            {projects.map((project, index) => (
              <article key={project.name} className="group grid items-stretch gap-0 lg:grid-cols-12">
                <div className={`relative aspect-[4/3] overflow-hidden lg:col-span-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img src={project.image} alt={`Abstraktní vizuál projektu ${project.name}`} loading="lazy" width={1408} height={992} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  <span className="absolute left-5 top-5 bg-background px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em]">0{index + 1}</span>
                </div>
                <div className="flex flex-col justify-between border border-border p-7 lg:col-span-4 lg:p-10">
                  <p className="eyebrow">{project.category}</p>
                  <div className="mt-20 lg:mt-0">
                    <h3 className="font-serif text-4xl uppercase leading-none md:text-5xl">{project.name}</h3>
                    <p className="mt-6 leading-7 text-muted-foreground">{project.text}</p>
                    <a href="#kontakt" className="mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-xs uppercase tracking-[0.14em]">Zjistit více <ArrowUpRight size={14} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground" data-reveal>
          <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-10 lg:px-16 lg:py-36">
            <p className="eyebrow text-primary-foreground/60">04 — Proč WIJURO</p>
            <div className="mt-16 grid border-t border-primary-foreground/20 md:grid-cols-2 lg:grid-cols-4">
              {principles.map(([no, title, text]) => (
                <div key={no} className="min-h-64 border-b border-primary-foreground/20 py-7 md:px-7 md:first:pl-0 lg:border-r lg:last:border-r-0">
                  <span className="text-xs text-primary-foreground/45">{no}</span><h3 className="mt-16 font-serif text-3xl uppercase">{title}</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="odpovednost" className="section-shell" data-reveal>
          <div className="section-grid">
            <p className="eyebrow">05 — Odpovědnost</p>
            <div>
              <h2 className="display-heading max-w-5xl">Růst, který má smysl i za hranicí businessu.</h2>
              <blockquote className="mt-12 max-w-3xl border-l border-accent pl-7 font-serif text-2xl leading-snug md:text-3xl">„Věříme, že dlouhodobě úspěšné podnikání má smysl pouze tehdy, pokud má pozitivní dopad i mimo samotný business.“</blockquote>
              <p className="mt-9 max-w-2xl leading-7 text-muted-foreground">Stavíme na odpovědném růstu, respektu k lidem, komunitám a prostředí. Ne jako na frázi, ale jako na přístupu k rozhodování.</p>
            </div>
          </div>
        </section>

        <section id="kontakt" className="border-t border-border bg-secondary px-5 py-24 md:px-10 lg:px-16 lg:py-36" data-reveal>
          <div className="mx-auto max-w-[1480px]">
            <p className="eyebrow">06 — Kontakt</p>
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div><h2 className="max-w-5xl font-serif text-[clamp(3.5rem,7vw,8rem)] leading-[0.9]">Máte projekt<br /><em className="text-accent">s potenciálem?</em></h2><p className="mt-8 text-lg text-muted-foreground">Rádi si poslechneme váš nápad.</p></div>
              <a href="mailto:info@wijuro.cz" className="button-primary">Kontaktujte nás <ArrowUpRight size={15} /></a>
            </div>
            <div className="mt-20 grid gap-6 border-t border-border pt-7 text-sm sm:grid-cols-2"><div><span className="text-muted-foreground">E-mail</span><a href="mailto:info@wijuro.cz" className="mt-2 block">info@wijuro.cz</a></div><div><span className="text-muted-foreground">Působnost</span><p className="mt-2">Česká republika</p></div></div>
          </div>
        </section>
      </main>

      <footer className="bg-footer text-footer-foreground">
        <div className="mx-auto max-w-[1480px] px-5 py-12 md:px-10 lg:px-16">
          <div className="grid gap-10 border-b border-footer-foreground/15 pb-10 md:grid-cols-[auto_1fr] md:items-end">
            <img src={logoAsset.url} alt="WIJURO Group" className="h-24 w-24 object-cover opacity-80" width="768" height="768" />
            <nav className="flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[0.14em] md:justify-end">{navItems.filter(([label]) => label !== "Odpovědnost").map(([label, href]) => <a key={href} href={href} className="transition-opacity hover:opacity-55">{label}</a>)}</nav>
          </div>
          <div className="mt-7 flex flex-col gap-3 text-xs text-footer-foreground/55 sm:flex-row sm:justify-between"><p>© 2026 WIJURO Group</p><a href="#kontakt" className="hover:text-footer-foreground">Ochrana osobních údajů</a></div>
        </div>
      </footer>
    </div>
  );
}