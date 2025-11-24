import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import ButtonPrimary from 'components/ButtonPrimary';

export default function LastMenstruacaoScreen({ navigation, route}) {
   const { birthday, method, daysWithoutPause, startDate } = route.params;
   const [lastMenstruationDate, setLastMenstruationDate] = useState(null);
  return (
    <ImageBackground
      source={require("../assets/BackGround/BACKGROUNDHOME.png")}
      style={{
        flex: 1,
      }}
      resizeMode="cover"
      imageStyle={{ alignSelf: "flex-start" }}
    >
      <View className="flex-1 justify-center px-4 mt-20">
        {/* Título */}
        <View className="items-center mb-5">
          <Text className="text-center text-4xl font-bold mb-4">
            Quando foi a última vez que você menstruou? 
          </Text>
          <Text className="text-center text-gray-500">
              Isso nos ajuda a entender seu ciclo melhor
          </Text>
        </View>
        {/* Calendário ocupando toda a largura */}
        <Calendar
  className="self-stretch"
  theme={{
    todayTextColor: "#FE9C6B",
    selectedDayBackgroundColor: "#FE9C6B",
    arrowColor: "#FE9C6B",
  }}
  onDayPress={(day) => setLastMenstruationDate(day.dateString)} // YYYY-MM-DD
  markedDates={lastMenstruationDate ? { [lastMenstruationDate]: { selected: true, selectedColor: "#FE9C6B" } } : {}}
/>
        <View className="items-center mt-10">

        </View>
        {/* Botão de confirmação */}
        <ButtonPrimary
  title="Proximo"
  onPress={() => {
    if (!lastMenstruationDate) {
      alert("Selecione a data da última menstruação.");
      return;
    }
    navigation.navigate('TimeCiclo', {
      birthday,
      method,
      daysWithoutPause,
      startDate,
      lastMenstruationDate
    });
  }}
/>
      </View>
    </ImageBackground>
  );
}
