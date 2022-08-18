import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import COLORS from 'config/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DriverLicenseMask = () => (
  <View style={styles.dl} />
);

export default DriverLicenseMask;

const styles = StyleSheet.create({
  dl: {
    width: windowWidth - 40,
    height: 200,
    top: windowHeight / 2 - 200,
    left: 20,
    borderColor: COLORS.PRIMARY_MAIN,
    borderWidth: 3,
    position: 'absolute',
  },
});
