import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonPrimary from 'components/ButtonPrimary';

export default function MethodsScreen({ navigation, route  }) {
  const { birthday } = route.params;
  const methods = [
    { name: 'Pílula Combinada', description: 'A pílula combinada contém os produtos químicos estrogênio e progesterona. Este é o tipo mais amplamente reconhecido de pílula hormonal para prevenção da concepção.' },
    { name: 'Pílula de Progesterona', description: 'Esta pílula contém apenas progesterona e é indicada para mulheres que não podem tomar estrogênio.' },
    { name: 'DIU de cobre', description: 'O Dispositivo Intrauterino é colocado no útero e previne a gravidez por vários anos.' },
    { name: 'Injeção', description: 'A injeção contraceptiva é uma injeção de hormônios que previne a gravidez por um período de tempo.' },
    { name: 'Adesivo Cutâneo', description: 'O adesivo contraceptivo é um pequeno adesivo que libera hormônios através da pele para prevenir a gravidez.' },
    { name: 'Implante subdérmico (Implanon)' },
    { name: 'Anel Vaginal', description: 'O anel vaginal é um anel flexível que libera hormônios para prevenir a gravidez.' },
    { name: 'implante subdérmico (Implanon)' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUp = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : methods.length - 1));
  };

  const handleDown = () => {
    setCurrentIndex((prev) => (prev < methods.length - 1 ? prev + 1 : 0));
  };

  const currentMethod = methods[currentIndex];

  return (
    <ImageBackground
  source={require('../assets/BackGround/BACKGROUNDHOME.png')}
  style={{ flex: 1 }}
  resizeMode="cover"
  imageStyle={{ alignSelf: 'flex-start' }}
>
  {/* Container principal com título e seletor */}
  <View className="flex-1 justify-center px-4 mt-20">

    {/* Título e descrição */}
    <View className="items-center mb-10">
      <Text className="text-center text-4xl font-bold mb-4">
        Você usa métodos contraceptivos?
      </Text>
      <Text className="text-center text-gray-500">
        Escolha a melhor opção que se encaixa com o método que você utiliza atualmente
      </Text>
    </View>

    {/* Seletor de métodos */}
    <View className="flex-col items-center mb-6 space-y-4">
      <TouchableOpacity onPress={handleUp} className="mb-4">
        <FontAwesome name="chevron-up" size={28} color="black" />
      </TouchableOpacity>

      <Text className="text-center text-2xl font-semibold">
        {currentMethod.name}
      </Text>

      <TouchableOpacity onPress={handleDown} className="mt-4">
        <FontAwesome name="chevron-down" size={28} color="black" />
      </TouchableOpacity>

      {currentMethod.description && (
        <Text className="text-center text-black px-4 mt-6">
          {currentMethod.description}
        </Text>
      )}
    </View>
     <View className="mt-10">
           <ButtonPrimary title="Proximo" className="w-full" onPress={() => navigation.navigate('Days', { 
    birthday, 
    method: currentMethod.name 
  })}  />
         </View>
  </View>

 

</ImageBackground>

  );
}
