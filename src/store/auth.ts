import { makeVar, useReactiveVar } from '@apollo/client';
import EncryptedStorage from 'react-native-encrypted-storage';
import STORAGE_KEYS from 'config/storage_keys';

export type AuthState = {
  isAuthorization: boolean
}

export const INITIAL_AUTH: AuthState = {
  isAuthorization: false,
};

export const authVar = makeVar<AuthState>(INITIAL_AUTH);

const useAuthVar = () => {
  const auth = useReactiveVar(authVar);

  return {
    auth,
    setAuth: (data: AuthState) => authVar(data),
    mergeAuth: (data: Partial<AuthState>) => authVar({ ...auth, ...data }),
  };
};

EncryptedStorage.getItem(STORAGE_KEYS.AUTH_SESSION).then((data) => {
  const currentState = authVar();
  const parsedData = JSON.parse(data ?? JSON.stringify(currentState));
  const session: AuthState = { ...parsedData, isLoading: false, isAppLocked: true };

  authVar(session);
});

export default useAuthVar;
