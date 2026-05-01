import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MapPin,
  Mail,
  Calendar,
  FileText,
  Users,
  ArrowRight,
  ExternalLink,
  Trees,
  ArrowUpRight,
  Clock,
} from "lucide-react";

// ============================================================
//  CONTENT — edit this block to update the site.
//  Everything below the CONTENT block is presentation code.
// ============================================================

const SITE = {
  name: "Columbia Forest Civic Association",
  shortName: "CFCA",
  established: 1941,
  location: "Arlington, Virginia",
  zip: "22204",
  email: "presidentCFCA@gmail.com",
  emailGeneral: "columbiaforestca@gmail.com",
  tagline: "A neighborhood, a community, a voice.",
  mission:
    "The Columbia Forest Civic Association is a non-profit, non-partisan association of residents, property owners, and businesses working to promote the interests and general welfare of the Columbia Forest neighborhood of Arlington County.",
  boundaries: {
    north: "Columbia Pike",
    east: "Four Mile Run",
    south: "South George Mason Drive",
    west: "the Arlington County line",
  },
  stats: {
    population: "~4,600",
    populationSource: "2000 Census",
    residences: "~1,790",
    area: "0.22 sq. mi.",
    buildings: 238,
    listedNRHP: 2004,
  },
  social: {
    // Former Facebook, X/Twitter, and Nextdoor accounts are not currently
    // maintained by CFCA. Contact goes through the president's email below.
  },
  conservationPlanUrl:
    "http://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/31/2014/02/NC_ColumbiaForest_Plan.pdf",
  // Optional PayPal link for annual dues. Set to "" to hide the dues block entirely.
  paypalUrl: "",
  // Optional external newsletter/listserv (e.g., groups.io). Leave "" to use the on-site form only.
  newsletterUrl: "",
};

const OFFICERS = [
  { role: "President", name: "Justin Fuhrmann", email: "presidentCFCA@gmail.com" },
  { role: "Vice President", name: "Diana Barton", email: "" },
  { role: "Treasurer", name: "John Kirkpatrick", email: "" },
  { role: "Secretary", name: "Theresa Flynn", email: "" },
];

const EVENTS = [];

const NEWS = [
  {
    title: "Welcome to the new CFCA website",
    date: "2026-04-18",
    excerpt:
      "After years of scattered posts and an aging placeholder site, Columbia Forest has a new dedicated home online for events, documents, and neighborhood news.",
  },
  {
    title: "Looking ahead: 2026 priorities",
    date: "2026-03-20",
    excerpt:
      "This year's focus is the start of construction at the updated Bailey's Branch Park and improved pedestrian safety throughout the neighborhood with a focus on Complete Street projects along S. Columbus St.",
  },
  {
    title: "From the archive: 85 years of Columbia Forest",
    date: "2026-01-15",
    excerpt:
      "The Civic Association was organized in 1941, a year before the first houses went up. Eight decades and a 2004 National Register listing later, the neighborhood's wartime character — and its volunteer spirit — remain remarkably intact.",
  },
];

const PROJECTS = [
  {
    title: "Bailey's Branch Park Renovation",
    summary:
      "A full redesign of the neighborhood's two-acre park is underway — construction expected to begin in 2026.",
    body: "The existing playground is over 25 years old and no longer meets current safety or ADA standards. Arlington County's renovation — jointly funded by the Arlington Neighborhoods Program and Parks Maintenance Capital — includes a new playground, removal of invasive plants, native tree and pollinator planting, updated site furnishings and signage, improved stormwater management, and significantly enhanced accessibility. CFCA has been actively involved in the design process since 2022.",
    link: {
      url: "https://www.arlingtonva.us/Government/Projects/Project-Types/Parks-Projects/Baileys-Branch-Park-Renovation",
      label: "Project page at Arlington County",
    },
  },
  {
    title: "Pedestrian Safety & Complete Streets",
    summary:
      "Making neighborhood streets safer to walk — with a 2026 focus on S. Columbus Street.",
    body: "Since the 1974 Four Mile Run bridge connected S. George Mason Drive to Fairfax County, cut-through traffic and speeding on interior streets have been a persistent concern. CFCA's 2026 priority is advancing Complete Streets improvements along S. Columbus Street, one of two principal north-south streets crossing the neighborhood. We also track pedestrian safety along Columbia Pike and at intersections with S. George Mason Drive.",
  },
  {
    title: "West Pike Neighborhood Partnership",
    summary:
      "Joint programming with Barcroft and Arlington Mill civic associations.",
    body: "Columbia Forest is one of three \"West Pike\" civic associations that collaborate on community events — most visibly the annual West Pike Food Truck Party, now a decade-old neighborhood tradition.",
  },
];

const DOCUMENTS = [
  {
    title: "CFCA Bylaws & Constitution",
    description: "The governing document of the association, including all amendments through March 2000.",
    type: "PDF",
    url: "/cfca-bylaws.pdf",
    updated: "March 2000",
  },
  {
    title: "Neighborhood Conservation Plan",
    description:
      "A comprehensive 60-page plan adopted by the Arlington County Board in 2000, covering history, land use, traffic, parks, and beautification. Historical document — many recommendations have since been implemented or superseded.",
    type: "PDF",
    url: "/cfca-nc-plan-2000.pdf",
    attribution: "Arlington County",
    updated: "November 2000",
  },
  {
    title: "Annual Meeting Minutes (most recent)",
    type: "PDF",
    url: "#",
    updated: "TBD",
  },
  {
    title: "Membership Form",
    type: "PDF",
    url: "#",
    updated: "TBD",
  },
];

// ============================================================
//  PRESENTATION CODE
// ============================================================

const COLORS = {
  forest: "#1F3D2E",
  forestDark: "#14291F",
  forestLight: "#2D5A44",
  cream: "#FAF6EF",
  creamDark: "#F0E9DC",
  terracotta: "#A04A2D",
  terracottaDark: "#7A3319",
  ink: "#262220",
  stone: "#6B6560",
  line: "#D9D2C0",
};

function useGoogleFonts() {
  useEffect(() => {
    // Set document language for screen readers
    if (document.documentElement.lang !== "en") {
      document.documentElement.lang = "en";
    }

    // Inject accessibility CSS (focus indicators, reduced motion)
    const a11yStyle = document.createElement("style");
    a11yStyle.setAttribute("data-a11y", "true");
    a11yStyle.innerHTML = `
      /* Visible focus indicator for keyboard users */
      a:focus-visible,
      button:focus-visible,
      [tabindex]:focus-visible {
        outline: 2px solid #14291F;
        outline-offset: 3px;
        border-radius: 2px;
      }
      /* Dark-background focus uses a light ring */
      .on-dark :focus-visible {
        outline-color: #FAF6EF;
      }
      /* Honor user preference to reduce motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      /* Ensure main region doesn't get a visible outline when targeted via skip link */
      main:focus { outline: none; }
    `;
    document.head.appendChild(a11yStyle);

    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "";
    document.head.appendChild(preconnect2);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(link);
      if (a11yStyle.parentNode) {
        document.head.removeChild(a11yStyle);
      }
    };
  }, []);
}

function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function shortDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
}

// --- Layout components ----------------------------------------------------

function Header({ page, setPage, setMobileOpen }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "news", label: "News" },
    { id: "projects", label: "Projects" },
    { id: "documents", label: "Documents" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className="border-b"
      style={{ borderColor: COLORS.line, backgroundColor: COLORS.cream }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between py-5">
          <button
            onClick={() => setPage("home")}
            className="text-left group"
            aria-label="Columbia Forest Civic Association home"
          >
            <div
              className="text-[10px] tracking-[0.3em] mb-0.5"
              style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
            >
              EST. {SITE.established} · ARLINGTON, VA
            </div>
            <div
              className="text-xl md:text-2xl leading-none"
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 500,
                color: COLORS.forestDark,
                letterSpacing: "-0.01em",
              }}
            >
              Columbia Forest
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: COLORS.forest,
                }}
              >
                {" "}
                Civic Association
              </span>
            </div>
          </button>

          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                aria-current={page === item.id ? "page" : undefined}
                className="text-[13px] tracking-wide transition-colors"
                style={{
                  fontFamily: "Newsreader, serif",
                  color: page === item.id ? COLORS.forest : COLORS.ink,
                  fontWeight: page === item.id ? 600 : 400,
                  borderBottom:
                    page === item.id
                      ? `1px solid ${COLORS.forest}`
                      : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden p-3 -mr-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ color: COLORS.forestDark }}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, setOpen, page, setPage }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "news", label: "News" },
    { id: "projects", label: "Projects" },
    { id: "documents", label: "Documents" },
    { id: "contact", label: "Contact" },
  ];
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      style={{ backgroundColor: COLORS.cream }}
    >
      <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: COLORS.line }}>
        <div
          className="text-[10px] tracking-[0.3em]"
          style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
        >
          EST. {SITE.established}
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="p-3 -mr-2"
          style={{ color: COLORS.forestDark }}
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <nav
        className="px-5 py-8 flex flex-col gap-5"
        aria-label="Primary"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setPage(item.id);
              setOpen(false);
            }}
            aria-current={page === item.id ? "page" : undefined}
            className="text-left text-2xl"
            style={{
              fontFamily: "Fraunces, serif",
              color: page === item.id ? COLORS.forest : COLORS.ink,
              fontWeight: page === item.id ? 600 : 400,
              fontStyle: page === item.id ? "italic" : "normal",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer
      className="mt-20 on-dark"
      style={{ backgroundColor: COLORS.forestDark, color: COLORS.cream }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div
              className="text-[10px] tracking-[0.3em] mb-3 opacity-70"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              EST. {SITE.established} · ARLINGTON, VA {SITE.zip}
            </div>
            <div
              className="text-3xl md:text-4xl leading-tight mb-4"
              style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}
            >
              Columbia Forest
              <br />
              <span style={{ fontStyle: "italic", opacity: 0.8 }}>
                Civic Association
              </span>
            </div>
            <p
              className="text-sm leading-relaxed opacity-75 max-w-sm"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {SITE.tagline}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Site">
            <div
              className="text-[10px] tracking-[0.3em] mb-4 opacity-60"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              SITE
            </div>
            <ul className="space-y-2 text-sm" style={{ fontFamily: "Newsreader, serif" }}>
              {[
                ["home", "Home"],
                ["about", "About"],
                ["events", "Events"],
                ["news", "News"],
                ["projects", "Projects"],
                ["documents", "Documents"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => setPage(id)}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <nav aria-label="Neighborhood resources">
              <div
                className="text-[10px] tracking-[0.3em] mb-4 opacity-60"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                NEIGHBORHOOD RESOURCES
              </div>
              <ul className="space-y-2 text-sm mb-8" style={{ fontFamily: "Newsreader, serif" }}>
                <li>
                  <a
                    href="https://www.arlingtonva.us/Government/Topics/Report-Problem"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Report a Problem, Arlington County (opens in a new tab)"
                    className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                  >
                    Report a Problem
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.civfed.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Arlington Civic Federation (opens in a new tab)"
                    className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                  >
                    Arlington Civic Federation
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.columbia-pike.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Columbia Pike Partnership (opens in a new tab)"
                    className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                  >
                    Columbia Pike Partnership
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    aria-label={`Email CFCA at ${SITE.email}`}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Connect with CFCA">
              <div
                className="text-[10px] tracking-[0.3em] mb-4 opacity-60"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                CONNECT
              </div>
              <p
                className="text-sm opacity-80 leading-relaxed mb-3"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                The best way to reach CFCA is by email to the president.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                aria-label={`Email the CFCA President at ${SITE.email}`}
                className="text-sm opacity-90 hover:opacity-100 transition-opacity underline"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {SITE.email}
              </a>
            </nav>
          </div>
        </div>

        <div
          className="mt-16 pt-6 border-t text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{
            borderColor: "rgba(250,246,239,0.15)",
            fontFamily: "Newsreader, serif",
          }}
        >
          <div className="opacity-50">
            © {new Date().getFullYear()} Columbia Forest Civic Association
          </div>
          <div className="opacity-50">
            A volunteer-run, non-partisan neighborhood association
          </div>
          <div>
            <a
              href={`mailto:${SITE.email}?subject=Accessibility%20feedback`}
              className="opacity-70 hover:opacity-100 transition-opacity underline"
              aria-label="Send accessibility feedback by email"
            >
              Accessibility feedback
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Shared UI primitives -------------------------------------------------

function PageHeader({ eyebrow, title, intro }) {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-12">
      <div
        className="text-[10px] tracking-[0.3em] mb-5"
        style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
      >
        {eyebrow}
      </div>
      <h1
        className="text-5xl md:text-6xl leading-[1.05] mb-6"
        style={{
          fontFamily: "Fraunces, serif",
          fontWeight: 400,
          color: COLORS.forestDark,
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h1>
      {intro && (
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: COLORS.ink, fontFamily: "Newsreader, serif", fontWeight: 300 }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div
          className="text-[10px] tracking-[0.3em] mb-3"
          style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-3xl md:text-4xl"
        style={{
          fontFamily: "Fraunces, serif",
          fontWeight: 400,
          color: COLORS.forestDark,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// --- Home page ------------------------------------------------------------

function Hero({ setPage }) {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ backgroundColor: COLORS.cream, borderColor: COLORS.line }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-4xl">
          <div
            className="text-[10px] tracking-[0.4em] mb-6"
            style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
          >
            EST. {SITE.established} · ARLINGTON, VIRGINIA
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
            style={{
              fontFamily: "Fraunces, serif",
              fontWeight: 400,
              color: COLORS.forestDark,
              letterSpacing: "-0.025em",
            }}
          >
            A neighborhood
            <br />
            <span style={{ fontStyle: "italic", color: COLORS.forest }}>
              worth looking
            </span>{" "}
            after.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
            style={{
              color: COLORS.ink,
              fontFamily: "Newsreader, serif",
              fontWeight: 300,
            }}
          >
            {SITE.mission}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("about")}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide transition-all hover:gap-3"
              style={{
                backgroundColor: COLORS.forest,
                color: COLORS.cream,
                fontFamily: "Newsreader, serif",
              }}
            >
              About the neighborhood <ArrowRight size={15} aria-hidden="true" />
            </button>
            <button
              onClick={() => setPage("events")}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide transition-colors"
              style={{
                border: `1px solid ${COLORS.forest}`,
                color: COLORS.forest,
                fontFamily: "Newsreader, serif",
              }}
            >
              Upcoming events
            </button>
          </div>
        </div>
      </div>

      {/* decorative rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: COLORS.line }}
      />
    </section>
  );
}

function BoundaryMap({ compact = false }) {
  // Map image of Columbia Forest and its immediate neighbors, cropped from
  // the Arlington County GIS viewer. Attribution rendered below.
  return (
    <div
      className="relative"
      style={{
        backgroundColor: COLORS.creamDark,
        border: `1px solid ${COLORS.line}`,
        padding: compact ? "1.25rem" : "1.75rem",
      }}
    >
      <div
        className="text-[10px] tracking-[0.3em] mb-4"
        style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
      >
        NEIGHBORHOOD BOUNDARIES
      </div>
      <img
        src="/columbia-forest-map.png"
        alt="Map of Columbia Forest and surrounding Arlington neighborhoods, with Columbia Forest shaded at center"
        className="w-full h-auto block"
        style={{
          border: `1px solid ${COLORS.line}`,
        }}
      />
      <div
        className="text-xs mt-3 italic"
        style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
      >
        Map:{" "}
        <a
          href="https://experience.arcgis.com/experience/a9990f1fe2924fefac18b6f323ee7c87/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
          style={{ color: COLORS.forest }}
        >
          Arlington County GIS
        </a>
        .
      </div>
    </div>
  );
}

function UpcomingEventsTeaser({ setPage }) {
  const next = [...EVENTS]
    .filter((e) => new Date(e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);

  return (
    <section
      className="border-b"
      style={{ backgroundColor: COLORS.cream, borderColor: COLORS.line }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="WHAT'S NEXT" title="Upcoming in the neighborhood" />
            <button
              onClick={() => setPage("events")}
              className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all mt-4"
              style={{ color: COLORS.forest, fontFamily: "Newsreader, serif" }}
            >
              All events <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="md:col-span-8 space-y-8">
            {next.length === 0 && (
              <p
                className="italic"
                style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
              >
                No events currently scheduled. Upcoming meetings to be announced soon.
              </p>
            )}
            {next.map((e, i) => {
              const d = shortDate(e.date);
              return (
                <div
                  key={i}
                  className="flex gap-6 pb-8 border-b last:border-b-0"
                  style={{ borderColor: COLORS.line }}
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <div
                      className="text-[10px] tracking-[0.2em]"
                      style={{
                        color: COLORS.terracotta,
                        fontFamily: "Newsreader, serif",
                      }}
                    >
                      {d.month}
                    </div>
                    <div
                      className="text-4xl leading-none mt-1"
                      style={{
                        fontFamily: "Fraunces, serif",
                        color: COLORS.forestDark,
                        fontWeight: 400,
                      }}
                    >
                      {d.day}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl mb-1"
                      style={{
                        fontFamily: "Fraunces, serif",
                        fontWeight: 500,
                        color: COLORS.forestDark,
                      }}
                    >
                      {e.title}
                    </h3>
                    <div
                      className="text-sm mb-2 inline-flex items-center gap-3"
                      style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" /> {e.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} aria-hidden="true" /> {e.location}
                      </span>
                    </div>
                    <p
                      className="leading-relaxed"
                      style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
                    >
                      {e.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestNewsTeaser({ setPage }) {
  const latest = [...NEWS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  return (
    <section
      className="border-b"
      style={{ backgroundColor: COLORS.creamDark, borderColor: COLORS.line }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <SectionHeading eyebrow="FROM THE ASSOCIATION" title="Recent notes" />
          <button
            onClick={() => setPage("news")}
            className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all"
            style={{ color: COLORS.forest, fontFamily: "Newsreader, serif" }}
          >
            All news <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {latest.map((n, i) => (
            <article key={i}>
              <div
                className="text-[10px] tracking-[0.2em] mb-3"
                style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
              >
                {formatDate(n.date).toUpperCase()}
              </div>
              <h3
                className="text-xl leading-snug mb-3"
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 500,
                  color: COLORS.forestDark,
                }}
              >
                {n.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                {n.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipCTA({ setPage }) {
  return (
    <section
      className="on-dark"
      style={{ backgroundColor: COLORS.forest, color: COLORS.cream }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-24 text-center">
        <div
          className="text-[10px] tracking-[0.3em] mb-6 opacity-70"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          JOIN YOUR NEIGHBORS
        </div>
        <h2
          className="text-4xl md:text-5xl leading-[1.1] mb-6"
          style={{
            fontFamily: "Fraunces, serif",
            fontWeight: 400,
            letterSpacing: "-0.015em",
          }}
        >
          It just isn't Columbia Forest
          <br />
          <span style={{ fontStyle: "italic", opacity: 0.85 }}>without you.</span>
        </h2>
        <p
          className="text-lg max-w-xl mx-auto mb-10 opacity-85 leading-relaxed"
          style={{ fontFamily: "Newsreader, serif", fontWeight: 300 }}
        >
          CFCA meets roughly every quarter to discuss the issues that shape our
          neighborhood — from parks and pedestrian safety to the Pike, the park,
          and the schools our children walk to.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setPage("contact")}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide transition-all hover:gap-3"
            style={{
              backgroundColor: COLORS.cream,
              color: COLORS.forestDark,
              fontFamily: "Newsreader, serif",
            }}
          >
            Get in touch <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button
            onClick={() => setPage("events")}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-wide transition-colors"
            style={{
              border: `1px solid ${COLORS.cream}`,
              color: COLORS.cream,
              fontFamily: "Newsreader, serif",
            }}
          >
            See upcoming meetings
          </button>
        </div>
      </div>
    </section>
  );
}

function NeighborhoodMapSection({ setPage }) {
  return (
    <section
      className="border-b"
      style={{ backgroundColor: COLORS.creamDark, borderColor: COLORS.line }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <div
              className="text-[10px] tracking-[0.3em] mb-4"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              ARE YOU IN THE NEIGHBORHOOD?
            </div>
            <h2
              className="text-3xl md:text-4xl leading-tight mb-5"
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 400,
                color: COLORS.forestDark,
                letterSpacing: "-0.01em",
              }}
            >
              A diverse neighborhood in Arlington,{" "}
              <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                on the west end of the Pike.
              </span>
            </h2>
            <p
              className="leading-relaxed mb-4"
              style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
            >
              Columbia Forest is bounded by{" "}
              <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                Columbia Pike
              </span>{" "}
              to the north,{" "}
              <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                Four Mile Run
              </span>{" "}
              to the east,{" "}
              <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                South George Mason Drive
              </span>{" "}
              to the south, and{" "}
              <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                the Arlington County line
              </span>{" "}
              to the west.
            </p>
            <p
              className="leading-relaxed text-sm"
              style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
            >
              Not sure if your home falls inside? The highlighted area on the map
              shows Columbia Forest in relation to Arlington Mill, Forest Glen, and
              Claremont.
            </p>
            <button
              onClick={() => setPage("about")}
              className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all mt-5"
              style={{ color: COLORS.forest, fontFamily: "Newsreader, serif" }}
            >
              More about the neighborhood <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="md:col-span-8">
            <img
              src="/columbia-forest-map.png"
              alt="Map of Columbia Forest and surrounding Arlington neighborhoods, with Columbia Forest shaded at center"
              className="w-full h-auto block"
              style={{ border: `1px solid ${COLORS.line}` }}
            />
            <div
              className="text-xs mt-3 italic"
              style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
            >
              Map:{" "}
              <a
                href="https://experience.arcgis.com/experience/a9990f1fe2924fefac18b6f323ee7c87/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
                style={{ color: COLORS.forest }}
              >
                Arlington County GIS
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <NeighborhoodMapSection setPage={setPage} />
      <UpcomingEventsTeaser setPage={setPage} />
      <LatestNewsTeaser setPage={setPage} />
      <MembershipCTA setPage={setPage} />
    </>
  );
}

// --- About page -----------------------------------------------------------

function AboutPage({ setPage }) {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT CFCA"
        title="A small neighborhood with a long memory."
        intro={`${SITE.mission}`}
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div
          className="border-t pt-12 pb-16 grid md:grid-cols-3 gap-8"
          style={{ borderColor: COLORS.line }}
        >
          <div>
            <div
              className="text-[10px] tracking-[0.3em] mb-2"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              ESTABLISHED
            </div>
            <div
              className="text-4xl"
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 400,
                color: COLORS.forestDark,
              }}
            >
              {SITE.established}
            </div>
          </div>
          <div>
            <div
              className="text-[10px] tracking-[0.3em] mb-2"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              LOCATION
            </div>
            <div
              className="text-2xl leading-tight"
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 400,
                color: COLORS.forestDark,
              }}
            >
              Arlington, VA {SITE.zip}
            </div>
          </div>
          <div>
            <div
              className="text-[10px] tracking-[0.3em] mb-2"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              AFFILIATIONS
            </div>
            <div
              className="text-sm leading-relaxed"
              style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
            >
              Arlington County Civic Federation · Columbia Pike Partnership · West
              Pike Neighborhoods
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="py-12">
          <SectionHeading eyebrow="OUR MISSION" title="What we do, and why." />
          <div
            className="prose max-w-none"
            style={{
              fontFamily: "Newsreader, serif",
              color: COLORS.ink,
            }}
          >
            <p className="text-lg leading-relaxed mb-5">
              The Columbia Forest Civic Association has represented the residents,
              property owners, and businesses of our neighborhood since {SITE.established}.
            </p>
            <p className="text-lg leading-relaxed mb-5">
              We're a non-profit, non-partisan volunteer organization. We meet
              roughly every quarter to hear from neighbors, host speakers from
              County government and community groups, and formulate positions on
              the matters that affect daily life in Columbia Forest — schools,
              streets, parks, zoning, and the long, slow evolution of Columbia
              Pike.
            </p>
            <p className="text-lg leading-relaxed">
              CFCA is a member of the Arlington County Civic Federation and
              participates in the Columbia Pike Partnership and the West Pike
              neighborhoods collaboration with Barcroft and Arlington Mill.
            </p>
          </div>
        </div>

        {/* History / Historic District */}
        <div className="py-12 border-t" style={{ borderColor: COLORS.line }}>
          <SectionHeading
            eyebrow="HISTORY"
            title="A wartime neighborhood, still going strong."
          />
          <div className="grid md:grid-cols-12 gap-10">
            <div
              className="md:col-span-7"
              style={{ fontFamily: "Newsreader, serif", color: COLORS.ink }}
            >
              <p className="text-lg leading-relaxed mb-5">
                The land under Columbia Forest has passed through a remarkable
                succession of owners. Originally part of a 6,000-acre grant to sea
                captain Robert Howson in 1669, it was sold to John Alexander — the
                family for whom the City of Alexandria is named — and eventually
                acquired by{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  George Washington
                </span>{" "}
                in 1774. At his death the land passed to his relative George Custis,
                whose Arlington Plantation gave the county its present name.
              </p>
              <p className="text-lg leading-relaxed mb-5">
                For a long time afterward, this was rural farmland. That changed
                quickly in 1941. With the opening of the Pentagon and the U.S.
                entry into the Second World War, Washington needed housing for
                young military officers and ranking officials — fast, and close to
                bus transit. The Defense Housing Corporation stepped in. Between
                1942 and 1945, the U.S. Army Corps of Engineers erected{" "}
                {SITE.stats.buildings} paired brick and concrete-block dwellings in
                the Colonial Revival style across forty-eight acres here, part of
                only 40,000 housing units built nationwide during the war. The
                street layout conformed to the topography, space was allocated for
                parks, and care was taken to save existing trees.
              </p>
              <p className="text-lg leading-relaxed mb-5">
                The Civic Association itself{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  predates the houses.
                </span>{" "}
                CFCA was organized in {SITE.established} — a year before the first
                shovel hit the ground. For decades, two separate associations
                operated side by side: one for the original Columbia Forest
                development, and one for the adjacent Virginia Heights subdivision
                added in 1947. The two were eventually merged to form today's
                Columbia Forest Civic Association.
              </p>
              <p className="text-lg leading-relaxed mb-5">
                The quiet character of the interior neighborhood held up remarkably
                well until 1974, when a new bridge across Four Mile Run connected
                our stretch of South George Mason Drive to the rest of Arlington
                and, via Fairfax County, to Route 7. Overnight the neighborhood
                became a cut-through: traffic on interior streets jumped from a
                trickle to over 5,000 vehicles a day. Traffic calming and
                pedestrian safety have been central to the Association's work ever
                since.
              </p>
              <p className="text-lg leading-relaxed">
                In {SITE.stats.listedNRHP}, Columbia Forest was listed on the
                National Register of Historic Places as the{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  Columbia Forest Historic District
                </span>
                . Today the neighborhood is home to a mix of single-family homes,
                duplexes, townhouses, apartments, and condominiums — roughly
                forty-six hundred residents packed into a tightly-knit 0.22 square
                miles.
              </p>
            </div>
            <aside className="md:col-span-5">
              <div
                className="p-6"
                style={{
                  backgroundColor: COLORS.creamDark,
                  border: `1px solid ${COLORS.line}`,
                }}
              >
                <div
                  className="text-[10px] tracking-[0.3em] mb-4"
                  style={{
                    color: COLORS.terracotta,
                    fontFamily: "Newsreader, serif",
                  }}
                >
                  COLUMBIA FOREST HISTORIC DISTRICT
                </div>
                <dl
                  className="space-y-3 text-sm"
                  style={{ fontFamily: "Newsreader, serif", color: COLORS.ink }}
                >
                  <div className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: COLORS.line }}>
                    <dt style={{ color: COLORS.stone }}>Built</dt>
                    <dd style={{ color: COLORS.forestDark }}>1942–1945</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: COLORS.line }}>
                    <dt style={{ color: COLORS.stone }}>Architectural style</dt>
                    <dd style={{ color: COLORS.forestDark }}>Colonial Revival</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: COLORS.line }}>
                    <dt style={{ color: COLORS.stone }}>Contributing buildings</dt>
                    <dd style={{ color: COLORS.forestDark }}>{SITE.stats.buildings}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: COLORS.line }}>
                    <dt style={{ color: COLORS.stone }}>Area</dt>
                    <dd style={{ color: COLORS.forestDark }}>48 acres</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: COLORS.line }}>
                    <dt style={{ color: COLORS.stone }}>Built by</dt>
                    <dd style={{ color: COLORS.forestDark }}>U.S. Army Corps of Engineers</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt style={{ color: COLORS.stone }}>Listed on NRHP</dt>
                    <dd style={{ color: COLORS.forestDark }}>{SITE.stats.listedNRHP}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>

        {/* Landmarks */}
        <div className="py-12 border-t" style={{ borderColor: COLORS.line }}>
          <SectionHeading
            eyebrow="LANDMARKS"
            title="Small places worth noticing."
          />
          <p
            className="text-lg leading-relaxed max-w-3xl mb-10"
            style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
          >
            A short walk around Columbia Forest turns up a surprising amount of
            history — some of it older than Arlington itself.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div
                className="text-[10px] tracking-[0.3em] mb-3"
                style={{
                  color: COLORS.terracotta,
                  fontFamily: "Newsreader, serif",
                }}
              >
                1791 · S. JEFFERSON ST
              </div>
              <h3
                className="text-2xl mb-3"
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 400,
                  color: COLORS.forestDark,
                  letterSpacing: "-0.01em",
                }}
              >
                SW Number 6 Boundary Stone
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                One of the original stones placed in 1791 to mark the boundaries of
                the District of Columbia. It sits in the median strip of South
                Jefferson Street, enclosed in a small wrought-iron fence dedicated
                by the Daughters of the American Revolution. Older than the
                neighborhood, older than Arlington County itself.
              </p>
            </div>
            <div>
              <div
                className="text-[10px] tracking-[0.3em] mb-3"
                style={{
                  color: COLORS.terracotta,
                  fontFamily: "Newsreader, serif",
                }}
              >
                1948 · THROUGHOUT
              </div>
              <h3
                className="text-2xl mb-3"
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 400,
                  color: COLORS.forestDark,
                  letterSpacing: "-0.01em",
                }}
              >
                Five Lustron Houses
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                Columbia Forest is home to five Lustron houses — prefabricated
                porcelain-enameled steel homes shipped flat and bolted together on
                site as a post-war housing experiment. Fewer than 3,000 were ever
                built nationwide; Lustrons in other parts of the country are listed
                on the National Register.
              </p>
            </div>
            <div>
              <div
                className="text-[10px] tracking-[0.3em] mb-3"
                style={{
                  color: COLORS.terracotta,
                  fontFamily: "Newsreader, serif",
                }}
              >
                1997 · S. 10TH ST
              </div>
              <h3
                className="text-2xl mb-3"
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 400,
                  color: COLORS.forestDark,
                  letterSpacing: "-0.01em",
                }}
              >
                Bailey's Branch Park
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                An acre-and-a-half park tucked between South Columbus and South
                Frederick Streets, built above a portion of the Bailey's Branch
                stream. The tot lot arrived in 1997 and playground equipment,
                landscaping, and benches followed in 1999 — and it has been the
                heart of the neighborhood's outdoor life ever since.
              </p>
            </div>
          </div>
        </div>

        {/* Neighborhood Goals (from 2000 NC Plan) */}
        <div className="py-12 border-t" style={{ borderColor: COLORS.line }}>
          <SectionHeading
            eyebrow="NEIGHBORHOOD GOALS"
            title="What we work toward."
          />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p
                className="text-lg leading-relaxed mb-5"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                Columbia Forest adopted seven neighborhood goals as part of its{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  2000 Neighborhood Conservation Plan
                </span>
                . They remain a good description of what the Association works
                toward today.
              </p>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                The full Conservation Plan — a 60-page document with chapters on
                history, land use, traffic, parks, and beautification — is
                available on the{" "}
                <button
                  onClick={() => setPage("documents")}
                  style={{
                    color: COLORS.forest,
                    fontStyle: "italic",
                    textDecoration: "underline",
                    background: "none",
                    border: 0,
                    padding: 0,
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Documents page
                </button>
                .
              </p>
            </div>
            <ol
              className="md:col-span-7 space-y-5"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {[
                "Maintain a balanced mix of housing options and foster opportunities for home ownership.",
                "Ensure pedestrian safety through better sidewalks, street design, and lighting.",
                "Support variety and safety in transportation — calmer streets, convenient transit, and safer bicycling.",
                "Expand access to parks and establish community stewardship of Four Mile Run and Bailey's Branch.",
                "Improve livability and appearance through beautification, tree preservation, litter control, and code enforcement.",
                "Build a strong Columbia Forest identity through neighborhood signs and shared spaces.",
                "Promote community involvement.",
              ].map((goal, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex-shrink-0 text-2xl leading-none"
                    style={{
                      fontFamily: "Fraunces, serif",
                      color: COLORS.terracotta,
                      fontWeight: 400,
                      minWidth: "1.5rem",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-lg leading-relaxed"
                    style={{ color: COLORS.ink }}
                  >
                    {goal}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Officers */}
        <div className="py-12 border-t" style={{ borderColor: COLORS.line }}>
          <SectionHeading eyebrow="BOARD" title="Officers & committee chairs" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
            {OFFICERS.map((o, i) => (
              <div key={i}>
                <div
                  className="text-[10px] tracking-[0.2em] mb-1"
                  style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
                >
                  {o.role.toUpperCase()}
                </div>
                <div
                  className="text-xl"
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontWeight: 500,
                    color: COLORS.forestDark,
                  }}
                >
                  {o.name}
                </div>
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    aria-label={`Email ${o.name}, ${o.role}, at ${o.email}`}
                    className="text-sm inline-flex items-center gap-1 mt-1 transition-opacity hover:opacity-70"
                    style={{ color: COLORS.forest, fontFamily: "Newsreader, serif" }}
                  >
                    <Mail size={12} aria-hidden="true" /> {o.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Boundaries */}
        <div className="py-12 border-t" style={{ borderColor: COLORS.line }}>
          <SectionHeading eyebrow="GEOGRAPHY" title="Where we live." />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p
                className="text-lg leading-relaxed mb-5"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                Columbia Forest sits near the western edge of Arlington County,
                bounded by{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  {SITE.boundaries.north}
                </span>{" "}
                to the north,{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  {SITE.boundaries.east}
                </span>{" "}
                to the east,{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  {SITE.boundaries.south}
                </span>{" "}
                to the south, and{" "}
                <span style={{ fontStyle: "italic", color: COLORS.forest }}>
                  {SITE.boundaries.west}
                </span>{" "}
                to the west.
              </p>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                It is one of three "West Pike" neighborhoods — alongside Barcroft and
                Arlington Mill — and is home to Bailey's Branch Park, the heart of
                our outdoor life.
              </p>
            </div>
            <BoundaryMap />
          </div>
        </div>
      </div>
    </>
  );
}

// --- Events page ----------------------------------------------------------

function EventsPage() {
  const sorted = [...EVENTS].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <>
      <PageHeader
        eyebrow="EVENTS"
        title="Upcoming gatherings."
        intro="Quarterly meetings, neighborhood workdays, and the occasional food truck."
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-12">
        <div className="border-t" style={{ borderColor: COLORS.line }}>
          {sorted.length === 0 && (
            <p
              className="py-16 text-lg italic text-center"
              style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
            >
              Upcoming meetings to be announced soon.
            </p>
          )}
          {sorted.map((e, i) => {
            const d = shortDate(e.date);
            return (
              <div
                key={i}
                className="flex gap-8 py-10 border-b"
                style={{ borderColor: COLORS.line }}
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div
                    className="text-xs tracking-[0.2em]"
                    style={{
                      color: COLORS.terracotta,
                      fontFamily: "Newsreader, serif",
                    }}
                  >
                    {d.month}
                  </div>
                  <div
                    className="text-5xl leading-none mt-1"
                    style={{
                      fontFamily: "Fraunces, serif",
                      color: COLORS.forestDark,
                      fontWeight: 400,
                    }}
                  >
                    {d.day}
                  </div>
                </div>
                <div className="flex-1">
                  <h2
                    className="text-2xl mb-2"
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontWeight: 500,
                      color: COLORS.forestDark,
                    }}
                  >
                    {e.title}
                  </h2>
                  <div
                    className="text-sm mb-3 flex flex-wrap gap-x-5 gap-y-1"
                    style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" /> {formatDate(e.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" /> {e.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} aria-hidden="true" /> {e.location}
                    </span>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
                  >
                    {e.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// --- News page ------------------------------------------------------------

function NewsPage() {
  const sorted = [...NEWS].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <>
      <PageHeader
        eyebrow="NEWS & NOTES"
        title="From the association."
        intro="Updates, announcements, and the occasional piece of neighborhood history."
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-12">
        <div className="border-t" style={{ borderColor: COLORS.line }}>
          {sorted.map((n, i) => (
            <article
              key={i}
              className="py-10 border-b"
              style={{ borderColor: COLORS.line }}
            >
              <div
                className="text-[10px] tracking-[0.3em] mb-3"
                style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
              >
                {formatDate(n.date).toUpperCase()}
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-4"
                style={{
                  fontFamily: "Fraunces, serif",
                  fontWeight: 400,
                  color: COLORS.forestDark,
                  letterSpacing: "-0.01em",
                }}
              >
                {n.title}
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
              >
                {n.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

// --- Projects page --------------------------------------------------------

function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PROJECTS & ADVOCACY"
        title="What we're working on."
        intro="The issues, places, and partnerships that make up the CFCA's day-to-day civic work."
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-12">
        <div className="border-t" style={{ borderColor: COLORS.line }}>
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className="py-12 border-b"
              style={{ borderColor: COLORS.line }}
            >
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h2
                    className="text-2xl md:text-3xl leading-tight"
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontWeight: 400,
                      color: COLORS.forestDark,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p
                    className="text-lg italic mb-4"
                    style={{ color: COLORS.forest, fontFamily: "Newsreader, serif" }}
                  >
                    {p.summary}
                  </p>
                  <p
                    className="leading-relaxed"
                    style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
                  >
                    {p.body}
                  </p>
                  {p.link && (
                    <a
                      href={p.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.link.label} (opens in a new tab)`}
                      className="inline-flex items-center gap-2 mt-5 text-sm transition-all hover:gap-3"
                      style={{
                        color: COLORS.forest,
                        fontFamily: "Newsreader, serif",
                      }}
                    >
                      {p.link.label}
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// --- Documents page -------------------------------------------------------

function DocumentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="GOVERNING DOCUMENTS"
        title="The paperwork."
        intro="The formal record of how CFCA operates — bylaws, plans, and minutes of recent meetings."
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-12">
        <div className="border-t" style={{ borderColor: COLORS.line }}>
          {DOCUMENTS.map((doc, i) => {
            const isPlaceholder = doc.url === "#";
            const ariaLabel = isPlaceholder
              ? `${doc.title} — coming soon`
              : `${doc.title}, ${doc.type}, opens in a new tab`;
            return (
              <a
                key={i}
                href={isPlaceholder ? undefined : doc.url}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                aria-label={ariaLabel}
                aria-disabled={isPlaceholder ? "true" : undefined}
                className="flex items-start justify-between py-6 border-b hover:opacity-70 transition-opacity"
                style={{
                  borderColor: COLORS.line,
                  opacity: isPlaceholder ? 0.55 : 1,
                  cursor: isPlaceholder ? "not-allowed" : "pointer",
                }}
                onClick={(e) => {
                  if (isPlaceholder) e.preventDefault();
                }}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <FileText
                    size={18}
                    aria-hidden="true"
                    className="mt-1 flex-shrink-0"
                    style={{ color: COLORS.terracotta }}
                  />
                  <div className="min-w-0">
                    <div
                      className="text-lg"
                      style={{
                        fontFamily: "Fraunces, serif",
                        fontWeight: 500,
                        color: COLORS.forestDark,
                      }}
                    >
                      {doc.title}
                    </div>
                    {doc.description && (
                      <p
                        className="text-sm leading-relaxed mt-1"
                        style={{
                          color: COLORS.ink,
                          fontFamily: "Newsreader, serif",
                        }}
                      >
                        {doc.description}
                      </p>
                    )}
                    <div
                      className="text-xs mt-1.5"
                      style={{ color: COLORS.stone, fontFamily: "Newsreader, serif" }}
                    >
                      {doc.type} ·{" "}
                      {isPlaceholder ? "Coming soon" : `Updated ${doc.updated}`}
                      {doc.attribution && !isPlaceholder && (
                        <> · Courtesy of {doc.attribution}</>
                      )}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="flex-shrink-0 ml-4 mt-1"
                  style={{ color: COLORS.forest }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

// --- Contact page ---------------------------------------------------------

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="We'd like to hear from you."
        intro="Questions, concerns, or interest in getting involved — email the board or reach out through one of the channels below."
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-16">
        <div
          className="border-t pt-12 grid md:grid-cols-2 gap-10"
          style={{ borderColor: COLORS.line }}
        >
          <div>
            <div
              className="text-[10px] tracking-[0.3em] mb-3"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              EMAIL THE BOARD
            </div>
            <a
              href={`mailto:${SITE.email}`}
              aria-label={`Email CFCA at ${SITE.email}`}
              className="text-2xl md:text-3xl break-all hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 400,
                color: COLORS.forestDark,
              }}
            >
              {SITE.email}
            </a>
            <p
              className="mt-5 leading-relaxed"
              style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
            >
              For general inquiries, membership questions, or to suggest a topic for
              an upcoming meeting. We do our best to respond within a week.
            </p>
          </div>

          <div>
            <div
              className="text-[10px] tracking-[0.3em] mb-3"
              style={{ color: COLORS.terracotta, fontFamily: "Newsreader, serif" }}
            >
              REPORT A PROBLEM
            </div>
            <p
              className="leading-relaxed mb-4"
              style={{ color: COLORS.ink, fontFamily: "Newsreader, serif" }}
            >
              For issues like potholes, downed trees, missed trash pickup, or street
              lights — these go directly to Arlington County, who can actually fix
              them.
            </p>
            <a
              href="https://www.arlingtonva.us/Government/Topics/Report-Problem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Report a Problem to Arlington County (opens in a new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm tracking-wide transition-all hover:gap-3"
              style={{
                backgroundColor: COLORS.forest,
                color: COLORS.cream,
                fontFamily: "Newsreader, serif",
              }}
            >
              Arlington County: Report a Problem{" "}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// --- App ------------------------------------------------------------------

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isPopping = useRef(false);   // true while a popstate restore is in flight
  const hasMounted = useRef(false);  // false on first render so we replaceState instead of pushState

  useGoogleFonts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  /* ---------- Browser history sync ----------
     Pushes a history entry on every page change so Back/Forward work.
     isPopping suppresses the reciprocal pushState when popstate restores state. */
  useEffect(() => {
    if (isPopping.current) {
      isPopping.current = false;
      return;
    }
    if (!hasMounted.current) {
      window.history.replaceState({ page }, "");
      hasMounted.current = true;
    } else {
      window.history.pushState({ page }, "");
    }
  }, [page]);

  useEffect(() => {
    const handlePop = (e) => {
      const s = e.state;
      if (!s) return;
      isPopping.current = true;
      setPage(s.page ?? "home");
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  let content;
  switch (page) {
    case "about":
      content = <AboutPage setPage={setPage} />;
      break;
    case "events":
      content = <EventsPage />;
      break;
    case "news":
      content = <NewsPage />;
      break;
    case "projects":
      content = <ProjectsPage />;
      break;
    case "documents":
      content = <DocumentsPage />;
      break;
    case "contact":
      content = <ContactPage />;
      break;
    case "home":
    default:
      content = <HomePage setPage={setPage} />;
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.cream,
        color: COLORS.ink,
        fontFamily: "Newsreader, serif",
        minHeight: "100vh",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2"
        style={{
          backgroundColor: COLORS.forestDark,
          color: COLORS.cream,
          fontFamily: "Newsreader, serif",
          outline: `2px solid ${COLORS.cream}`,
          outlineOffset: "2px",
        }}
      >
        Skip to main content
      </a>
      <Header page={page} setPage={setPage} setMobileOpen={setMobileOpen} />
      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        page={page}
        setPage={setPage}
      />
      <main id="main-content" tabIndex={-1}>
        {content}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
