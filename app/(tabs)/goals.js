import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const GoalCard = ({ goal, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(goal)}
    >
      <Text style={styles.cardTitle}>{goal.title}</Text>
      <Text style={styles.cardDescription}>{goal.description}</Text>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[styles.progressBar, { width: `${goal.progress}%` }]}
        />
      </View>
      
      <Text style={styles.progressText}>
        {goal.progress}% Complete
      </Text>
    </TouchableOpacity>
  );
};

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadGoals = async () => {
      try {
        setLoading(true);
        // Check authentication
        const userJSON = await AsyncStorage.getItem('user');
        if (!userJSON) {
          // User is not authenticated, redirect to login
          router.replace('/login');
          return;
        }
        
        setAuthenticated(true);
        
        // Load selected goals from goal selection
        const selectedGoalsJSON = await AsyncStorage.getItem('selectedGoals');
        if (selectedGoalsJSON) {
          const selectedGoalIds = JSON.parse(selectedGoalsJSON);
          
          // Mock goal data based on selections
          const goalOptions = [
            {
              id: '1',
              title: 'Become a Developer',
              description: 'Learn programming and build applications',
              progress: 45,
            },
            {
              id: '2',
              title: 'Get Fit',
              description: 'Improve physical health and fitness',
              progress: 30,
            },
            {
              id: '3',
              title: 'Learn a Language',
              description: 'Master a new foreign language',
              progress: 15,
            },
            {
              id: '4',
              title: 'Read More Books',
              description: 'Develop a reading habit',
              progress: 60,
            },
            {
              id: '5',
              title: 'Financial Freedom',
              description: 'Save money and build wealth',
              progress: 25,
            },
            {
              id: '6',
              title: 'Mindfulness',
              description: 'Practice meditation and reduce stress',
              progress: 10,
            },
          ];
          
          // Filter goals based on user selection
          const userGoals = goalOptions.filter(goal => 
            selectedGoalIds.includes(goal.id)
          );
          
          setGoals(userGoals);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthAndLoadGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title.trim()) {
      Alert.alert('Error', 'Please enter a goal title');
      return;
    }

    try {
      // Create new goal
      const goal = {
        id: Date.now().toString(),
        ...newGoal,
        progress: 0,
      };

      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      
      // Save updated goals
      const selectedGoalsJSON = await AsyncStorage.getItem('selectedGoals');
      if (selectedGoalsJSON) {
        const selectedGoalIds = JSON.parse(selectedGoalsJSON);
        selectedGoalIds.push(goal.id);
        await AsyncStorage.setItem('selectedGoals', JSON.stringify(selectedGoalIds));
      }
      
      setNewGoal({ title: '', description: '' });
      setShowAddGoal(false);
    } catch (error) {
      console.error('Error saving goal:', error);
      Alert.alert('Error', 'Failed to save goal. Please try again.');
    }
  };

  const handleGoalPress = (goal) => {
    // In a real app, this would navigate to goal details
    Alert.alert('Goal Details', `${goal.title}\n\nProgress: ${goal.progress}%`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Goals" showLogoutButton={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Life Goals</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddGoal(true)}
            >
              <Text style={styles.addButtonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>

          {showAddGoal && (
            <View style={styles.formCard}>
              <TextInput
                style={styles.input}
                placeholder="Goal Title"
                value={newGoal.title}
                onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={newGoal.description}
                onChangeText={(text) => setNewGoal({ ...newGoal, description: text })}
                multiline
                numberOfLines={3}
              />
              
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddGoal(false);
                    setNewGoal({ title: '', description: '' });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleAddGoal}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {goals.length > 0 ? (
            goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onPress={handleGoalPress}
              />
            ))
          ) : (
            <View style={styles.emptyStateCard}>
              <Text style={styles.emptyStateTitle}>No goals yet</Text>
              <Text style={styles.emptyStateDescription}>
                Add your first goal to start tracking your progress
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => setShowAddGoal(true)}
              >
                <Text style={styles.emptyStateButtonText}>Add Your First Goal</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1F2937',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyStateCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1F2937',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
