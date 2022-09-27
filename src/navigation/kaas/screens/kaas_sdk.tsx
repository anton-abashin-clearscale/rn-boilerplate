import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Platform,
} from 'react-native';
import {
  sendCommand,
  createSessionRequestToken,
  openSession,
  closeSession,
  isSessionOpened,
  createVirtualKey,
  DEVICE_COMMAND,
  OpenSessionResult,
  updateVirtualKey,
  revokeVirtualKey,
  RevokeVirtualKeyResult,
  getVirtualKeys,
  selectVirtualKey,
  getSelectedVirtualKey,
  scan,
  ScanResult,
  connect,
  ConnectionResult,
  isConnected,
  disconnect,
  getVehicleData,
  CommandResult,
  DataItem,
} from 'react-native-kaas-sdk';

export default function KaasScreen() {
  const [ result, setResult ] = React.useState<string>('-');

  const handleSendCommand = () => {
    sendCommand(DEVICE_COMMAND.UNLOCK)
      .then((response) =>
        setResult(response === CommandResult.SUCCESSFUL ? 'Success' : 'Failed')
      )
      .catch(() => setResult('FAIL'));
  };
  const handleCreateSessionRequestToken = () => {
    createSessionRequestToken()
      .then((response) => setResult(response.sessionRequestToken))
      .catch(() => setResult('FAIL'));
  };

  const handleOpenSession = () => {
    openSession({ sessionResponseToken: 'XXX-000-1111' })
      .then((response) =>
        setResult(
          response === OpenSessionResult.SUCCESS ? 'Opened' : 'Not opened'
        )
      )
      .catch(() => setResult('FAIL'));
  };

  const handleCloseSession = () => {
    closeSession()
      .then((response) => setResult(response ? 'Closed' : 'Not closed'))
      .catch(() => setResult('FAIL'));
  };

  const handleIsSessionOpened = () => {
    isSessionOpened()
      .then((response) => setResult(response ? 'Open' : 'Closed'))
      .catch(() => setResult('FAIL'));
  };

  const handleCreateVirtualKey = () => {
    createVirtualKey({
      sharedDeviceId: 'XXX-1111-0000',
      validityStartDate: new Date().valueOf(),
      validityEndDate: new Date().valueOf(),
      clientDeviceNumberOfActionsAllowed: 5,
      clientDeviceActionsAllowed: 'lock,unlock',
      flagClientDevicePublicKeyOnline: true,
    })
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  const handleUpdateVirtualKey = () => {
    updateVirtualKey({
      id: 'XXX-1111-0000',
      integratorId: 'XXX-1111-0000',
      version: '1.1',
      validityStartDate: new Date().valueOf(),
      validityEndDate: new Date().valueOf(),
      accessDeviceNumberOfActionsAllowed: 5,
      accessDeviceActionsAllowed: 'lock,unlock',
      flagClientDevicePublicKeyOnline: true,
    })
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  const handleRevokeVirtualKey = () => {
    revokeVirtualKey({
      id: 'XXX-1111-0000',
      virtualKey: {
        id: '123',
        vehicleId: '123',
        bluetoothName: 'car',
        virtualKeyVersion: 1.2,
        serialNumber: 111,
        validityStartDate: new Date().valueOf(),
        validityEndDate: new Date().valueOf(),
        enableUserAuthenticated: true,
        actionsAllowedMask: 'mask',
        numberOfActionsAllowed: 3,
      },
    })
      .then((response) =>
        setResult(response === RevokeVirtualKeyResult.OK ? 'Revoked' : 'Failed')
      )
      .catch(() => setResult('FAIL'));
  };

  const handleGetSelectedVirtualKey = () => {
    getSelectedVirtualKey()
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  const handleScan = () => {
    scan(60)
      .then((response) =>
        setResult(response === ScanResult.VISIBLE ? 'Visible' : 'Not visible')
      )
      .catch(() => setResult('FAIL'));
  };

  const handleConnect = () => {
    connect(60)
      .then((response) =>
        setResult(
          response === ConnectionResult.SUCCESSFUL
            ? 'Connected'
            : 'Not connected'
        )
      )
      .catch(() => setResult('FAIL'));
  };

  const handleIsConnected = () => {
    isConnected()
      .then((response) => setResult(response ? 'Connected' : 'Not connected'))
      .catch(() => setResult('FAIL'));
  };

  const handleDisconnect = () => {
    disconnect()
      .then((response) => setResult(response ? 'Disconnect' : 'Not disconnect'))
      .catch(() => setResult('FAIL'));
  };

  const handleGetVehicleData = () => {
    getVehicleData(DataItem.BATTERY_VOLTAGE)
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  const handleSelectVirtualKey = () => {
    selectVirtualKey({
      id: 'XXX-1111-0000',
      virtualKey: {
        id: '123',
        vehicleId: '123',
        bluetoothName: 'car',
        virtualKeyVersion: 1.2,
        serialNumber: 111,
        validityStartDate: new Date().valueOf(),
        validityEndDate: new Date().valueOf(),
        enableUserAuthenticated: true,
        actionsAllowedMask: 'mask',
        numberOfActionsAllowed: 3,
      },
    })
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  const handleGetVirtualKeys = () => {
    getVirtualKeys()
      .then((response) => setResult(JSON.stringify(response)))
      .catch(() => setResult('FAIL'));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttons}>
        <View style={styles.button}>
          <Button title='Send command' onPress={handleSendCommand} />
        </View>
        <View style={styles.button}>
          <Button
            title='Create Session Request Token'
            onPress={handleCreateSessionRequestToken}
          />
        </View>
        <View style={styles.button}>
          <Button title='Open Session' onPress={handleOpenSession} />
        </View>
        <View style={styles.button}>
          <Button title='Close Session' onPress={handleCloseSession} />
        </View>
        <View style={styles.button}>
          <Button title='Check Session' onPress={handleIsSessionOpened} />
        </View>
        <View style={styles.button}>
          <Button title='Create key' onPress={handleCreateVirtualKey} />
        </View>
        <View style={styles.button}>
          <Button title='Update key' onPress={handleUpdateVirtualKey} />
        </View>
        <View style={styles.button}>
          <Button title='Revoke key' onPress={handleRevokeVirtualKey} />
        </View>
        <View style={styles.button}>
          <Button title='Get keys' onPress={handleGetVirtualKeys} />
        </View>
        <View style={styles.button}>
          <Button title='Select key' onPress={handleSelectVirtualKey} />
        </View>
        <View style={styles.button}>
          <Button
            title='Get selected key'
            onPress={handleGetSelectedVirtualKey}
          />
        </View>
        <View style={styles.button}>
          <Button title='Scan device' onPress={handleScan} />
        </View>
        <View style={styles.button}>
          <Button title='Connect device' onPress={handleConnect} />
        </View>
        <View style={styles.button}>
          <Button title='Check device connected' onPress={handleIsConnected} />
        </View>
        <View style={styles.button}>
          <Button title='Disconnect device' onPress={handleDisconnect} />
        </View>
        <View style={styles.button}>
          <Button title='Get vehicle data' onPress={handleGetVehicleData} />
        </View>
      </ScrollView>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttons: {
    marginBottom: 20,
    marginTop: Platform.OS === 'android' ? 50 : 100,
    height: '70%',
  },
  button: {
    marginBottom: 10,
  },
});
