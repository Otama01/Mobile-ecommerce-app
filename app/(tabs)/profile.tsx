import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext"; // Make sure you have CartContext


interface Order {
  id: number;
  item: string;
  date: string;
  total: number;
}

// Cart item type from your CartContext
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ProfileScreen() {
  const { cart, logout } = useCart();

  // Convert cart items to orders for display
  const [orders] = useState<Order[]>(
    cart.map((item: CartItem, index: number) => ({
      id: index + 1,
      item: item.title,
      date: new Date().toLocaleDateString(),
      total: item.price * item.quantity,
    }))
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.profileImage}
          />
        </View>

        {/* User Info */}
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>

        {/* Order History */}
        <Text style={styles.sectionTitle}>Order History</Text>

        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          orders.map((order: Order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderItem}>{order.item}</Text>
              <Text style={styles.orderDetails}>
                {order.date} · ${order.total.toFixed(2)}
              </Text>
            </View>
          ))
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, alignItems: "center" },
  profileImageContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 60,
  },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  email: { fontSize: 16, color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", alignSelf: "flex-start", marginBottom: 10 },
  emptyText: { marginBottom: 20, fontSize: 14, color: "#888" },
  orderCard: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderItem: { fontSize: 16, fontWeight: "500" },
  orderDetails: { fontSize: 14, color: "#555", marginTop: 4 },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#E47911",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "stretch",
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 16, textAlign: "center" },
});