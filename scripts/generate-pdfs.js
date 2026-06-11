import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";

async function createSeoChecklist() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  let y = height - 50;

  function text(text, opts = {}) {
    const f = opts.bold ? bold : font;
    const s = opts.size || 11;
    const c = opts.color || rgb(0.15, 0.15, 0.15);
    const x = opts.x || 50;
    page.drawText(text, { x, y, size: s, font: f, color: c });
    if (opts.move !== false) y -= opts.gap || s * 1.6;
  }

  function check(text) {
    page.drawText("[ ]", { x: 50, y: y - 2, size: 11, font, color: rgb(0.4, 0.4, 0.4) });
    page.drawText(text, { x: 72, y, size: 11, font, color: rgb(0.2, 0.2, 0.2) });
    y -= 20;
  }

  // Title
  text("SEO Quick Checklist 2026", { bold: true, size: 22, color: rgb(0.84, 0.43, 0.47) });
  text("A 30-point checklist to rank higher in Google & AI search.", { size: 11, color: rgb(0.5, 0.5, 0.5) });
  y -= 10;

  // Technical
  text("Technical SEO", { bold: true, size: 14, color: rgb(0.2, 0.2, 0.2) });
  check("Site is indexed in Google Search Console");
  check("XML sitemap submitted and valid");
  check("Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)");
  check("Mobile-friendly test passes");
  check("HTTPS enforced with valid SSL");
  check("No broken links (404s)");
  check("Canonical tags set correctly");
  check("robots.txt not blocking important pages");
  y -= 5;

  // On-Page
  text("On-Page SEO", { bold: true, size: 14, color: rgb(0.2, 0.2, 0.2) });
  check("Title tag under 60 chars with primary keyword");
  check("Meta description under 160 chars");
  check("H1 matches page topic");
  check("Content uses H2/H3 hierarchy");
  check("Images have alt text");
  check("Internal links to related content");
  check("Schema markup added (Article, FAQ, etc.)");
  check("URL is short and keyword-rich");
  y -= 5;

  // Content
  text("Content & Authority", { bold: true, size: 14, color: rgb(0.2, 0.2, 0.2) });
  check("Content is original and 1,000+ words");
  check("Targets search intent (informational/navigational/transactional)");
  check("EEAT signals present (author bio, citations)");
  check("Outbound links to authoritative sources");
  check("Content updated within the last 6 months");
  y -= 5;

  // AI Visibility
  text("AI Search Optimization (AEO/GEO)", { bold: true, size: 14, color: rgb(0.2, 0.2, 0.2) });
  check("Structured data (FAQ, HowTo, Article schema)");
  check("Content answers direct questions (featured snippet format)");
  check("Entity clarity — named entities, brand terms defined");
  check("Content citable — stats with sources, clear claims");
  check("LLM-friendly formatting — tables, lists, bold key phrases");
  y -= 5;

  // Off-Page
  text("Off-Page", { bold: true, size: 14, color: rgb(0.2, 0.2, 0.2) });
  check("Backlink profile has 10+ referring domains");
  check("Anchor text diversity");
  check("Brand mentions across relevant sites");
  check("Social signals (shares, saves)");

  // Footer
  y = 50;
  text("lootpaper.xyz — Free tools & resources for makers", {
    size: 9,
    color: rgb(0.6, 0.6, 0.6),
    x: width / 2 - 120,
  });

  return await doc.save();
}

async function createMarketingTools() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  let y = height - 50;

  function text(text, opts = {}) {
    const f = opts.bold ? bold : font;
    const s = opts.size || 11;
    const c = opts.color || rgb(0.15, 0.15, 0.15);
    page.drawText(text, { x: opts.x || 50, y, size: s, font: f, color: c });
    if (opts.move !== false) y -= opts.gap || s * 1.6;
  }

  text("100 Free Marketing Tools", { bold: true, size: 22, color: rgb(0.84, 0.43, 0.47) });
  text("Curated directory — every tool has a free tier.", { size: 11, color: rgb(0.5, 0.5, 0.5) });
  y -= 10;

  const tools = [
    { cat: "SEO", items: ["Google Search Console", "Google Analytics", "Screaming Frog (free up to 500 URLs)", "Ubersuggest", "AnswerThePublic", "SEO Review Tools", "Rich Results Test", "Pagespeed Insights"] },
    { cat: "Content & Writing", items: ["Hemingway Editor", "Grammarly", "Copy.ai", "ChatGPT", "Claude", "Google Docs", "Notion", "Canva"] },
    { cat: "Social Media", items: ["Buffer (3 accounts free)", "Later (3 accounts free)", "Hootsuite (5 posts free)", "TweetDeck", "Meta Business Suite", "LinkedIn Creator Mode"] },
    { cat: "Design", items: ["Canva", "Figma", "GIMP", "Unsplash", "Pexels", "Remove.bg (free preview)", "Coolors", "FontPair"] },
    { cat: "Email Marketing", items: ["Mailchimp (500 contacts free)", "Brevo (300 emails/day free)", "MailerLite (1k subs free)", "ConvertKit (free up to 1k subs)", "Buttondown", "TinyLetter"] },
    { cat: "Analytics & Tracking", items: ["Google Analytics 4", "Plausible (30-day trial)", "Umami (self-host)", "Microsoft Clarity", "Hotjar (limit free)", "Google Tag Manager"] },
    { cat: "Developer Tools", items: ["GitHub", "VS Code", "Vercel", "Netlify", "Cloudflare (free plan)", "Railway (free tier)", "Supabase (free tier)", "PlanetScale (free tier)"] },
    { cat: "Productivity", items: ["Trello", "Notion", "Todoist", "Obsidian", "Google Calendar", "RescueTime", "Pomodoro Timer", "Forest App"] },
    { cat: "AI & Automation", items: ["ChatGPT", "Claude", "Perplexity", "Zapier (5 free zaps)", "Make (1k ops free)", "IFTTT", "Hugging Face", "Replicate"] },
  ];

  for (const group of tools) {
    if (y < 120) { page = doc.addPage([612, 792]); y = height - 50; }
    text(group.cat, { bold: true, size: 13, color: rgb(0.84, 0.43, 0.47) });
    for (const item of group.items) {
      if (y < 40) { page = doc.addPage([612, 792]); y = height - 50; }
      text("• " + item, { size: 10, color: rgb(0.3, 0.3, 0.3), gap: 16 });
    }
    y -= 5;
  }

  // Last page footer
  page.drawText("lootpaper.xyz — Free tools & resources for makers", {
    x: 50, y: 50, size: 9, font, color: rgb(0.6, 0.6, 0.6),
  });

  return await doc.save();
}

async function createGrowthGuide() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  let y = height - 50;

  function text(text, opts = {}) {
    const f = opts.bold ? bold : font;
    const s = opts.size || 11;
    const c = opts.color || rgb(0.15, 0.15, 0.15);
    page.drawText(text, { x: opts.x || 50, y, size: s, font: f, color: c });
    if (opts.move !== false) y -= opts.gap || s * 1.6;
  }

  text("Indie Hacker Growth Guide", { bold: true, size: 22, color: rgb(0.84, 0.43, 0.47) });
  text("5 actionable strategies without ad spend.", { size: 11, color: rgb(0.5, 0.5, 0.5) });
  y -= 15;

  const sections = [
    {
      title: "1. SEO for Indie Products",
      body: "Start with long-tail keywords that have low competition. Write 10 deep-dive guides targeting specific user problems. Use AnswerThePublic to find question-based keywords. Each post should have schema markup and internal links to your product.\n\nQuick wins: fix title tags, add meta descriptions, submit sitemap to Google Search Console."
    },
    {
      title: "2. Build in Public",
      body: "Share your journey daily on Twitter/X, LinkedIn, or Mastodon. Post weekly updates with metrics. Launch on Product Hunt, Hacker News, and relevant subreddits.\n\nThe formula: what you learned + what you built + what happened."
    },
    {
      title: "3. Content Repurposing",
      body: "One blog post -> 5 tweets -> 1 LinkedIn post -> 1 newsletter -> 1 video script.\n\nUse tools like Canva for graphics, OBS for screen recording, and ChatGPT to reformat content for different platforms."
    },
    {
      title: "4. Community-Led Growth",
      body: "Join 3 Slack/Discord communities in your niche. Answer questions genuinely. Don't link your product — help first, mention contextually later.\n\nBest communities: Indie Hackers, Maker Mag, MicroConf, relevant subreddits."
    },
    {
      title: "5. Email List from Day 1",
      body: "Use Buttondown or MailerLite (free). Offer a lead magnet: checklist, template, or mini-guide related to your product. Send weekly — consistently, not spammy.\n\nTarget: 500 subscribers in 90 days."
    },
  ];

  for (const s of sections) {
    if (y < 180) { page = doc.addPage([612, 792]); y = height - 50; }
    text(s.title, { bold: true, size: 14, color: rgb(0.84, 0.43, 0.47) });
    const lines = s.body.split("\n");
    for (const line of lines) {
      if (y < 60) { page = doc.addPage([612, 792]); y = height - 50; }
      text(line.trim(), { size: 11, color: rgb(0.3, 0.3, 0.3), gap: 18 });
    }
    y -= 8;
  }

  page.drawText("lootpaper.xyz — Free tools & resources for makers", {
    x: 50, y: 50, size: 9, font, color: rgb(0.6, 0.6, 0.6),
  });

  return await doc.save();
}

const outDir = "public/downloads";

const seoBytes = await createSeoChecklist();
writeFileSync(`${outDir}/seo-checklist-2026.pdf`, seoBytes);
console.log(`✓ seo-checklist-2026.pdf — ${(seoBytes.length / 1024).toFixed(0)} KB`);

const toolsBytes = await createMarketingTools();
writeFileSync(`${outDir}/free-marketing-tools.pdf`, toolsBytes);
console.log(`✓ free-marketing-tools.pdf — ${(toolsBytes.length / 1024).toFixed(0)} KB`);

const growthBytes = await createGrowthGuide();
writeFileSync(`${outDir}/indie-hacker-growth-guide.pdf`, growthBytes);
console.log(`✓ indie-hacker-growth-guide.pdf — ${(growthBytes.length / 1024).toFixed(0)} KB`);

console.log("All PDFs generated.");
