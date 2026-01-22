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
import { theme } from "../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from "../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabaseClient";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const [locationSharing, setLocationSharing] = useState(false);
  const [userName, setUserName] = useState("Usuario");
  const [profileImage, setProfileImage] = useState(null);
  const [activeRouteSegment, setActiveRouteSegment] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);

  // Cargar imagen guardada
  useEffect(() => {
    loadProfileImage();
  }, []);

  // Obtener el nombre del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.id) {
        try {
          const { data, error } = await supabase
            .from("usuarios")
            .select("name, surname")
            .eq("auth_id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching user profile:", error);
            // Fallback to email prefix
            if (session.user.email) {
              const name = session.user.email.split("@")[0];
              setUserName(name.charAt(0).toUpperCase() + name.slice(1));
            }
          } else if (data) {
            const fullName = `${data.name} ${data.surname}`.trim();
            setUserName(fullName);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Fallback to email prefix
          if (session.user.email) {
            const name = session.user.email.split("@")[0];
            setUserName(name.charAt(0).toUpperCase() + name.slice(1));
          }
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const saveProfileImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem("profileImage", imageUri);
      setProfileImage(imageUri);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la imagen");
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await saveProfileImage(result.assets[0].uri);
        setShowImageOptions(false);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo capturar la foto");
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await saveProfileImage(result.assets[0].uri);
        setShowImageOptions(false);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const removeProfileImage = () => {
    Alert.alert(
      "Eliminar Foto",
      "¿Estás seguro de que quieres eliminar tu foto de perfil?",
      [
        { text: "Cancelar", onPress: () => {}, style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("profileImage");
              setProfileImage(null);
              setShowImageOptions(false);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la imagen");
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  const frequentRoutes = [
    { id: 1, name: "Centro → Parque", distance: "3.2 km", trips: 12 },
    { id: 2, name: "Estación → Oficina", distance: "5.8 km", trips: 8 },
    { id: 3, name: "Casa → Biblioteca", distance: "2.1 km", trips: 6 },
    { id: 4, name: "Centro Comercial → Casa", distance: "4.5 km", trips: 5 },
  ];

  const handleLocationToggle = () => {
    setLocationSharing(!locationSharing);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", onPress: () => {}, style: "cancel" },
        {
          text: "Cerrar Sesión",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar la sesión");
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <LinearGradient
      colors={["#87CEEB", "#E0F6FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Modal para ver imagen a pantalla completa */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <Pressable
          style={styles.imageModalContainer}
          onPress={() => setShowImageModal(false)}
        >
          <Image
            source={{ uri: profileImage }}
            style={styles.fullScreenImage}
          />
          <Pressable
            style={styles.closeImageButton}
            onPress={() => setShowImageModal(false)}
          >
            <Icon name="close" size={28} color="#fff" />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal para opciones de imagen */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={styles.optionsModalOverlay}>
          <View style={styles.optionsModal}>
            <View style={styles.optionsHeader}>
              <Text style={styles.optionsTitle}>Foto de Perfil</Text>
              <Pressable onPress={() => setShowImageOptions(false)}>
                <Icon name="close" size={24} color="#333" />
              </Pressable>
            </View>

            <View style={styles.optionsList}>
              <Pressable style={styles.optionButton} onPress={takePhoto}>
                <LinearGradient
                  colors={["rgba(76, 175, 80, 0.1)", "rgba(76, 175, 80, 0.05)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionButtonContent}
                >
                  <Icon name="camera-alt" size={24} color="#4CAF50" />
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>Tomar Foto</Text>
                    <Text style={styles.optionSubtitle}>Usar la cámara</Text>
                  </View>
                  <Icon name="chevron-right" size={24} color="#CCC" />
                </LinearGradient>
              </Pressable>

              <Pressable
                style={styles.optionButton}
                onPress={pickImageFromGallery}
              >
                <LinearGradient
                  colors={[
                    "rgba(33, 150, 243, 0.1)",
                    "rgba(33, 150, 243, 0.05)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionButtonContent}
                >
                  <Icon name="image" size={24} color="#2196F3" />
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>Galería</Text>
                    <Text style={styles.optionSubtitle}>
                      Seleccionar de galería
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={24} color="#CCC" />
                </LinearGradient>
              </Pressable>

              {profileImage && (
                <Pressable
                  style={styles.optionButton}
                  onPress={removeProfileImage}
                >
                  <LinearGradient
                    colors={[
                      "rgba(244, 67, 54, 0.1)",
                      "rgba(244, 67, 54, 0.05)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.optionButtonContent}
                  >
                    <Icon name="delete" size={24} color="#F44336" />
                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>Eliminar Foto</Text>
                      <Text style={styles.optionSubtitle}>
                        Quitar foto de perfil
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#CCC" />
                  </LinearGradient>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header del Perfil */}
        <View style={styles.profileHeader}>
          {profileImage ? (
            <Pressable
              onPress={() => setShowImageModal(true)}
              style={styles.avatarContainer}
            >
              <Image
                source={{ uri: profileImage }}
                style={styles.avatarImage}
              />
              <View style={styles.cameraIcon}>
                <Icon name="camera-alt" size={14} color="#fff" />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setShowImageOptions(true)}
              style={styles.avatarContainer}
            >
              <LinearGradient
                colors={["#F57C00", "#FF9500"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarPlaceholder}
              >
                <Text style={styles.avatarText}>{getInitials(userName)}</Text>
              </LinearGradient>
              <View style={styles.cameraIcon}>
                <Icon name="add-a-photo" size={14} color="#fff" />
              </View>
            </Pressable>
          )}
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{session?.user?.email}</Text>
          {profileImage && (
            <Pressable
              onPress={() => setShowImageOptions(true)}
              style={styles.editPhotoButton}
            >
              <Text style={styles.editPhotoText}>Editar Foto</Text>
            </Pressable>
          )}
        </View>

        {/* Compartir Ubicación */}
        <View style={styles.section}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.locationCard}
          >
            <View style={styles.locationLeft}>
              <Icon name="location-on" size={22} color="#FF6B6B" />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>
                  {locationSharing
                    ? "Ubicación Compartida"
                    : "Ubicación Privada"}
                </Text>
                <Text style={styles.locationSubtitle}>
                  {locationSharing ? "Activo" : "Inactivo"}
                </Text>
              </View>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={handleLocationToggle}
              trackColor={{ false: "#ddd", true: "#FF6B6B" }}
              thumbColor={locationSharing ? "#FF4444" : "#f4f3f4"}
            />
          </LinearGradient>
        </View>

        {/* Rutas Frecuentes - Segmentos */}
        <View style={styles.routesSection}>
          <Text style={styles.routesSectionTitle}>Rutas Frecuentes</Text>
          <FlatList
            horizontal
            data={frequentRoutes}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.routesListContainer}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => setActiveRouteSegment(index)}
                style={[
                  styles.routeSegment,
                  activeRouteSegment === index && styles.routeSegmentActive,
                ]}
              >
                <LinearGradient
                  colors={
                    activeRouteSegment === index
                      ? ["#F57C00", "#FF9500"]
                      : ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.8)"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.routeSegmentContent}
                >
                  <Text
                    style={[
                      styles.routeSegmentName,
                      activeRouteSegment === index &&
                        styles.routeSegmentNameActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.routeSegmentDistance,
                      activeRouteSegment === index &&
                        styles.routeSegmentDistanceActive,
                    ]}
                  >
                    {item.distance}
                  </Text>
                  <Text
                    style={[
                      styles.routeSegmentTrips,
                      activeRouteSegment === index &&
                        styles.routeSegmentTripsActive,
                    ]}
                  >
                    {item.trips} viajes
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
          />
        </View>

        {/* Configuración */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Configuración</Text>
          </View>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Notificaciones",
                "Configura tus preferencias de notificaciones.",
              )
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="notifications" size={20} color="#2196F3" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Notificaciones</Text>
                <Text style={styles.menuSubtitle}>
                  Configura tus preferencias
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert("Ayuda", "Centro de ayuda y soporte para Go City.")
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="help" size={20} color="#FF9800" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Ayuda</Text>
                <Text style={styles.menuSubtitle}>
                  Centro de ayuda y soporte
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Términos y Condiciones",
                "Aquí van los términos y condiciones de uso de Go City.",
              )
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="description" size={20} color="#9C27B0" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Términos y Condiciones</Text>
                <Text style={styles.menuSubtitle}>
                  Lee nuestros términos de uso
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Política de Privacidad",
                "Aquí va la política de privacidad de Go City.",
              )
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="security" size={20} color="#607D8B" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Política de Privacidad</Text>
                <Text style={styles.menuSubtitle}>
                  Cómo manejamos tus datos
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Mis rutas favoritas",
                "Gestiona tus rutas guardadas en Go City.",
              )
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="directions" size={20} color="#4CAF50" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Mis rutas favoritas</Text>
                <Text style={styles.menuSubtitle}>
                  Gestiona tus rutas guardadas
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Historial de viajes",
                "Revisa tus viajes anteriores en Go City.",
              )
            }
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuItem}
            >
              <Icon name="history" size={20} color="#FF9800" />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Historial de viajes</Text>
                <Text style={styles.menuSubtitle}>
                  Revisa tus viajes anteriores
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#CCC" />
            </LinearGradient>
          </Pressable>

          {/* Sección separada para Cerrar Sesión */}
          <View style={styles.logoutSection}>
            <Pressable onPress={handleLogout}>
              <LinearGradient
                colors={["#FF6B6B", "#FF4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoutItem}
              >
                <Icon name="logout" size={20} color="#fff" />
                <Text style={styles.logoutTitle}>Cerrar Sesión</Text>
                <Icon name="chevron-right" size={20} color="#fff" />
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F57C00",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    opacity: 0.7,
    marginBottom: 12,
  },
  editPhotoButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#F57C00",
    borderRadius: 16,
  },
  editPhotoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: "contain",
  },
  closeImageButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  optionsModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
  },
  optionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  optionsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  optionButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  optionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  locationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  routesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  routesSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  routesListContainer: {
    paddingHorizontal: 0,
    gap: 10,
  },
  routeSegment: {
    borderRadius: 12,
    overflow: "hidden",
    minWidth: 140,
    height: 110,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  routeSegmentActive: {
    minWidth: 160,
  },
  routeSegmentContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
  },
  routeSegmentName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    lineHeight: 14,
  },
  routeSegmentNameActive: {
    color: "#fff",
  },
  routeSegmentDistance: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  routeSegmentDistanceActive: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  routeSegmentTrips: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  routeSegmentTripsActive: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textPrimary,
    marginBottom: 2,
    textAlign: "center",
  },
  menuSubtitle: {
    fontSize: 12,
    color: theme.colors.textPrimary,
    opacity: 0.7,
    textAlign: "center",
  },
  spacer: {
    height: 20,
  },
  logoutSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logoutTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 12,
  },
});
