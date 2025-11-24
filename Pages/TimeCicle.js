import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonPrimary from 'components/ButtonPrimary';

import { criarDadosMenstruais, formatarDataParaBackend } from 'Services/dadosMenstruaisService';
import { converterBirthdayParaDate, converterDaysParaEnum, converterMethodParaEnum } from 'Services/converters';

export default function TimeCicle({ navigation, route }) {
  const { birthday, method, daysWithoutPause, startDate, lastMenstruationDate } = route.params;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [currentIndex, setCurrentIndex] = useState(6);
  const [loading, setLoading] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : days.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < days.length - 1 ? prev + 1 : 0));
  };

  const currentDay = days[currentIndex];

  const handleSubmit = async () => {
    setLoading(true);

    try {
      console.log('📦 Dados recebidos:', { 
        birthday, 
        method, 
        daysWithoutPause, 
        startDate, 
        lastMenstruationDate,
        currentDay 
      });

      // Converte birthday { day, month, year } para Date
      const dataNascimento = converterBirthdayParaDate(birthday);
      
      // Converte o método para o enum do backend
      const metodoEnum = converterMethodParaEnum(method);
      
      // Converte as datas que vieram como string "YYYY-MM-DD" para Date
      const dataInicioPilulaDate = startDate ? new Date(startDate) : null;
      const dataUltimaMenstruacaoDate = new Date(lastMenstruationDate);

      // ⚡ CORREÇÃO: Calcular dataInicioCiclo e dataFimCiclo
      const dataInicioCiclo = new Date(dataUltimaMenstruacaoDate);
      
      const dataFimCiclo = new Date(dataUltimaMenstruacaoDate);
      dataFimCiclo.setDate(dataFimCiclo.getDate() + currentDay);

      // Monta o payload
      const payload = {
        dataNascimento: formatarDataParaBackend(dataNascimento),
        dataUltimaMenstruacao: formatarDataParaBackend(dataUltimaMenstruacaoDate),
        duracaoCicloEmDias: currentDay,
        usaMetodoContraceptivo: metodoEnum !== 'NENHUM',
        metodoContraceptivo: metodoEnum,
        dataInicioCiclo: formatarDataParaBackend(dataInicioCiclo), // ✅ Agora com valor
        dataFimCiclo: formatarDataParaBackend(dataFimCiclo),       // ✅ Agora com valor
      };

      // Se usa pílula, adiciona dados específicos
      if (metodoEnum === 'PILULA') {
        payload.intervaloPilula = converterDaysParaEnum(daysWithoutPause);
        payload.dataInicioPilula = formatarDataParaBackend(dataInicioPilulaDate);
      } else {
        payload.intervaloPilula = null;
        payload.dataInicioPilula = null;
      }

      console.log('📤 Payload final:', payload);

      // Envia para o backend
      const resultado = await criarDadosMenstruais(payload);

      console.log('✅ Dados salvos:', resultado);

      Alert.alert(
        'Sucesso!',
        'Seus dados foram salvos com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      console.error('❌ Erro ao salvar:', error);
      
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível salvar seus dados. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUNDHOME.png')}
      style={{ flex: 1 }}
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

        <View className="flex-row items-center justify-center mb-6 space-x-8">
          <TouchableOpacity onPress={handlePrev} className="mr-8" disabled={loading}>
            <FontAwesome name="chevron-left" size={24} color={loading ? '#999' : 'black'} />
          </TouchableOpacity>

          <Text className="text-center text-2xl font-semibold">
            {currentDay} dias 
          </Text>

          <TouchableOpacity onPress={handleNext} className="ml-8" disabled={loading}>
            <FontAwesome name="chevron-right" size={24} color={loading ? '#999' : 'black'} />
          </TouchableOpacity>
        </View>

        <View className="items-center mt-20 mb-40" />

        {loading ? (
          <View className="bg-blue-500 py-4 mx-2 rounded-lg items-center justify-center">
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
          <ButtonPrimary
            title="Próximo"
            onPress={handleSubmit}
          />
        )}
      </View>
    </ImageBackground>
  );
}