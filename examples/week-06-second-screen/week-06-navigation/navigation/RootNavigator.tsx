import {
  NavigationContainer,
  type LinkingOptions,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import type {
  HomeStackParamList,
  RootStackParamList,
  RootTabParamList,
  ShoppingStackParamList,
} from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ShoppingListScreen } from '../screens/ShoppingListScreen';
import { ShoppingItemDetailsScreen } from '../screens/ShoppingItemDetailsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutModalScreen } from '../screens/AboutModalScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ShoppingStack = createNativeStackNavigator<ShoppingStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://', 'https://example.course.app'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeStack: {
            screens: {
              Home: 'home',
            },
          },
          ShoppingStack: {
            screens: {
              ShoppingList: 'shopping',
              ShoppingItemDetails: 'shopping/item/:itemId',
            },
          },
          Settings: 'settings',
        },
      },
      AboutModal: 'about',
    },
  },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
    </HomeStack.Navigator>
  );
}

function ShoppingStackNavigator() {
  return (
    <ShoppingStack.Navigator>
      <ShoppingStack.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{ title: 'Shopping' }}
      />
      <ShoppingStack.Screen
        name="ShoppingItemDetails"
        component={ShoppingItemDetailsScreen}
        options={{ title: 'Item details' }}
      />
    </ShoppingStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="ShoppingStack"
        component={ShoppingStackNavigator}
        options={{
          title: 'Shopping',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🛒</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer linking={linking} theme={DefaultTheme}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AboutModal"
          component={AboutModalScreen}
          options={{
            presentation: 'modal',
            title: 'About',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
