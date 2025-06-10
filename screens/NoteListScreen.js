import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

//---------COMPONENTS-------------
import NoteItem from "../components/NoteItem";
import Header from "../components/Header";

const { width } = Dimensions.get("window");
const itemWidth = (width - 60) / 2;

export default function NoteListScreen({ navigation, notes, onDeleteNote }) {
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
      {notes.length === 0 ? (
        <View style={myStyles.emptyNotesContainer}>
          <Text style={myStyles.emptyNotesText}>Henüz Notunuz Yok</Text>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={myStyles.row}
          contentContainerStyle={myStyles.flatListContent}
          data={notes}
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
    backgroundColor: "#f5f5f5", // Açık gri arka plan
    paddingTop: 0, // Header bileşeni kendi padding'ini yönetecek
  },
  flatListContent: {
    paddingHorizontal: 15, // FlatList'in yanlardan iç boşluğu (itemWidth hesaplamasına göre ayarlandı)
    paddingVertical: 10, // Üstten ve alttan boşluk
  },
  row: {
    justifyContent: "space-between", // Not kartlarını yatayda eşit boşluklarla dağıt
    marginBottom: 10, // Satırlar arası boşluk
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
    position: "absolute", // Butonu ekranda sabitle
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#007bff", // Mavi renk
    borderRadius: 30, // Yuvarlak yapar
    elevation: 8, // Android gölge
    shadowColor: "#000", // iOS gölge
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
