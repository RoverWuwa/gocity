// Importación de dependencias
import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../styles/theme';
import ImageBackgroundWrapper from '../components/ImageBackgroundWrapper';
import googleLogo from '../../assets/googleLogo.png';
import appleLogo from '../../assets/appleLogo.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackgroundWrapper>
      <View style={styles.content}>
        <View style={styles.sessionMessage}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>Inicia sesión para acceder a planes personalizados</Text>
        </View>

        {/* Input de correo con ícono */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
        </View>

        {/* Input de contraseña con ícono */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {/* Botón de login */}
        <Pressable style={styles.buttonPrimary} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        {/* Checkbox custom y ¿Olvidaste tu contraseña? */}
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotLabel}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        {/* Separador */}
        <Text style={styles.orText}>- O inicia sesión con -</Text>

        {/* Botones sociales */}
        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Image source={googleLogo} style={styles.socialIcon} />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Image source={appleLogo} style={styles.socialIcon} />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.facebookText}>f</Text>
          </Pressable>
        </View>

        {/* Registro */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>¿No tienes cuenta?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackgroundWrapper>
  );
}

// Estilos
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    width: '95%',
    alignSelf: 'center',
  },
  sessionMessage: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 130,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  // Inputs
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.buttonSecondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: theme.spacing.md,
    width: '100%',
    minHeight: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: theme.colors.textPrimary,
  },

  // Boton de Login
  buttonPrimary: {
    backgroundColor: theme.colors.buttonPrimary,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // forgot
  forgotLabel: {
    textDecorationLine: "underline",
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },

  // Social
  orText: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  socialButton: {
    backgroundColor: theme.colors.buttonSecondary,
    padding: 12,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  facebookText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b5998',
  },

  // Registro
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  signupText: {
    color: theme.colors.textPrimary,
  },
  signupLink: {
    color: theme.colors.buttonPrimary,
    marginLeft: 4,
    fontWeight: 'bold',
  },
});