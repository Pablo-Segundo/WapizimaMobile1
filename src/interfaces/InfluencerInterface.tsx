export interface Influencer {
  tiktok: string;
  facebook: string;
  instagram: string;
  fullname: string;
  email: string;
}

export interface InfluencerResponse {
  status: string;
  message: string;
  influencer: Influencer;
}
