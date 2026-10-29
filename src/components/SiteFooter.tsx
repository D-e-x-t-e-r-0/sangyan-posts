import Link from "next/link";
import { NAV_LINKS, SITE } from "@/content/site";
import { IconArrowUpRight } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-kicker">The publication</span>
          <Link href="/" className="footer-wordmark">
            {SITE.brand} <span>{SITE.section}</span>
          </Link>
          <p className="footer-blurb">
            The official posts archive of the {SITE.eventName}. Winners, media,
            announcements, and the ideas that outlast the sprint.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Desks</span>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <span className="footer-heading">Elsewhere</span>
          <a
            href={SITE.hackathonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Hackathon site <IconArrowUpRight size={10} />
          </a>
          <a
            href={SITE.problemStatementUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Problem statement <IconArrowUpRight size={10} />
          </a>
          <Link href="/#archive" className="footer-link">
            Full archive
          </Link>
        </div>
      </div>

      <div className="footer-logos">
        <span className="footer-logos-label">Organised by</span>
        <div className="footer-logo-row">
          <div
            className="footer-logo logo-sntc"
            role="img"
            aria-label="SNTC, IIT (BHU) Varanasi"
          />
          <div
            className="footer-logo logo-sebi"
            role="img"
            aria-label="Securities and Exchange Board of India"
          />
          <div className="footer-logo logo-nsdl" role="img" aria-label="NSDL" />
        </div>
        <span className="footer-logos-note">
          {SITE.organisation} · in collaboration with {SITE.collaborators}
        </span>
      </div>

      <div className="footer-monogram" aria-hidden="true">
        {SITE.brand} {SITE.section}
      </div>

      <div className="footer-bottom">
        <span>
          © {SITE.year} SNTC, IIT (BHU) Varanasi · SEBI · NSDL
        </span>
        <span>Compiled in Varanasi, India</span>
        <span>{SITE.volume} · {SITE.edition}</span>
      </div>
    </footer>
  );
}
