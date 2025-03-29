import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: { bg: '#DCFCE7', text: '#166534' },
    Medium: { bg: '#FEF9C3', text: '#854D0E' },
    Hard: { bg: '#FEE2E2', text: '#991B1B' },
  };

  return (
    <View style={[styles.badge, { backgroundColor: colors[difficulty].bg }]}>
      <Text style={[styles.badgeText, { color: colors[difficulty].text }]}>
        {difficulty}
      </Text>
    </View>
  );
};

const TaskCard = ({ task, onComplete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <DifficultyBadge difficulty={task.difficulty} />
      </View>
      
      <Text style={styles.cardDescription}>{task.description}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.pointsText}>
          {task.points} points
        </Text>
        
        {!task.completed && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onComplete(task.id)}
          >
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({
    total: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const userJSON = await AsyncStorage.getItem('user');
        
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUser(userData);
          setAuthenticated(true);
          
          // Load mock tasks
          const mockTasks = [
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
            {
              id: '3',
              title: 'Build a small project',
              description: 'Create a simple app using what you learned today',
              difficulty: 'Hard',
              points: 30,
              completed: false,
            },
          ];
          
          setTasks(mockTasks);
          setProgress({
            total: mockTasks.length,
            completed: mockTasks.filter(t => t.completed).length,
          });
        } else {
          // User is not authenticated, redirect to login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleCompleteTask = async (taskId) => {
    // Update task completion status
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    
    setTasks(updatedTasks);
    setProgress({
      total: updatedTasks.length,
      completed: updatedTasks.filter(t => t.completed).length,
    });
    
    // Update user points
    const completedTask = tasks.find(t => t.id === taskId);
    if (completedTask && user) {
      const updatedUser = {
        ...user,
        points: (user.points || 0) + completedTask.points,
      };
      
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
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
      <Header title="Home" showLogoutButton={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}!
          </Text>
          
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { width: `${progress.total ? (progress.completed / progress.total) * 100 : 0}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {progress.completed} of {progress.total} tasks completed
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1F2937',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    color: '#1F2937',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
  },
  completeButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});
