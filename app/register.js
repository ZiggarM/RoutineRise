import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      // Add error handling for password mismatch
      alert('Passwords do not match');
      return;
    }
    
    try {
      if (formData.email && formData.password && formData.name) {
        // Create mock user data
        const newUser = {
          id: '1',
          name: formData.name,
          email: formData.email,
          points: 0,
        };
        
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        
        // Navigate to goal selection
        router.replace('/goal-selection');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-6">
        <View className="py-12">
          <Text className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Create Account
          </Text>
          
          <View className="space-y-4">
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200"
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              autoCapitalize="words"
            />
            
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200"
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200"
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
            
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry
            />
            
            <TouchableOpacity
              className="bg-indigo-600 p-4 rounded-lg mt-4"
              onPress={handleRegister}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Register
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push('/login')}
            >
              <Text className="text-indigo-600 text-center">
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
