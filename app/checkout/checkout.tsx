import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext";
import { Stack, useRouter } from "expo-router";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    Alert.alert("Success 🎉", "Order placed successfully!");
    clearCart();
    router.replace("../index");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Checkout" }} />
      <SafeAreaView style={styles.container}>
        {cart.length === 0 ? (
          <View style={styles.center}>
            <Text>Your cart is empty 🛒</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Order Summary</Text>
            {cart.map((item: CartItem) => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.itemTitle}>{item.title} x{item.quantity}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
              <Text style={styles.btnText}>Confirm Order</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8 },
  itemTitle: { fontSize: 16, flex: 1, marginRight: 8 },
  itemPrice: { fontSize: 16, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 16 },
  total: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  btn: { backgroundColor: "#180CBD", padding: 16, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});