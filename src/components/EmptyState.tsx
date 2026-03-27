// src/components/EmptyState.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState({ message = "Nothing here!" }: { message?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, color: "#888" },
});