import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

//-----------SCREENS-------------
import NoteListScreen from "./screens/NoteListScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [notes, setNotes] = useState([]);

  // Notları AsyncStorage'dan yükle
  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("myNotes");
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Notlar yüklenirken hata oluştu:", error);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem("myNotes", JSON.stringify(notes));
    } catch (error) {
      console.error("Notlar kaydedilirken hata oluştu:", error);
    }
  };

  const addNote = (noteText) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now().toString(), text: noteText },
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteListScreen">
        <Stack.Screen name="NoteListScreen" options={{ headerShown: false }}>
          {({ navigation, route }) => (
            <NoteListScreen
              navigation={navigation}
              route={route}
              notes={notes}
              onDeleteNote={deleteNote}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="NoteDetailScreen"
          options={{ title: "Not Detayı" }} // Ekranın başlığı
        >
          {({ navigation, route }) => (
            <NoteDetailScreen
              navigation={navigation}
              route={route}
              onAddNote={addNote}
              onUpdateNote={updateNote}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
