import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Mock login - in a real app, this would be an API call
      if (email && password) {
        // Create mock user data
        const userData = {
          id: '1',
          name: email.split('@')[0],
          email,
          points: 120,
        };
        
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        
        // Check if user has selected goals before
        const hasSelectedGoals = await AsyncStorage.getItem('hasSelectedGoals');
        if (hasSelectedGoals === 'true') {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/goal-selection');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-center text-indigo-600 mb-8">
          RoutineRise
        </Text>
        
        <View className="space-y-4">
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-200"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-200"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-lg"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push('/register')}
          >
            <Text className="text-indigo-600 text-center">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
