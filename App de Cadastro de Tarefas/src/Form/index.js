import React, {Component, useState} from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
 
export default function Form({route}) {
  const [id, setId] = useState(route.params?.id)
  const [newTitle, setNewTitle] = useState(route.params?.title)
  const [newDescription, setNewDescription] = useState(route.params?.description)
 
  const navigation = useNavigation();
 
  const salvarTarefa = async () => {
   
    const body = JSON.stringify({title: newTitle, description: newDescription})
 
    if (id !== undefined){
      const response = await api.put(`/tasks/${id}`, body, {headers: {'Content-Type': 'application/json'}});
      await route.params?.atualizarLista()
    }
    else{
      const response = await api.post('/tasks', body, {headers: {'Content-Type': 'application/json'}});
      await route.params?.atualizarLista()
    }
    
    window.location.reload();
    navigation.goBack()  
  }

 return (
   <View style={styles.viewDiv}>

      <View style={styles.textConteiner}>

        <TextInput
        placeholderTextColor={"black"}
        placeholder={'Titulo'}
        style={styles.input}
        defaultValue={route.params?.title}
        onChangeText={(text)=> setNewTitle(text)}
      />
 
      <TextInput
        placeholderTextColor={"black"}
        placeholder={'Descrição'}
        style={styles.input}
        defaultValue={route.params?.description}
        onChangeText={(text)=> setNewDescription(text)}
      />
      </View>

      <Pressable style={styles.button} onPress={salvarTarefa}>
        <Text style={styles.text}>{'Salvar'}</Text>
      </Pressable>
   </View>
  );
}
 
const styles = StyleSheet.create({
  textConteiner:{
    display:'flex',
    marginTop:155,
    width:300,
    height:155,

    backgroundColor:'#DABFF1',
    borderRadius:4,
  },
  viewDiv:{
    height:'100%',
    width:'100%',
    alignItems:'center',

    backgroundColor:'#747475',

  },
  input:{
    width: 'auto',
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFF',
    marginTop:25,
    textAlign:'center',

  },
  button: {
    width:350,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,

    marginBottom:80,
    elevation: 3,
    backgroundColor: '#9E30FF',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
