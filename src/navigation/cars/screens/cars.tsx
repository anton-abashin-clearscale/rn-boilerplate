import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { DataStore } from 'aws-amplify';
import { Todo } from 'models';
import COLORS from 'config/colors';
import { AuthContext } from 'store/auth';
import { LockIcon, UnlockIcon } from 'components/icons';
import { usePopup, Popup, Button } from 'components';
import { parseError } from 'utils/helpers';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

const CarsScreen = () => {
  const [ cars, setCars ] = useState<Todo[]>([]);
  const [ isLocked, setIsLocked ] = useState<boolean>(false);
  const [ signature, setSignature ] = useState<string>();

  const { mergeAuthState } = useContext(AuthContext);
  const { popupRef, openPopup } = usePopup();

  useEffect(() => {
    if (signature) {
      mergeAuthState({ isAuthenticated: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ signature ]);

  const handleLock = useCallback(async () => {
    rnBiometrics.isSensorAvailable()
      .then(async ({ available, error }) => {
        if (available) {
          const payload = `${(new Date()).getTime().toString()} some secure signal`;
          const { success, signature, error } = await rnBiometrics.createSignature({
            promptMessage: 'Unlock car',
            payload: payload,
          });

          if (success) {
            setSignature(signature);
            setIsLocked(!isLocked);
            // @TODO: send unlock signal to server
          } else {
            setSignature(undefined);
            openPopup({
              type: 'error',
              title: 'Verification has failed',
              description: error,
              confirmText: 'Ok',
              hasConfirmOnly: true,
            });
          }

        } else {
          openPopup({
            type: 'error',
            title: 'Biometry not available',
            description: error,
            confirmText: 'Ok',
            hasConfirmOnly: true,
          });
        }
      })
      .catch((error) => {
        setSignature(undefined);
        openPopup({
          type: 'error',
          title: 'Ooops...',
          description: parseError(error),
          confirmText: 'Ok',
          hasConfirmOnly: true,
        });
      });
  }, [ isLocked, setSignature, openPopup, setIsLocked ]);

  const testSimplePrompt = useCallback(async () => {
    rnBiometrics.isSensorAvailable()
      .then(async ({ available, error }) => {
        if (available) {
          const { success, error } = await rnBiometrics.simplePrompt({
            promptMessage: 'Check permissions',
            cancelButtonText: 'Decline',
          });

          if (success) {
            openPopup({
              type: 'success',
              title: 'Verification passed',
              confirmText: 'Ok',
              hasConfirmOnly: true,
            });
          } else {
            openPopup({
              type: 'error',
              title: 'Verification has failed',
              description: error,
              confirmText: 'Ok',
              hasConfirmOnly: true,
            });
          }
        } else {
          openPopup({
            type: 'error',
            title: 'Biometry not available',
            description: error,
            confirmText: 'Ok',
            hasConfirmOnly: true,
          });
        }
      })
      .catch((error) => {
        setSignature(undefined);
        openPopup({
          type: 'error',
          title: 'Ooops...',
          description: parseError(error),
          confirmText: 'Ok',
          hasConfirmOnly: true,
        });
      });
  }, [ setSignature, openPopup ]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Todo).subscribe((snapshot) => {
      const { items } = snapshot;
      setCars(items);
    });

    return function cleanup() {
      subscription.unsubscribe();
    };

  }, []);

  const renderItem: ListRenderItem<Todo> = useCallback(({ item }) => (
    <View style={styles.todoContainer}>
      <Text>
        <Text style={styles.todoHeading}>{item.name}</Text>
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.lockButton}
          onPress={handleLock}
        >
          {isLocked ? <UnlockIcon color={COLORS.PRIMARY_MAIN} /> : <LockIcon color={COLORS.PRIMARY_MAIN} />}
        </TouchableOpacity>
        <Button title='Prompt' onPress={testSimplePrompt} />
      </View>
    </View>
  ), [ isLocked, handleLock, testSimplePrompt ]);

  return (
    <View>
      <FlatList
        data={cars}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
      <Popup ref={popupRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockButton: {
    marginRight: 5,
  },
  todoHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default CarsScreen;
