import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SocialLogin() {
  const handleLogin = async (provider) => {
    console.log(`Login com ${provider}`);
  };

  return (
    <View className="items-center px-6 py-8">
      <Text className="text-lg font-semibold mb-4">Logar com</Text>

     
      <View className="flex-row justify-between w-full max-w-[280px] mb-4">
  {/* Botão Google */}
  <TouchableOpacity
    onPress={() => handleLogin('Google')}
    className="bg-white border border-gray-300 rounded-lg flex-1 justify-center items-center mr-2 p-3"
  >
    <FontAwesome name="google" size={40} color="#DB4437" />
  </TouchableOpacity>

  {/* Botão Facebook */}
<TouchableOpacity
  onPress={() => handleLogin('Facebook')}
  className="  rounded-lg flex-1 justify-center items-center mr-2 p-4"
>
  <FontAwesome name="facebook" size={40} color="#1877F2" />
</TouchableOpacity>

  {/* Botão Apple */}
  <TouchableOpacity
    onPress={() => handleLogin('Apple')}
    className="bg-black rounded-lg flex-1 justify-center items-center p-3"
  >
    <FontAwesome name="apple" size={40} color="#000000" />
  </TouchableOpacity>
</View>

      {/* Termos de uso */}
      <Text className="text-xs text-center mt-4 text-gray-500">
        Ao se cadastrar ou logar, você reconhece e concorda com os{' '}
        <Text className="text-blue-500 underline">Termos de Uso</Text> e{' '}
        <Text className="text-blue-500 underline">Privacidade</Text> da Klook.
      </Text>
    </View>
  );
}
