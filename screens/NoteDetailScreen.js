import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

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
    <View>
      <TextInput
        value={noteTitle}
        onChangeText={setNoteTitle}
        placeholder="Please enter your header"
      />

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
