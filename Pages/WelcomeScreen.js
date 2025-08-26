import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonPrimary from "../components/ButtonPrimary";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUND.png')} 
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ alignSelf: 'flex-start' }} 
    >
      <SafeAreaView edges={['bottom']} style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View className="px-6 pt-8 pb-10">
          <Text className="text-5xl font-bold text-black mb-3">Seja bem vinda!</Text>

          <Text className="text-base text-gray-600 mb-6">
            Aqui você pode acompanhar seu ciclo menstrual com facilidade e cuidar ainda melhor da sua saúde.
          </Text>

          <ButtonPrimary title="Confirmar" onPress={() => navigation.navigate('Login')} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
