import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'SearchTab') {
              iconName = 'search';
            } else if (route.name === 'CartTab') {
              iconName = 'shopping-cart';
            } else if (route.name === 'ChatTab') {
              iconName = 'message-circle';
            } else if (route.name === 'ProfileTab') {
              iconName = 'user';
            }
            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#D32F2F',
          tabBarInactiveTintColor: '#757575',
          headerShown: false
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Search' }} />
        <Tab.Screen name="CartTab" component={CartScreen} options={{ title: 'Cart' }} />
        <Tab.Screen name="ChatTab" component={ChatStack} options={{ title: 'Chat' }} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
