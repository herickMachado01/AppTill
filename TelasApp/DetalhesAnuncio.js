import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse

const lixo = require("../assets/icons/lixeira.png");
const editar = require("../assets/icons/editar.png");

const DetalhesAnuncio = ({ route, navigation }) => {
  const { anuncio } = route.params;

  const isDono = Parse.User.current()?.id === anuncio.ownerId;

  const handleEnviarMensagem = () => {
    navigation.navigate('Mensagem', { anuncio });
  };

  const handleEditarAnuncio = () => {
    navigation.navigate('EditarAnuncio', { anuncio });
  };

  const handleConfirmarExclusao = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este anúncio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: handleExcluirAnuncio,
        },
      ],
      { cancelable: true }
    );
  };

  const handleExcluirAnuncio = async () => {
    try {
      const Anuncio = Parse.Object.extend('Anuncio');
      const query = new Parse.Query(Anuncio);
      const object = await query.get(anuncio.id);
      await object.destroy();
      alert('Anúncio excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir o anúncio:', error);
      alert('Ocorreu um erro ao excluir o anúncio.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{anuncio.titulo}</Text>
      <Text style={styles.descricao}>{anuncio.descricao}</Text>
      <View style={styles.linha}>
        <Text style={styles.label}>Serviço que precisa:</Text>
        <Text style={styles.valor}>{anuncio.servicoPrecisa}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.label}>Serviço que oferece:</Text>
        <Text style={styles.valor}>{anuncio.servicoOferece}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.valor}>{anuncio.data}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.valor}>{anuncio.nome}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.valor}>{anuncio.estado}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.valor}>{anuncio.cidade}</Text>
      </View>

      <TouchableOpacity onPress={handleEnviarMensagem} style={styles.botaoMensagem}>
        <Text style={styles.textoBotao}>Enviar Mensagem</Text>
      </TouchableOpacity>

      {isDono && (
        <View style={styles.botoes}>
          <TouchableOpacity onPress={handleEditarAnuncio} style={styles.botao}>
            <Image source={editar} style={styles.iconeBotao} />
            <Text style={styles.textoBotaoIconePreto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirmarExclusao} style={styles.botao}>
            <Image source={lixo} style={styles.iconeBotao} />
            <Text style={styles.textoBotaoIcone}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    color: '#333',
  },
  botoes: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botaoMensagem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    marginBottom: 20,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  iconeBotao: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  textoBotaoIconePreto: {
    fontSize: 16,
    color: '#000',
  },
  textoBotaoIcone: {
    fontSize: 16,
    color: '#FF4C4C',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetalhesAnuncio;
