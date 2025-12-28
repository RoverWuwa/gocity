import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { theme } from '../styles/theme';
import button from "../../assets/button.png"
// Importa el guion de diálogos en formato JSON
import dialogues from '../data/dialogues.json';

export default function RegisterScreen({ navigation }) {
    const [stepIndex, setStepIndex] = useState(0); // controla en qué paso estamos
    const [userProfile, setUserProfile] = useState({}); // guarda las respuestas

    const currentStep = dialogues[stepIndex]; // paso actual del JSON
    const [inputValue, setInputValue] = useState('');

    const handleNext = () => {
        if (!inputValue) {
            alert('Por favor, complete este campo');
            return;
        }

        // Guardar la respuesta en el perfil
        setUserProfile({
            ...userProfile,
            [currentStep.key]: inputValue,
        });

        setInputValue(''); // limpiar input

        // Avanzar al siguiente paso o terminar
        if (stepIndex < dialogues.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            alert('Cuenta creada exitosamente');
            navigation.navigate('Home');
        }
    };

    return (
        <ImageBackground 
            source={require("../../assets/CustomBackground4.jpeg")}
            style={styles.container}
        >
            {/* Contenido encima */}
            <View style={styles.content}>
                {/* Globo de IA con el diálogo actual */}
                <View style={styles.aiBubble}>
                    <Text style={styles.question}>{currentStep.question}</Text>
                </View>

                {/* Input dinámico según el tipo */}
                <TextInput
                    style={styles.input}
                    placeholder="Escriba su respuesta aquí"
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType={
                        currentStep.type === 'number' ? 'numeric' : 'default'
                    }
                    secureTextEntry={currentStep.type === 'password'}
                />
                {/* Input dinámico según el tipo */}

                {/* Botón de avance */}
                <Pressable
                    style={styles.buttonPress}
                    title={stepIndex < dialogues.length - 1 ? "Siguiente" : "Finalizar"}
                    onPress={handleNext}
                >
                    <Image source={button} style={styles.buttonIcon} />
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        padding: theme.spacing.lg,
        width: '95%',
        alignSelf: 'center',
        marginTop: "70%",
    },
    aiBubble: {
        alignItems: "center",
        marginBottom: 20,
    },
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
        placeholderTextColor: theme.colors.textPrimary,
        color: theme.colors.textPrimary,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: theme.spacing.md,
        width: '100%',
        minHeight: 52,
        marginBottom: 40,
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