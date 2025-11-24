import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from "../components/BottomNav";
import { calcularFasesCiclo, gerarMarkedDates, calcularInfoCiclo } from "../Services/cicloCalculator";

const API_URL = 'http://10.0.0.183:8080/ciclos';

export default function CalendarioScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [fasesCiclo, setFasesCiclo] = useState(null);
  const [infoCiclo, setInfoCiclo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados do ciclo ao carregar a tela
  useEffect(() => {
    carregarDadosCiclo();
  }, []);

  const carregarDadosCiclo = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@lunna:token');

      if (!token) {
        console.log('❌ Token não encontrado');
        return;
      }

      console.log('🔍 Buscando dados do ciclo...');

      const response = await fetch(`${API_URL}/listar`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do ciclo');
      }

      const dados = await response.json();
      console.log('📊 Dados recebidos:', dados);

      if (dados && dados.length > 0) {
        // Pega o ciclo mais recente
        const cicloAtual = dados[dados.length - 1];
        
        console.log('📊 Ciclo atual selecionado:', cicloAtual);
        
        // Calcula as fases do ciclo
        const fases = calcularFasesCiclo(cicloAtual);
        console.log('🔄 Fases calculadas:', JSON.stringify(fases, null, 2));
        
        setFasesCiclo(fases);
        
        // Calcula informações adicionais
        const info = calcularInfoCiclo(fases);
        console.log('ℹ️ Info calculada:', JSON.stringify(info, null, 2));
        
        setInfoCiclo(info);
        
        // Gera e loga os marked dates
        const marked = gerarMarkedDates(fases, '');
        console.log('📅 Marked dates gerados:', JSON.stringify(marked, null, 2));
        console.log('📅 Total de datas marcadas:', Object.keys(marked).length);
        console.log('📅 Datas com pontos:', Object.keys(marked).filter(k => marked[k].marked));
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados do ciclo:', error);
    } finally {
      setLoading(false);
    }
  };

  const legendas = [
    { cor: "#ef4444", texto: "Seu período" },
    { cor: "#fda4af", texto: "Próxima menstruação" },
    { cor: "#a78bfa", texto: "Ovulação"},
    { cor: "#bef264", texto: "Período fértil"},
  ];

  if (loading) {
    return (
      <ImageBackground
        source={require("../assets/BackGround/BackHome.png")}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        resizeMode="cover"
      >
        <ActivityIndicator size="large" color="#fb923c" />
        <Text style={{ marginTop: 16, color: '#111827', fontSize: 16 }}>
          Carregando calendário...
        </Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={{ paddingTop: 120, paddingHorizontal: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="calendar-outline" size={24} color="#111827" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#111827",
              marginLeft: 8,
            }}
          >
            Calendário
          </Text>
        </View>

        {/* Informações do Ciclo */}
        {infoCiclo && (
          <View style={{ 
            marginTop: 16, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 16,
            borderRadius: 12,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                  Próxima menstruação em:
                </Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
                  {infoCiclo.diasAteProxima} dias
                </Text>
              </View>
              <View style={{ 
                backgroundColor: '#f3f4f6', 
                padding: 12, 
                borderRadius: 10 
              }}>
                <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
                  Ciclo
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827', textAlign: 'center' }}>
                  {infoCiclo.duracaoCiclo} dias
                </Text>
              </View>
            </View>
            
            {infoCiclo.emMenstruacao && (
              <View style={{ 
                marginTop: 12, 
                backgroundColor: '#fee2e2', 
                padding: 10, 
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#ef4444',
              }}>
                <Text style={{ fontSize: 13, color: '#991b1b', fontWeight: '600' }}>
                  🩸 Você está no seu período
                </Text>
              </View>
            )}
            
            {infoCiclo.diaOvulacao && (
              <View style={{ 
                marginTop: 12, 
                backgroundColor: '#ddd6fe', 
                padding: 10, 
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#8b5cf6',
              }}>
                <Text style={{ fontSize: 13, color: '#5b21b6', fontWeight: '600' }}>
                  🥚 Hoje é o dia da ovulação!
                </Text>
              </View>
            )}
            
            {infoCiclo.emPeriodoFertil && !infoCiclo.diaOvulacao && (
              <View style={{ 
                marginTop: 12, 
                backgroundColor: '#d9f99d', 
                padding: 10, 
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#84cc16',
              }}>
                <Text style={{ fontSize: 13, color: '#365314', fontWeight: '600' }}>
                  🌟 Você está no período fértil
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* Calendário */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 20,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
              overflow: "hidden",
            }}
          >
            <Calendar
              current={selectedDate || new Date().toISOString().split('T')[0]}
              markedDates={gerarMarkedDates(fasesCiclo, selectedDate)}
              markingType="period"
              onDayPress={(day) => setSelectedDate(day.dateString)}
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",
                textSectionTitleColor: "#6b7280",
                todayTextColor: "#fb923c",
                dayTextColor: "#111827",
                textDisabledColor: "#d1d5db",
                arrowColor: "#111827",
                monthTextColor: "#111827",
                textDayFontWeight: "600",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 12,
              }}
              renderArrow={(direction) => (
                <Ionicons
                  name={direction === "left" ? "chevron-back" : "chevron-forward"}
                  size={24}
                  color="#111827"
                />
              )}
              style={{ borderRadius: 20, paddingBottom: 10 }}
            />
          </View>
        </View>

        {/* Legendas */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 }}>
            Legenda do Calendário
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {legendas.map((legenda, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 16,
                  marginBottom: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: legenda.cor,
                    marginRight: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>{legenda.icon}</Text>
                </View>
                <Text style={{ fontSize: 13, color: "#1f2937", fontWeight: "600" }}>
                  {legenda.texto}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Info sobre ovulação - DESTAQUE ESPECIAL */}
          {/* {fasesCiclo && (
            <View style={{
              marginTop: 16,
              backgroundColor: '#a78bfa',
              padding: 14,
              borderRadius: 12,
              shadowColor: '#8b5cf6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, marginRight: 10 }}>🥚</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '700', marginBottom: 2 }}>
                    Dia da Ovulação
                  </Text>
                  <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: '600' }}>
                    {new Date(fasesCiclo.diaOvulacao).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 11, color: '#f3e8ff', marginTop: 8, fontStyle: 'italic' }}>
                💜 O dia aparece em ROXO no calendário acima
              </Text>
            </View>
          )} */}
        </View>

        {/* Botão para recarregar */}
        {/* <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={carregarDadosCiclo}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 16,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={20} color="#fb923c" />
            <Text style={{ marginLeft: 8, color: '#fb923c', fontWeight: '600' }}>
              Atualizar Calendário
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* Botão flutuante */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 100,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#fb923c",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="pencil" size={24} color="#ffffff" />
      </TouchableOpacity>

      <BottomNav navigation={navigation} />
    </ImageBackground>
  );
}