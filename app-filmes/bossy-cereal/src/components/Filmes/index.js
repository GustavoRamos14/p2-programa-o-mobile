import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Modal} from 'react-native';

class Filmes extends Component {
  render() {
    const {nome, foto} = this.props.data;
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.titulo}>{nome}</Text>
          <Image source={{uri: foto}} style={styles.capa} />

          <View style={styles.areaBotao}>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Leia mais...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    margin: 16,
    shadowRadius: 6,
    borderRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 19,
    padding: 16,
  },
  capa: {
    height: 250,
    zIndex: 3,
  },
  areaBotao: {
    alignItems: 'flex-end',
    marginTop: -40,
    zIndex: 9,
  },
  botao: {
    width: 100,
    backgroundColor: '#09a6ff',
    opacity: 1,
    padding: 9,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  botaoTexto: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default Filmes;