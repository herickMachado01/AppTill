import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constantes/Color';

const BemVindo = ({ navigation }) => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.container} >
      <Image
          source={require('../assets/logo2.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title1}>
            Bem vindo
          </Text>
          <Text style={styles.title}>
            ao TIFF
          </Text>
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>
              Trocas mais seguras do Brasil!!
            </Text>
            <Text style={styles.subText}>
              Desfrute das melhores Trocas
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Cadastre-se")}
          >
            <Text style={styles.buttonText}>Inscrever-se</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection:"row",
            marginTop:12,
            justifyContent:"center"
          }}>
            <Text style={{
              marginLeft: -20,
              fontSize:15,
              color: COLORS.white
            }}>
           já tem uma conta?
            </Text>
            <Pressable onPress={()=>navigation.navigate("Login")}>
              <Text style={{
                  fontSize:15,
                  color:COLORS.white,
                  fontWeight:"bold",
                  marginLeft:4
              }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'flex', 
    justifyContent: 'flex', 
    marginTop:-90
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop:90  
    
  },
  textContainer: {
    marginTop: 20,
    marginLeft: 20, 
  },
  title1: {
    marginTop:-20,
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 5,
  },
  title: {
    marginTop:-10,
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 5,
  },
  subTextContainer: {
    marginTop: 20,
    alignItems: 'flex-start', 
  },
  subText: {
    fontSize: 15,
    color: COLORS.white,
    marginVertical: 4,
    textAlign: 'left', 
  },
  button: {
    marginTop: 30,
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    alignItems:"center",
    justifyContent:"center",
    marginLeft:20
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default BemVindo;


