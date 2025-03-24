import {
  faq,
  faqCategory,
  AllFAQsResponse,
  AllFAQCategoriesResponse,
} from '../../interfaces/FAQInterfaces';

export interface FAQState {
  errorMessage: string;
  faq: faq | null;
  faqCategory: faqCategory | null;
  faqs: AllFAQsResponse | null;
  faqCategories: AllFAQCategoriesResponse | null;
  message: string | null;
  success: boolean | null;
}

export type FAQAction =
  | {type: 'getFAQs'; payload: AllFAQsResponse}
  | {type: 'getCategoryFAQs'; payload: AllFAQCategoriesResponse}
  | {type: 'addError'; payload: string}
  | {type: 'removeSuccess'};

export const FAQReducer = (state: FAQState, action: FAQAction): FAQState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };

    case 'getFAQs':
      return {
        ...state,
        errorMessage: '',
        faqs: action.payload,
        success: false,
      };

    case 'getCategoryFAQs':
      return {
        ...state,
        errorMessage: '',
        faqCategories: action.payload,
        success: false,
      };

    case 'removeSuccess':
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
