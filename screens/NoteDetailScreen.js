import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";

import { useState, useEffect } from "react";

export default function NoteDetailScreen({
  navigation,
  route,
  onAddNote,
  onUpdateNote,
}) {
  const existingNoteId = route.params?.noteId;
  const existingNoteTitle = route.params?.noteTitle;
  const existingNoteText = route.params?.noteText;

  const [noteTitle, setNoteTitle] = useState(existingNoteTitle || "");
  const [noteContent, setNoteContent] = useState(existingNoteText || "");

  const handleSaveNote = () => {
    if (noteContent.trim().length === 0 && noteTitle.trim().length === 0) {
      Alert.alert("Warning", "Please enter a header and note");
      return;
    } else if (existingNoteId) {
      onUpdateNote(existingNoteId, noteTitle || "", noteContent);
      Alert.alert("Update Note", "Your note has been updated");
      navigation.goBack();
    } else {
      onAddNote(noteTitle || "", noteContent);
      Alert.alert("Note Added", "Your note has been added");
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: existingNoteId ? "Notu Düzenle" : "Yeni Not Ekle",
    });
  }, [existingNoteId, navigation]);

  return (
    <KeyboardAvoidingView
      style={myStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TextInput
        style={myStyles.inputTitle}
        value={noteTitle}
        onChangeText={setNoteTitle}
        placeholder="Please enter your header"
        placeholderTextColor="#9E9E9E"
        maxLength={15}
      />

      <TextInput
        style={myStyles.inputContent}
        value={noteContent}
        onChangeText={setNoteContent}
        multiline
        textAlignVertical="top"
        placeholder="Please enter your note"
        placeholderTextColor="#9E9E9E"
      />

      <TouchableOpacity style={myStyles.saveButton} onPress={handleSaveNote}>
        <Text style={myStyles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  inputTitle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    minHeight: 150,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
