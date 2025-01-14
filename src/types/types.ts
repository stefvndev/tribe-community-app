import {
  ECommunityCategory,
  ECommunityPrice,
  ECommunityType,
} from "@/enums/enums";

export type TDiscoveryQueries = {
  category?: string;
  type?: string;
  price?: string;
  search?: string;
};

export type TCommunities = {
  id: string;
  name: string;
  category: ECommunityCategory;
  price: ECommunityPrice;
  type: ECommunityType;
  description: string;
  members: string[];
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
    members: TUserData[];
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
  description: string;
  location: string;
};

export type TCreateCommunitySubmitData = {
  name: string;
  description: string;
  category: string;
  type: string;
  price: string;
  banner: File | null;
  avatar: File | null;
};

export type TPost = {
  collectionId: string;
  collectionName: string;
  community: string;
  content: string;
  created: string;
  id: string;
  post: string;
  title: string;
  updated: string;
  user: string;
  likes: string[];
  expand: {
    user: {
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

export type TComment = {
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  id: string;
  post: string;
  updated: string;
  user: string;
};
