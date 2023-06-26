export type CommunityIdCardsRequest = {
  pageParam?: number;
  communityId: number;
};

export type CreateCommunityRequest = {
  name: string;
  logoImageUrl?: string;
  coverImageUrl?: string;
  description?: string;
};
