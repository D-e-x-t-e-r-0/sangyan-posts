/* ─────────────────────────────────────────────────────────────
   SITE CONFIG — SANGYAN Posts only.
   Change the brand strings here if the final name changes.
   ───────────────────────────────────────────────────────────── */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sangyan.copsiitbhu.co.in";

export const SITE = {
  brand: "SANGYAN",
  section: "POSTS",
  fullName: "SANGYAN Posts",
  eventName: "SANGYAN Investor Resilience Hackathon",
  tagline: "The official posts archive of SANGYAN 2026",
  description:
    "SANGYAN Posts is the official dispatch archive of the SANGYAN Investor Resilience Hackathon 2026 — winners, media coverage, announcements, and stories from SNTC, IIT (BHU) Varanasi with SEBI and NSDL.",
  hackathonUrl: "https://sangyan.copsiitbhu.co.in",
  problemStatementUrl: "https://sangyan.copsiitbhu.co.in/ps",
  organisation: "SNTC, IIT (BHU) Varanasi",
  collaborators: "SEBI & NSDL",
  year: "2026",
  volume: "VOL. 01",
  edition: "OCT 2026",
  place: "VARANASI, IN",
};

export const NAV_LINKS = [
  { label: "All Posts", href: "/" },
  { label: "Winners", href: "/?category=winners" },
  { label: "Media", href: "/?category=media" },
  { label: "Announcements", href: "/?category=announcements" },
  { label: "Stories", href: "/?category=stories" },
];
