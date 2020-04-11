const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const config = {
  common: {
    api: {
      port: process.env.PORT
    },
    gameApiBaseUrl: process.env.GAME_API_BASE_URL
  }
};

module.exports = config;
