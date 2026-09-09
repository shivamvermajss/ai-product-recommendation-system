import React, { useState } from 'react';
import type { Product } from '../types';
import { Star, Sparkles, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aiReason?: string;
  isRecommended?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aiReason,
  isRecommended
}) => {
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleImageError = () => {
    // High-reliability tech placeholder fallback
    setImgSrc('https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80');
  };

  return (
    <article className={`product-card ${isRecommended ? 'is-recommended' : ''}`}>
      <div className="card-image-wrap">
        <img
          src={imgSrc}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />

        <div className="card-top-badges">
          <span className="category-tag">{product.category}</span>
          {isRecommended ? (
            <span className="ai-match-ribbon">
              <Sparkles size={12} />
              AI Match
            </span>
          ) : product.badge ? (
            <span className="special-badge">{product.badge}</span>
          ) : null}
        </div>
      </div>

      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-meta-row">
          <div className="rating-stars" title={`${product.rating} out of 5 stars`}>
            <Star size={15} fill="#fbbf24" stroke="#fbbf24" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="reviews-count">({product.reviewsCount} reviews)</span>
        </div>

        {/* AI Rationale Box if recommended */}
        {isRecommended && aiReason && (
          <div className="ai-reason-box">
            <div className="ai-reason-header">
              <Sparkles size={13} />
              <span>AI Recommendation Reason</span>
            </div>
            <p>{aiReason}</p>
          </div>
        )}

        <p className="product-desc">{product.description}</p>

        <div className="features-tags-list">
          {product.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="price-value">${product.price.toLocaleString()}</span>
          </div>

          <button
            type="button"
            className={`card-action-btn ${isRecommended ? 'primary' : ''}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Select</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
