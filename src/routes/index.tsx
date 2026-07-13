import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import heroImg from "@/assets/hero.jpg";
import logoMark from "@/assets/moy9web-mark.png";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import person1 from "@/assets/person-1.jpg";
import person2 from "@/assets/person-2.jpg";
import person3 from "@/assets/person-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#voices", label: "Voices" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    n: "01",
    title: "Brand & Identity",
    body: "Positioning, naming, visual systems, and verbal identity crafted for longevity — not the algorithm.",
    detail: ["Strategy sprints", "Visual identity", "Brand guidelines"],
  },
  {
    n: "02",
    title: "Digital Products",
    body: "Websites and applications engineered like couture — pixel-precise, performant, and built to convert.",
    detail: ["Web platforms", "Product design", "Headless CMS"],
  },
  {
    n: "03",
    title: "Growth & Performance",
    body: "Paid media, SEO, and lifecycle marketing that compounds — measured by revenue, not vanity metrics.",
    detail: ["Paid acquisition", "SEO & content", "Analytics"],
  },
  {
    n: "04",
    title: "IT & Infrastructure",
    body: "Cloud architecture, integrations, and automation that keep operations quiet and margins loud.",
    detail: ["Cloud & DevOps", "Integrations", "Security audits"],
  },
];

const works = [
  {
    img: work1,
    client: "Maison Ferre",
    title: "A heritage rebrand for a fifth-generation atelier",
    tag: "Brand · Identity",
  },
  {
    img: work2,
    client: "Northline Capital",
    title: "Investor platform reimagined as an editorial experience",
    tag: "Product · Web",
  },
  {
    img: work3,
    client: "Halberd Analytics",
    title: "From dashboard sprawl to a single signal of truth",
    tag: "Growth · Data",
  },
];

const voices = [
  {
    quote:
      "Moy9Web operates like an in-house creative studio and a McKinsey deck had a very well-dressed child. Revenue is up 214% year over year.",
    name: "Elena Marchetti",
    role: "CEO, Maison Ferre",
    img: person1,
  },
  {
    quote:
      "They rebuilt our platform in twelve weeks. The team hasn't stopped talking about the launch — neither have our LPs.",
    name: "David Okafor",
    role: "Managing Partner, Northline",
    img: person2,
  },
  {
    quote:
      "Every agency promised craft. Moy9Web is the only one that delivered it — down to the kerning of the invoice.",
    name: "Sara Lindqvist",
    role: "Founder, Halberd",
    img: person3,
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

function Index() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoMark}
            alt=""
            width={512}
            height={512}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-2xl leading-none tracking-tight text-foreground">
            Moy9Web
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden border border-gold/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground md:inline-block"
        >
          Begin a project
        </a>
      </div>
      <div className="mx-auto h-px max-w-[1400px] gold-rule" />
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-40 pb-24 md:pt-56 md:pb-32">
      <img
        src={heroImg}
        alt=""
        width={1600}
        height={1200}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/60" />
          Boutique IT & marketing atelier
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight">
          We build brands that
          <br />
          <em className="italic text-gold-gradient">behave like heirlooms.</em>
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Moy9Web is a senior team of strategists, designers, and engineers building brand systems,
            digital products, and growth engines for companies that intend to last a hundred years.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              View the portfolio
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-border px-7 py-4 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-gold/60 hover:text-gold"
            >
              Request an intro call
            </a>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-border pt-10 md:grid-cols-4">
          {[
            ["11", "Years in practice"],
            ["87", "Brands shaped"],
            ["$1.4B", "Client revenue driven"],
            ["19", "Design awards"],
          ].map(([k, v]) => (
            <div key={v}>
              <dt className="font-display text-4xl text-gold md:text-5xl">{k}</dt>
              <dd className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Marquee() {
  const logos = ["Maison Ferre", "Northline", "Halberd", "Osier & Co.", "Verdant", "Kestrel"];
  return (
    <div className="overflow-hidden border-y border-border py-6">
      <div className="flex gap-16 whitespace-nowrap [animation:marquee_40s_linear_infinite]">
        {[...logos, ...logos, ...logos].map((l, i) => (
          <span
            key={i}
            className="font-display text-2xl italic tracking-tight text-muted-foreground/70"
          >
            {l}
            <span className="ml-16 text-gold/40">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-gold">§ Services</p>
          <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
            A single studio<br />
            for the whole <em className="italic text-gold-gradient">arc</em>.
          </h2>
        </div>
        <p className="max-w-xl self-end text-lg leading-relaxed text-muted-foreground">
          From the first strategic conversation to the thousandth deployment, we hold the entire
          craft in-house. No handoffs. No dilution. No sub-contracted mediocrity.
        </p>
      </div>

      <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.n}
            className="group relative bg-background p-10 transition-colors hover:bg-card md:p-14"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-sm text-gold">{s.n}</span>
              <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </div>
            <h3 className="mt-8 font-display text-4xl leading-tight">{s.title}</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {s.body}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.detail.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <span className="h-px w-4 bg-gold/60" />
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="work" className="border-t border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-gold">§ Selected work</p>
            <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
              A quiet<br />
              <em className="italic text-gold-gradient">portfolio</em>.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            A curated slice of the last twenty-four months — heritage houses, venture-backed
            software, and one small revolution.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {works.map((w, i) => (
            <article
              key={w.client}
              className={`grid gap-10 md:grid-cols-12 md:items-center ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="md:col-span-5">
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={w.img}
                    alt={`${w.client} — ${w.title}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                  />
                </div>
              </figure>
              <div className="md:col-span-7">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{w.tag}</p>
                <p className="mt-4 font-display text-2xl italic text-muted-foreground">
                  {w.client}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{w.title}</h3>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold hover:underline underline-offset-8 decoration-gold/40"
                >
                  Read the case study
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="voices" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
      <div className="mb-16 max-w-3xl">
        <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-gold">§ Voices</p>
        <h2 className="font-display text-5xl leading-[0.95] md:text-6xl">
          Kind words from<br />
          <em className="italic text-gold-gradient">people we admire</em>.
        </h2>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-3">
        {voices.map((v) => (
          <figure key={v.name} className="flex flex-col bg-background p-10 md:p-12">
            <span className="font-display text-6xl leading-none text-gold">"</span>
            <blockquote className="mt-2 flex-1 font-display text-2xl leading-snug">
              {v.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-border pt-6">
              <img
                src={v.img}
                alt=""
                width={600}
                height={600}
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover grayscale"
              />
              <div>
                <p className="text-sm text-foreground">{v.name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {v.role}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company") ?? undefined,
      budget: fd.get("budget") ?? undefined,
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <section id="contact" className="relative border-t border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-gold">§ Contact</p>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Let's build<br />
              something<br />
              <em className="italic text-gold-gradient">worth keeping</em>.
            </h2>
            <p className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground">
              We take on a small number of engagements each quarter. Share a few details and a
              partner will respond within one business day.
            </p>
            <dl className="mt-12 space-y-6 text-sm">
              <div className="flex gap-6">
                <dt className="w-24 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Email
                </dt>
                <dd className="text-foreground">studio@moy9web.com</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-24 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Studios
                </dt>
                <dd className="text-foreground">New York · London · Milan</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-24 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Press
                </dt>
                <dd className="text-foreground">press@moy9web.com</dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="border border-border bg-background p-8 md:p-12"
          >
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Received</p>
                <p className="mt-6 font-display text-4xl leading-tight">
                  Thank you. A partner will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name" name="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" error={errors.email} />
                  <Field label="Company" name="company" />
                  <SelectField label="Budget" name="budget" />
                </div>
                <div className="mt-6">
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Project
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell us about the ambition, timeline, and current state."
                    className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Send inquiry
                  <span aria-hidden>→</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-foreground focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-foreground focus:border-gold focus:outline-none"
      >
        <option value="" className="bg-background">
          Select a range
        </option>
        <option className="bg-background">$25k – $75k</option>
        <option className="bg-background">$75k – $200k</option>
        <option className="bg-background">$200k – $500k</option>
        <option className="bg-background">$500k+</option>
      </select>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-display text-4xl leading-none">
            Moy9Web
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A boutique IT and marketing atelier for brands with a hundred-year horizon.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {[
            { h: "Studio", i: ["About", "Careers", "Journal"] },
            { h: "Services", i: ["Brand", "Product", "Growth"] },
            { h: "Elsewhere", i: ["Instagram", "LinkedIn", "Are.na"] },
          ].map((c) => (
            <div key={c.h}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{c.h}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.i.map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-foreground">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
          <p>© {new Date().getFullYear()} Moy9Web Agency. All rights reserved.</p>
          <p>Crafted in three time zones.</p>
        </div>
      </div>
    </footer>
  );
}
