import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Parse from '../Configuracoes/ParseConfig'; // Importa a configuração do Parse
import { useIsFocused } from '@react-navigation/native'; // Hook para monitorar o foco da tela

const Home = ({ route, navigation }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);
  const isFocused = useIsFocused(); // Monitorar o foco da tela

  // Função para buscar anúncios
  const fetchAnuncios = async () => {
    const Anuncio = Parse.Object.extend('Anuncio');
    const query = new Parse.Query(Anuncio);
    try {
      const results = await query.find();
      const anunciosParse = results.map((result) => ({
        id: result.id,
        titulo: result.get('titulo'),
        descricao: result.get('descricao'),
        servicoPrecisa: result.get('servicoPrecisa'),
        servicoOferece: result.get('servicoOferece'),
        data: result.get('data'),
        nome: result.get('nome'),
        estado: result.get('estado'),
        cidade: result.get('cidade'),
        ownerId: result.get('ownerId'), // Inclui o ownerId
      }));
      setAnuncios(anunciosParse);
      setFilteredAnuncios(anunciosParse); // Exibe todos os anúncios inicialmente
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
    }
  };

  // Função para buscar favoritos
  const fetchFavoritos = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      const Favoritos = Parse.Object.extend('Favoritos');
      const query = new Parse.Query(Favoritos);
      query.equalTo('userId', currentUser.id);
      try {
        const results = await query.find();
        const favoritosIds = results.map((fav) => fav.get('anuncioId'));
        setFavoritos(favoritosIds);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    }
  };

  // Efeito para buscar anúncios e favoritos toda vez que a tela entrar em foco
  useEffect(() => {
    if (isFocused) {
      fetchAnuncios();
      fetchFavoritos();
    }
  }, [isFocused]); // Dispara o efeito toda vez que a tela for focada

  // Filtro de anúncios baseado no termo de busca
  useEffect(() => {
    const filterAnuncios = () => {
      if (searchTerm === '') {
        setFilteredAnuncios(anuncios);
      } else {
        const filtered = anuncios.filter(anuncio =>
          anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          anuncio.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnuncios(filtered);
      }
    };

    filterAnuncios();
  }, [searchTerm, anuncios]);

  const handleAnuncioPress = (anuncio) => {
    navigation.navigate('DetalhesAnuncio', { anuncio });
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
        setFavoritos(favoritos.filter((id) => id !== anuncioId));
      } else {
        const novoFavorito = new Favoritos();
        novoFavorito.set('userId', currentUser.id);
        novoFavorito.set('anuncioId', anuncioId);
        await novoFavorito.save(); // Adiciona aos favoritos
        setFavoritos([...favoritos, anuncioId]);
      }
    } catch (error) {
      console.error('Erro ao manipular favoritos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar anúncios..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredAnuncios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAnuncioPress(item)}>
            <View style={styles.anuncio}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <View style={styles.linha}>
                <Text style={styles.label}>Serviço que precisa:</Text>
                <Text style={styles.valor}>{item.servicoPrecisa}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.label}>Serviço que oferece:</Text>
                <Text style={styles.valor}>{item.servicoOferece}</Text>
              </View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.localizacao}>{`${item.cidade}, ${item.estado}`}</Text>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavoritePress(item.id)}
              >
                <Image
                  source={
                    favoritos.includes(item.id)
                      ? require('../assets/icons/coracao-vermelho.png') // Ícone rosa
                      : require('../assets/icons/coracao.png') // Ícone padrão
                  }
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum anúncio disponível</Text>}
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
  searchInput: {
    marginTop:30,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderColor: "#FFBF00",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
    position: 'relative', // Necessário para posicionar o botão de favoritar
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
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 14,
    color: '#555',
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

export default Home;
