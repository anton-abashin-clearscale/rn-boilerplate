import React, { createContext, FC, useState } from 'react';

type AuthState = Partial<{
  isAuthenticated: boolean
}>

type AuthContext = {
  auth: AuthState
  setAuthState: (state: AuthState) => void
  mergeAuthState: (state: AuthState) => void
}

type Props = {
  children: JSX.Element
}

const INITIAL_VALUES: AuthContext = {
  auth: {
    isAuthenticated: false,
  },
  setAuthState: () => { },
  mergeAuthState: () => { },
};

export const AuthContext = createContext<AuthContext>(INITIAL_VALUES);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [ authState, setAuthState ] = useState<AuthState>(INITIAL_VALUES.auth);

  const value = {
    auth: authState,
    setAuthState,
    mergeAuthState: (newState: AuthState) => {
      setAuthState(prevState => ({
        ...prevState, ...newState,
      })
      );},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
