import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonPrimary from 'components/ButtonPrimary';

export default function DaysScreen({ navigation }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUp = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : days.length - 1));
  };

  const handleDown = () => {
    setCurrentIndex((prev) => (prev < days.length - 1 ? prev + 1 : 0));
  };

  const currentDay = days[currentIndex];

  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUNDHOME.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}
      resizeMode="cover"
      imageStyle={{ alignSelf: 'flex-start' }}
    >
      <View className="flex-1 justify-center px-4 mt-20">
        <View className="items-center mb-10">
              <Text className="text-center text-4xl font-bold mb-4">
                Você usa métodos contraceptivos?
              </Text>
              <Text className="text-center text-gray-500">
                Escolha a melhor opção que se encaixa com o método que você utiliza atualmente
              </Text>
            </View>

        {/* Setas para navegar entre os dias */}
        <View className="flex-col items-center mb-6 space-y-4">
          <TouchableOpacity onPress={handleUp} className="mb-6">
            <FontAwesome name="chevron-up" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-center text-2xl font-semibold">
            {currentDay} dias sem pausa
          </Text>

          <TouchableOpacity onPress={handleDown} className="mt-6 mb-20">
            <FontAwesome name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ButtonPrimary 
          title="Proximo"
          onPress={() => navigation.navigate('StartPilula')}
        />
      </View>
    </ImageBackground>
  );
}
