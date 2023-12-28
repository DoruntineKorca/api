const DEFAULT_PORT = 3001;

const settings = {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.API_PORT || DEFAULT_PORT,
  apiHost: process.env.API_HOST || '0.0.0.0',
};

export default {
  settings: settings,
};