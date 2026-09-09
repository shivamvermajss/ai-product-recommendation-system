import React from 'react';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-text">
          <strong>SmartPick AI</strong> — Built for the Indeed AI Engineer Assessment.
        </div>

        <div className="footer-pills-list">
          <span className="footer-pill">
            <Code2 size={13} />
            React + TypeScript + Vite
          </span>
          <span className="footer-pill">
            <Sparkles size={13} />
            Google Gemini API
          </span>
          <span className="footer-pill">
            <Terminal size={13} />
            Vercel Serverless
          </span>
        </div>
      </div>
    </footer>
  );
};
