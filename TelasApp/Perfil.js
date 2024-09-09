import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Modal, TextInput } from 'react-native';
import Parse from '../Configuracoes/ParseConfig';
import COLORS from '../constantes/Color';


export default function Perfil({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    nationality: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        const name = currentUser.get('name');
        const cpf = currentUser.get('cpf');
        const email = currentUser.get('email');
        const phone = currentUser.get('phone');
        const nationality = currentUser.get('nationality');
        setUserData({ name, cpf, email, phone, nationality });
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await Parse.User.logOut();
              navigation.navigate('Login');
            } catch (error) {
              console.error('Erro ao deslogar:', error);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    setIsModalVisible(true); // Exibir modal para confirmação de senha
  };

  const handleConfirmDelete = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      try {
        const user = await Parse.User.logIn(currentUser.get('username'), password);
        if (user) {
          await currentUser.destroy();
          navigation.navigate('Login');
        }
      } catch (error) {
        Alert.alert('Erro', 'Senha incorreta. Não foi possível excluir a conta.');
      }
    }
    setIsModalVisible(false); // Fechar modal
    setPassword(''); // Limpar senha
  };

  const maskCPF = (cpf) => {
    if (cpf.length > 0) {
      return cpf.replace(/\d(?=\d{4})/g, '*');
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData.name ? userData.name[0] : 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          {userData.cpf && (
            <Text style={styles.userDetail}>{maskCPF(userData.cpf)}</Text>
          )}
          {userData.nationality && (
            <Text style={styles.userDetail}>{userData.nationality}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AlterarInformacoes')}>
        <Image source={require('../assets/icons/user.png')} style={styles.icon} />
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AlterarSenha')}>
        <Image source={require('../assets/icons/cadeado.png')} style={styles.icon} />
        <Text style={styles.optionText}>Segurança</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notificacoes')}>
        <Image source={require('../assets/icons/bell.png')} style={styles.icon} />
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('MeusAnuncios')}>
        <Image source={require('../assets/icons/bag.png')} style={styles.icon} />
        <Text style={styles.optionText}>Meus Anúncios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Image source={require('../assets/icons/logout.png')} style={styles.iconL} />
        <Text style={styles.optionText}>Sair</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
        <Image source={require('../assets/icons/lixeira.png')} style={styles.icon} />
        <Text style={[styles.optionText, { color: "red" }]}>Excluir Conta</Text>
      </TouchableOpacity>

      {/* Modal para confirmação de senha */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirme sua senha</Text>
            <TextInput
              style={styles.modalInput}
              secureTextEntry={true}
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleConfirmDelete} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: COLORS.black,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 14,
    color: COLORS.grey,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconL: {
    width: 18,
    height: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
