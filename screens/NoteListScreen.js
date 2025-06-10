import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

import { useState } from "react";

//---------COMPONENTS-------------
import NoteItem from "../components/NoteItem";
import Header from "../components/Header";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2;

export default function NoteListScreen({ navigation, notes, onDeleteNote }) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddNotePress = () => {
    navigation.navigate("NoteDetailScreen");
  };

  const handleNoteItemPress = (id, title, text) => {
    navigation.navigate("NoteDetailScreen", {
      noteId: id,
      noteTitle: title,
      noteText: text,
    });
  };

  const renderNoteItem = ({ item }) => (
    <NoteItem
      noteTitle={item.title}
      noteText={item.text}
      noteId={item.id}
      onDeleteNote={onDeleteNote}
      onPressItem={handleNoteItemPress}
      itemWidth={itemWidth}
    />
  );

  return (
    <View style={myStyles.container}>
      <Header />

      <TextInput
        style={myStyles.searchBar}
        value={search}
        onChangeText={setSearch}
        placeholder="Search notes.."
      />

      {notes.length === 0 ? (
        <View style={myStyles.emptyNotesContainer}>
          <Text style={myStyles.emptyNotesText}>Henüz Notunuz Yok</Text>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={myStyles.row}
          contentContainerStyle={myStyles.flatListContent}
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteItem}
        />
      )}

      <TouchableOpacity style={myStyles.fab} onPress={handleAddNotePress}>
        <Text style={myStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 0,
  },
  searchBar: {
    padding: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  flatListContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emptyNotesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyNotesText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
