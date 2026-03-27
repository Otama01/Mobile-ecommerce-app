import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={onDecrease} style={styles.btn}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrease} style={styles.btn}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 10, marginVertical: 5, backgroundColor: "#fff", borderRadius: 10 },
  image: { width: 80, height: 80, resizeMode: "contain" },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  quantityBox: { flexDirection: "row", alignItems: "center" },
  btn: { borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  quantity: { marginHorizontal: 10 },
  remove: { color: "red", marginTop: 5 },
});