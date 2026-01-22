import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { theme } from "../styles/theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/CustomBackground2.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.welcomeMessage}>
          <Text style={styles.title}>Go City</Text>
          <Text style={styles.subtitle}>Explora tu ciudad con estilo</Text>
        </View>

        {/* Logo central */}
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        {/* Botones con efecto glassmorphism */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>

          <Pressable
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 60,
  },
  welcomeMessage: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "85%",
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: "rgba(245, 124, 0, 0.95)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#F57C00",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: "rgba(28, 45, 74, 0.95)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#1C2D4A",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
