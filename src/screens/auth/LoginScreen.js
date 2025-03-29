import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      // Navigation will be handled by the auth state change
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-center text-primary mb-8">
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
            className="bg-primary p-4 rounded-lg"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="mt-4"
            onPress={() => navigation.navigate('Register')}
          >
            <Text className="text-primary text-center">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
