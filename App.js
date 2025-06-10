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
        const parsedNotes = JSON.parse(storedNotes).map((note) => ({
          ...note,
          createdAt: note.createdAt || new Date().toISOString(),
          updatedAt: note.updatedAt || new Date().toISOString(),
        }));
        setNotes(parsedNotes);
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

  const addNote = (noteTitle, noteText, createdAt, updatedAt) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now().toString(),
        title:
          (noteTitle || "").trim().length === 0 ? "Untitled Note" : noteTitle,
        text: noteText,
        createdAt: createdAt,
        updatedAt: updatedAt,
      },
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id, newTitle, newText, newCreatedAt, newUpdatedAt) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title:
                (newTitle || "").trim().length === 0
                  ? "Untitled Note"
                  : newTitle,
              text: newText,
              createdAt: newCreatedAt,
              updatedAt: newUpdatedAt,
            }
          : note
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
          options={{ title: "Note Detail" }} // Ekranın başlığı
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
