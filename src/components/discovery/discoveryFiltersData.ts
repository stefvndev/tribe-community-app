type TFilterList = {
  id: number;
  name: string;
  icon?: string;
  query: string;
};

type TFilterTypesAndPrice = {
  id: number;
  name: string;
};

const discoveryFiltersData: TFilterList[] = [
  {
    id: 1,
    name: "All",
    query: "all",
  },
  {
    id: 2,
    name: "Business",
    icon: "💰",
    query: "business",
  },
  {
    id: 3,
    name: "Health & fitness",
    icon: "🍎",
    query: "health-fitness",
  },
  {
    id: 4,
    name: "Personal development",
    icon: "📚",
    query: "personal-development",
  },
  {
    id: 5,
    name: "Arts & crafts",
    icon: "🎨",
    query: "arts-crafts",
  },
  {
    id: 6,
    name: "Music",
    icon: "🎸",
    query: "music",
  },
  {
    id: 7,
    name: "Photo & Video",
    icon: "📹",
    query: "photo-video",
  },
  {
    id: 8,
    name: "E-commerce",
    icon: "🛍️",
    query: "e-commerce",
  },
  {
    id: 9,
    name: "Love",
    icon: "❤️",
    query: "love",
  },
  {
    id: 10,
    name: "Sales & Marketing",
    icon: "🚀",
    query: "sales-marketing",
  },
  {
    id: 11,
    name: "Tech",
    icon: "💻",
    query: "tech",
  },
  {
    id: 12,
    name: "Spirituality",
    icon: "🙏",
    query: "spirituality",
  },
  {
    id: 13,
    name: "Finance",
    icon: "📈",
    query: "finance",
  },
  {
    id: 14,
    name: "Beauty & fashion",
    icon: "👠",
    query: "beauty-fashion",
  },
  {
    id: 15,
    name: "Real estate",
    icon: "🏠",
    query: "real-estate",
  },
  {
    id: 16,
    name: "Gaming",
    icon: "🎮",
    query: "gaming",
  },
  {
    id: 17,
    name: "Sports",
    icon: "⚽",
    query: "sports",
  },
  {
    id: 18,
    name: "Productivity",
    icon: "⌛",
    query: "productivity",
  },
  {
    id: 19,
    name: "Cars",
    icon: "🚗",
    query: "cars",
  },
  {
    id: 20,
    name: "Pets",
    icon: "🐶",
    query: "pets",
  },
  {
    id: 21,
    name: "Languages",
    icon: "🌎",
    query: "languages",
  },
  {
    id: 22,
    name: "Travel",
    icon: "✈️",
    query: "travel",
  },
];

const discoveryFiltersTypes: TFilterTypesAndPrice[] = [
  {
    id: 1,
    name: "all",
  },
  {
    id: 2,
    name: "public",
  },
  {
    id: 3,
    name: "private",
  },
];

const discoveryFiltersPrice: TFilterTypesAndPrice[] = [
  {
    id: 1,
    name: "all",
  },
  {
    id: 2,
    name: "free",
  },
  {
    id: 3,
    name: "paid",
  },
];

export { discoveryFiltersData, discoveryFiltersTypes, discoveryFiltersPrice };
