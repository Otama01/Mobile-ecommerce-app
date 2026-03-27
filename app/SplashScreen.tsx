import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";

export default function splashscreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/"); // Go to Home or Login
    }, 2000); // 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Just the app name, no logo */}
      <Text style={styles.appName}>OtamaShop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E47911",
  },
});