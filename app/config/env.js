import Constants from 'expo-constants';

// Get environment variables from app.json
const env = Constants.expoConfig?.extra || {};

// Simple environment variables access that doesn't require babel config changes
export const ENV = {
  // MongoDB connection
  MONGODB_URI: env.MONGODB_URI || 'mongodb+srv://marios:12345@cluster0.ajfe3ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  MONGODB_DB_NAME: env.MONGODB_DB_NAME || 'routinerise',
  
  // Authentication
  JWT_SECRET: env.JWT_SECRET || 'your_jwt_secret_key_here',
  JWT_EXPIRES_IN: env.JWT_EXPIRES_IN || '7d',
  
  // App Configuration
  APP_ENV: env.APP_ENV || 'development',
  
  // API Configuration
  API_BASE_URL: env.API_BASE_URL || 'http://localhost:3000'
};
