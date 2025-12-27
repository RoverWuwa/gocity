//Pantalla de login

//Importación de dependencias
import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { theme } from '../styles/theme';
import CustomInput from '../components/CustomInput'; 
import CustomButton from '../components/CustomButton';
import googleLogo from '../../assets/googleLogo.png';
import appleLogo from '../../assets/appleLogo.png';
import ImageBackgroundWrapper from '../components/ImageBackgroundWrapper.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Lógica del inicio de sesión
    const handleLogin = () => {
        if (email && password) {
            alert('Inicio de sesión exitoso');
            navigation.navigate('Home');
        } else {
            alert('Por favor, ingrese un email y contraseña');
        }
    };

    return (
        <ImageBackgroundWrapper>
            <Text style={styles.title}>Explora el mundo con nosotros</Text>
            <Text style={styles.subtitle}>Inicia sesión para acceder a planes personalizados</Text>

            {/* Inputs globales */}
            <CustomInput 
                placeholder="Correo electrónico" 
                value={email} 
                onChangeText={setEmail} 
            />
            <CustomInput 
                placeholder="Contraseña" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            {/* Checkbox */}
            <Pressable style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
                <View style={[styles.checkbox, rememberMe && styles.checked]}>
                    {rememberMe && <Icon name="check" size={18} color={theme.colors.neon} />}
                </View>
                <Text style={styles.checkboxLabel}>Recordarme</Text>
            </Pressable>

            {/* Olvidé contraseña */}
            <Pressable onPress={() => navigation.navigate('PasswordRecovery')}>
                <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </Pressable>

            {/* Botón global */}
            <CustomButton title="Comenzar" onPress={handleLogin} />

            <Text style={styles.altText}>- O continúa con -</Text>

            {/* Botones sociales */}
            <View style={styles.socialContainer}>
                <Pressable style={styles.socialButton}>
                    <Image source={googleLogo} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Google</Text>
                </Pressable>
                <Pressable style={styles.socialButton}>
                    <Image source={appleLogo} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Apple</Text>
                </Pressable>
            </View>

        </ImageBackgroundWrapper>
    );
};

// Estilos propios de la pantalla
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -19,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: theme.colors.neon,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: theme.colors.background,
    },
    checked: {
        backgroundColor: theme.colors.inputBackground,
    },
    checkboxLabel: {
        color: theme.colors.neon,
        fontSize: 16,
    },
    forgotPassword: {
        color: theme.colors.neon,
        fontSize: 14,
        textAlign: 'right',
        marginBottom: 20,
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
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        resizeMode: 'contain',
    },
      
});
