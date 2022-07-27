import React, { useRef, useState, forwardRef, useImperativeHandle, ReactElement } from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Text, StyleProp, ViewStyle } from 'react-native';
import { WarningCircleIcon, SuccessCircleIcon, ErrorCircleIcon } from './icons';
import COLORS from '../config/colors';


type PopupParams = {
  type: 'warning' | 'success' | 'error' | 'custom'
  title: string
  description: string
  confirmText: string
  cancelText: string
  isModalShown: boolean
  shouldCloseByBackdrop: boolean
  hasConfirmOnly: boolean
  confirmButtonStyle: StyleProp<ViewStyle>
  cancelButtonStyle: StyleProp<ViewStyle>
  customIcon?: ReactElement
  onConfirmPress: () => void
  onCancelPress: () => void
}

type PopupRef = {
  openPopup: (data?: Partial<PopupParams>) => void
  closePopup: () => void,
}

export type PopupComponent = typeof Popup

export type UsePopup = typeof usePopup

const POPUP_REF: PopupRef = {
  openPopup: () => { },
  closePopup: () => { },
};

const INITIAL_POPUP_PARAMS: PopupParams = {
  type: 'warning',
  title: '',
  description: '',
  confirmText: '',
  cancelText: 'Cancel',
  isModalShown: false,
  shouldCloseByBackdrop: true,
  hasConfirmOnly: false,
  confirmButtonStyle: undefined,
  cancelButtonStyle: undefined,
  customIcon: undefined,
  onConfirmPress: () => { },
  onCancelPress: () => { },
};

export const usePopup = () => {
  const popupRef = useRef<PopupRef>(POPUP_REF);

  const openPopup: PopupRef['openPopup'] = data => { popupRef.current.openPopup(data); };

  const closePopup = () => { popupRef.current.closePopup(); };

  return { openPopup, closePopup, popupRef };
};

const Popup = forwardRef<PopupRef, object>((_props, ref) => {
  const [ modalParams, setModalParams ] = useState<Partial<PopupParams>>(INITIAL_POPUP_PARAMS);

  const openPopup: PopupRef['openPopup'] = data => setModalParams({ ...INITIAL_POPUP_PARAMS, ...data, isModalShown: true });

  const closePopup = () => setModalParams({ ...INITIAL_POPUP_PARAMS, isModalShown: false });

  const onBackDropPress = () => {
    if (modalParams.shouldCloseByBackdrop) closePopup();
  };

  const onConfirmButtonPress = () => {
    modalParams.onConfirmPress && modalParams.onConfirmPress();
    closePopup();
  };

  const onCancelButtonPress = () => {
    modalParams.onCancelPress && modalParams.onCancelPress();
    closePopup();
  };

  const renderIcon = () => {
    switch (modalParams.type) {
      case 'warning': return <WarningCircleIcon />;
      case 'success': return <SuccessCircleIcon />;
      case 'error': return <ErrorCircleIcon />;
      case 'custom': return modalParams.customIcon;
      default: return null;
    }
  };

  useImperativeHandle(ref, () => ({ openPopup, closePopup }));

  const renderCancelButton = () => {
    if (modalParams.hasConfirmOnly) return null;

    return (
      <TouchableOpacity
        accessibilityLabel='popup/cancel_button'
        onPress={onCancelButtonPress}
        style={[
          styles.cancelButton,
          modalParams.cancelButtonStyle,
        ]}
      >
        <Text style={styles.cancelButtonText}>
          {modalParams.cancelText}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderConfirmButton = () => {
    if (!modalParams.confirmText) return null;

    return (
      <TouchableOpacity
        accessibilityLabel='popup/confirm_button'
        onPress={onConfirmButtonPress}
        style={[
          styles.confirmButton,
          modalParams.confirmButtonStyle,
        ]}
      >
        <Text style={styles.confirmButtonText}>
          {modalParams.confirmText}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalParams.isModalShown}
    >
      <TouchableOpacity activeOpacity={1} style={styles.background} onPress={onBackDropPress}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          {renderIcon()}
          <Text
            accessibilityLabel='popup/title'
            style={styles.title}
            numberOfLines={2}
          >
            {modalParams.title}
          </Text>
          <Text
            accessibilityLabel='popup/description'
            style={styles.description}
            numberOfLines={2}
          >
            {modalParams.description}
          </Text>
          <View style={styles.buttonsRow}>
            {renderCancelButton()}
            {renderConfirmButton()}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});


export default Popup;


const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.7)',
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
  title: {
    color: COLORS.TEXT_DARK,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    marginTop: 20,
    marginBottom: 8,
    maxWidth: '90%',
    textAlign: 'center',
  },
  description: {
    color: COLORS.TEXT_DARK,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 24,
    maxWidth: '90%',
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: 290,
    height: 42,
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    width: 130,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  confirmButtonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
    lineHeight: 22,
  },
  cancelButton: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    width: 130,
    height: 42,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: COLORS.PRIMARY_MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cancelButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    lineHeight: 22,
  },
});
