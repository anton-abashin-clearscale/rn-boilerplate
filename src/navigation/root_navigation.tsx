import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CarsScreen from 'screens/cars_screen';
import InfoScreen from 'screens/info_screen';
import ROUTES from 'config/routes';
import { CarIcon, ToggleIcon } from 'components/icons';

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={MAIN_TABS_OPTIONS}
        initialRouteName={ROUTES.CARS_NAVIGATOR}
      >
        <Tab.Screen
          name={ROUTES.CARS_NAVIGATOR}
          options={{
            title: 'Cars',
            tabBarIcon: CarIcon,
          }}
          component={CarsScreen}
        />
        <Tab.Screen
          name={ROUTES.INFO_NAVIGATOR}
          options={{
            title: 'Information',
            tabBarIcon: ToggleIcon,
          }}
          component={InfoScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 14,
    height: Platform.OS === 'ios' ? 100 : 70,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '600',
  },
});

const MAIN_TABS_OPTIONS: BottomTabNavigationOptions = {
  headerShown: true,
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabBarLabelStyle,
  tabBarHideOnKeyboard: true,
};
