import { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('user');
        
        if (userJSON) {
          // User is logged in, check if they've selected goals
          const hasSelectedGoals = await AsyncStorage.getItem('hasSelectedGoals');
          if (hasSelectedGoals === 'true') {
            router.replace('/(tabs)/home');
          } else {
            router.replace('/goal-selection');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-6 justify-center items-center">
        <View className="w-24 h-24 bg-indigo-600 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-4xl font-bold">RR</Text>
        </View>
        
        <Text className="text-3xl font-bold text-center text-indigo-600 mb-2">
          RoutineRise
        </Text>
        
        <Text className="text-gray-600 text-center mb-12">
          Build better habits, achieve your goals
        </Text>
        
        <View className="w-full space-y-4">
          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-lg"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-white border border-indigo-600 p-4 rounded-lg"
            onPress={() => router.push('/register')}
          >
            <Text className="text-indigo-600 text-center font-semibold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
