import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText, ...rest }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        placeholder="Search products..."
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 32,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: "100%" },
});