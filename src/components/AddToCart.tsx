import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import {useRouter} from "expo-router";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
  quantity: number;
}

export default function AddToCart({ product, quantity }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addToCart(product, quantity);
    router.push("/(tabs)/cart");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAdd}>
      <Text style={styles.text}>Add to Cart</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E47911",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});