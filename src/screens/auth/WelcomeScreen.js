import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-center items-center">
        <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-6">
          <Text className="text-white text-4xl font-bold">RR</Text>
        </View>
        
        <Text className="text-3xl font-bold text-center text-primary mb-2">
          RoutineRise
        </Text>
        
        <Text className="text-gray-600 text-center mb-12">
          Build better habits, achieve your goals
        </Text>
        
        <View className="w-full space-y-4">
          <TouchableOpacity
            className="bg-primary p-4 rounded-lg"
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-white border border-primary p-4 rounded-lg"
            onPress={() => navigation.navigate('Register')}
          >
            <Text className="text-primary text-center font-semibold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
