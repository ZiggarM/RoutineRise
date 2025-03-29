import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Check if user is logged in on app start
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('user');
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUser(userData);
          
          // Check if user has selected goals
          const hasSelectedGoals = await AsyncStorage.getItem('hasSelectedGoals');
          if (hasSelectedGoals === 'true') {
            navigation.navigate('Main', { screen: 'MainTabs' });
          } else {
            navigation.navigate('Main');
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigation]);

  const login = async (email, password) => {
    try {
      // Mock login - in a real app, this would be an API call
      if (email && password) {
        // Create mock user data
        const userData = {
          id: '1',
          name: email.split('@')[0],
          email,
          points: 120,
        };
        
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        // Check if user has selected goals before
        const hasSelectedGoals = await AsyncStorage.getItem('hasSelectedGoals');
        if (hasSelectedGoals === 'true') {
          navigation.navigate('Main', { screen: 'MainTabs' });
        } else {
          navigation.navigate('Main');
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - in a real app, this would be an API call
      if (userData.email && userData.password && userData.name) {
        // Create mock user data
        const newUser = {
          id: '1',
          name: userData.name,
          email: userData.email,
          points: 0,
        };
        
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        // For new users, we'll always navigate to goal selection first
        navigation.navigate('Main');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
