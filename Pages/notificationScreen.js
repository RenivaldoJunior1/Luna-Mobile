import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import BottomNav from "../components/BottomNav";

export default function notification({ navigation }) {
  const sections = [
    {
      title: "Conheça seu ciclo",
      cards: [
        {
          title: "Cólica e Desconforto: descubra formas de aliviar a dor",
          image: require("../assets/notificacao1.png")
        },
        {
          title: "Evite vazamentos na menstruação",
          image: require("../assets/notificacao1.png")
        },
      ],
    },
    {
      title: "Nosso guia sobre o fluxo",
      cards: [
        {
          title: "Seu ciclo: Leve, médio ou intenso?",
          image: require("../assets/notificacao1.png")
        },
        {
          title: "Guia de produtos menstruais",
          image: require("../assets/notificacao1.png")
        },
      ],
    },
    {
      title: "Sexo",
      cards: [
        {
          title: "Desejo e Libido: entenda como o ciclo influencia sua atração",
          image: require("../assets/notificacao1.png")
        },
        {
          title: "Escolha seu primeiro brinquedo sexual",
          image: require("../assets/notificacao1.png")
        },
      ],
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {sections.map((section, index) => (
          <View key={index} className="mb-6">
            <Text className="text-xl ml-4 font-bold mb-4">{section.title}</Text>
            <View className="flex-row flex-wrap justify-between">
              {section.cards.map((card, i) => (
                <TouchableOpacity
                  key={i}
                  className={`w-[48%] mb-4 p-4 rounded-lg ${card.bg}`}
                >
                  <Image
                    source={card.image}
                    className="w-full h-34 mb-2 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-sm font-semibold">{card.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer fixo */}
      <BottomNav navigation={navigation} />
    </ImageBackground>
  );
}
