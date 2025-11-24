import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function NotificacoesScreen({ navigation }) {
  const notificacoesHoje = [
    {
      id: 1,
      icone: "🩸",
      iconeBg: "#fecaca",
      titulo: "Sua menstruação está atrasada...",
      descricao: "Tente entender o porque sua menstruação está atrasada...",
      tempo: "2h atrás",
    },
    {
      id: 2,
      icone: "💊",
      iconeBg: "#ddd6fe",
      titulo: "Já tomou sua pílula?",
      descricao: "Entenda o que acontece se não tomar sua pílula...",
      tempo: "4h atrás",
    },
  ];

  const notificacoesOntem = [
    {
      id: 3,
      icone: "😊",
      iconeBg: "#e0e7ff",
      titulo: "Mudanças de humor?",
      descricao: "As mudanças de humor podem ser várias causas, entenda...",
      tempo: "Ontem",
    },
    {
      id: 4,
      icone: "🩸",
      iconeBg: "#fecaca",
      titulo: "Sua menstruação está atrasada...",
      descricao: "Tente entender o porque sua menstruação está atrasada...",
      tempo: "Ontem",
    },
  ];

  const renderNotificacao = (notif) => (
    <TouchableOpacity
      key={notif.id}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
      activeOpacity={0.7}
    >
      {/* Ícone */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: notif.iconeBg,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Text style={{ fontSize: 24 }}>{notif.icone}</Text>
      </View>

      {/* Conteúdo */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 4,
          }}
        >
          {notif.titulo}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#6b7280",
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {notif.descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Overlay semitransparente opcional */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingTop: 100, paddingHorizontal: 20, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="notifications" size={24} color="#111827" />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#111827",
                marginLeft: 8,
              }}
            >
              Notificações
            </Text>
          </View>
        </View>

        {/* Conteúdo */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Seção Hoje */}
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Hoje
            </Text>
            {notificacoesHoje.map((notif) => renderNotificacao(notif))}
          </View>

          {/* Seção Ontem */}
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Ontem
            </Text>
            {notificacoesOntem.map((notif) => renderNotificacao(notif))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav navigation={navigation} />
      </View>
    </ImageBackground>
  );
}
