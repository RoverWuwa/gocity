import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { theme } from '../styles/theme';
import ImageBackgroundWrapper from '../components/ImageBackgroundWrapper';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackgroundWrapper>
      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.welcomeMessage}>
        <Text style={styles.title} allowFontScalling={false}>Welcome!</Text>
        <Text style={styles.subtitle}>Explora tu ciudad con estilo</Text>
        </View>
        {/* Logo central */}
        <Image 
            source={require("../../assets/logo.png")}
            style={styles.logo}
        />

        {/* Botones */}
        <Pressable style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    </ImageBackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 550,
    height: 550,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: -110,
    marginTop: 100,
  },
  content: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderRadius: 16,
    width: '85%',
    alignSelf: 'center',
  },
  welcomeMessage: {
    alignItems: "center",
    position: "absolute",
    top: 130,
  },
  title: {
    fontFamily: "Monstserrat-Bold",
    fontSize: 61,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: theme.colors.buttonSecondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.buttonPrimary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});