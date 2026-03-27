import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWishlist } from "../../src/context/WishlistContext";
import { useRouter, Stack } from "expo-router";

export default function WishlistScreen() {
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Wishlist" }} />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {wishlist.length === 0 ? (
          <View style={styles.center}>
            <Text>No items in wishlist ❤️</Text>
          </View>
        ) : (
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push(`/productdetails/${item.id}`)
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.title}
                  </Text>

                  <Text style={styles.price}>${item.price}</Text>

                  {/* ❤️ Remove from wishlist */}
                  <Text
                    onPress={() => toggleWishlist(item)}
                    style={styles.remove}
                  >
                    Remove 
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },

  remove: {
    marginTop: 10,
    color: "red",
    fontSize: 13,
  },
});