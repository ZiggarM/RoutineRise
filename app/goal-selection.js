import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';

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
      style={[
        styles.goalCard,
        selected && styles.goalCardSelected
      ]}
      onPress={() => onSelect(goal.id)}
    >
      <View style={styles.goalCardContent}>
        <View style={styles.goalIcon}>
          <Text style={styles.goalIconText}>{goal.icon}</Text>
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalDescription}>{goal.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function GoalSelectionScreen() {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGoalSelect = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = async () => {
    if (selectedGoals.length === 0) {
      Alert.alert('Error', 'Please select at least one goal');
      return;
    }
    
    try {
      setLoading(true);
      // Save selected goals
      await AsyncStorage.setItem('selectedGoals', JSON.stringify(selectedGoals));
      // Mark that user has selected goals
      await AsyncStorage.setItem('hasSelectedGoals', 'true');
      // Navigate to main tabs
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error saving goals:', error);
      Alert.alert('Error', 'Failed to save goals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Goals" showBackButton={false} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>
            What are your goals?
          </Text>
          <Text style={styles.subtitle}>
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
            style={[
              styles.continueButton,
              selectedGoals.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={selectedGoals.length === 0 || loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Saving...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
  },
  goalCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
  goalCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalIconText: {
    fontSize: 24,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
