import { View, Text, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../constantes/Color';
import Button from '../components/Button';
import Parse from '../Configuracoes/ParseConfig'; // Importe o Parse

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      await Parse.User.requestPasswordReset(email);
      Alert.alert('Sucesso', 'Um link de recuperação de senha foi enviado para o seu e-mail.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Email não encontrado', 'Erro ao enviar link de recuperação: ' );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
        <View style={{ marginBottom: 22 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
            Recuperar Senha
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Por favor, insira seu endereço de email para receber um link de recuperação de senha.
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8, color: COLORS.black }}>
            Endereço de Email
          </Text>
          <View style={{ 
            width: "100%", 
            height: 48, 
            borderColor: COLORS.black, 
            borderWidth: 1, 
            borderRadius: 8, 
            justifyContent: "center", 
            paddingLeft: 22 
          }}>
            <TextInput
              placeholder='Coloque seu endereço de E-mail'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={{ width: "100%", color: COLORS.black }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <Button
          title="Enviar link de recuperação"
          onPress={handlePasswordReset}
          style={{
            marginTop: 18,
            marginBottom: 4,
            backgroundColor: 'transparent',
            borderColor: COLORS.primary,
          }}
          textStyle={{
            color: COLORS.black
          }}
          filled={true}
        />

        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Lembrou a senha?</Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RecuperarSenha;
