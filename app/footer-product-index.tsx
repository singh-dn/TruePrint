const footerProductGroups = [
  {
    title: "Product categories",
    links: [
      { label: "Visiting Cards", href: "/categories/visiting-cards" },
      { label: "Custom Diaries", href: "/categories" },
      { label: "Pens", href: "/categories/pens" },
      { label: "Joining Kits", href: "/categories/joining-kits" },
      { label: "Tech Products", href: "/categories/tech-products" },
      { label: "Bags", href: "/categories/bags" },
      { label: "Drinkware", href: "/categories/drinkware" },
      { label: "T-shirts", href: "/categories/t-shirts" },
    ],
  },
  {
    title: "Diary collection",
    links: [
      { label: "Executive Diaries", href: "/categories" },
      { label: "Hardcover Diaries", href: "/categories" },
      { label: "Softcover Diaries", href: "/categories" },
      { label: "Daily Planners", href: "/categories" },
      { label: "Notebooks", href: "/categories" },
      { label: "Journals", href: "/categories" },
      { label: "Download Diary Catalogue", href: "/categories#diary-catalogue" },
    ],
  },
  {
    title: "Print services",
    links: [
      { label: "Corporate Gifting", href: "/#contact" },
      { label: "Business Cards", href: "/#services" },
      { label: "Branded Stationery", href: "/#services" },
      { label: "Brochures & Flyers", href: "/#services" },
      { label: "Product Catalogues", href: "/#services" },
      { label: "Invitations", href: "/#services" },
      { label: "Large Format Print", href: "/#services" },
    ],
  },
  {
    title: "Materials & finishes",
    links: [
      { label: "Foil Stamping", href: "/#materials" },
      { label: "Embossing", href: "/#materials" },
      { label: "Debossing", href: "/#materials" },
      { label: "Letterpress", href: "/#materials" },
      { label: "Colour Matching", href: "/#materials" },
      { label: "Premium Paper Stocks", href: "/#materials" },
      { label: "Sustainable Paper", href: "/#materials" },
      { label: "Custom Packaging", href: "/#contact" },
    ],
  },
] as const;

export default function FooterProductIndex() {
  return (
    <nav className="footerProductIndex" aria-label="Explore TruePrint products and services">
      <p className="footerProductEyebrow">Explore TruePrint</p>
      <div className="footerProductGroups">
        {footerProductGroups.map((group) => (
          <section className="footerProductGroup" key={group.title} aria-labelledby={`footer-${group.title.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`}>
            <h2 id={`footer-${group.title.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`}>{group.title}</h2>
            <div className="footerProductLinks">
              {group.links.map((link) => (
                <a href={link.href} key={link.label}>{link.label}</a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </nav>
  );
}
