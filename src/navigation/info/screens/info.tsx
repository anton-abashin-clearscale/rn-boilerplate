import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import COLORS from 'config/colors';
import { AuthContext } from 'store/auth';
import { usePopup, Popup, Button } from 'components';
import { parseError } from 'utils/helpers';

import type { InfoStackParamList } from '..';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ROUTES from 'config/routes';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });
const windowWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<InfoStackParamList, ROUTES.INFO_SCREEN>;

const InfoScreen = ({ navigation, route }: Props) => {
  const [ hasPublicKeys, setHasPublicKeys ] = useState<boolean>(false);
  const [ biometry, setBiometry ] = useState<string>();
  const [ isPreviewShown, setIsPreviewShown ] = useState<boolean>(false);

  const { auth } = useContext(AuthContext);
  const { popupRef, openPopup } = usePopup();

  const { licenseId, driverLicensePhoto } = route.params ?? {};

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
        <Text style={styles.infoText}>Driver License ID: {licenseId ? licenseId : 'Not available'}</Text>
      </View>
      <View style={styles.buttonBlock}>
        <Button
          title='Take license photo'
          onPress={() => navigation.navigate(ROUTES.SCAN_DRIVING_LICENSE_SCREEN)}
        />
        {driverLicensePhoto && (
          <Button
            title='Preview'
            style={styles.previewPhotoButton}
            onPress={() => setIsPreviewShown(true)}
          />
        )}
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isPreviewShown}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.background}
          onPress={() => setIsPreviewShown(false)}
        >
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            {driverLicensePhoto && <Image
              source={{
                uri: `file://${driverLicensePhoto?.path}`,
                width: windowWidth - 40,
                height: (windowWidth - 40) / driverLicensePhoto.width * driverLicensePhoto?.height,
              }}
            />}
            <TouchableOpacity style={styles.closePreview} onPress={() => setIsPreviewShown(false)}>
              <Text style={styles.closePreviewText}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    color: COLORS.TEXT_LIGHT,
    fontWeight: 'bold',
  },
  previewPhotoButton: {
    marginLeft: 10,
  },
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_DARK_TRANSPARENT,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingVertical: 29,
    width: 343,
  },
  closePreview: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 30,
    height: 30,
    zIndex: 9999,
  },
  closePreviewText: {
    fontWeight: '700',
    fontSize: 20,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: COLORS.BACKGROUND_DARK,
    color: COLORS.TEXT_LIGHT,
  },
});

export default InfoScreen;
