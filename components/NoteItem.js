import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function NoteItem({
  noteTitle,
  noteText,
  noteId,
  onDeleteNote,
  onPressItem,
  itemWidth,
}) {
  const displayTitle =
    (noteTitle || "").trim().length === 0 ? "Başlıksız Not" : noteTitle;

  const handleDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure delete this note?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Silme İşlemi İptal Edildi"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDeleteNote(noteId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={[myStyles.card, { width: itemWidth }]}
      onPress={() => onPressItem(noteId, noteTitle, noteText)}
    >
      <View style={myStyles.contentContainer}>
        <Text style={myStyles.title} numberOfLines={2} ellipsizeMode="tail">
          {noteTitle}
        </Text>
        <Text
          style={myStyles.previewText}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {noteText}
        </Text>
      </View>
      <TouchableOpacity style={myStyles.deleteButton} onPress={handleDelete}>
        <View style={myStyles.deleteButtonInner}>
          <Text style={myStyles.deleteButtonText}>Delete</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const myStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10,
    height: 180,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  previewText: {
    fontSize: 13,
    color: "#666",
  },
  deleteButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  deleteButtonInner: {
    backgroundColor: "#dc3545",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
