import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import Parse from '../Configuracoes/ParseConfig';
import COLORS from '../constantes/Color';
import { Ionicons } from '@expo/vector-icons';

export default function AlterarInformacoes({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');

  // Estados para o modal e senha
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setName(currentUser.get('name'));
        setEmail(currentUser.get('email'));
        setPhone(currentUser.get('phone'));
        setGender(currentUser.get('gender'));
        setNationality(currentUser.get('nationality'));
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = () => {
    setIsModalVisible(true); // Mostrar o modal para confirmar a senha
  };

  const handleConfirmPassword = async () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      try {
        // Verifique a senha fornecida usando a função logIn
        const user = await Parse.User.logIn(currentUser.get('username'), password);
        
        if (user) {
          // Atualize as informações se a senha estiver correta
          currentUser.set('name', name);
          currentUser.set('email', email);
          currentUser.set('phone', phone);
          currentUser.set('gender', gender);
          currentUser.set('nationality', nationality);
          await currentUser.save();

          Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Erro', 'Senha incorreta. Não foi possível atualizar as informações.');
      }
    }
    setIsModalVisible(false); // Fechar o modal
    setPassword(''); // Limpar a senha
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Alterar Informações</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nacionalidade:</Text>
        <TextInput
          style={styles.input}
          value={nationality}
          onChangeText={setNationality}
        />
      </View>
      <Button
        title="Salvar Alterações"
        onPress={handleSaveChanges}
        color={COLORS.primary}
      />

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
            <TouchableOpacity onPress={handleConfirmPassword} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    padding: 5,
    marginTop: 5,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
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
