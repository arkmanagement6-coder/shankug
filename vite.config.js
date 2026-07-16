import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/dedupe': {
        target: 'https://uat.apnacred.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dedupe/, '/api/partner/dedupe'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Inject the authorization header in the proxy request
            proxyReq.setHeader('Authorization', 'Bearer YXBuYWNyZWRfZTBkZWE5NWZjZTRhNWU2NzpDM25CSGlXQjZpS1dMZU43enB4RXAxdmY1R3JsSjRJQw==');
            proxyReq.setHeader('Content-Type', 'application/json');
          });
        }
      }
    }
  }
});
