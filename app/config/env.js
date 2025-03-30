import Constants from 'expo-constants';

// Get environment variables from app.json
const { expo } = Constants.manifest;

// Simple environment variables access that doesn't require babel config changes
export const ENV = {
  // MongoDB connection
  MONGODB_URI: expo?.extra?.MONGODB_URI || 'mongodb+srv://marios:12345@cluster0.ajfe3ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  MONGODB_DB_NAME: expo?.extra?.MONGODB_DB_NAME || 'routinerise',
  
  // Authentication
  JWT_SECRET: expo?.extra?.JWT_SECRET || 'your_jwt_secret_key_here',
  JWT_EXPIRES_IN: expo?.extra?.JWT_EXPIRES_IN || '7d',
  
  // App Configuration
  APP_ENV: expo?.extra?.APP_ENV || 'development',
  
  // API Configuration
  API_BASE_URL: expo?.extra?.API_BASE_URL || 'http://localhost:3000'
};
