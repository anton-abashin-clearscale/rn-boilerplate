import React, { useEffect } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContextProvider from 'store/auth';
import { Popup, usePopup } from 'components';
import { parseError } from 'utils/helpers';
import RootNavigation from 'navigation/root';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

const App = () => {
  const { popupRef, openPopup } = usePopup();

  useEffect(() => {
    rnBiometrics.isSensorAvailable()
      .then(async ({ available }) => {
        if (available) {
          const { keysExist } = await rnBiometrics.biometricKeysExist();

          if (!keysExist) {
            await rnBiometrics.createKeys();
            // const { publicKey } = await rnBiometrics.createKeys();
            // @TODO: send public key to server
          }
        }
      })
      .catch(error => {
        openPopup({
          type: 'error',
          title: 'Verification has failed',
          description: parseError(error),
          confirmText: 'Ok',
          hasConfirmOnly: true,
        });
      });
  }, [ openPopup ]);

  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <StatusBar />
        <RootNavigation />
        <Popup ref={popupRef} />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
};

export default App;
