import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.inputBackground,
    color: theme.colors.textPrimary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neon,
  },
});
