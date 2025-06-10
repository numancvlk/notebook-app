import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

export default function NoteInput({ onAddNote }) {
  const [currentNote, setCurrentNote] = useState("");

  const handleAddNote = () => {
    if (currentNote.trim().length === 0) {
      Alert.alert("Empty Note", "You can't add empty note");
      return;
    } else {
      onAddNote(currentNote);
      setCurrentNote("");
    }
  };
  return (
    <View style={myStyles.inputContainer}>
      <TextInput
        style={myStyles.input}
        value={currentNote}
        onChangeText={setCurrentNote}
        multiline
        placeholder="Please add your notes"
      />

      <TouchableOpacity style={myStyles.addButton} onPress={handleAddNote}>
        <Text style={myStyles.addButtonText}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row", // Input ve butonu yan yana hizalar
    marginBottom: 20, // Altına boşluk bırakır
    alignItems: "center", // Öğeleri dikeyde ortalar
  },
  input: {
    flex: 1, // Mevcut alanı doldurur
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10, // Butondan biraz boşluk bırakır
    minHeight: 50, // Multi-line TextInput için başlangıç yüksekliği
  },
  addButton: {
    backgroundColor: "#007bff", // Mavi bir arka plan
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center", // Metni ortala
    alignItems: "center", // Metni ortala
  },
  addButtonText: {
    color: "#fff", // Beyaz metin
    fontSize: 16,
    fontWeight: "bold",
  },
});
