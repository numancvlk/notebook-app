import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
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
  const [selection, setSelection] = useState({ start: 0, end: 0 });

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

  const applyFormatting = (format) => {
    const { start, end } = selection;
    const currentText = noteContent;
    let formattedText = currentText;

    let prefix = "";
    let suffix = "";

    switch (format) {
      case "bold":
        prefix = "**";
        suffix = "**";
        break;
      case "italic":
        prefix = "*";
        suffix = "*";
        break;
      case "strikethrough":
        prefix = "~~";
        suffix = "~~";
        break;
    }

    // Seçili metin varsa, seçili metnin etrafına biçimlendirme ekle
    if (start !== end) {
      const beforeSelection = currentText.substring(0, start);
      const selectedText = currentText.substring(start, end);
      const afterSelection = currentText.substring(end);

      formattedText =
        beforeSelection + prefix + selectedText + suffix + afterSelection;
      setNoteContent(formattedText);
      // Biçimlendirme sonrası seçimi ayarla (gerekiyorsa)
      setSelection({
        start: start + prefix.length,
        end: end + prefix.length,
      });
    } else {
      // Metin seçili değilse, imlecin olduğu yere biçimlendirme işaretlerini ekle
      const beforeCursor = currentText.substring(0, start);
      const afterCursor = currentText.substring(start);

      formattedText = beforeCursor + prefix + suffix + afterCursor;
      setNoteContent(formattedText);
      // İmleci biçimlendirmenin arasına yerleştir
      setSelection({
        start: start + prefix.length,
        end: start + prefix.length,
      });
    }
  };

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

      {/* Biçimlendirme Araç Çubuğu */}
      <View style={myStyles.toolbar}>
        <TouchableOpacity
          style={myStyles.toolbarButton}
          onPress={() => applyFormatting("bold")}
        >
          <Text style={myStyles.toolbarButtonText}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={myStyles.toolbarButton}
          onPress={() => applyFormatting("italic")}
        >
          <Text style={myStyles.toolbarButtonText}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={myStyles.toolbarButton}
          onPress={() => applyFormatting("strikethrough")}
        >
          <Text style={myStyles.toolbarButtonText}>S</Text>
        </TouchableOpacity>
        {/* Diğer biçimlendirme düğmelerini buraya ekleyebilirsiniz */}
      </View>

      <TextInput
        style={myStyles.inputContent}
        value={noteContent}
        onChangeText={setNoteContent}
        multiline
        textAlignVertical="top"
        placeholder="Please enter your note"
        placeholderTextColor="#9E9E9E"
        selection={selection}
        onSelectionChange={({ nativeEvent: { selection } }) =>
          setSelection(selection)
        }
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
  toolbar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  toolbarButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  toolbarButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
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
