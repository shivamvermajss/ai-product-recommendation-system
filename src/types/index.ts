export interface Product {
  id: string;
  name: string;
  category: 'Smartphones' | 'Laptops' | 'Audio' | 'Wearables' | 'Tablets' | 'Accessories';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface AIRecommendation {
  id: string;
  reason: string;
  matchScore?: number;
}

export interface RecommendationResponse {
  recommendations: AIRecommendation[];
  recommendedProductIds?: string[];
  isMock?: boolean;
  query: string;
  message?: string;
  model?: string;
}

export interface RecommendationRequest {
  query: string;
  category?: string;
  maxResults?: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';
