import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse

const Anunciar = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [servicoPrecisa, setServicoPrecisa] = useState('');
  const [servicoOferece, setServicoOferece] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  const handleAnunciar = async () => {
    const Anuncio = Parse.Object.extend('Anuncio');
    const novoAnuncio = new Anuncio();
  
    novoAnuncio.set('titulo', titulo);
    novoAnuncio.set('descricao', descricao);
    novoAnuncio.set('servicoPrecisa', servicoPrecisa);
    novoAnuncio.set('servicoOferece', servicoOferece);
    novoAnuncio.set('data', data);
    novoAnuncio.set('nome', nome);
    novoAnuncio.set('estado', estado);
    novoAnuncio.set('cidade', cidade);
    novoAnuncio.set('ownerId', Parse.User.current()?.id); // Define o ID do usuário como ownerId
  
    try {
      await novoAnuncio.save();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
    }
  };

  const formatData = (text) => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.slice(0, 5) + '/' + formattedText.slice(5);
    }
    return formattedText;
  };

  const handleDataChange = (text) => {
    setData(formatData(text));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Faça seu Anúncio</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Serviço que você precisa"
          value={servicoPrecisa}
          onChangeText={setServicoPrecisa}
        />
        <TextInput
          style={styles.input}
          placeholder="Serviço que você oferece"
          value={servicoOferece}
          onChangeText={setServicoOferece}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (DD/MM/AAAA)"
          value={data}
          onChangeText={handleDataChange}
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <Button title="Anunciar" onPress={handleAnunciar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginTop: -70,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});

export default Anunciar;
