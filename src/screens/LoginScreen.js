import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ImageBackground } from 'react-native';
import { theme } from '../styles/theme';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
            alert('Inicio de sesión exitoso');
            navigation.navigate('Home');
        } else {
            alert('Por favor, ingrese un email y contraseña');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explora el mundo con nosotros</Text>
            <Text style={styles.subtitle}>Inicia Sesion para acceder a planes personalizados</Text>

            <TextInput
                style={styles.input}
                placeholder='Correo electronico'
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>

            <Text style={styles.altText}>- O continua con -</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialText}>Apple</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        color: theme.colors.textPrimary,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: 24,
    },
    input: {
        backgroundColor: "#1f2124",
        color: theme.colors.textPrimary,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderEndWidth: 1,
        borderColor: "#C6FF11",
    },
    button: {
        backgroundColor: theme.colors.neon,
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: theme.colors.background,
        fontWeight: "bold",
        fontSize: 16,
    },
    altText: {
        textAlign: "center",
        color: theme.colors.textSecondary,
        marginBottom: 12,
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    socialButton: {
        backgroundColor: theme.colors.inputBackground,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    socialText: {
        color: theme.colors.textPrimary,
    },
});
