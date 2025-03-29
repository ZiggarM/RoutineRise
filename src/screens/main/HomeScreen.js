import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <View className={`px-2 py-1 rounded-full ${colors[difficulty].split(' ')[0]}`}>
      <Text className={`text-xs font-medium ${colors[difficulty].split(' ')[1]}`}>
        {difficulty}
      </Text>
    </View>
  );
};

const TaskCard = ({ task, onComplete }) => {
  return (
    <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold flex-1 mr-2">{task.title}</Text>
        <DifficultyBadge difficulty={task.difficulty} />
      </View>
      
      <Text className="text-gray-600 mb-4">{task.description}</Text>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-primary font-medium">
          {task.points} points
        </Text>
        
        {!task.completed && (
          <TouchableOpacity
            className="bg-primary px-4 py-2 rounded-lg"
            onPress={() => onComplete(task.id)}
          >
            <Text className="text-white font-medium">Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({
    total: 0,
    completed: 0,
  });

  useEffect(() => {
    // TODO: Fetch tasks from API
    setTasks([
      {
        id: '1',
        title: 'Complete a coding challenge',
        description: 'Solve one programming problem on LeetCode or similar platform',
        difficulty: 'Medium',
        points: 20,
        completed: false,
      },
      {
        id: '2',
        title: 'Read documentation',
        description: 'Spend 30 minutes reading React Native documentation',
        difficulty: 'Easy',
        points: 10,
        completed: false,
      },
    ]);
  }, []);

  const handleCompleteTask = async (taskId) => {
    // TODO: Update task completion status in API
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-2xl font-bold mb-2">
            Welcome back, {user?.name}!
          </Text>
          
          <View className="bg-white p-4 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-2">Today's Progress</Text>
            <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <View 
                className="bg-primary h-full rounded-full"
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              />
            </View>
            <Text className="text-gray-600 mt-2">
              {progress.completed} of {progress.total} tasks completed
            </Text>
          </View>

          <Text className="text-xl font-semibold mb-4">Today's Tasks</Text>
          
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
