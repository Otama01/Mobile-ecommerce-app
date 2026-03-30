import React from "react";
import { useRouter } from "expo-router";
import SuccessScreen from "../../src/screens/Checkout/SuccessScreen";

export default function SuccessPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace ("../(tabs)/index"); // Navigate back to home or main tabs after success
  };

  return <SuccessScreen onContinue={handleContinue} />;
}