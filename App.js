import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button, Item } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) =>
          <View style={styles.list}>
            <Text>{item.name} </Text>
            {item.phoneNumbers && <Text>{item.phoneNumbers[0].number}</Text>}
          </View>
        }
        keyExtractor={item => item.id}
      />
      <Button title="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  list: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
