import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PointsOfInterestScreen() {
  const interests = [
    {
      title: "Restaurante Premium",
      rating: "⭐⭐⭐⭐⭐",
      category: "🍽️ Gastronomía",
    },
    {
      title: "Galería de Arte Contemporáneo",
      rating: "⭐⭐⭐⭐",
      category: "🎨 Cultura",
    },
    {
      title: "Parque Aventura",
      rating: "⭐⭐⭐⭐⭐",
      category: "🎢 Entretenimiento",
    },
    { title: "Spa Relajante", rating: "⭐⭐⭐⭐⭐", category: "💆 Bienestar" },
    {
      title: "Librería Independiente",
      rating: "⭐⭐⭐⭐",
      category: "📚 Educación",
    },
  ];

  return (
    <LinearGradient
      colors={["#87CEEB", "#E0F6FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>⭐ Lugares Especiales</Text>
        <Text style={styles.subtitle}>Descubre lo mejor de tu ciudad</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {interests.map((interest, index) => (
          <LinearGradient
            key={index}
            colors={["rgba(255, 165, 0, 0.15)", "rgba(255, 200, 124, 0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.interestCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{interest.title}</Text>
              <Text style={styles.cardCategory}>{interest.category}</Text>
              <Text style={styles.cardRating}>{interest.rating}</Text>
            </View>
            <View style={styles.arrow}>
              <Icon
                name="favorite"
                size={24}
                color={theme.colors.buttonPrimary}
              />
            </View>
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
    color: "#1C2D4A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#1C2D4A",
    opacity: 0.8,
  },
  content: {
    paddingHorizontal: 16,
  },
  interestCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 200, 124, 0.3)",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2D4A",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  cardRating: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.buttonPrimary,
  },
  arrow: {
    justifyContent: "center",
    paddingLeft: 12,
  },
});
