import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import { COLORS, animate1, animate2, circle1, circle2, icons } from "../Configuracoes";
import { carrinho, Home, chat, perfil, anunciar, Favorito } from "../TelasApp";


const Tab = createBottomTabNavigator();

const TabArr = [
  { route: "Home", label: "Home", icon: icons.home, component: Home },
  { route: "Mensagens", label: "Mensagens", icon: icons.conversa, component: chat },
  { route: "Anunciar", label: "Anunciar", icon: icons.mais, component: anunciar },
  { route: "Favorito", label: "Favorito", icon: icons.coracao, component: Favorito },
  { route: "Perfil", label: "Perfil", icon: icons.person, component: perfil}
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1, 300); 
      circleRef.current.animate(circle1, 300); 
      textRef.current.transitionTo({ scale: 1 }, 300); 
    } else {
      viewRef.current.animate(animate2, 300); 
      circleRef.current.animate(circle2, 300); 
      textRef.current.transitionTo({ scale: 0 }, 300); 
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderColor: focused ? '#FFBF00' : 'white',
            },
          ]}
        >
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Image
            resizeMode="contain"
            source={item.icon}
            style={{
              height: 24,
              width: 24,
              tintColor: COLORS.white,
            }}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const Barranavegacao = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Remover o cabeçalho para todas as telas
        tabBarStyle: {
          position: "absolute",
          height: 70,
          bottom: 24,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: '#000000',
          borderTopWidth: 1,
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Barranavegacao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: COLORS.white,
    marginTop: 6,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000000',
    borderRadius: 25,
  },
});
