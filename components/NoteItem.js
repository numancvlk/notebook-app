import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function NoteItem({
  noteTitle,
  noteText,
  noteId,
  onDeleteNote,
  onPressItem,
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
    <TouchableOpacity onPress={() => onPressItem(noteId, noteTitle, noteText)}>
      <View>
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {displayTitle}
          </Text>
          <Text>{noteText}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
