import React from 'react';
import type { Product, AIRecommendation } from '../types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  recommendations: AIRecommendation[];
  isRecommendationsActive: boolean;
  isLoading: boolean;
  onReset: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  recommendations,
  isRecommendationsActive,
  isLoading,
  onReset
}) => {
  // Map of recommendation reasons by product ID
  const recommendationMap = new Map<string, string>(
    recommendations.map((r) => [r.id, r.reason])
  );

  if (isLoading) {
    return (
      <div className="skeleton-grid" aria-label="Loading products...">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="state-card">
        <div className="state-icon-wrapper">
          <PackageSearch size={32} />
        </div>
        <h3 className="state-title">No Products Found</h3>
        <p className="state-desc">
          {isRecommendationsActive
            ? "Our AI couldn't find any products in our catalog matching your exact criteria. Try broadening your budget or asking with different keywords."
            : "No products match the selected category filter."}
        </p>
        <button type="button" className="state-btn" onClick={onReset}>
          {isRecommendationsActive ? 'Show All Products' : 'Reset Filters'}
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isRec = recommendationMap.has(product.id);
        const reason = recommendationMap.get(product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            isRecommended={isRec}
            aiReason={reason}
          />
        );
      })}
    </div>
  );
};
