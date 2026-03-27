// src/components/Header.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface Props {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },
  welcome: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10 },
});