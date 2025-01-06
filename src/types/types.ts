import {
  ECommunityCategory,
  ECommunityPrice,
  ECommunityType,
} from "@/enums/enums";

export type TCommunities = {
  id: string;
  name: string;
  category: ECommunityCategory;
  price: ECommunityPrice;
  type: ECommunityType;
  description: string;
  members: number;
  banner: string;
  avatar: string;
  collectionName: string;
};

export type TUserData = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  verified: boolean;
};
