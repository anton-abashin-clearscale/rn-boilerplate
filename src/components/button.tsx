import React from 'react';
import { Text, StyleSheet, TextStyle, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import COLORS from 'config/colors';

type Props = {
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress: () => void
}

const Button = ({ title, style, textStyle , onPress }: Props) => (
  <TouchableOpacity
    style={[ styles.button, style ]}
    onPress={onPress}
  >
    <Text style={[ styles.buttonText, textStyle ]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default Button;
