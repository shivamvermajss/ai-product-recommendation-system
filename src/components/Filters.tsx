import React from 'react';
import { CATEGORIES } from '../data/products';
import type { SortOption } from '../types';
import { SlidersHorizontal } from 'lucide-react';

interface FiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  totalCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  sortOption,
  onSortChange,
  totalCount
}) => {
  return (
    <div className="controls-bar">
      <div className="category-pills-list">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="sort-select-group">
        <SlidersHorizontal size={15} className="text-slate-400" />
        <span className="sort-label">Sort by:</span>
        <select
          className="custom-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort products"
        >
          <option value="featured">Featured / Best Match</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginLeft: '0.5rem' }}>
          ({totalCount} items)
        </span>
      </div>
    </div>
  );
};
