export const API_CONFIG = {
  BASE_URL: 'https://dolphinai.webredirect.org',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    ACCOUNT: {
      BASE: '/accounts',
      FAVORITE_COINS: '/accounts/{id}/favoriteCoins',
      ADD_FAVORITE: '/accounts/{id}/addFavoriteCoin',
      REMOVE_FAVORITE: '/accounts/{id}/removeFavoriteCoin',
      CONNECT: '/accounts/{id}/connect'
    }
  }
};
