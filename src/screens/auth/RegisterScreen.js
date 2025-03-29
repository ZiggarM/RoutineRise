import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register } = useAuth();

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      // Add error handling for password mismatch
      return;
    }
    
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      // Navigation will be handled by the auth state change
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6">
        <View className="py-12">
          <Text className="text-3xl font-bold text-center text-primary mb-8">
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
              className="bg-primary p-4 rounded-lg mt-4"
              onPress={handleRegister}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Register
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-primary text-center">
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
