import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
 
function Card({data, funcCarregarTarefas}){
  const [id, setId] = useState(data?.id)
  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)
 
  const excluirTarefa = async () => {
    const response = await api.delete(`/tasks/${id}`);
    await funcCarregarTarefas();
  }
 
  const navigation = useNavigation();
 
  async function irFormulario(){
      navigation.navigate('Formulario', { id: id, title: title, description: description, atualizarLista: funcCarregarTarefas});
  }
 
 
  return(
    <View>
     
      <View style={styles.card}>
        <Text style={styles.titulo}>{title}</Text>
        <View style={styles.wapperDescricao} >
          <Text style={styles.descricao} numberOfLines={7} ellipsizeMode="tail">{description}</Text>
        </View>
        <View style={styles.wapperButton}>
          <TouchableOpacity style={styles.buttonEditar} onPress={irFormulario}>
            <Text style={styles.wapperText}>Editar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttonExcluir} onPress={excluirTarefa}>
            <Text style={styles.wapperText}>Excluir</Text>
          </TouchableOpacity>
        </View>

      </View>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  card:{
    
    backgroundColor: '#CE26FF',

    margin: 15,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 3,
  },
  titulo:{
    fontSize: 18,
    padding: 15,
  },
  wapperDescricao:{
    alignItems:'center',
    top:10,
    borderRadius:4,
    height:150,
    width:'auto',
    backgroundColor:'#E1E1E1',
    marginLeft:10,
    marginRight:10,
  },
  descricao:{
    fontSize: 10,
    padding: 15,
  },
  wapperButton:{
    display:'flex',
    position:'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign:'center',
    top:20,
  },
  buttonEditar: {
    borderRadius: 25,
    alignSelf: 'flex-start',
    backgroundColor: "#373139",
    borderColor:'black',
    border:10,

    height:50,
    width:100,

  },
  buttonExcluir: {
    borderRadius: 25,
    height:50,
    width:100,
    alignSelf: 'flex-start',
    backgroundColor: "#373139",


  },
  wapperText:{
    textAlign:'center',
    marginTop:15,
    fontSize:15,
    fontWeight: 'bold',
    color:'#fff',
  },
});
 
export default Card;
