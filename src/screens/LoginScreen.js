// Importación de dependencias
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../styles/theme";
import ImageBackgroundWrapper from "../components/ImageBackgroundWrapper";
import googleLogo from "../../assets/googleLogo.png";
import appleLogo from "../../assets/appleLogo.png";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingrese un email y contraseña");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor, ingrese un email válido");
      return;
    }

    try {
      await signIn(email, password);
      // Wait a bit for session to be set
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    } catch (error) {
      Alert.alert("Error", "Email o contraseña incorrectos");
    }
  };

  return (
    <ImageBackgroundWrapper>
      <View style={styles.content}>
        <View style={styles.sessionMessage}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>
            Inicia sesión para acceder a planes personalizados
          </Text>
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
        <Pressable style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        {/* Checkbox custom y ¿Olvidaste tu contraseña? */}
        {/* <Pressable style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotLabel}>¿Olvidaste tu contraseña?</Text>
        </Pressable> */}

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
          <Pressable onPress={() => navigation.navigate("Register")}>
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
    alignItems: "center",
    padding: theme.spacing.lg,
    width: "95%",
    alignSelf: "center",
  },
  sessionMessage: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 130,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  // Inputs
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: theme.colors.textPrimary,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: theme.spacing.md,
    width: "100%",
    minHeight: 56,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
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
    paddingVertical: 14,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.buttonPrimary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
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
    textAlign: "center",
    marginVertical: theme.spacing.sm,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: theme.spacing.md,
  },
  socialButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 14,
    borderRadius: 50,
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  facebookText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3b5998",
  },

  // Registro
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  signupText: {
    color: theme.colors.textPrimary,
  },
  signupLink: {
    color: theme.colors.buttonPrimary,
    marginLeft: 4,
    fontWeight: "bold",
  },
});
