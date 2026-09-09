import React from 'react';
import { Sparkles, RotateCcw, Info } from 'lucide-react';

interface RecommendationBannerProps {
  query: string;
  count: number;
  isMock?: boolean;
  message?: string;
  onClear: () => void;
}

export const RecommendationBanner: React.FC<RecommendationBannerProps> = ({
  query,
  count,
  isMock,
  message,
  onClear
}) => {
  return (
    <div className="rec-banner">
      <div className="rec-banner-inner">
        <div className="rec-info-left">
          <div className="rec-sparkle-icon">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="rec-banner-title">
              <span>{isMock ? 'Smart Semantic Matches' : 'Gemini Recommendations'}</span>
              <span className="rec-count-badge">{count} {count === 1 ? 'Product Match' : 'Product Matches'}</span>
            </div>
            <p className="rec-query-text">
              Matching preference: <span>"{query}"</span>
            </p>
            {message && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                <Info size={13} />
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="reset-recommendations-btn"
          title="Clear AI recommendations and show complete catalog"
        >
          <RotateCcw size={15} />
          <span>Show Full Catalog</span>
        </button>
      </div>
    </div>
  );
};
