import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../app/SplashScreen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        setTimeout(() => {
          if (token) {
            router.replace("/(tabs)");
          } else {
            router.replace("/auth/login");
          }
        }, 2000); // 2 seconds
      } catch (err) {
        console.error("Error reading token", err);
        router.replace("/auth/login"); 
      }
    };

    checkLogin();
  }, []);

  // Show splash screen while checking login
  return <SplashScreen />;
}