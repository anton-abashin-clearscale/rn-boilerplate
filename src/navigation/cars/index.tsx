import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ROUTES from 'config/routes';
import COLORS from 'config/colors';
import CarsScreen from './screens/cars';

export type InfoStackParamList = {
  [ROUTES.CARS_SCREEN]: undefined,
}

const InfoStack = createNativeStackNavigator<InfoStackParamList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerBackVisible: true,
  contentStyle: { backgroundColor: COLORS.BACKGROUND_LIGHT },
};

const CarNavigator = () => {
  return (
    <InfoStack.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={ROUTES.CARS_SCREEN}
    >
      <InfoStack.Screen
        name={ROUTES.CARS_SCREEN}
        component={CarsScreen}
        options={{
          title: 'Cars',
        }}
      />
    </InfoStack.Navigator>
  );
};


export default CarNavigator;
