// src/components/HeartIcon.tsx
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function HeartIcon() {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setLiked(prev => !prev)} style={styles.button}>
      <Text style={{ color: liked ? "red" : "grey", fontSize: 20 }}>❤️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { position: "absolute", top: 10, right: 10 },
});