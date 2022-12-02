// IMPORTS
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// COMPONENTE
export default function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const buscarCep = () => {

    if (cep.replace("-", "").length != 8) {
      setErro("CEP inválido")
      return
    }

    setCarregando(true)
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json`)
      .then(resposta => resposta.json())
      .then(obj => {
        if(obj.erro){
          setErro("CEP não encontrado!")
          return
        }

        setEndereco(obj)
        setErro("")
      })
      .catch(() => {
        setErro("Ocorreu um erro ao buscar o endereço!")
      })
      .finally(() => {
        setCarregando(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>CEP  x  Endereço</Text>
        <Text style={styles.texto}>Digite o CEP</Text>
        <TextInput placeholder="Digite o CEP..." style={styles.input} value={cep} onChangeText={input => setCep(input)} />

        <Button color="#0b4a7a" title="Buscar endereço" onPress={buscarCep} />

        {carregando && <Text style={styles.texto}>Carregando...</Text>}

        {erro != "" && <Text style={styles.erro}>{erro}</Text>}

        {endereco != null && !carregando && erro == "" && (
          <View style={styles.enderecoCard}>
            <Text style={styles.texto}>CEP -> {endereco.cep}</Text>
            <Text style={styles.texto}>Logradouro -> {endereco.logradouro}</Text>
            <Text style={styles.texto}>Bairro -> {endereco.bairro}</Text>
            <Text style={styles.texto}>Cidade -> {endereco.localidade}</Text>
            <Text style={styles.texto}>Estado -> {endereco.uf}</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  enderecoCard: { padding: 15, backgroundColor: '#2a3136' },
  card: { backgroundColor: 'white', padding: 30 },
  input: { marginVertical: 20, borderColor: '#0b4a7a', borderWidth: 1 },
  titulo: {
    fontSize: 25,
    color: '#0b4a7a',
    marginBottom: 20
  },
  texto: {
    fontSize: 18,
    color: 'white'
  },
  erro: {
    marginVertical:12,
    fontSize: 18,
    color: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: '#0b4a7a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
