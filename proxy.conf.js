const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */
const proxyConfig = [
  {
    context: '/api',
    pathRewrite: { '^/api': '' },
    // target: 'https://api.chucknorris.io',
    target: 'http://localhost:8080/HealthOneBE',
    // target: 'http://ec2-18-224-181-225.us-east-2.compute.amazonaws.com:9000/healthone',
    changeOrigin: true,
    secure: false,
  } /*,
  {
    context: '/api/assets',
    pathRewrite: { '^/api/assets': '' },
    // target: 'https://api.chucknorris.io',
    target:'http://localhost:4200/',
    changeOrigin: true,
    secure: false
  },*/,
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach((entry) => {
      entry.agent = agent;
    });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
