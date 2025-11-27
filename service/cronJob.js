const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Change to your API URL
const BASE_URL = "https://your-website.com";

async function generateSitemap() {
  try {
    // 1. Fetch dynamic URLs
    const { data } = await axios.get(`${BASE_URL}/api/companies`);

    const companyUrls = data.map((c) => `${BASE_URL}/company/${c.slug}`);

    // 2. Create XML structure
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Default pages
    const staticUrls = [
      "",
      "/about",
      "/contact",
      "/blog",
      "/companies",
    ];

    staticUrls.forEach((url) => {
      sitemapXml += `
        <url>
          <loc>${BASE_URL}${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
    });

    // Dynamic company pages
    companyUrls.forEach((url) => {
      sitemapXml += `
        <url>
          <loc>${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    });

    sitemapXml += `\n</urlset>`;

    // 3. Save file in public folder
    const filePath = path.join(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(filePath, sitemapXml);

    console.log("✅ Sitemap created successfully -> /public/sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
  }
}

// -----------------------------
//   CRON JOB (Runs daily 01:00 AM)
// -----------------------------
cron.schedule("0 1 * * *", () => {
  console.log("⏳ Running daily sitemap cron...");
  generateSitemap();
});

// Run once at server start (optional)
generateSitemap();
