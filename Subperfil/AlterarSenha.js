import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import Parse from '../Configuracoes/ParseConfig';
import COLORS from '../constantes/Color';
import { Ionicons } from '@expo/vector-icons';

export default function AlterarSenha({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem.');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 8 caracteres, um caractere especial e uma letra maiúscula.');
      return;
    }

    try {
      const currentUser = Parse.User.current();
      await Parse.User.logIn(currentUser.get('username'), currentPassword);
      currentUser.setPassword(newPassword);
      await currentUser.save();
      Alert.alert('Sucesso', 'Senha alterada com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Senha Atual errada');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Alterar Senha</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha Atual:</Text>
        <TextInput
          placeholder='Digite sua senha atual'
          placeholderTextColor={COLORS.black}
          secureTextEntry={!isPasswordShown}
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nova Senha:</Text>
        <TextInput
          placeholder='Digite sua nova senha'
          placeholderTextColor={COLORS.black}
          secureTextEntry={!isPasswordShown}
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.eyeIcon}
        >
          {isPasswordShown ? (
            <Ionicons name='eye-off' size={24} color={COLORS.black} />
          ) : (
            <Ionicons name='eye' size={24} color={COLORS.black} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Nova Senha:</Text>
        <TextInput
          placeholder='Confirme sua nova senha'
          placeholderTextColor={COLORS.black}
          secureTextEntry={!isPasswordShown}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={styles.eyeIcon}
        >
          {isPasswordShown ? (
            <Ionicons name='eye-off' size={24} color={COLORS.black} />
          ) : (
            <Ionicons name='eye' size={24} color={COLORS.black} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Alterar Senha" onPress={handleChangePassword} color={COLORS.primary} />
      </View>
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
    marginTop:30
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
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
    paddingRight: 50, // adiciona espaço para o ícone do olho
    marginBottom: 15,
    color: COLORS.black,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 35, // ajuste conforme necessário para centralizar verticalmente o ícone
  },
  buttonContainer: {
    marginTop: 20,
  },
});
