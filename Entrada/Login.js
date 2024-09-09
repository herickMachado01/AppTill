import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../constantes/Color';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import Parse from '../Configuracoes/ParseConfig'; // Import Parse configuration

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await Parse.User.logIn(email, password);
      navigation.navigate('Navegacao');
    } catch (error) {
      setError('Email ou senha incorretos.'); // Set error message based on the caught error
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/logo3.png')} style={styles.logo} />

        <View style={styles.greetingContainer}>
          <Text style={styles.headerText}>Bem vindo Novamente!</Text>
          <Text style={styles.subHeaderText}>Olá de novo, sentimos falta de você!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Endereço de Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Coloque seu endereço de E-mail'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Coloque sua senha'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
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
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate("RecuperarSenha")}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a Senha?</Text>
        </TouchableOpacity>

        <Button
          title="Login"
          filled
          style={styles.loginButton}
          textStyle={{ color: COLORS.primary }}
          onPress={handleLogin}
        />

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}></Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>Não tem uma conta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cadastre-se")}
          >
            <Text style={styles.signupText}>Inscreva-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    
   
  },

  greetingContainer: {
    marginVertical: 22,
  },
  headerText: {
    marginTop:-20,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
    textAlign: 'center',
   
    
  },
  subHeaderText: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputWrapper: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    position: 'relative',
  },
  textInput: {
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  forgotPasswordContainer: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 4,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 10,
  },
  separatorText: {
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  noAccountText: {
    fontSize: 16,
    color: COLORS.black,
  },
  signupText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
