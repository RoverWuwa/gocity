import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default function ImageBackgroundWrapper({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/CustomBackground.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
