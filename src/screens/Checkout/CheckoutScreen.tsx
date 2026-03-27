import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckoutScreen: React.FC = () => {
  // TODO: Add delivery address form, payment method, order summary, confirm button

  return (
    <View style={styles.container}>
      <Text>Checkout Screen</Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});