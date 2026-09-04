export const products = [
  {
    id: "phone-01",
    name: "Nova X5 5G",
    category: "Mobiles",
    price: 29999,
    rating: 4.6,
    image: "phone",
    short: "6.67-inch AMOLED display · 256 GB · 5G",
    details: ["6.67-inch AMOLED display", "8 GB RAM · 256 GB storage", "50 MP camera", "5000 mAh battery"],
    variants: {
      Color: ["Midnight", "Silver", "Blue"],
      Storage: ["128 GB", "256 GB"]
    }
  },
  {
    id: "laptop-01",
    name: "AeroBook 14",
    category: "Laptops",
    price: 64990,
    rating: 4.7,
    image: "laptop",
    short: "14-inch display · 16 GB RAM · 512 GB SSD",
    details: ["14-inch Full HD display", "Intel Core i5 processor", "16 GB RAM", "512 GB SSD"],
    variants: {
      Color: ["Graphite", "Silver"],
      Storage: ["512 GB", "1 TB"]
    }
  },
  {
    id: "tv-01",
    name: "Vision 43 4K Smart TV",
    category: "TVs",
    price: 38990,
    rating: 4.5,
    image: "tv",
    short: "43-inch 4K UHD · Smart TV · Dolby Audio",
    details: ["43-inch 4K UHD panel", "Built-in streaming apps", "Dolby Audio", "3 HDMI ports"],
    variants: {
      Color: ["Black"],
      Size: ["43 inch", "50 inch"]
    }
  },
  {
    id: "watch-01",
    name: "Pulse Active Watch",
    category: "Wearables",
    price: 8999,
    rating: 4.4,
    image: "watch",
    short: "AMOLED display · GPS · Health tracking",
    details: ["AMOLED touch display", "Built-in GPS", "Heart-rate and SpO2 tracking", "7-day battery"],
    variants: {
      Color: ["Black", "Green"],
      Size: ["Standard"]
    }
  }
];

export const emiPlans = [
  { months: 3, fee: 0 },
  { months: 6, fee: 0 },
  { months: 9, fee: 1.5 },
  { months: 12, fee: 2.0 },
  { months: 18, fee: 2.5 }
];

export function monthlyEmi(price, months, feePercent = 0) {
  const total = price * (1 + feePercent / 100);
  return Math.ceil(total / months);
}
