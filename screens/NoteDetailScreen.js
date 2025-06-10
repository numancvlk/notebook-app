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
import Markdown from "react-native-markdown-display";

export default function NoteDetailScreen({
  navigation,
  route,
  onAddNote,
  onUpdateNote,
}) {
  const existingNoteId = route.params?.noteId;
  const existingNoteTitle = route.params?.noteTitle;
  const existingNoteText = route.params?.noteText;

  const existingCreatedAt = route.params?.createdAt;
  const existingUpdatedAt = route.params?.updatedAt;
  const isViewOnly = route.params?.isViewOnly || false;

  const [noteTitle, setNoteTitle] = useState(existingNoteTitle || "");
  const [noteContent, setNoteContent] = useState(existingNoteText || "");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleSaveNote = () => {
    if (noteContent.trim().length === 0 && noteTitle.trim().length === 0) {
      Alert.alert("Warning", "Please enter a title and a note");
      return;
    }

    // EKLENEN: Mevcut tarihleri veya yeni tarihleri belirle
    const now = new Date().toISOString();
    const newCreatedAt = existingNoteId ? existingCreatedAt : now; // Yeni notsa şimdi oluşturuldu
    const newUpdatedAt = now; // Her kayıtta güncellenme tarihi yenilenir

    if (existingNoteId) {
      onUpdateNote(
        existingNoteId,
        noteTitle || "",
        noteContent,
        newCreatedAt,
        newUpdatedAt
      );
      Alert.alert("Note Updated", "Your note has been successfully updated!");
      navigation.goBack();
    } else {
      // Yeni not eklerken, tarihleri de gönder
      onAddNote(noteTitle || "", noteContent, newCreatedAt, newUpdatedAt);
      Alert.alert("Note Added", "Your note has been successfully added!");
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: isViewOnly
        ? "View Note"
        : existingNoteId
        ? "Edit Note"
        : "Add New Note",
    });
  }, [existingNoteId, isViewOnly, navigation]);

  const applyFormatting = (format) => {
    if (isViewOnly) return;

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

    if (start !== end) {
      const beforeSelection = currentText.substring(0, start);
      const selectedText = currentText.substring(start, end);
      const afterSelection = currentText.substring(end);

      formattedText =
        beforeSelection + prefix + selectedText + suffix + afterSelection;
      setNoteContent(formattedText);
      setSelection({
        start: start + prefix.length,
        end: end + prefix.length,
      });
    } else {
      const beforeCursor = currentText.substring(0, start);
      const afterCursor = currentText.substring(start);

      formattedText = beforeCursor + prefix + suffix + afterCursor;
      setNoteContent(formattedText);
      setSelection({
        start: start + prefix.length,
        end: start + prefix.length,
      });
    }
  };

  // EKLENEN: Tarih stringini okunabilir formata dönüştüren yardımcı fonksiyon
  const formatDateTime = (isoString) => {
    if (!isoString) return "Bilinmiyor";
    const date = new Date(isoString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <KeyboardAvoidingView
      style={myStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      {isViewOnly ? (
        <Text style={myStyles.viewTitle}>{noteTitle}</Text>
      ) : (
        <TextInput
          style={myStyles.inputTitle}
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholder="Please enter your title"
          placeholderTextColor="#9E9E9E"
          maxLength={15}
          editable={!isViewOnly}
        />
      )}

      {isViewOnly && existingCreatedAt && (
        <View style={myStyles.timestampContainer}>
          <Text style={myStyles.timestampText}>
            Created At: {formatDateTime(existingCreatedAt)}
          </Text>
          {existingUpdatedAt && existingUpdatedAt !== existingCreatedAt && (
            <Text style={myStyles.timestampText}>
              Last Update: {formatDateTime(existingUpdatedAt)}
            </Text>
          )}
        </View>
      )}

      {!isViewOnly && (
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
        </View>
      )}

      {isViewOnly ? (
        <View style={myStyles.viewContentContainer}>
          <Markdown style={myStyles.markdownContent}>{noteContent}</Markdown>
        </View>
      ) : (
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
          editable={!isViewOnly}
        />
      )}

      {!isViewOnly && (
        <TouchableOpacity style={myStyles.saveButton} onPress={handleSaveNote}>
          <Text style={myStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  viewTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  timestampContainer: {
    marginBottom: 15,
  },
  timestampText: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
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
  viewContentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 150,
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
  markdownContent: {
    body: {
      fontSize: 16,
      color: "#333",
    },
    strong: {
      fontWeight: "bold",
      color: "#000",
    },
    em: {
      fontStyle: "italic",
      color: "#111",
    },
    s: {
      textDecorationLine: "line-through",
      color: "#555",
    },
    paragraph: {
      marginBottom: 8,
    },
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
