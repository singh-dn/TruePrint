// Product options are discussed and confirmed against the final brief, not live stock claims.
export const categoryDetails = {
  "diaries": {
    name: "Diary",
    enquiry: "custom diary",
    materials: [
      { number: "01", name: "Buckram cloth", note: "Woven · tactile · durable" },
      { number: "02", name: "Recycled cover", note: "Soft touch · considered" },
      { number: "03", name: "Uncoated paper", note: "Natural shade · clean writing" },
      { number: "04", name: "Elastic & ribbon", note: "Matched · contrasting" },
      { number: "05", name: "Foil & deboss", note: "Branded · dimensional" },
      { number: "06", name: "Thread & binding", note: "Lay-flat · section sewn" },
    ],
  },
  "visiting-cards": {
    name: "Visiting Cards",
    enquiry: "custom visiting card",
    materials: [
      { number: "01", name: "Paper stock", note: "Classic · textured · recycled" },
      { number: "02", name: "Card thickness", note: "Lightweight · substantial" },
      { number: "03", name: "Size & shape", note: "Standard · custom formats" },
      { number: "04", name: "Print & colour", note: "Artwork · brand matching" },
      { number: "05", name: "Foil & spot UV", note: "Finish options to explore" },
      { number: "06", name: "Edges & corners", note: "Clean cut · rounded options" },
    ],
  },
  "pens": {
    name: "Pens",
    enquiry: "custom branded pen",
    materials: [
      { number: "01", name: "Body material", note: "Plastic · metal · eco options" },
      { number: "02", name: "Writing style", note: "Ballpoint · rollerball" },
      { number: "03", name: "Mechanism", note: "Click · twist · capped" },
      { number: "04", name: "Colour & finish", note: "Match your brand direction" },
      { number: "05", name: "Print & engraving", note: "Subject to surface suitability" },
      { number: "06", name: "Presentation", note: "Sleeves · boxes · gift sets" },
    ],
  },
  "joining-kits": {
    name: "Joining Kits",
    enquiry: "custom employee joining kit",
    materials: [
      { number: "01", name: "Kit contents", note: "Essentials · gifts · stationery" },
      { number: "02", name: "Welcome packaging", note: "Boxes · bags · inserts" },
      { number: "03", name: "Product materials", note: "Chosen around your brief" },
      { number: "04", name: "Branding details", note: "Logos · colours · artwork" },
      { number: "05", name: "Welcome notes", note: "Cards · messages · guides" },
      { number: "06", name: "Packing & delivery", note: "Assembly · destination planning" },
    ],
  },
  "tech-products": {
    name: "Tech Products",
    enquiry: "custom corporate tech product",
    materials: [
      { number: "01", name: "Device format", note: "Power banks · audio · accessories" },
      { number: "02", name: "Compatibility", note: "Confirm supported devices" },
      { number: "03", name: "Power & connectivity", note: "Check product specifications" },
      { number: "04", name: "Body & finish", note: "Material · colour · construction" },
      { number: "05", name: "Logo placement", note: "Confirm suitable branding areas" },
      { number: "06", name: "Packaging & checks", note: "Presentation · functional review" },
    ],
  },
  "bags": {
    name: "Bags",
    enquiry: "custom corporate bag",
    materials: [
      { number: "01", name: "Bag style", note: "Backpacks · totes · duffels" },
      { number: "02", name: "Fabric & finish", note: "Selected around the use case" },
      { number: "03", name: "Capacity & pockets", note: "Everyday · work · travel" },
      { number: "04", name: "Straps & handles", note: "Comfort · construction" },
      { number: "05", name: "Print & embroidery", note: "Subject to fabric suitability" },
      { number: "06", name: "Zips & trims", note: "Closures · lining · detailing" },
    ],
  },
  "drinkware": {
    name: "Drinkware",
    enquiry: "custom branded drinkware",
    materials: [
      { number: "01", name: "Drinkware format", note: "Bottles · mugs · tumblers" },
      { number: "02", name: "Body material", note: "Steel · glass · other options" },
      { number: "03", name: "Capacity & shape", note: "Desk · commute · gifting" },
      { number: "04", name: "Lids & closures", note: "Check fit and usability" },
      { number: "05", name: "Print & engraving", note: "Subject to surface suitability" },
      { number: "06", name: "Packaging & care", note: "Presentation · care guidance" },
    ],
  },
  "t-shirts": {
    name: "T-Shirts",
    enquiry: "custom branded T-shirt",
    materials: [
      { number: "01", name: "Fabric composition", note: "Cotton · blends · other options" },
      { number: "02", name: "Weight & feel", note: "Choose for comfort and use" },
      { number: "03", name: "Fit & neckline", note: "Crew neck · polo · fit options" },
      { number: "04", name: "Colours & sizes", note: "Plan your team size mix" },
      { number: "05", name: "Print & embroidery", note: "Match technique to fabric" },
      { number: "06", name: "Construction & care", note: "Stitching · finish · care guidance" },
    ],
  },
} as const;

export function getCategoryDetails(key: string) {
  return categoryDetails[key as keyof typeof categoryDetails] ?? categoryDetails.diaries;
}

export function categoryWhatsAppUrl(key: string) {
  const { enquiry } = getCategoryDetails(key);
  return `https://wa.me/918588829931?text=${encodeURIComponent(`Hello TruePrint, I would like to know more about your ${enquiry} and catalogue options.`)}`;
}
