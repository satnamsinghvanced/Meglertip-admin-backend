const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:9090";
const FrontenURl = "https://meglertip.vercel.app";
async function generateSitemap() {
  try {
    const companyRes = await axios.get(`${BASE_URL}/api/companies`);
    const articleRes = await axios.get(`${BASE_URL}/api/article`);

    const companies = companyRes?.data?.data || [];
    const articles = articleRes?.data?.data || [];


    const companyUrls = companies.map((c) => `${FrontenURl}/eiendomsmegler/${c.slug}`);

    const articleUrls = articles.map((a) => 
      `${FrontenURl}/articles/${a.categoryId?.slug}/${a.slug}`
    );

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticUrls = [
      "",
      "/about",
      "/eiendomsmegler",
      "/partner",
      "/faq",
      "/form",
    ];

    staticUrls.forEach((url) => {
      sitemapXml += `
        <url>
          <loc>${FrontenURl}${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
    });

    companyUrls.forEach((url) => {
      sitemapXml += `
        <url>
          <loc>${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    });

    articleUrls.forEach((url) => {
      sitemapXml += `
        <url>
          <loc>${url}</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    });

    sitemapXml += `\n</urlset>`;

    const filePath = path.join(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(filePath, sitemapXml);

    console.log("✅ Sitemap created successfully -> /public/sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
  }
}

cron.schedule("0 1 * * *", () => {
  console.log("⏳ Running daily sitemap cron...");
  generateSitemap();
});

generateSitemap();
