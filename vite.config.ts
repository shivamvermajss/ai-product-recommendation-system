import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig, type Plugin } from 'vite';
import { getRecommendations } from './src/server/recommendService.js';

// Load environment variables from .env file
dotenv.config();

function localApiPlugin(): Plugin {
  return {
    name: 'local-api-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/recommend') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const parsed = body ? JSON.parse(body) : {};
              const { query, categoryFilter } = parsed;

              const responseData = await getRecommendations({
                query: query || '',
                categoryFilter: categoryFilter || 'All'
              });

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(responseData));
            } catch (err: any) {
              console.error('Local API error:', err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
