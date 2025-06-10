import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={myStyles.container}>
      <Text style={myStyles.header}>Notebook-App</Text>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    padding: 12,
  },
});
