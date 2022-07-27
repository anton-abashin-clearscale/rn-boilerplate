import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import COLORS from 'config/colors';
import { AuthContext } from 'store/auth';
import { usePopup, Popup } from 'components';
import { parseError } from 'utils/helpers';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

const InfoScreen = () => {
  const [ hasPublicKeys, setHasPublicKeys ] = useState<boolean>(false);
  const [ biometry, setBiometry ] = useState<string>();

  const { auth } = useContext(AuthContext);
  const { popupRef, openPopup } = usePopup();

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(async ({ biometryType, available }) => {
      if (available) {
        setBiometry(biometryType);
      } else {
        setBiometry(undefined);
      }
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      setHasPublicKeys(keysExist);
    }).catch((error) => {
      setBiometry(undefined);
      openPopup({
        type: 'error',
        title: 'Ooops...',
        description: parseError(error),
        confirmText: 'Ok',
        hasConfirmOnly: true,
      });
    });
  }, [ openPopup ]);

  return (
    <View>
      <View style={styles.infoBlock}>
        <Text style={styles.infoText}>Biometry: {biometry ?? 'n/a'}</Text>
        <Text style={styles.infoText}>Biometric Keys Exist: {hasPublicKeys ? 'yes' : 'no'}</Text>
        <Text style={styles.infoText}>Access: {auth.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
      </View>
      <Popup ref={popupRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderRadius: 4,
  },
  infoText: {
    color: COLORS.TEXT_LIGHT,
    fontWeight: 'bold',
  },
});

export default InfoScreen;
