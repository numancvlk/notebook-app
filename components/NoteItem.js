import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

export default function NoteItem({
  noteTitle,
  noteText,
  noteId,
  onDeleteNote,
  onViewPress,
  onEditPress,
  itemWidth,
  createdAt,
  updatedAt,
}) {
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

  const formatShortDateTime = (isoString) => {
    if (!isoString) return "Bilinmiyor";
    const date = new Date(isoString);

    return (
      date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <TouchableOpacity
      style={[myStyles.card, { width: itemWidth }]}
      onPress={() =>
        onViewPress(noteId, noteTitle, noteText, createdAt, updatedAt)
      }
    >
      <View style={myStyles.contentContainer}>
        <Text style={myStyles.title} numberOfLines={2} ellipsizeMode="tail">
          {noteTitle}
        </Text>
        <Markdown>{noteText}</Markdown>
      </View>

      <View style={myStyles.timestampsInCard}>
        {updatedAt && (
          <Text style={myStyles.timestampTextCard}>
            Updated at: {formatShortDateTime(updatedAt)}
          </Text>
        )}
        {createdAt && createdAt !== updatedAt && (
          <Text style={myStyles.timestampTextCard}>
            Created at: {formatShortDateTime(createdAt)}
          </Text>
        )}
      </View>

      <View style={myStyles.buttonContainer}>
        <TouchableOpacity
          style={myStyles.editButton}
          onPress={() =>
            onEditPress(noteId, noteTitle, noteText, createdAt, updatedAt)
          }
        >
          <Text style={myStyles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={myStyles.deleteButton} onPress={handleDelete}>
          <Text style={myStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 5,
  },

  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  timestampsInCard: {
    position: "absolute",
    bottom: 55,
    left: 15,
    right: 15,
    alignItems: "flex-end",
  },
  timestampTextCard: {
    fontSize: 10,
    color: "#999",
    fontStyle: "italic",
  },
});
