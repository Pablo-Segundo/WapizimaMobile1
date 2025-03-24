export interface MessageResponse {
  message: string;
}
export interface AllFAQsResponse {
  faqs: faq[];
}
export interface AllFAQCategoriesResponse {
  faqs: faqCategory[];
}
export interface faq {
  question: string;
  answer: string;
}
export interface faqCategory {
  name: string;
}
