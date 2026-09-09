import React, { useState, useMemo, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import type { Product, AIRecommendation, RecommendationResponse, SortOption } from './types';
import { Header } from './components/Header';
import { RecommendationBar } from './components/RecommendationBar';
import { RecommendationBanner } from './components/RecommendationBanner';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isRecommendationsActive, setIsRecommendationsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string | undefined>(undefined);

  // Fetch AI Recommendations from serverless route / local Vite endpoint
  const handleGetRecommendations = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setActiveQuery(query);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query.trim(),
          categoryFilter: selectedCategory !== 'All' ? selectedCategory : undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: RecommendationResponse = await response.json();

      // Ensure returned items exist in our catalog (Defense-in-depth against AI hallucinations)
      const validIds = new Set(PRODUCTS.map((p) => p.id));
      const validated = (data.recommendations || []).filter((r) => validIds.has(r.id));

      setRecommendations(validated);
      setIsRecommendationsActive(true);
      setIsMockMode(!!data.isMock);
      setApiMessage(data.message);
    } catch (err: any) {
      console.error('Recommendation fetch error:', err);
      setErrorMessage(err?.message || 'Failed to fetch AI recommendations. Please verify network or server status.');
      setIsRecommendationsActive(false);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  const handleClearRecommendations = () => {
    setIsRecommendationsActive(false);
    setRecommendations([]);
    setActiveQuery('');
    setErrorMessage(null);
    setApiMessage(undefined);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // If recommendation is active and category changed, clear or refresh
    if (isRecommendationsActive) {
      setIsRecommendationsActive(false);
      setRecommendations([]);
    }
  };

  // Compute displayed products list
  const displayedProducts = useMemo(() => {
    let list: Product[] = [];

    if (isRecommendationsActive) {
      // Map AI recommendations in their exact ranking order
      const recMap = new Map(recommendations.map((r, index) => [r.id, index]));
      list = PRODUCTS.filter((p) => recMap.has(p.id));

      if (sortOption === 'featured') {
        // Sort by AI recommendation relevance order
        list.sort((a, b) => (recMap.get(a.id) ?? 0) - (recMap.get(b.id) ?? 0));
      }
    } else {
      // Show full catalog, filtered by category
      if (selectedCategory === 'All') {
        list = [...PRODUCTS];
      } else {
        list = PRODUCTS.filter((p) => p.category === selectedCategory);
      }
    }

    // Apply secondary sort if selected
    if (sortOption === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [isRecommendationsActive, recommendations, selectedCategory, sortOption]);

  return (
    <div className="app-wrapper">
      <Header isMockMode={isMockMode} />

      <main className="main-content">
        <RecommendationBar
          onSearch={handleGetRecommendations}
          isLoading={isLoading}
          currentQuery={activeQuery}
        />

        {errorMessage && (
          <ErrorBanner
            message={errorMessage}
            onRetry={() => handleGetRecommendations(activeQuery)}
          />
        )}

        {isRecommendationsActive && !errorMessage && (
          <RecommendationBanner
            query={activeQuery}
            count={displayedProducts.length}
            isMock={isMockMode}
            message={apiMessage}
            onClear={handleClearRecommendations}
          />
        )}

        <Filters
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalCount={displayedProducts.length}
        />

        <ProductGrid
          products={displayedProducts}
          recommendations={recommendations}
          isRecommendationsActive={isRecommendationsActive}
          isLoading={isLoading}
          onReset={handleClearRecommendations}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
