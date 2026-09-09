import React, { useState } from 'react';
import { Sparkles, Search, X, ArrowRight, Loader2, Zap } from 'lucide-react';

interface RecommendationBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  currentQuery: string;
}

const QUICK_PROMPTS = [
  '📱 I want a phone under $500',
  '💻 Best laptop for coding & long battery',
  '🎧 Noise-cancelling headphones for travel',
  '⌚ Fitness smartwatch under $250',
  '🎒 Lightweight tech under $100',
  '🎮 High-end gaming powerhouse'
];

export const RecommendationBar: React.FC<RecommendationBarProps> = ({
  onSearch,
  isLoading,
  currentQuery
}) => {
  const [inputValue, setInputValue] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSearch(inputValue.trim());
    }
  };

  const handlePromptClick = (promptText: string) => {
    // Strip leading emoji if present for clean search text
    const cleanText = promptText.replace(/^[^\w\s]+\s*/, '');
    setInputValue(cleanText);
    onSearch(cleanText);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <section className="hero-section">
      <div className="hero-tag">
        <Zap size={14} className="text-indigo-400" />
        <span>Context-Aware Semantic Product Matching</span>
      </div>

      <h1 className="hero-title">
        Discover Tech Tailored by <span className="gradient-text">Gemini Intelligence</span>
      </h1>

      <p className="hero-subtitle">
        Enter your requirements in everyday plain English. Our AI analyzes budget, hardware specs, and user ratings to recommend perfect matches strictly from our catalog.
      </p>

      <div className="search-box-card">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-group">
            <div className="search-icon-wrapper">
              <Search size={20} />
            </div>

            <input
              type="text"
              className="search-input"
              placeholder="e.g. 'I want a phone under $500' or 'Lightweight laptop with 16GB RAM'..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              aria-label="Natural language product query"
            />

            {inputValue && !isLoading && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClear}
                title="Clear input"
                aria-label="Clear search input"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="spinner-icon" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Get Recommendations</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="quick-prompts-row">
        <span className="quick-prompts-label">Try asking:</span>
        {QUICK_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            type="button"
            className="prompt-pill"
            onClick={() => handlePromptClick(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
};
