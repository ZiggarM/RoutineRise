import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value }) => (
  <View className="bg-white p-4 rounded-lg flex-1 mx-2">
    <Text className="text-gray-600 text-sm mb-1">{title}</Text>
    <Text className="text-2xl font-bold text-primary">{value}</Text>
  </View>
);

const AchievementCard = ({ achievement }) => (
  <View className="bg-white p-4 rounded-lg mb-4 flex-row items-center">
    <View className="w-12 h-12 bg-primary rounded-full items-center justify-center mr-4">
      <Text className="text-white text-xl font-bold">
        {achievement.icon}
      </Text>
    </View>
    <View className="flex-1">
      <Text className="font-semibold text-lg mb-1">{achievement.title}</Text>
      <Text className="text-gray-600">{achievement.description}</Text>
    </View>
  </View>
);

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const stats = {
    totalPoints: 450,
    completedTasks: 28,
    currentStreak: 5,
  };

  const achievements = [
    {
      id: '1',
      icon: '🌟',
      title: 'First Goal Set',
      description: 'Created your first life goal',
    },
    {
      id: '2',
      icon: '🔥',
      title: '5 Day Streak',
      description: 'Completed tasks for 5 days in a row',
    },
    {
      id: '3',
      icon: '💪',
      title: 'Task Master',
      description: 'Completed 25 tasks',
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="py-6 px-4">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </Text>
            </View>
            <Text className="text-2xl font-bold mb-1">{user?.name}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>

          <View className="flex-row mb-6">
            <StatCard title="Total Points" value={stats.totalPoints} />
            <StatCard title="Tasks Done" value={stats.completedTasks} />
            <StatCard title="Day Streak" value={stats.currentStreak} />
          </View>

          <Text className="text-xl font-bold mb-4">Achievements</Text>
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}

          <TouchableOpacity
            className="bg-red-500 p-4 rounded-lg mt-6"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
