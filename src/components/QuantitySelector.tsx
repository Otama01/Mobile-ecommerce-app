// src/components/QuantitySelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantity: { marginHorizontal: 10, fontSize: 16 },
});