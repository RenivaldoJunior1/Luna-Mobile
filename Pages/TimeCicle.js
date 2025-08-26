import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonPrimary from 'components/ButtonPrimary';

export default function TimeCicle({ navigation }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : days.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < days.length - 1 ? prev + 1 : 0));
  };

  const currentDay = days[currentIndex];

  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUNDHOME.png')}
      style={{
        flex: 1,
      }}
      resizeMode="cover"
      imageStyle={{ alignSelf: 'flex-start' }}
    >
      <View className="flex-1 justify-center px-4 mt-20">
        <View className="items-center mt-10 mb-40">
              <Text className="text-center text-4xl font-bold mb-4">
                Quanto tempo dura o seu ciclo?
              </Text>
              <Text className="text-center text-gray-500">
                21 a 35 dias é comum, mas todos é notável!
              </Text>
            </View>


        {/* Linha com seta esquerda, texto e seta direita */}
        <View className="flex-row items-center justify-center mb-6 space-x-8">
          <TouchableOpacity onPress={handlePrev} className="mr-8">
            <FontAwesome name="chevron-left" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-center text-2xl font-semibold">
            {currentDay} dias 
          </Text>

          <TouchableOpacity onPress={handleNext} className="ml-8">
            <FontAwesome name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
               <View className="items-center mt-20 mb-40">
        
                </View>
        <ButtonPrimary
          title="Proximo"
          onPress={() => navigation.navigate('StartPilula')}
        />
      </View>
    </ImageBackground>
  );
}
