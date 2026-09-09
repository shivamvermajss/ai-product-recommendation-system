import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry }) => {
  return (
    <div className="state-card" style={{ borderStyle: 'solid', borderColor: 'rgba(244, 63, 94, 0.4)' }}>
      <div className="state-icon-wrapper error">
        <AlertTriangle size={32} />
      </div>
      <h3 className="state-title" style={{ color: '#fca5a5' }}>
        Recommendation Request Failed
      </h3>
      <p className="state-desc">
        {message || 'An unexpected error occurred while communicating with the recommendation engine.'}
      </p>
      <button
        type="button"
        className="state-btn"
        onClick={onRetry}
        style={{ background: '#e11d48' }}
      >
        <RefreshCw size={16} />
        <span>Try Again</span>
      </button>
    </div>
  );
};
