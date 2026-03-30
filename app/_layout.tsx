import { Stack } from "expo-router";
import { WishlistProvider } from "../src/context/WishlistContext";
import { CartProvider } from "../src/context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Stack
          screenOptions={{ headerShown: false }}
        />
      </WishlistProvider>
    </CartProvider>
  );
}