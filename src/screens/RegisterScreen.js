import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (email && password) {
            alert('Cuenta creada exitosamente');
            navigation.navigate('Home');
        } else {
            alert('Por favor, complete todos los campos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>

            <TextInput 
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <Button 
                title="Registrarse" 
                onPress={handleRegister} 
                color={theme.colors.primary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        padding: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 8,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.md,
        color: theme.colors.text,
    },
});
