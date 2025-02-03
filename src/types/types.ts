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
  chat?: string;
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
    createdBy: TUserData;
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
  firstLogin: boolean;
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
  media: string;
  expand: {
    user: TUserData;
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

export type TMessage = {
  id?: string;
  sender_id: string;
  receiver_id: string;
  community_id?: string;
  message: string;
  created?: string;
  updated?: string;
  collectionName?: string;
  conversation: string;
  seen?: boolean;
  expand?: {
    sender_id: TUserData;
  };
};

export type TConversation = {
  id: string;
  collectionId: string;
  collectionName: string;
  community_id: string;
  created: string;
  seen: boolean;
  messages: string[];
  expand: {
    users: TUserData[];
    messages: TMessage[];
  };
  updated: string;
  users: string[];
};
