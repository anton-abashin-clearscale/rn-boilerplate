import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ROUTES from 'config/routes';
import COLORS from 'config/colors';
import InfoScreen from './screens/info';
import ScanDrivingLicenseScreen from './screens/scan_driving_license';
import { PhotoFile } from 'react-native-vision-camera';

export type InfoStackParamList = {
  [ROUTES.INFO_SCREEN]: {
    licenseId?: string
    driverLicensePhoto?: PhotoFile
  }
  [ROUTES.SCAN_DRIVING_LICENSE_SCREEN]: undefined,
}

const InfoStack = createNativeStackNavigator<InfoStackParamList>();

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerBackVisible: true,
  contentStyle: { backgroundColor: COLORS.BACKGROUND_LIGHT },
};

const InfoNavigator = () => {
  return (
    <InfoStack.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={ROUTES.INFO_SCREEN}
    >
      <InfoStack.Screen
        name={ROUTES.INFO_SCREEN}
        component={InfoScreen}
        options={{
          title: 'Information',
        }}
      />
      <InfoStack.Screen
        name={ROUTES.SCAN_DRIVING_LICENSE_SCREEN}
        component={ScanDrivingLicenseScreen}
        options={{
          title: 'Scan driving license',
        }}
      />
    </InfoStack.Navigator>
  );
};


export default InfoNavigator;
