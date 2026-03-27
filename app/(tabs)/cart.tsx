import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext";
import { Stack, useRouter } from "expo-router";

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const router = useRouter();

 const totalPrice = cart.reduce(
  (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
  0
);

  const handleCheckout = () => {
    router.push("/checkout/checkout"); 
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ title: "My Cart" }} />

      {cart.length === 0 ? (
        <View style={styles.center}>
          <Text>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
            renderItem={renderItem}
          />

          <View style={styles.bottom}>
            <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },

  image: { width: 80, height: 80, resizeMode: "contain" },

  info: { flex: 1, marginLeft: 10 },

  title: { fontSize: 14, fontWeight: "500" },

  price: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },

  row: { flexDirection: "row", alignItems: "center", marginTop: 10 },

  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#eee",
    borderRadius: 4,
  },

  btnText: { fontSize: 18, fontWeight: "bold" },

  qty: { fontSize: 14, color: "#555", marginHorizontal: 10 },

  remove: { marginTop: 10, color: "red", fontSize: 13 },

  bottom: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  checkoutBtn: {
    backgroundColor: "#E47911",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  checkoutText: { color: "#fff", fontWeight: "600" },
});