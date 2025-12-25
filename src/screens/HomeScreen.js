import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { theme } from '../styles/theme';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});