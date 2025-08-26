import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import ButtonPrimary from 'components/ButtonPrimary';

export default function StartPilulaScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/BackGround/BACKGROUNDHOME.png")}
      style={{
        flex: 1,
        justifyContent: "center"
      }}
      resizeMode="cover"
      imageStyle={{ alignSelf: "flex-start" }}
    >
      <View className="flex-1 justify-center px-4 mt-20">
        {/* Título */}
        <View className="items-center mb-5">
                      <Text className="text-center text-4xl font-bold mb-4">
                        Quando você iniciou sua pílula contínua? 
                      </Text>
                      <Text className="text-center text-gray-500">
                        Isso nos ajuda a entender seu ciclo melhor
                      </Text>
                    </View>

        {/* Calendário */}
        <Calendar
          className="self-stretch "
          theme={{
            todayTextColor: "#FE9C6B",
            selectedDayBackgroundColor: "#FE9C6B",
            arrowColor: "#FE9C6B",
          }}
          onDayPress={(day) => console.log("Dia selecionado", day)}
        />

        
        <View className="items-center mt-10">

        </View>
        <ButtonPrimary
            title="Confirmar"
            onPress={() => navigation.navigate('LastMenstruacao')}
                />
      </View>
      
    </ImageBackground>
  );
}
