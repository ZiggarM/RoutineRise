import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

// Simple tab icon component
const TabIcon = ({ focused, iconText }: { focused: boolean; iconText: string }) => {
  return (
    <Text style={{ 
      fontSize: 24,
      color: focused ? '#4F46E5' : '#9CA3AF'
    }}>
      {iconText}
    </Text>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon focused={focused} iconText="🏠" />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon focused={focused} iconText="🎯" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon focused={focused} iconText="👤" />,
        }}
      />
    </Tabs>
  );
}
