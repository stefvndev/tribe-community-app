import {
  ECommunityCategory,
  ECommunityPrice,
  ECommunityType,
} from "@/enums/enums";

export const communityCategories = [
  { value: ECommunityCategory.BUSINESS, label: "Business" },
  { value: ECommunityCategory.HEALTH_FITNESS, label: "Health & Fitness" },
  {
    value: ECommunityCategory.PERSONAL_DEVELOPMENT,
    label: "Personal Development",
  },
  { value: ECommunityCategory.ARTS_CRAFTS, label: "Arts & Crafts" },
  { value: ECommunityCategory.MUSIC, label: "Music" },
  { value: ECommunityCategory.PHOTO_VIDEO, label: "Photo & Video" },
  { value: ECommunityCategory.E_COMMERCE, label: "E-Commerce" },
  { value: ECommunityCategory.LOVE, label: "Love" },
  { value: ECommunityCategory.SALES_MARKETING, label: "Sales & Marketing" },
  { value: ECommunityCategory.TECH, label: "Tech" },
  { value: ECommunityCategory.SPIRITUALITY, label: "Spirituality" },
  { value: ECommunityCategory.FINANCE, label: "Finance" },
  { value: ECommunityCategory.BEAUTY_FASHION, label: "Beauty & Fashion" },
  { value: ECommunityCategory.REAL_ESTATE, label: "Real Estate" },
  { value: ECommunityCategory.GAMING, label: "Gaming" },
  { value: ECommunityCategory.SPORTS, label: "Sports" },
  { value: ECommunityCategory.PRODUCTIVITY, label: "Productivity" },
  { value: ECommunityCategory.CARS, label: "Cars" },
  { value: ECommunityCategory.PETS, label: "Pets" },
  { value: ECommunityCategory.LANGUAGES, label: "Languages" },
  { value: ECommunityCategory.TRAVEL, label: "Travel" },
];

export const communityTypes = [
  { value: ECommunityType.PUBLIC, label: "Public" },
  { value: ECommunityType.PRIVATE, label: "Private" },
];

export const communityPrices = [
  { value: ECommunityPrice.FREE, label: "Free" },
  { value: ECommunityPrice.PAID, label: "Paid (Comming soon)" },
];
