import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { theme } from "../styles/theme";
import dialogues from "../data/dialogues.json";
import { useRegister } from "../hooks/useRegister";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [inputValue, setInputValue] = useState("");
  const { registerUser, loading } = useRegister();

  const currentStep = dialogues[stepIndex];

  const handleNext = async () => {
    if (!inputValue) {
      Alert.alert("Campo vacío", "Por favor, complete este campo");
      return;
    }

    // Guardar respuesta en el perfil
    const updatedProfile = {
      ...userProfile,
      [currentStep.key]: inputValue,
    };
    setUserProfile(updatedProfile);
    setInputValue("");

    // Avanzar o terminar
    if (stepIndex < dialogues.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      try {
        // Llamar al hook de registro
        const user = await registerUser({
          name: updatedProfile.name,
          surname: updatedProfile.surname,
          age: updatedProfile.age,
          email: updatedProfile.email,
          password: updatedProfile.password,
        });

        Alert.alert("Éxito", `Cuenta creada para ${user.email}`);
        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/CustomBackground2.jpeg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        {/* Barra de progreso minimalista */}
        <Text style={styles.progress}>
          {stepIndex + 1} de {dialogues.length}
        </Text>

        {/* Pregunta - limpia y simple */}
        <Text style={styles.question}>{currentStep.question}</Text>

        {/* Input - limpio */}
        <TextInput
          style={styles.input}
          placeholder="Respuesta"
          placeholderTextColor="#AAA"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType={currentStep.type === "number" ? "numeric" : "default"}
          secureTextEntry={currentStep.type === "password"}
        />

        {/* Botón - simple */}
        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
    zIndex: 1,
  },
  progress: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 40,
    opacity: 0.9,
  },
  question: {
    fontSize: 22,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 30,
    lineHeight: 28,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1C2D4A",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 10,
    marginBottom: 24,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#F57C00",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
