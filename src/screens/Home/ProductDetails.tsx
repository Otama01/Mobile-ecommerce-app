import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductDetails: React.FC = () => {
 
  return (
    <View style={styles.container}>
      <Text>Product Details Screen</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});