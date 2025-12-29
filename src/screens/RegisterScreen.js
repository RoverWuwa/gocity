import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Pressable, Image, Alert } from 'react-native';
import { theme } from '../styles/theme';
import button from "../../assets/button.png";
import dialogues from '../data/dialogues.json';
import { useRegister } from '../hooks/useRegister'; // nuestro hook externo

export default function RegisterScreen({ navigation }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [inputValue, setInputValue] = useState('');
  const { registerUser, loading } = useRegister();

  const currentStep = dialogues[stepIndex];

  const handleNext = async () => {
    if (!inputValue) {
      Alert.alert('Campo vacío', 'Por favor, complete este campo');
      return;
    }

    // Guardar respuesta en el perfil
    const updatedProfile = {
      ...userProfile,
      [currentStep.key]: inputValue,
    };
    setUserProfile(updatedProfile);
    setInputValue('');

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

        Alert.alert('Éxito', `Cuenta creada para ${user.email}`);
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ImageBackground 
      source={require("../../assets/CustomBackground4.jpeg")}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.aiBubble}>
          <Text style={styles.question}>{currentStep.question}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escriba su respuesta aquí"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType={currentStep.type === 'number' ? 'numeric' : 'default'}
          secureTextEntry={currentStep.type === 'password'}
        />

        <Pressable
          style={styles.buttonPress}
          onPress={handleNext}
          disabled={loading}
        >
          <Image source={button} style={styles.buttonIcon} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    width: '95%',
    alignSelf: 'center',
    marginTop: "70%",
  },
  aiBubble: { alignItems: "center", marginBottom: 20 },
  question: {
    fontFamily: "WorkSans-Regular",
    fontSize: 29,
    color: theme.colors.inputBackground,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.buttonSecondary,
    color: theme.colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 40,
    width: '100%',
    minHeight: 52,
  },
  buttonPress: {
    position: "absolute",
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
    top: 300,
    left: 250,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});