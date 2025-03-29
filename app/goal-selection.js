import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const goalOptions = [
  {
    id: '1',
    title: 'Become a Developer',
    description: 'Learn programming and build applications',
    icon: '💻',
  },
  {
    id: '2',
    title: 'Get Fit',
    description: 'Improve physical health and fitness',
    icon: '💪',
  },
  {
    id: '3',
    title: 'Learn a Language',
    description: 'Master a new foreign language',
    icon: '🌎',
  },
  {
    id: '4',
    title: 'Read More Books',
    description: 'Develop a reading habit',
    icon: '📚',
  },
  {
    id: '5',
    title: 'Financial Freedom',
    description: 'Save money and build wealth',
    icon: '💰',
  },
  {
    id: '6',
    title: 'Mindfulness',
    description: 'Practice meditation and reduce stress',
    icon: '🧘',
  },
];

const GoalCard = ({ goal, selected, onSelect }) => {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg mb-4 border-2 ${
        selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'
      }`}
      onPress={() => onSelect(goal.id)}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
          <Text className="text-2xl">{goal.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-lg mb-1">{goal.title}</Text>
          <Text className="text-gray-600">{goal.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function GoalSelectionScreen() {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleGoalSelect = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = async () => {
    try {
      // Save selected goals
      await AsyncStorage.setItem('selectedGoals', JSON.stringify(selectedGoals));
      // Mark that user has selected goals
      await AsyncStorage.setItem('hasSelectedGoals', 'true');
      // Navigate to main tabs
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4">
        <View className="py-8">
          <Text className="text-3xl font-bold text-center mb-2">
            Select Your Goals
          </Text>
          <Text className="text-gray-600 text-center mb-8">
            Choose the goals you want to work towards
          </Text>

          {goalOptions.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              selected={selectedGoals.includes(goal.id)}
              onSelect={handleGoalSelect}
            />
          ))}

          <TouchableOpacity
            className={`p-4 rounded-lg mt-6 ${
              selectedGoals.length > 0 ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
            onPress={handleContinue}
            disabled={selectedGoals.length === 0}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
