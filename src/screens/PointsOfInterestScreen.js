import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

/* ===== ICON COMPONENT (Emoji based - no dependencies) ===== */
const IconEmoji = ({ emoji, size = 32 }) => (
  <Text style={{ fontSize: size }}>{emoji}</Text>
);

/* ===== DATA WITH EXAMPLES ===== */
const DATA = [
  {
    id: "1",
    title: "Rutas más transitadas",
    emoji: "🚌",
    color: "#6EC1E4",
    description: "Descubre las rutas de transporte más utilizadas en la ciudad",
    items: [
      { name: "Ruta 1 - Centro", detail: "Cada 10 min • 24 hrs" },
      { name: "Ruta 5 - Universidad", detail: "Cada 15 min • 6am-10pm" },
      { name: "Ruta 8 - Plaza Comercial", detail: "Cada 20 min • 7am-9pm" },
      { name: "Ruta 12 - Hospital", detail: "Cada 12 min • 24 hrs" },
    ],
  },
  {
    id: "2",
    title: "Mejores Restaurantes",
    emoji: "🍽️",
    color: "#F7A440",
    description: "Los restaurantes mejor valorados de la zona",
    items: [
      { name: "La Cocina de la Abuela", detail: "⭐ 4.8 • Comida tradicional" },
      { name: "El Rincón Mexicano", detail: "⭐ 4.9 • Especialidad en tacos" },
      { name: "Café del Parque", detail: "⭐ 4.7 • Desayunos y café" },
      { name: "Pizzería Napolitana", detail: "⭐ 4.6 • Pizza artesanal" },
    ],
  },
  {
    id: "3",
    title: "Lugares turísticos",
    emoji: "🏛️",
    color: "#C77DFF",
    description: "Atractivos turísticos imperdibles de Zamora",
    items: [
      { name: "Catedral de Zamora", detail: "Arquitectura colonial • Centro" },
      { name: "Plaza de Armas", detail: "Espacio público histórico" },
      { name: "Museo Regional", detail: "Historia y cultura local" },
      { name: "Parque Bosque Cuauhtémoc", detail: "Naturaleza y recreación" },
    ],
  },
  {
    id: "4",
    title: "Bancos",
    emoji: "🏦",
    color: "#4D96FF",
    description: "Sucursales bancarias y cajeros automáticos cercanos",
    items: [
      { name: "Bancomer", detail: "Centro • Abierto 9am-4pm" },
      { name: "Banorte", detail: "Av. Juárez • Cajeros 24hrs" },
      { name: "Santander", detail: "Plaza Principal • 9am-5pm" },
      { name: "HSBC", detail: "Zona Comercial • 8:30am-4pm" },
    ],
  },
  {
    id: "5",
    title: "Baños públicos",
    emoji: "🚻",
    color: "#4ECBCB",
    description: "Sanitarios públicos disponibles en la ciudad",
    items: [
      { name: "Centro Comercial Plaza", detail: "Planta baja y 1er piso" },
      { name: "Terminal de Autobuses", detail: "Acceso gratuito • 24hrs" },
      { name: "Parque Central", detail: "Área de servicios" },
      { name: "Plaza de Armas", detail: "Junto a la presidencia" },
    ],
  },
  {
    id: "6",
    title: "Bases de taxis",
    emoji: "🚕",
    color: "#FFD93D",
    description: "Sitios de taxis seguros y regulados",
    items: [
      { name: "Base Centro", detail: "📞 351-512-3456 • 24 hrs" },
      { name: "Base Terminal", detail: "📞 351-512-7890 • 24 hrs" },
      { name: "Base Hospital", detail: "📞 351-512-4567 • 24 hrs" },
      { name: "Base Universidad", detail: "📞 351-512-8901 • 6am-11pm" },
    ],
  },
];

/* ===== CARD COMPONENT ===== */
function InterestCard({ item, index, onPress }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        delay: index * 100,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Pressable
        style={styles.card}
        onPress={() => onPress(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Gradient background simulation */}
        <View style={styles.cardGradient}>
          <View
            style={[
              styles.gradientOverlay,
              { backgroundColor: item.color + "15" },
            ]}
          />
        </View>

        {/* Icon with animated circle */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: item.color + "25",
              borderColor: item.color + "40",
            },
          ]}
        >
          <IconEmoji emoji={item.emoji} size={36} />
        </View>

        {/* Card title */}
        <Text style={styles.cardText} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/* ===== DETAIL MODAL ===== */
function DetailModal({ visible, item, onClose }) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(300);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />

        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <View
              style={[
                styles.modalIconContainer,
                {
                  backgroundColor: item.color + "20",
                  borderColor: item.color + "40",
                },
              ]}
            >
              <IconEmoji emoji={item.emoji} size={44} />
            </View>

            <View style={styles.modalHeaderText}>
              <Text style={styles.modalTitle}>{item.title}</Text>
              <Text style={styles.modalDescription}>{item.description}</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {/* Items list */}
          <ScrollView
            style={styles.modalList}
            showsVerticalScrollIndicator={false}
          >
            {item.items.map((subItem, index) => (
              <View key={index} style={styles.listItem}>
                <View
                  style={[styles.listItemDot, { backgroundColor: item.color }]}
                />
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemName}>{subItem.name}</Text>
                  <Text style={styles.listItemDetail}>{subItem.detail}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Footer button */}
          <View style={styles.modalFooter}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: item.color }]}
              onPress={onClose}
            >
              <Text style={styles.actionButtonText}>📍 Ver en el mapa</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

/* ===== MAIN SCREEN ===== */
export default function PointsOfInterestScreen() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <View style={styles.container}>
      {/* Background with gradient simulation */}
      <View style={styles.backgroundGradient}>
        <View style={styles.gradientLayer1} />
        <View style={styles.gradientLayer2} />
        <View style={styles.gradientLayer3} />
      </View>

      {/* Decorative circles */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recomendaciones</Text>
        <Text style={styles.subtitle}>
          Explora los mejores lugares de la ciudad
        </Text>
      </View>

      {/* Cards grid */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <InterestCard item={item} index={index} onPress={handleCardPress} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Detail Modal */}
      <DetailModal
        visible={modalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </View>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8DEF8",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientLayer1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "33%",
    backgroundColor: "#E8DEF8",
  },
  gradientLayer2: {
    position: "absolute",
    top: "33%",
    left: 0,
    right: 0,
    height: "33%",
    backgroundColor: "#F0E6FA",
  },
  gradientLayer3: {
    position: "absolute",
    top: "66%",
    left: 0,
    right: 0,
    height: "34%",
    backgroundColor: "#FFEEF8",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2D1B69",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B5B95",
    fontWeight: "500",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#C77DFF20",
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#6EC1E420",
    bottom: 100,
    left: -40,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    width: (width - 56) / 2,
    aspectRatio: 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C77DFF",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    flex: 1,
    borderRadius: 24,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 2,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D1B69",
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 4,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: "85%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 16,
  },
  modalHeaderText: {
    flex: 1,
    paddingTop: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D1B69",
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 14,
    color: "#6B5B95",
    lineHeight: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
    fontWeight: "bold",
  },
  modalList: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  listItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 14,
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D1B69",
    marginBottom: 4,
  },
  listItemDetail: {
    fontSize: 14,
    color: "#8B8B8B",
    lineHeight: 18,
  },
  modalFooter: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});
