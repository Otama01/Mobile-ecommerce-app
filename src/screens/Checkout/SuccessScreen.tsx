import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SuccessScreen: React.FC = () => {
  // TODO: Show order success message, clear cart, navigation options

  return (
    <View style={styles.container}>
      <Text>Order Successful!</Text>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});