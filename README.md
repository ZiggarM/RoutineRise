# RoutineRise - Habit Building Mobile App

A React Native mobile application designed to help users build positive habits and achieve their life goals through personalized daily tasks and progress tracking.

## Features

- User Authentication (Sign up, Login, Logout)
- Life Goal Selection and Management
- Personalized Daily Tasks
- Task Difficulty Categories (Easy, Medium, Hard)
- Progress Tracking System
- Points and Achievement System

## Tech Stack

- Frontend: React Native with Expo
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Styling: TailwindCSS (NativeWind)

## Environment Setup

To run this project, you'll need to set up your environment variables. Copy the `.env.example` file to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit the `.env` file with your specific values:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key for JWT tokens
- `API_BASE_URL`: Your API server URL

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   Create a `.env` file in the root directory and add:
   ```
   API_URL=your_backend_url
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## Project Structure

- `/src`
  - `/context` - Application context (Auth, etc.)
  - `/navigation` - Navigation stacks
  - `/screens` - Screen components
  - `/components` - Reusable UI components
- `/backend`
  - `/models` - MongoDB schemas
  - `/routes` - API routes
  - `/controllers` - Business logic
  - `/middleware` - Custom middleware

## Database Schema

- Users: Store user information and authentication
- Goals: User's life goals and progress
- Tasks: Daily tasks generated based on goals

## Security

- Never commit your `.env` file
- Use different secrets for development and production
- Keep your MongoDB credentials secure
