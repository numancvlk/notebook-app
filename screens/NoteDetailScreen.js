import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useState, useEffect } from "react";

export default function NoteDetailScreen({
  navigation,
  route,
  onAddNote,
  onUpdateNote,
}) {
  const existingNoteId = route.params?.noteId;
  const existingNoteText = route.params?.noteText;

  const [noteContent, setNoteContent] = useState(existingNoteText || "");

  const handleSaveNote = () => {
    if (noteContent.trim().length === 0) {
      Alert.alert("Empty Note", "This note is empty");
      return;
    } else if (existingNoteId) {
      onUpdateNote(existingNoteId, noteContent);
      Alert.alert("Update Note", "Your note has been updated");
      navigation.goBack();
    } else {
      onAddNote(noteContent);
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
    <View>
      <TextInput
        value={noteContent}
        onChangeText={setNoteContent}
        multiline
        textAlignVertical="top"
        placeholder="Please enter your note"
      />

      <TouchableOpacity onPress={handleSaveNote}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
