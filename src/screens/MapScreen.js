import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MapScreen() {
  const places = [
    { name: "Centro Histórico", icon: "location-on", distance: "2.5 km" },
    { name: "Parque Principal", icon: "park", distance: "1.2 km" },
    { name: "Museo de Arte", icon: "museum", distance: "3.1 km" },
    { name: "Zona Comercial", icon: "shopping-cart", distance: "0.8 km" },
  ];

  return (
    <LinearGradient
      colors={["#87CEEB", "#E0F6FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ Mi Mapa</Text>
        <Text style={styles.subtitle}>Lugares cercanos a ti</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {places.map((place, index) => (
          <LinearGradient
            key={index}
            colors={["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.7)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.placeCard}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={place.icon}
                size={32}
                color={theme.colors.buttonPrimary}
              />
            </View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDistance}>📍 {place.distance}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </LinearGradient>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    opacity: 0.8,
  },
  content: {
    paddingHorizontal: 16,
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(245, 124, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.inputBackground,
    marginBottom: 4,
  },
  placeDistance: {
    fontSize: 14,
    color: "#666",
  },
});
