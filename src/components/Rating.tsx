import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  rating: number;
}

export default function Rating({ rating }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⭐ {rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 5 },
  text: { color: "#f5a623", fontWeight: "500" },
});