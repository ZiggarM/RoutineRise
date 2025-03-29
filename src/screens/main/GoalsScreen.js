import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

const GoalCard = ({ goal, onPress }) => {
  const progressWidth = `${goal.progress}%`;
  
  return (
    <TouchableOpacity 
      className="bg-white p-4 rounded-lg mb-4 shadow-sm"
      onPress={() => onPress(goal)}
    >
      <Text className="text-lg font-semibold mb-2">{goal.title}</Text>
      <Text className="text-gray-600 mb-3">{goal.description}</Text>
      
      <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
        <View 
          className="bg-primary h-full rounded-full"
          style={{ width: progressWidth }}
        />
      </View>
      
      <Text className="text-gray-600 mt-2">
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

  useEffect(() => {
    // TODO: Fetch goals from API
    setGoals([
      {
        id: '1',
        title: 'Become a Full Stack Developer',
        description: 'Master both frontend and backend development',
        progress: 45,
      },
      {
        id: '2',
        title: 'Learn Mobile Development',
        description: 'Build cross-platform mobile applications',
        progress: 30,
      },
    ]);
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title.trim()) return;

    // TODO: Add goal to API
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      progress: 0,
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '' });
    setShowAddGoal(false);
  };

  const handleGoalPress = (goal) => {
    // TODO: Navigate to goal details or edit screen
    console.log('Goal pressed:', goal);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold">My Goals</Text>
            <TouchableOpacity
              className="bg-primary px-4 py-2 rounded-lg"
              onPress={() => setShowAddGoal(true)}
            >
              <Text className="text-white font-medium">Add Goal</Text>
            </TouchableOpacity>
          </View>

          {showAddGoal && (
            <View className="bg-white p-4 rounded-lg mb-6">
              <TextInput
                className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200"
                placeholder="Goal Title"
                value={newGoal.title}
                onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
              />
              
              <TextInput
                className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200"
                placeholder="Description"
                value={newGoal.description}
                onChangeText={(text) => setNewGoal({ ...newGoal, description: text })}
                multiline
                numberOfLines={3}
              />
              
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                  onPress={() => {
                    setShowAddGoal(false);
                    setNewGoal({ title: '', description: '' });
                  }}
                >
                  <Text className="text-gray-800 font-medium">Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="bg-primary px-4 py-2 rounded-lg"
                  onPress={handleAddGoal}
                >
                  <Text className="text-white font-medium">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={handleGoalPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
