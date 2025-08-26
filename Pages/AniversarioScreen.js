import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonPrimary from "../components/ButtonPrimary";

export default function BirthdayPicker({ navigation }) {
  const [day, setDay] = useState(13);
  const [month, setMonth] = useState('julho');
  const [year, setYear] = useState(2003);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 1900 + i);

  const increment = (setter, value, list) => {
    const index = list.indexOf(value);
    setter(list[(index + 1) % list.length]);
  };

  const decrement = (setter, value, list) => {
    const index = list.indexOf(value);
    setter(list[(index - 1 + list.length) % list.length]);
  };

  return (
    <ImageBackground
  source={require('../assets/BackGround/BACKGROUNDHOME.png')}
  style={{ flex: 1 }}
  resizeMode="cover"
  imageStyle={{ alignSelf: 'flex-start' }}
>
  <View className="flex-1 justify-center px-4 mt-20">
    {/* Textos centralizados */}
    <View className="items-center mb-6">
      <Text className="text-4xl font-bold mb-2">Quando você nasceu?</Text>
      <Text className="text-center text-gray-500">
        Como os ciclos podem mudar com o tempo, isso nos ajuda a customizar o aplicativo para você
      </Text>
    </View>

    {/* Seletor Dia/Mês/Ano */}
    <View className="flex-row justify-center mt-20 space-x-4 w-full">
      {/* Colunas Dia, Mês e Ano */}
      <View className="flex-1 items-center">
        <TouchableOpacity onPress={() => increment(setDay, day, days)}>
          <FontAwesome name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg my-2">{day}</Text>
        <TouchableOpacity onPress={() => decrement(setDay, day, days)}>
          <FontAwesome name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center">
        <TouchableOpacity onPress={() => increment(setMonth, month, months)}>
          <FontAwesome name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg my-2">{month}</Text>
        <TouchableOpacity onPress={() => decrement(setMonth, month, months)}>
          <FontAwesome name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center">
        <TouchableOpacity onPress={() => increment(setYear, year, years)}>
          <FontAwesome name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg my-2">{year}</Text>
        <TouchableOpacity onPress={() => decrement(setYear, year, years)}>
          <FontAwesome name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>

    
    <View className="mt-60">
      <ButtonPrimary title="Proximo" className="w-full" onPress={() => navigation.navigate('AcScreen')} />
    </View>
  </View>
</ImageBackground>

  );
}
