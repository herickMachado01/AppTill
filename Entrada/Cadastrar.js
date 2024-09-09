

import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../constantes/Color';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import Parse from '../Configuracoes/ParseConfig';

const Cadastrar = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ddd, setDdd] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D+/g, '');
    const regex = /^\d{11}$/;
    return regex.test(cleanedCPF);
  };

  const formatCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D+/g, '');
    return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCpfChange = (cpf) => {
    setCpf(formatCPF(cpf));
  };

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleRegister = async () => {
    setErrorMessage('');

    if (!name || !email || !phone || !ddd || !cpf || !password) {
      setErrorMessage('Todos os campos devem ser preenchidos');
      return;
    }

    if (!validateCPF(cpf)) {
      setErrorMessage('CPF inválido');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial');
      return;
    }

    try {
      await handleLogout();

      const emailQuery = new Parse.Query(Parse.User);
      emailQuery.equalTo('email', email);
      const existingEmailUser = await emailQuery.first();
      if (existingEmailUser) {
        setErrorMessage('Email já cadastrado');
        return;
      }

      const user = new Parse.User();
      user.set('username', email);
      user.set('email', email);
      user.set('password', password);
      user.set('name', name);
      user.set('phone', `${ddd}${phone}`);
      user.set('cpf', cpf.replace(/\D+/g, ''));

      await user.signUp();
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 209) {
        await handleLogout();
        handleRegister();
      } else {
        setErrorMessage('Erro ao cadastrar. Tente novamente.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 22 }}>
      <Image 
          source={require('../assets/logo3.png')} 
          style={{ width: 100, height: 100, alignSelf: 'center', marginTop:10 ,marginBottom:-10 }} 
        />
        
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Coloque seu Nome e Sobrenome</Text>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Coloque seu nome inteiro'
              placeholderTextColor={COLORS.black}
              keyboardType='default'
              style={{ width: "100%" }}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Endereço de Email</Text>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Coloque seu endereço de E-mail'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={{ width: "100%" }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Número do Telefone</Text>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='DDD'
              placeholderTextColor={COLORS.black}
              keyboardType='number-pad'
              style={{
                width: "20%",
                borderRightWidth: 1,
                borderRightColor: COLORS.grey,
                height: "100%"
              }}
              value={ddd}
              onChangeText={setDdd}
            />
            <TextInput
              placeholder='Digite seu número de telefone'
              placeholderTextColor={COLORS.black}
              keyboardType='phone-pad'
              style={{ width: "75%" }}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>CPF</Text>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Digite seu CPF (somente números)'
              placeholderTextColor={COLORS.black}
              keyboardType='number-pad'
              style={{ width: "100%" }}
              value={cpf}
              onChangeText={handleCpfChange}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Senha</Text>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Coloque sua senha'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: "100%" }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{ position: "absolute", right: 12 }}
            >
              {isPasswordShown ? (
                <Ionicons name='eye-off' size={24} color={COLORS.black} />
              ) : (
                <Ionicons name='eye' size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? <Text style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</Text> : null}

        <Button
          title="Cadastre-se"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            backgroundColor: 'transparent',
            borderColor: COLORS.primary,
          }}
          textStyle={{ color: COLORS.primary }}
          onPress={handleRegister}
        />

        <Text style={{ fontSize: 14, color: COLORS.black,marginBottom:-19,textAlign: 'center', marginTop: 20 }}>
          Ao criar a conta você concorda com os termos da 
        </Text>
        <Text style={{ fontSize: 14, color:"blue",  textAlign: 'center', marginTop: 20 }}>
           Troca Intersepossal De Favores.
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
          <Text style={{ fontSize: 14, color: COLORS.black }}>Já tem uma conta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{
              fontSize: 14,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Cadastrar;