import React from "react";
import { View, Text, Button } from "react-native";

interface SuccessScreenProps {
  onContinue: () => void;
}

export default function SuccessScreen({ onContinue }: SuccessScreenProps) {
  return (
    <View>
      <Text>Order Successful 🎉</Text>
      <Button title="OK" onPress={onContinue} />
    </View>
  );
}