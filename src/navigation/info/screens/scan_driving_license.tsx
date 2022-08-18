import * as RAE from 'react-native-reanimated';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { DriverLicenseMask, Popup, usePopup } from 'components';
import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraPermissionStatus, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { OCRFrame, scanOCR } from 'vision-camera-ocr';
import { parseError } from 'utils/helpers';
import COLORS from 'config/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ROUTES from 'config/routes';
import { InfoStackParamList } from '..';

const windowWidth = Dimensions.get('window').width;

type Block = OCRFrame['result']['blocks'][0];
type Props = NativeStackScreenProps<InfoStackParamList, ROUTES.SCAN_DRIVING_LICENSE_SCREEN>;

const ScanDrivingLicenseScreen = ({ navigation }: Props) => {
  const { popupRef, openPopup } = usePopup();
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  // STATE LAYER
  const camera = useRef<Camera>(null);
  const [ cameraPermissionStatus, setCameraPermissionStatus ] = useState<CameraPermissionStatus>();
  const [ idBlock, setIdBlock ] = useState<Block>();

  // DATA LAYER
  const isCameraInitialized = device !== undefined && isFocused && cameraPermissionStatus === 'authorized';

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';

    const scannedOcr = scanOCR(frame);
    const block = scannedOcr.result.blocks.find((block) => /^[\d]{14}$/.test(block.text));
    RAE.runOnJS(setIdBlock)(block);
  }, [ setIdBlock ]);

  // LIFECYCLE LAYER

  useEffect(() => {
    Camera.getCameraPermissionStatus()
      .then(setCameraPermissionStatus)
      .catch((error) => openPopup({
        type: 'error',
        title: 'Check camera permissions has failed',
        description: parseError(error),
        confirmText: 'Ok',
        hasConfirmOnly: true,
      }));
  }, [ openPopup ]);

  useEffect(() => {
    if (cameraPermissionStatus && cameraPermissionStatus !== 'authorized') {
      Camera.requestCameraPermission()
        .then(setCameraPermissionStatus)
        .catch((error) => openPopup({
          type: 'error',
          title: 'Request camera permissions has failed',
          description: parseError(error),
          confirmText: 'Ok',
          hasConfirmOnly: true,
        }));
    }
  }, [ cameraPermissionStatus, openPopup ]);

  // METHODS LAYER

  const handleTakePhoto = async () => {
    const photo = await camera.current?.takePhoto({
      flash: 'off',
    }).catch(error => openPopup({
      type: 'error',
      title: 'Taking photo is failed',
      description: parseError(error),
      confirmText: 'Ok',
      hasConfirmOnly: true,
    }));

    navigation.navigate(ROUTES.INFO_SCREEN, {
      licenseId: idBlock?.text,
      driverLicensePhoto: photo ?? undefined,
    });

    // @TODO: upload photo to server
  };

  return (
    isCameraInitialized ? (
      <>
        <View style={styles.container}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            photo
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={1}
          />
          <View
            style={styles.idLabel}
          >
            <Text style={styles.idLabelText}>
              {idBlock?.text ? `ID: ${idBlock?.text}` : 'License ID not recognized'}
            </Text>
          </View>
          <TouchableOpacity
            style={[ styles.takeButton, !idBlock && styles.disabledTakeButton ]}
            onPress={handleTakePhoto}
            disabled={!idBlock}
          />
          <DriverLicenseMask />
          <Popup ref={popupRef} />
        </View>
      </>
    ) : null
  );
};

export default ScanDrivingLicenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  idLabel: {
    position: 'absolute',
    width: windowWidth,
    left: 0,
    top: 50,
    opacity: 0.6,
    zIndex: 999999,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  idLabelText: {
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  takeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.BACKGROUND_LIGHT,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    opacity: 0.8,
    position: 'absolute',
    bottom: 20,
    left: windowWidth / 2 - 25,
    zIndex: 999999,
  },
  disabledTakeButton: {
    opacity: 0.3,
    backgroundColor: COLORS.BACKGROUND_DARK,
    borderColor: COLORS.BORDER_DARK,
  },
});
