import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constantes/Color'; // Defina sua paleta de cores
import { useFocusEffect } from '@react-navigation/native'; // Hook para atualizar dados quando a tela ganha foco

const MeusAnuncios = ({ navigation }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(''); // Estado para mensagens de erro

  // Função para buscar os anúncios do usuário
  const fetchMeusAnuncios = useCallback(async () => {
    setLoading(true); // Inicia o carregamento
    setError(''); // Limpa erros anteriores
    const currentUser = Parse.User.current();
    if (currentUser) {
      const Anuncio = Parse.Object.extend('Anuncio');
      const query = new Parse.Query(Anuncio);
      query.equalTo('userId', currentUser.id);

      try {
        const results = await query.find();
        const anunciosList = results.map((anuncio) => ({
          id: anuncio.id,
          titulo: anuncio.get('titulo'),
          descricao: anuncio.get('descricao'),
        }));
        setAnuncios(anunciosList);
        console.log('Anúncios carregados:', anunciosList); // Log dos anúncios carregados
      } catch (error) {
        setError('Erro ao buscar anúncios');
        console.error('Erro ao buscar anúncios:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    } else {
      setError('Usuário não autenticado');
      setLoading(false); // Finaliza o carregamento
    }
  }, []);

  // Atualiza a lista de anúncios quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchMeusAnuncios();
    }, [fetchMeusAnuncios])
  );

  const handleEdit = (anuncio) => {
    navigation.navigate('EditarAnuncio', { anuncio });
  };

  const handleDelete = async (anuncioId) => {
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
          onPress: async () => {
            const Anuncio = Parse.Object.extend('Anuncio');
            const query = new Parse.Query(Anuncio);
            try {
              const anuncio = await query.get(anuncioId);
              await anuncio.destroy();
              fetchMeusAnuncios(); // Atualiza a lista de anúncios
            } catch (error) {
              console.error('Erro ao excluir anúncio:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.anuncioContainer}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Anúncios</Text>
      </View>
      {anuncios.length > 0 ? (
        <FlatList
          data={anuncios}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.body}>
          <Text style={styles.text}>Nenhum anúncio disponível</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  anuncioContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  descricao: {
    fontSize: 16,
    color: COLORS.gray,
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.gray,
  },
});

export default MeusAnuncios;
