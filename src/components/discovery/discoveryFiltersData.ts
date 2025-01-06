import { ECommunityCategory } from "@/enums/enums";

type TFilterList = {
  id: number;
  name: string;
  icon?: string;
  query: ECommunityCategory;
};

type TFilterTypesAndPrice = {
  id: number;
  name: string;
};

const discoveryFiltersData: TFilterList[] = [
  {
    id: 1,
    name: "All",
    query: ECommunityCategory.ALL,
  },
  {
    id: 2,
    name: "Business",
    icon: "💰",
    query: ECommunityCategory.BUSINESS,
  },
  {
    id: 3,
    name: "Health & fitness",
    icon: "🍎",
    query: ECommunityCategory.HEALTH_FITNESS,
  },
  {
    id: 4,
    name: "Personal development",
    icon: "📚",
    query: ECommunityCategory.PERSONAL_DEVELOPMENT,
  },
  {
    id: 5,
    name: "Arts & crafts",
    icon: "🎨",
    query: ECommunityCategory.ARTS_CRAFTS,
  },
  {
    id: 6,
    name: "Music",
    icon: "🎸",
    query: ECommunityCategory.MUSIC,
  },
  {
    id: 7,
    name: "Photo & Video",
    icon: "📹",
    query: ECommunityCategory.PHOTO_VIDEO,
  },
  {
    id: 8,
    name: "E-commerce",
    icon: "🛍️",
    query: ECommunityCategory.E_COMMERCE,
  },
  {
    id: 9,
    name: "Love",
    icon: "❤️",
    query: ECommunityCategory.LOVE,
  },
  {
    id: 10,
    name: "Sales & Marketing",
    icon: "🚀",
    query: ECommunityCategory.SALES_MARKETING,
  },
  {
    id: 11,
    name: "Tech",
    icon: "💻",
    query: ECommunityCategory.TECH,
  },
  {
    id: 12,
    name: "Spirituality",
    icon: "🙏",
    query: ECommunityCategory.SPIRITUALITY,
  },
  {
    id: 13,
    name: "Finance",
    icon: "📈",
    query: ECommunityCategory.FINANCE,
  },
  {
    id: 14,
    name: "Beauty & fashion",
    icon: "👠",
    query: ECommunityCategory.BEAUTY_FASHION,
  },
  {
    id: 15,
    name: "Real estate",
    icon: "🏠",
    query: ECommunityCategory.REAL_ESTATE,
  },
  {
    id: 16,
    name: "Gaming",
    icon: "🎮",
    query: ECommunityCategory.GAMING,
  },
  {
    id: 17,
    name: "Sports",
    icon: "⚽",
    query: ECommunityCategory.SPORTS,
  },
  {
    id: 18,
    name: "Productivity",
    icon: "⌛",
    query: ECommunityCategory.PRODUCTIVITY,
  },
  {
    id: 19,
    name: "Cars",
    icon: "🚗",
    query: ECommunityCategory.CARS,
  },
  {
    id: 20,
    name: "Pets",
    icon: "🐶",
    query: ECommunityCategory.PETS,
  },
  {
    id: 21,
    name: "Languages",
    icon: "🌎",
    query: ECommunityCategory.LANGUAGES,
  },
  {
    id: 22,
    name: "Travel",
    icon: "✈️",
    query: ECommunityCategory.TRAVEL,
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
