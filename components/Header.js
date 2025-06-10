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
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
