import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext"; 
import { useRouter } from "expo-router";

interface Order {
  id: number;
  item: string;
  date: string;
  total: number;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ProfileScreen() {
  const { cart, clearCart } = useCart(); // ✅ use clearCart instead
  const router = useRouter();

  const handleLogout = () => {
    clearCart(); // optional but good UX
    router.replace ("/auth/login"); // ✅ redirect properly
  };

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
        <Text style={styles.name}>Oluwatobi Dawodu</Text>
        <Text style={styles.email}>holutoby@gmail.com</Text>

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
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  profileImageContainer: {
  width: 120,
  height: 120,
  borderRadius: 60, 
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", 
  marginBottom: 20,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 5,
},
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  orderItem: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginVertical: 20,
  },
  logoutBtn: {
    backgroundColor: "#BE2727",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});