import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={['#272727', '#000000', '#0D0D0D']}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {children}7
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
