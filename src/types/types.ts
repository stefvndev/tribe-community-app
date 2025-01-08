import {
  ECommunityCategory,
  ECommunityPrice,
  ECommunityType,
} from "@/enums/enums";

export type TDiscoveryQueries = {
  category?: string;
  type?: string;
  price?: string;
};

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
  createdBy: string;
  expand: {
    createdBy: {
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
  };
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
