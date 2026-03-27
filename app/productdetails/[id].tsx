import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Button } from "react-native";
import AddToCart from "../../src/components/AddToCart";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !product) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerShown: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>${product.price}</Text>

          <Text style={styles.description}>{product.description}</Text>

          <AddToCart product={product} quantity={1} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  image: {
    width: "100%",
    height: 230,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#f7f7f7",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0DC968",
    marginBottom: 12,
  },

  description: {
    fontSize: 13,
    lineHeight: 24,
    color: "#524F4F",
    marginBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});