import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import api from '../../services/api';

class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaB_valor: 0,
      valorConvertido: 0,
    };

    this.converter = this.converter.bind(this);
  }

  async converter() {
    let de_para = this.state.moedaA + '_' + this.state.moedaB;
    const response = await api.get(
      `convert?q=${de_para}&compact=ultra&apiKey=Esperando_A_Minha_Chave`,
    );
    let cotacao = response.data[de_para];

    let resultado = cotacao * parseFloat(this.state.moedaB_valor);

    this.setState({
      valorConvertido: resultado.toFixed(2),
    });

    Keyboard.dismiss();
  }

  render() {
    const {moedaA, moedaB} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          {moedaA} -> {moedaB}
        </Text>

        <TextInput
          placeholder="Digite o Valor para converter"
          style={styles.areaInput}
          onChangeText={(moedaB_valor) =>
            this.setState({moedaB_valor: moedaB_valor})
          }
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.areaBotao} onPress={this.converter}>
          <Text style={styles.textoBotao}>Converter</Text>
        </TouchableOpacity>

        <Text style={styles.valorConvertido}>
          {this.state.valorConvertido === 0 ? '' : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  areaInput: {
    width: 300,
    height: 70,
    backgroundColor: '#1ebbd7',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    color: '#000000',
    borderRadius:10,
  },
  areaBotao: {
    width: 150,
    height: 45,
    backgroundColor: '#107dac',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005073',
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#005073',
    marginTop: 15,
  },
});

export default Conversor;