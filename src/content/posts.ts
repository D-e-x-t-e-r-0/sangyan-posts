/* ─────────────────────────────────────────────────────────────
   POSTS — the newsroom content source.

   To publish: add an entry to POSTS, point `cover` at an image in
   public/posts/ (or any /public path), and deploy. Optionally set
   `hero` to art-only artwork for the homepage slideshow and the
   article banner; `cover` is used when `hero` is omitted. Posts sort
   by date automatically.
   ───────────────────────────────────────────────────────────── */

export type PostCategory = "winners" | "media" | "announcements" | "stories";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  ticker: string;
  excerpt: string;
  category: PostCategory;
  date: string; // YYYY-MM-DD
  author: string;
  cover: string;
  coverAlt: string;
  /** Wide, art-only image for the homepage slideshow and article banner. */
  hero?: string;
  tags: string[];
  featured?: boolean;
  body: PostBlock[];
}

export interface CategoryMeta {
  label: string;
  code: string;
  color: string;
  blurb: string;
}

export const CATEGORY_META: Record<PostCategory, CategoryMeta> = {
  winners: {
    label: "Winners",
    code: "WIN",
    color: "#7c1522",
    blurb: "Podium announcements, team profiles, and jury citations.",
  },
  media: {
    label: "Media",
    code: "MED",
    color: "#b07c1e",
    blurb: "Press coverage, photo essays, and downloadable media assets.",
  },
  announcements: {
    label: "Announcements",
    code: "ANN",
    color: "#2f6b2f",
    blurb: "Official updates from the organising committee.",
  },
  stories: {
    label: "Stories",
    code: "STR",
    color: "#2f5d7c",
    blurb: "Context, data, and the thinking behind the challenge.",
  },
};

export const CATEGORY_ORDER: PostCategory[] = [
  "winners",
  "media",
  "announcements",
  "stories",
];

export const POSTS: Post[] = [
  {
    slug: "sangyan-2026-winners-announced",
    title: "SANGYAN 2026 — Winners Announced",
    ticker: "WINNERS ANNOUNCED",
    excerpt:
      "Three teams take the podium after seven days of building for India's investors, with ₹1,70,000 in prizes awarded.",
    category: "winners",
    date: "2026-10-08",
    author: "SANGYAN Newsroom",
    cover: "/posts/winners-first-place.jpg",
    coverAlt:
      "The SANGYAN 2026 first-place team holding a ₹1,00,000 winner's cheque on stage at Swatantrata Bhawan, IIT (BHU) Varanasi.",
    tags: ["Winners", "Jury", "Results"],
    body: [
      {
        type: "p",
        text: "SANGYAN 2026 has concluded. After a seven-day build sprint, a shortlisting round, and a final jury presentation at Swatantrata Bhawan, IIT (BHU) Varanasi, three teams have been recognised for work that meaningfully strengthens investor resilience.",
      },
      {
        type: "p",
        text: "The prizes were awarded as follows: first place ₹1,00,000, second place ₹50,000, and third place ₹20,000. Every registered participant, winning or not, receives a certificate of participation.",
      },
      { type: "h2", text: "The podium" },
      {
        type: "p",
        text: "Winning team names, project summaries, and jury citations are being finalised and will be published on this page. Each winning build will receive a full profile covering the problem it addresses, the product it shipped, and the path it could take beyond the hackathon.",
      },
      {
        type: "quote",
        text: "The brief was never to build a fintech product. It was to help a first-time investor lose less, decide rationally, and understand what they are getting into.",
      },
      { type: "h2", text: "What happens next" },
      {
        type: "p",
        text: "This newsroom will carry the winners' showcase, team interviews, and media coverage as they are confirmed. For press enquiries and high-resolution assets, use the media page once it is published.",
      },
      {
        type: "p",
        text: "To every team that registered, built, and presented: thank you. The work does not end at the podium.",
      },
    ],
  },
  {
    slug: "inside-the-winning-builds",
    title: "Inside the Winning Builds: What the Jury Saw",
    ticker: "INSIDE THE WINNING BUILDS",
    excerpt:
      "A closer look at the products that cleared the shortlist, and the criteria the jury weighed before the final round.",
    category: "winners",
    date: "2026-10-07",
    author: "SNTC Media Desk",
    cover: "/posts/winners-first-place.jpg",
    coverAlt:
      "The winning team at the SANGYAN 2026 awards ceremony with their ₹1,00,000 prize cheque.",
    tags: ["Jury", "Product", "Evaluation"],
    featured: true,
    body: [
      {
        type: "p",
        text: "Shortlisting reduced the field to a small set of teams, each given a final window before the jury. The presentations were judged less on ambition and more on whether a real user would be measurably safer after using the product.",
      },
      { type: "h2", text: "What carried weight" },
      {
        type: "list",
        items: [
          "Resilience and safety impact — does the product help a user avoid fraud, avoid loss, or build safer financial behaviour?",
          "Tier-2 and Tier-3 usability — regional-language support, low-bandwidth readiness, and low cognitive load.",
          "Guardrail compliance — no tips, no signals, no monetisation funnel, and clear disclosure of uncertainty.",
          "Technical execution — technology used effectively rather than added for novelty.",
          "Feasibility — could the product extend beyond the hackathon into something real investors use?",
        ],
      },
      {
        type: "p",
        text: "The strongest submissions tended to choose one user journey and follow it all the way through. Depth beat breadth in almost every room.",
      },
      { type: "h2", text: "Team profiles coming" },
      {
        type: "p",
        text: "Full write-ups for the three winning teams are in preparation. Each profile will document the build, the demo scenario, and the design decisions that made the product legible to a first-time investor.",
      },
    ],
  },
  {
    slug: "sangyan-in-the-press",
    title: "SANGYAN in the Press: Coverage Roundup",
    ticker: "PRESS ROUNDUP",
    excerpt:
      "Where the hackathon has been covered, and how to request interviews, images, and the official media kit.",
    category: "media",
    date: "2026-10-06",
    author: "SANGYAN Newsroom",
    cover: "/posts/guest-felicitate.jpg",
    coverAlt:
      "NSDL MD Vijay Chandok presents a memento to SEBI Whole Time Member Kamlesh Chandra Varshney at World Investor Week 2026 at Swatantrata Bhawan, IIT (BHU) Varanasi.",
    tags: ["Press", "Media kit", "Coverage"],
    body: [
      {
        type: "p",
        text: "Coverage of SANGYAN 2026 is being collected here. This page is the canonical index for articles, interviews, and broadcast segments featuring the hackathon and its participants.",
      },
      { type: "h2", text: "For journalists" },
      {
        type: "p",
        text: "A media kit with the SANGYAN wordmark, organiser and collaborator logos, event photography, and a fact sheet will be available for download from the media page. Until then, the organisers can be reached through SNTC, IIT (BHU) Varanasi.",
      },
      {
        type: "list",
        items: [
          "Event: SANGYAN — Investor Resilience Hackathon 2026",
          "Dates: 01–07 October 2026",
          "Organiser: SNTC, IIT (BHU) Varanasi",
          "Organiser role: Conducted the hackathon and supported SEBI & NSDL at the offline event",
          "Venue: Swatantrata Bhawan, IIT (BHU) Varanasi",
          "Format: 7-day build sprint, 5 focus tracks plus 1 open track",
          "Prize pool: ₹1,70,000 across the top three teams",
        ],
      },
      {
        type: "p",
        text: "Coverage links will be added as they go live. To submit a correction or a new link, contact the newsroom.",
      },
    ],
  },
  {
    slug: "problem-statement-archive",
    title: "Problem Statement Archive Now Public",
    ticker: "ARCHIVE RELEASED",
    excerpt:
      "The full SANGYAN brief, including all six tracks and the guardrails every submission had to respect, is now openly available.",
    category: "announcements",
    date: "2026-10-05",
    author: "Organising Committee",
    cover: "/posts/problem-statement.jpg",
    coverAlt:
      "Cover of the SANGYAN Problem Statement and Participant Charter, presented by SNTC, IIT (BHU) Varanasi, with SEBI and NSDL.",
    tags: ["Archive", "Problem statement", "Open access"],
    body: [
      {
        type: "p",
        text: "The SANGYAN 2026 problem statement is now part of the public archive. It documents the five focus tracks, the open innovation track, the target personas, and the non-negotiable guardrails that shaped every submission.",
      },
      {
        type: "p",
        text: "The brief remains useful beyond the hackathon: it is a compact map of the investor-protection problems that software can realistically address, written for teams who want to keep building.",
      },
      { type: "h2", text: "Read the brief" },
      {
        type: "p",
        text: "The full document is available on the SANGYAN hackathon site. It is free to read, cite, and build against.",
      },
      {
        type: "quote",
        text: "Access to markets has outrun access to financial confidence. The gap is the product opportunity.",
      },
      { type: "h2", text: "Licensing and reuse" },
      {
        type: "p",
        text: "Intellectual property in hackathon submissions vests in NSDL per the Terms and Conditions. The problem statement itself may be referenced with attribution to SNTC, IIT (BHU) Varanasi, SEBI, and NSDL.",
      },
    ],
  },
  {
    slug: "the-numbers-behind-investor-resilience",
    title: "The Numbers Behind Investor Resilience",
    ticker: "THE NUMBERS",
    excerpt:
      "Sixteen crore Demat accounts, nine in ten F&O traders in loss, and a fraud economy that runs every day. The data that framed the challenge.",
    category: "stories",
    date: "2026-10-04",
    author: "SANGYAN Newsroom",
    cover: "/posts/event-poster.jpg",
    coverAlt:
      "SANGYAN event poster featuring the hackathon brief and build-sprint dates.",
    tags: ["Data", "SEBI", "Investor behaviour"],
    body: [
      {
        type: "p",
        text: "The hackathon brief opened with a set of numbers that are easy to read past. Together they describe a market that has expanded faster than the confidence of the people entering it.",
      },
      { type: "h2", text: "The scale" },
      {
        type: "list",
        items: [
          "Demat accounts in India have crossed 16 crore, with more than 70% of incremental accounts opening from Tier-2 and Tier-3 cities.",
          "SEBI data shows 9 out of 10 individual traders in equity F&O incur net losses.",
          "Estimates cited in the brief put daily fraud losses at roughly ₹12,000 crore.",
        ],
      },
      {
        type: "p",
        text: "Each number is a design constraint. A product built for a metro user with an English-language interface and reliable broadband does not reach the investor who is actually entering the market.",
      },
      {
        type: "quote",
        text: "The user is not a portfolio. The user is someone deciding whether to trust a message, a platform, or a person.",
      },
      { type: "h2", text: "Why behaviour matters" },
      {
        type: "p",
        text: "Resilience is not only fraud detection. It is the pause before an impulsive trade, the ability to read a disclosure, and the knowledge that a grievance mechanism exists. Those are product problems, and they are still open.",
      },
    ],
  },
  {
    slug: "seven-days-at-iit-bhu",
    title: "Photo Essay: Seven Days at IIT (BHU)",
    ticker: "SEVEN DAYS IN VARANASI",
    excerpt:
      "Whiteboard sessions, late-night demos, and the final jury round — a visual record of the build sprint at Swatantrata Bhawan, IIT (BHU) Varanasi.",
    category: "media",
    date: "2026-10-03",
    author: "SNTC Media Desk",
    cover: "/posts/guest-felicitate.jpg",
    coverAlt:
      "Guests and organisers at the SANGYAN 2026 felicitation ceremony at Swatantrata Bhawan, IIT (BHU) Varanasi.",
    tags: ["Photo essay", "IIT BHU", "Build sprint"],
    body: [
      {
        type: "p",
        text: "Seven days is a short time to build something worth trusting. The week at Swatantrata Bhawan, IIT (BHU) Varanasi moved between orientation, sprint reviews, and a final round of presentations, with teams working through the night between each checkpoint.",
      },
      { type: "h2", text: "The week in frames" },
      {
        type: "p",
        text: "This photo essay collects portraits, working sessions, and stage moments from the sprint. The image set is being prepared and will be published here as a scrollable gallery.",
      },
      {
        type: "quote",
        text: "Most of the useful work happened at the whiteboard, not on the stage.",
      },
      {
        type: "p",
        text: "Photography from the event will also be available in the media kit for press use, with credit to the SANGYAN media team.",
      },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────────── */

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}

export function getPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post {
  const posts = getPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const sameCategory = getPosts().filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category
  );
  const others = getPosts().filter(
    (candidate) => candidate.slug !== post.slug && candidate.category !== post.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryCounts(): Record<PostCategory, number> {
  return CATEGORY_ORDER.reduce(
    (counts, category) => {
      counts[category] = POSTS.filter((post) => post.category === category).length;
      return counts;
    },
    {} as Record<PostCategory, number>
  );
}

export function getReadTime(post: Post): number {
  const words = post.body.reduce((total, block) => {
    if (block.type === "list") return total + block.items.join(" ").split(/\s+/).length;
    return total + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(2, Math.ceil(words / 200));
}

export function isCategory(value: string | undefined): value is PostCategory {
  return !!value && CATEGORY_ORDER.includes(value as PostCategory);
}
