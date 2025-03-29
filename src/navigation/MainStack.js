import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/main/HomeScreen';
import GoalsScreen from '../screens/main/GoalsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import GoalSelectionScreen from '../screens/main/GoalSelectionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom tab bar icon component
const TabIcon = ({ focused, color, iconText }) => {
  return (
    <View className={`items-center justify-center`}>
      <Text className={`text-2xl ${focused ? 'text-primary' : 'text-gray-400'}`}>
        {iconText}
      </Text>
    </View>
  );
};

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} iconText="🏠" />
          ),
        }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} iconText="🎯" />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} iconText="👤" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main stack with initial goal selection and tabs
export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
