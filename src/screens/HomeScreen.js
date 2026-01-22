import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../styles/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import MapScreen from "./MapScreen";
import PointsOfInterestScreen from "./PointsOfInterestScreen";
import ProfileScreen from "./ProfileScreen";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <MapScreen />;
      case 1:
        return <PointsOfInterestScreen />;
      case 2:
        return <ProfileScreen />;
      default:
        return <MapScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      {/* Barra inferior moderna */}
      <LinearGradient
        colors={["#F57C00", "#FF9500"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomBar}
      >
        <View style={styles.tabsContainer}>
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 0 && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(0)}
          >
            <Icon name="map" size={28} color="#fff" />
            <Text style={styles.tabLabel}>Mapa</Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              activeTab === 1 && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(1)}
          >
            <Icon name="location-on" size={28} color="#fff" />
            <Text style={styles.tabLabel}>Lugares</Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              activeTab === 2 && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(2)}
          >
            <Icon name="person" size={28} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    height: 75,
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 12,
  },
  tabLabel: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    marginTop: 6,
  },
});
