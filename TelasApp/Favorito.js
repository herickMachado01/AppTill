import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse
import { useIsFocused } from '@react-navigation/native'; // Hook para saber quando a tela está em foco

const Favorito = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);
  const isFocused = useIsFocused(); // Hook para monitorar o foco da tela

  const fetchFavoritos = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      const Favoritos = Parse.Object.extend('Favoritos');
      const query = new Parse.Query(Favoritos);
      query.equalTo('userId', currentUser.id);

      try {
        const results = await query.find();
        const anunciosIds = results.map((result) => result.get('anuncioId'));

        if (anunciosIds.length > 0) {
          const Anuncio = Parse.Object.extend('Anuncio');
          const anuncioQuery = new Parse.Query(Anuncio);
          anuncioQuery.containedIn('objectId', anunciosIds);

          const anunciosFavoritos = await anuncioQuery.find();
          const favoritosList = anunciosFavoritos.map((anuncio) => ({
            id: anuncio.id,
            titulo: anuncio.get('titulo'),
            descricao: anuncio.get('descricao'),
            servicoPrecisa: anuncio.get('servicoPrecisa'),
            servicoOferece: anuncio.get('servicoOferece'),
            data: anuncio.get('data'),
            nome: anuncio.get('nome'),
            estado: anuncio.get('estado'),
            cidade: anuncio.get('cidade'),
          }));

          setFavoritos(favoritosList);
        } else {
          setFavoritos([]); // Limpa a lista se não houver favoritos
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    }
  };

  const handleFavoritePress = async (anuncioId) => {
    const currentUser = Parse.User.current();
    if (!currentUser) return;

    const Favoritos = Parse.Object.extend('Favoritos');
    const query = new Parse.Query(Favoritos);
    query.equalTo('userId', currentUser.id);
    query.equalTo('anuncioId', anuncioId);

    try {
      const result = await query.first();
      if (result) {
        await result.destroy(); // Remove dos favoritos
        setFavoritos(favoritos.filter((fav) => fav.id !== anuncioId));
      }
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
    }
  };

  // Sempre que a tela estiver em foco, chamamos a função de busca
  useEffect(() => {
    if (isFocused) {
      fetchFavoritos();
    }
  }, [isFocused]); // Isso garante que a função será chamada toda vez que a tela ganhar foco

  const handleAnuncioPress = (anuncio) => {
    navigation.navigate('DetalhesAnuncio', { anuncio });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAnuncioPress(item)}>
            <View style={styles.anuncio}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.localizacao}>{`${item.cidade}, ${item.estado}`}</Text>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavoritePress(item.id)}
              >
                <Image
                  source={require('../assets/icons/coracao-vermelho.png')} // Ícone de favorito marcado
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum favorito encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  anuncio: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  nome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  localizacao: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
});

export default Favorito;
