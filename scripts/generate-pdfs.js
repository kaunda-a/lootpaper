import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync, mkdirSync } from "fs";

const BRAND = rgb(0.84, 0.43, 0.47);
const DARK = rgb(0.12, 0.12, 0.12);
const BODY = rgb(0.25, 0.25, 0.25);
const MUTED = rgb(0.55, 0.55, 0.55);
const LIGHT_BG = rgb(0.96, 0.96, 0.97);

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawPageFrame(page, font) {
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: height - 4, width, height: 4, color: BRAND });
  page.drawRectangle({ x: 0, y: 0, width, height: 28, color: rgb(0.97, 0.97, 0.98) });
  page.drawLine({ start: { x: 50, y: 28 }, end: { x: width - 50, y: 28 }, thickness: 0.5, color: rgb(0.9, 0.9, 0.9) });
  page.drawText("lootpaper.xyz — Free resources for makers", { x: 50, y: 8, size: 8, font, color: MUTED });
}

function drawBulletList(page, items, font, { x, startY, maxWidth, lineHeight }) {
  let y = startY;
  for (const item of items) {
    page.drawCircle({ x: x + 14, y: y + 4, size: 2.5, color: BRAND });
    const lines = wrapText(item, font, 10, maxWidth - 30);
    for (const line of lines) {
      page.drawText(line, { x: x + 26, y, size: 10, font, color: BODY });
      y -= lineHeight || 16;
    }
  }
  return y;
}

async function createSeoChecklist() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const MARGIN = 50;
  const MW = width - 100;

  drawPageFrame(page, font);

  page.drawRectangle({ x: 0, y: height - 180, width, height: 180, color: LIGHT_BG });
  page.drawRectangle({ x: 0, y: height - 180, width: 4, height: 180, color: BRAND });
  page.drawText("SEO Quick Checklist", { x: 60, y: height - 75, size: 28, font: bold, color: DARK });
  page.drawText("2026 Edition", { x: 60, y: height - 105, size: 16, font, color: BRAND });
  const sub = "30 actionable points to rank higher in Google, AI Overviews, and answer engines.";
  page.drawText(sub, { x: 60, y: height - 130, size: 11, font, color: BODY });

  let y = height - 180;

  page.drawText("Coverage", { x: MARGIN, y: y - 18, size: 11, font: bold, color: DARK });
  const tags = ["Technical SEO", "On-Page SEO", "Content & Authority", "AI Search (AEO/GEO)", "Off-Page"];
  let tx = MARGIN;
  for (const tag of tags) {
    const tw = font.widthOfTextAtSize(tag, 8) + 20;
    page.drawRectangle({ x: tx, y: y - 48, width: tw, height: 18, color: rgb(0.98, 0.97, 0.99) });
    page.drawRectangle({ x: tx, y: y - 48, width: tw, height: 18, borderWidth: 0.5, borderColor: rgb(0.88, 0.88, 0.88), color: undefined });
    page.drawText(tag, { x: tx + 6, y: y - 44, size: 8, font, color: BODY });
    tx += tw + 8;
  }

  y = y - 68;

  const sections = [
    {
      title: "Technical SEO",
      items: [
        "Site indexed in Google Search Console",
        "XML sitemap submitted and error-free",
        "Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)",
        "Mobile-friendly test passes on all pages",
        "HTTPS enforced with valid SSL certificate",
        "No broken links or 404 errors",
        "Canonical tags set correctly everywhere",
        "robots.txt not blocking critical pages",
        "Schema markup present (Article, FAQ, Breadcrumb)",
      ],
    },
    {
      title: "On-Page SEO",
      items: [
        "Title tag under 60 chars with primary keyword",
        "Meta description under 160 chars with CTA",
        "H1 matches page topic with primary keyword",
        "Content uses clear H2/H3 hierarchy",
        "Images have descriptive alt text",
        "Internal links to related content",
        "URLs are short, descriptive, keyword-rich",
        "Open Graph & Twitter Card meta tags set",
      ],
    },
    {
      title: "Content & Authority",
      items: [
        "Content is original and in-depth (1,000+ words)",
        "Targets search intent (informational / navigational / transactional)",
        "EEAT signals: author bio, citations, credentials",
        "Outbound links to authoritative sources",
        "Content refreshed within last 6 months",
        "Featured snippet format used (lists, tables, Q&A)",
      ],
    },
    {
      title: "AI Search Optimization (AEO / GEO)",
      items: [
        "Structured data markup (FAQ, HowTo, Article)",
        "Content answers direct questions concisely",
        "Entity clarity: named entities defined explicitly",
        "Citable content: stats sourced, claims backed",
        "LLM-friendly: tables, lists, bold key phrases",
        "Entity links to Wikipedia or Wikidata",
      ],
    },
    {
      title: "Off-Page & Local",
      items: [
        "10+ unique referring domains in backlink profile",
        "Anchor text diversity (branded, generic, partial)",
        "Brand mentions across relevant industry sites",
        "Google Business Profile claimed (if local)",
        "NAP consistent across all directories",
      ],
    },
  ];

  for (const section of sections) {
    page.drawRectangle({ x: MARGIN, y: y - 2, width: 3, height: 14, color: BRAND });
    page.drawText(section.title, { x: MARGIN + 12, y, size: 12, font: bold, color: DARK });
    y -= 20;
    y = drawBulletList(page, section.items, font, { x: MARGIN, startY: y, maxWidth: MW, lineHeight: 16 });
    y -= 8;
    if (y < 80) {
      page = doc.addPage([612, 792]);
      y = height - 48;
      drawPageFrame(page, font);
    }
  }

  return await doc.save();
}

async function createMarketingTools() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const MARGIN = 50;
  const MW = width - 100;

  drawPageFrame(page, font);

  page.drawRectangle({ x: 0, y: height - 180, width, height: 180, color: LIGHT_BG });
  page.drawRectangle({ x: 0, y: height - 180, width: 4, height: 180, color: BRAND });
  page.drawText("100 Free Marketing Tools", { x: 60, y: height - 75, size: 28, font: bold, color: DARK });
  page.drawText("2026 Curated Directory", { x: 60, y: height - 105, size: 16, font, color: BRAND });
  const sub = "Every tool listed has a genuine free tier. No 7-day trials, no credit card required.";
  page.drawText(sub, { x: 60, y: height - 130, size: 11, font, color: BODY });

  let y = height - 180;

  const categories = [
    {
      name: "SEO (10 tools)",
      tools: ["Google Search Console", "Google Analytics", "Screaming Frog (free up to 500 URLs)", "Ubersuggest", "AnswerThePublic", "SEO Review Tools", "Rich Results Test", "PageSpeed Insights", "Ahrefs Webmaster Tools", "Bing Webmaster Tools"],
    },
    {
      name: "Content & Writing (10 tools)",
      tools: ["Hemingway Editor", "Grammarly", "Copy.ai (free credits)", "ChatGPT (free tier)", "Claude (free tier)", "Google Docs", "Notion", "Canva Docs", "Perplexity", "Jasper (free trial)"],
    },
    {
      name: "Social Media (8 tools)",
      tools: ["Buffer (3 accounts free)", "Later (3 accounts, 30 posts)", "Hootsuite (5 posts)", "TweetDeck", "Meta Business Suite", "LinkedIn Creator Mode", "Typefully (free tier)", "Pinterest Business"],
    },
    {
      name: "Design & Visuals (10 tools)",
      tools: ["Canva (free tier)", "Figma (3 projects)", "GIMP", "Unsplash", "Pexels", "Remove.bg (preview)", "Coolors", "FontPair", "Photopea", "DaVinci Resolve"],
    },
    {
      name: "Email Marketing (9 tools)",
      tools: ["Mailchimp (500 contacts)", "Brevo (300 emails/day)", "MailerLite (1k subscribers)", "ConvertKit (free to 1k)", "Buttondown", "TinyLetter", "Substack", "Beehiiv (free tier)", "SendGrid (100 emails/day)"],
    },
    {
      name: "Analytics (8 tools)",
      tools: ["Google Analytics 4", "Plausible (30-day trial)", "Umami (self-host free)", "Microsoft Clarity", "Hotjar (free tier)", "Google Tag Manager", "PostHog (1M events/mo)", "Matomo (on-premise)"],
    },
    {
      name: "AI & Automation (10 tools)",
      tools: ["ChatGPT", "Claude", "Perplexity", "Zapier (5 zaps free)", "Make (1k ops/mo)", "IFTTT", "Hugging Face", "Replicate (free tier)", "n8n (self-host)", "LangChain (OSS)"],
    },
    {
      name: "Developer Tools (10 tools)",
      tools: ["GitHub", "VS Code", "Vercel (free tier)", "Netlify (free tier)", "Cloudflare (free plan)", "Railway (free tier)", "Supabase (free tier)", "PlanetScale (free tier)", "Render (free tier)", "Fly.io (free tier)"],
    },
    {
      name: "Productivity (9 tools)",
      tools: ["Trello", "Notion", "Todoist (free tier)", "Obsidian", "Google Calendar", "RescueTime (lite)", "Forest App", "Linear (free tier)", "Arc Browser"],
    },
  ];

  for (const cat of categories) {
    if (y < 80) {
      page = doc.addPage([612, 792]);
      y = height - 48;
      drawPageFrame(page, font);
    }
    page.drawRectangle({ x: MARGIN, y: y - 2, width: 3, height: 14, color: BRAND });
    page.drawText(cat.name, { x: MARGIN + 12, y, size: 12, font: bold, color: DARK });
    y -= 20;
    y = drawBulletList(page, cat.tools, font, { x: MARGIN, startY: y, maxWidth: MW, lineHeight: 15 });
    y -= 6;
  }

  return await doc.save();
}

async function createGrowthGuide() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const MARGIN = 50;
  const MW = width - 100;

  drawPageFrame(page, font);

  page.drawRectangle({ x: 0, y: height - 180, width, height: 180, color: LIGHT_BG });
  page.drawRectangle({ x: 0, y: height - 180, width: 4, height: 180, color: BRAND });
  page.drawText("Indie Hacker Growth Guide", { x: 60, y: height - 75, size: 28, font: bold, color: DARK });
  page.drawText("5 Zero-Budget Strategies", { x: 60, y: height - 105, size: 16, font, color: BRAND });
  const sub = "Proven growth tactics for makers, indie hackers, and solo founders. No ad spend required.";
  page.drawText(sub, { x: 60, y: height - 130, size: 11, font, color: BODY });

  let y = height - 175;

  const strategies = [
    {
      title: "1. SEO for Indie Products",
      body: "Target long-tail keywords with low competition. Write 10 deep-dive guides solving specific user problems. Each post gets schema markup, internal links, and a clear CTA to your product.",
      body2: "Quick wins: fix title tags, add meta descriptions, submit sitemap to GSC. Use AnswerThePublic for question-based keyword ideas. Low-competition terms let indie products win without big budgets.",
    },
    {
      title: "2. Build in Public",
      body: "Share your journey daily on X (Twitter), LinkedIn, or Mastodon. Post metrics, learnings, and launches weekly.",
      body2: "Formula: what you learned + what you built + what happened. Launch on Product Hunt, HN, and subreddits. Build-in-public accounts grow 3x faster than faceless brands.",
    },
    {
      title: "3. Content Repurposing",
      body: "One asset becomes five. Blog post -> 5 tweets -> 1 LinkedIn post -> 1 newsletter -> 1 video script.",
      body2: "Use Canva for graphics, OBS for recording, AI for reformatting. Repurposing costs 20% of the effort for 80% of the reach. Your best content is under-distributed.",
    },
    {
      title: "4. Community-Led Growth",
      body: "Join 3 communities where your users hang out. Answer questions for 30 days before sharing your product.",
      body2: "Best: Indie Hackers, Maker Mag, MicroConf, relevant subreddits, niche Discords. Give value first. When you eventually share, people trust you because you helped them.",
    },
    {
      title: "5. Email List from Day 1",
      body: "Start before launch. Use MailerLite, Buttondown, or ConvertKit (all free at low volume).",
      body2: "Lead magnet: checklist, template, or mini-guide. Send weekly. Target 500 subscribers in 90 days. Email converts 5-10x better than social for launches.",
    },
  ];

  for (const strat of strategies) {
    if (y < 100) {
      page = doc.addPage([612, 792]);
      y = height - 48;
      drawPageFrame(page, font);
    }

    page.drawRectangle({ x: MARGIN, y: y - 2, width: 3, height: 14, color: BRAND });
    page.drawText(strat.title, { x: MARGIN + 12, y, size: 13, font: bold, color: DARK });
    y -= 20;

    const lines1 = wrapText(strat.body, font, 10, MW);
    for (const line of lines1) {
      page.drawText(line, { x: MARGIN + 12, y, size: 10, font, color: BODY });
      y -= 15;
    }
    y -= 4;

    const lines2 = wrapText(strat.body2, font, 10, MW);
    for (const line of lines2) {
      page.drawText(line, { x: MARGIN + 12, y, size: 10, font, color: BODY });
      y -= 15;
    }
    y -= 12;
  }

  if (y < 80) {
    page = doc.addPage([612, 792]);
    y = height - 48;
    drawPageFrame(page, font);
  }
  y -= 8;
  page.drawRectangle({ x: MARGIN, y, width: MW, height: 36, color: LIGHT_BG });
  page.drawText("Want more? Visit lootpaper.xyz/downloads", {
    x: MARGIN + 12, y: y + 12, size: 11, font: bold, color: BRAND,
  });

  return await doc.save();
}

const outDir = "public/downloads";
mkdirSync(outDir, { recursive: true });

const seoBytes = await createSeoChecklist();
writeFileSync(`${outDir}/seo-checklist-2026.pdf`, seoBytes);
console.log(`OK seo-checklist-2026.pdf -- ${(seoBytes.length / 1024).toFixed(0)} KB`);

const toolsBytes = await createMarketingTools();
writeFileSync(`${outDir}/free-marketing-tools.pdf`, toolsBytes);
console.log(`OK free-marketing-tools.pdf -- ${(toolsBytes.length / 1024).toFixed(0)} KB`);

const growthBytes = await createGrowthGuide();
writeFileSync(`${outDir}/indie-hacker-growth-guide.pdf`, growthBytes);
console.log(`OK indie-hacker-growth-guide.pdf -- ${(growthBytes.length / 1024).toFixed(0)} KB`);

console.log("All PDFs regenerated.");
