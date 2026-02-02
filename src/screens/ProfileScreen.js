import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabaseClient";
import { theme } from "../styles/theme";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const { session, signOut } = useAuth();

  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("Usuario");
  const [locationSharing, setLocationSharing] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    loadProfileImage();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!session?.user?.id) return;

    const { data } = await supabase
      .from("usuarios")
      .select("name, surname")
      .eq("auth_id", session.user.id)
      .single();

    if (data) setUserName(`${data.name} ${data.surname}`);
  };

  const loadProfileImage = async () => {
    const saved = await AsyncStorage.getItem("profileImage");
    if (saved) setProfileImage(saved);
  };

  const saveProfileImage = async (uri) => {
    await AsyncStorage.setItem("profileImage", uri);
    setProfileImage(uri);
  };

  const pickImage = async (camera = false) => {
    const result = camera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

    if (!result.canceled) {
      saveProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  const frequentRoutes = [
    { id: 1, name: "Casa → Trabajo", distance: "5.2 km", trips: 14 },
    { id: 2, name: "Centro → Parque", distance: "3.1 km", trips: 9 },
    { id: 3, name: "Casa → Universidad", distance: "7.8 km", trips: 6 },
  ];

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <LinearGradient colors={["#87CEEB", "#E0F6FF"]} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => setShowImageOptions(true)}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {userName.charAt(0)}
                </Text>
              </View>
            )}
          </Pressable>

          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{session?.user?.email}</Text>
        </View>

        {/* UBICACIÓN */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Icon name="location-on" size={22} color="#FF6B6B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Compartir ubicación</Text>
              <Text style={styles.cardSubtitle}>
                Permite que otros vean tu ubicación
              </Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
            />
          </View>
        </View>

        {/* RUTAS FRECUENTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rutas frecuentes</Text>

          <FlatList
            horizontal
            data={frequentRoutes}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => setActiveRoute(index)}
                style={styles.routeCard}
              >
                <LinearGradient
                  colors={
                    activeRoute === index
                      ? ["#FF8F00", "#FF6F00"]
                      : ["#FFF", "#F4F4F4"]
                  }
                  style={styles.routeContent}
                >
                  <Icon
                    name="route"
                    size={26}
                    color={activeRoute === index ? "#FFF" : "#FF9800"}
                  />
                  <Text
                    style={[
                      styles.routeTitle,
                      activeRoute === index && { color: "#FFF" },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.routeMeta,
                      activeRoute === index && { color: "#FFF" },
                    ]}
                  >
                    📏 {item.distance} · 🚗 {item.trips} viajes
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
          />
        </View>

        {/* CONFIGURACIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <MenuItem
            icon="notifications"
            color="#2196F3"
            title="Notificaciones"
            subtitle="Configura avisos y alertas"
          />

          <MenuItem
            icon="history"
            color="#FF9800"
            title="Historial de viajes"
            subtitle="Consulta tus viajes anteriores"
          />

          <MenuItem
            icon="help"
            color="#4CAF50"
            title="Ayuda"
            subtitle="Soporte y preguntas frecuentes"
          />

          <MenuItem
            icon="security"
            color="#607D8B"
            title="Privacidad"
            subtitle="Protección de tus datos"
          />
        </View>

        {/* LOGOUT */}
        <Pressable onPress={handleLogout} style={styles.logout}>
          <Icon name="logout" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* MODAL FOTO */}
      <Modal visible={showImageOptions} transparent animationType="slide">
        <View style={styles.modal}>
          <Pressable onPress={() => pickImage(true)}>
            <Text style={styles.modalOption}>📸 Tomar foto</Text>
          </Pressable>
          <Pressable onPress={() => pickImage(false)}>
            <Text style={styles.modalOption}>🖼 Elegir de galería</Text>
          </Pressable>
          <Pressable onPress={() => setShowImageOptions(false)}>
            <Text style={styles.modalCancel}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* COMPONENTE REUTILIZABLE */
const MenuItem = ({ icon, color, title, subtitle }) => (
  <Pressable style={styles.menuItem}>
    <View style={[styles.iconBox, { backgroundColor: `${color}22` }]}>
      <Icon name={icon} size={22} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Icon name="chevron-right" size={22} color="#AAA" />
  </Pressable>
);

/* ESTILOS */
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    color: "#FFF",
    fontWeight: "700",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
  },
  email: {
    fontSize: 13,
    opacity: 0.7,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 16,
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  routeCard: {
    width: 180,
    height: 120,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  routeContent: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  routeTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  routeMeta: {
    fontSize: 12,
    opacity: 0.8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 10,
    gap: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  menuSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  logout: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#FF6B6B",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "600",
  },
  modal: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 12,
  },
  modalCancel: {
    fontSize: 16,
    paddingVertical: 12,
    color: "red",
    textAlign: "center",
  },
});
