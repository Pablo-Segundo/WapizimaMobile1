export interface OffersResponse {
  offers: Offer[];
}

export interface Offer {
  _id: string;
  text: string;
  short_text: string;
  category: string;
  status: boolean;
  imageWeb: string;
  imageMobile: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}
