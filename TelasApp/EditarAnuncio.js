import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse

const EditarAnuncio = ({ route, navigation }) => {
  const { anuncio } = route.params;
  const [titulo, setTitulo] = useState(anuncio.titulo);
  const [descricao, setDescricao] = useState(anuncio.descricao);
  const [servicoPrecisa, setServicoPrecisa] = useState(anuncio.servicoPrecisa);
  const [servicoOferece, setServicoOferece] = useState(anuncio.servicoOferece);
  const [data, setData] = useState(anuncio.data);
  const [nome, setNome] = useState(anuncio.nome);
  const [estado, setEstado] = useState(anuncio.estado);
  const [cidade, setCidade] = useState(anuncio.cidade);

  const handleSalvar = async () => {
    try {
      const Anuncio = Parse.Object.extend('Anuncio');
      const query = new Parse.Query(Anuncio);
      const anuncioParse = await query.get(anuncio.id);

      anuncioParse.set('titulo', titulo);
      anuncioParse.set('descricao', descricao);
      anuncioParse.set('servicoPrecisa', servicoPrecisa);
      anuncioParse.set('servicoOferece', servicoOferece);
      anuncioParse.set('data', data);
      anuncioParse.set('nome', nome);
      anuncioParse.set('estado', estado);
      anuncioParse.set('cidade', cidade);

      await anuncioParse.save();
      alert('Anúncio atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar anúncio:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Editar Anúncio</Text>
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
          placeholder="Data"
          value={data}
          onChangeText={setData}
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
        <Button title="Salvar" onPress={handleSalvar} />
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

export default EditarAnuncio;
