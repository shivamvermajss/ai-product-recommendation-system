import React from 'react';
import { Sparkles, Bot, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isMockMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isMockMode }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-group">
          <div className="brand-logo-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-title">SmartPick AI</span>
              <span className="brand-badge">Indeed AI Assessment</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          {isMockMode ? (
            <div className="status-chip demo-mode" title="Gemini API key not provided in .env - using semantic heuristic matching">
              <span className="status-dot"></span>
              <Bot size={15} />
              <span>Smart Demo Mode</span>
            </div>
          ) : (
            <div className="status-chip" title="Connected to Google Gemini API">
              <span className="status-dot"></span>
              <ShieldCheck size={15} />
              <span>Gemini Active</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
