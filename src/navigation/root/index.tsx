import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CarsNavigator from 'navigation/cars';
import InfoNavigator from 'navigation/info';
import KaasNavigator from 'navigation/kaas';
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
            headerShown: false,
            tabBarIcon: CarIcon,
          }}
          component={CarsNavigator}
        />
        <Tab.Screen
          name={ROUTES.INFO_NAVIGATOR}
          options={{
            title: 'Info',
            headerShown: false,
            tabBarIcon: ToggleIcon,
          }}
          component={InfoNavigator}
        />
        <Tab.Screen
          name={ROUTES.KAAS_NAVIGATOR}
          options={{
            title: 'Kaas',
            headerShown: false,
            tabBarIcon: ToggleIcon,
          }}
          component={KaasNavigator}
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
