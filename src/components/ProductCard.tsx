import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWishlist } from "../../src/context/WishlistContext";

interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Heart Icon */}
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        onPress={() => toggleWishlist(product)}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={18}
          color={liked? "red" : "#999" }
        />
      </TouchableOpacity>

     
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Product Info */}
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    position: "relative", 
    flex: 1,
    minHeight: 220,
  },
  image: {
    height: 130,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6C6868",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});