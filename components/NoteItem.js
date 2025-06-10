import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function NoteItem({ noteText, noteId, onDeleteNote }) {
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
    <View>
      <Text>{noteText}</Text>

      <TouchableOpacity onPress={handleDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  noteItem: {
    backgroundColor: "#fff", // Beyaz arka plan
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row", // Metin ve butonu yan yana hizala
    justifyContent: "space-between", // Metni sola, butonu sağa it
    alignItems: "center", // Dikeyde ortala
    shadowColor: "#000", // iOS gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android gölge
  },
  noteText: {
    fontSize: 16,
    flex: 1, // Metnin tüm mevcut alanı kaplamasını sağlar (sil butonu hariç)
    marginRight: 10, // Metin ile buton arasında boşluk bırak
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Kırmızı arka plan (silme rengi)
    width: 30,
    height: 30,
    borderRadius: 15, // Yuvarlak buton için
    justifyContent: "center", // İçindeki metni ortala
    alignItems: "center", // İçindeki metni ortala
  },
  deleteButtonText: {
    color: "#fff", // Beyaz metin
    fontWeight: "bold",
    fontSize: 16,
  },
});
