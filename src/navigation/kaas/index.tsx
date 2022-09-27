import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ROUTES from 'config/routes';
import COLORS from 'config/colors';
import KaasScreen from './screens/kaas_sdk';

export type InfoStackParamList = {
  [ROUTES.KAAS_TEST_SCREEN]: undefined,
}

const InfoStack = createNativeStackNavigator<InfoStackParamList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerBackVisible: true,
  contentStyle: { backgroundColor: COLORS.BACKGROUND_LIGHT },
};

const KaasNavigator = () => {
  return (
    <InfoStack.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={ROUTES.KAAS_TEST_SCREEN}
    >
      <InfoStack.Screen
        name={ROUTES.KAAS_TEST_SCREEN}
        component={KaasScreen}
        options={{
          title: 'Kaas',
        }}
      />
    </InfoStack.Navigator>
  );
};


export default KaasNavigator;
