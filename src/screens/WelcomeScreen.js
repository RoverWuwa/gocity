import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image } from 'react-native';
import { theme } from '../styles/theme';

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground 
            source={require('../../assets/loginBackground.jpg')} 
            style={styles.background}
        >
            <Image 
                source={require("../../assets/logo.png")}
                style={styles.logo}
            >
            </Image>

            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                
                <Button 
                    title="Iniciar Sesión" 
                    onPress={() => navigation.navigate('Login')} 
                    color={theme.colors.primary}
                />

                <View style={{ marginVertical: theme.spacing.md }} />

                <Button 
                    title="Crear Cuenta" 
                    onPress={() => navigation.navigate('Register')} 
                    color={theme.colors.secondary}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: 120,
        height: 120,
        marginBottom: theme.spacing.lg,
        marginBottom: "contain",
    },
    container: {
        width: '85%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: theme.spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    title: {
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
});
