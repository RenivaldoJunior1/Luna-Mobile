/**
 * Serviço para calcular as fases do ciclo menstrual
 */

/**
 * Adiciona dias a uma data
 */
function adicionarDias(data, dias) {
  const resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

/**
 * Formata data para string YYYY-MM-DD
 */
function formatarData(data) {
  const year = data.getFullYear();
  const month = String(data.getMonth() + 1).padStart(2, '0');
  const day = String(data.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Gera array de datas entre duas datas
 */
function gerarRangeDeDatas(dataInicio, dataFim) {
  const datas = [];
  let dataAtual = new Date(dataInicio);
  const fim = new Date(dataFim);
  
  while (dataAtual <= fim) {
    datas.push(formatarData(dataAtual));
    dataAtual = adicionarDias(dataAtual, 1);
  }
  
  return datas;
}

/**
 * Calcula todas as fases do ciclo menstrual
 * @param {Object} dadosMenstruais - Dados do backend { dataInicioCiclo, dataFimCiclo, duracaoCicloEmDias }
 * @returns {Object} - Objeto com todas as fases do ciclo
 */
export function calcularFasesCiclo(dadosMenstruais) {
  if (!dadosMenstruais || !dadosMenstruais.dataInicioCiclo) {
    console.log('❌ Dados menstruais inválidos:', dadosMenstruais);
    return null;
  }

  const { dataInicioCiclo, dataFimCiclo, duracaoCicloEmDias } = dadosMenstruais;
  
  // Calcula a duração real do ciclo
  let duracaoCiclo;
  
  if (dataFimCiclo && dataInicioCiclo) {
    // Se tiver dataFimCiclo, calcula a diferença em dias
    const inicio = new Date(dataInicioCiclo);
    const fim = new Date(dataFimCiclo);
    const diffTime = Math.abs(fim - inicio);
    duracaoCiclo = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('📊 Duração calculada pela diferença de datas:', duracaoCiclo, 'dias');
  } else {
    // Usa o valor informado ou padrão de 28 dias
    duracaoCiclo = duracaoCicloEmDias || 28;
    console.log('📊 Duração informada:', duracaoCiclo, 'dias');
  }
  
  console.log('📊 Calculando ciclo com:', { 
    dataInicioCiclo, 
    dataFimCiclo,
    duracaoCicloEmDias,
    duracaoFinal: duracaoCiclo 
  });
  
  const inicioMenstruacao = new Date(dataInicioCiclo);
  
  // 1. PERÍODO MENSTRUAL ATUAL (primeiros 5-7 dias)
  const duracaoMenstruacao = 5;
  const fimMenstruacao = adicionarDias(inicioMenstruacao, duracaoMenstruacao - 1);
  const periodoMenstrual = gerarRangeDeDatas(inicioMenstruacao, fimMenstruacao);
  
  console.log('🩸 Período menstrual:', periodoMenstrual);
  
  // 2. OVULAÇÃO (geralmente 14 dias antes do fim do ciclo)
  // Se ciclo é 28 dias, ovulação é no dia 14
  const diaOvulacao = adicionarDias(inicioMenstruacao, Math.floor(duracaoCiclo / 2));
  
  console.log('🥚 Dia da ovulação:', formatarData(diaOvulacao));
  
  // 3. PERÍODO FÉRTIL (3 dias antes da ovulação até 2 dias depois)
  const inicioPeriodoFertil = adicionarDias(diaOvulacao, -3);
  const fimPeriodoFertil = adicionarDias(diaOvulacao, 2);
  const periodoFertil = gerarRangeDeDatas(inicioPeriodoFertil, fimPeriodoFertil);
  
  console.log('🌟 Período fértil:', periodoFertil);
  
  // 4. PRÓXIMA MENSTRUAÇÃO (baseado na duração do ciclo)
  const inicioProximaMenstruacao = adicionarDias(inicioMenstruacao, duracaoCiclo);
  const fimProximaMenstruacao = adicionarDias(inicioProximaMenstruacao, duracaoMenstruacao - 1);
  const proximaMenstruacao = gerarRangeDeDatas(inicioProximaMenstruacao, fimProximaMenstruacao);
  
  console.log('📅 Próxima menstruação:', proximaMenstruacao);
  
  const resultado = {
    periodoMenstrual,
    diaOvulacao: formatarData(diaOvulacao),
    periodoFertil,
    proximaMenstruacao,
    duracaoCiclo,
    dataInicioCiclo: formatarData(inicioMenstruacao),
    proximoCicloInicio: formatarData(inicioProximaMenstruacao),
  };
  
  console.log('✅ Resultado completo:', resultado);
  
  return resultado;
}

/**
 * Gera os markedDates para o calendário
 * @param {Object} fasesCiclo - Resultado do calcularFasesCiclo
 * @param {string} selectedDate - Data selecionada pelo usuário
 * @returns {Object} - Objeto formatado para o react-native-calendars
 */
export function gerarMarkedDates(fasesCiclo, selectedDate = '') {
  if (!fasesCiclo) {
    return {};
  }

  const marks = {};

  // 1. PERÍODO MENSTRUAL ATUAL (vermelho escuro)
  fasesCiclo.periodoMenstrual.forEach((day, index) => {
    marks[day] = {
      startingDay: index === 0,
      endingDay: index === fasesCiclo.periodoMenstrual.length - 1,
      color: '#ef4444', // Vermelho mais escuro
      textColor: '#ffffff',
    };
  });
  console.log('✅ Marcado período menstrual:', fasesCiclo.periodoMenstrual.length, 'dias');

  // 2. PRÓXIMA MENSTRUAÇÃO (rosa claro)
  fasesCiclo.proximaMenstruacao.forEach((day, index) => {
    marks[day] = {
      startingDay: index === 0,
      endingDay: index === fasesCiclo.proximaMenstruacao.length - 1,
      color: '#fda4af', // Rosa claro
      textColor: '#881337',
    };
  });
  console.log('✅ Marcado próxima menstruação:', fasesCiclo.proximaMenstruacao.length, 'dias');

  // 3. PERÍODO FÉRTIL (verde claro) - ANTES DA OVULAÇÃO
  const diaOvulacao = new Date(fasesCiclo.diaOvulacao);
  const periodoFertilAntes = [];
  const periodoFertilDepois = [];
  
  fasesCiclo.periodoFertil.forEach((day) => {
    const dataDay = new Date(day);
    if (dataDay < diaOvulacao) {
      periodoFertilAntes.push(day);
    } else if (dataDay > diaOvulacao) {
      periodoFertilDepois.push(day);
    }
  });

  // Marca período fértil ANTES da ovulação
  periodoFertilAntes.forEach((day, index) => {
    marks[day] = {
      startingDay: index === 0,
      endingDay: false,
      color: '#bef264',
      textColor: '#365314',
    };
  });

  // Marca período fértil DEPOIS da ovulação
  periodoFertilDepois.forEach((day, index) => {
    marks[day] = {
      startingDay: false,
      endingDay: index === periodoFertilDepois.length - 1,
      color: '#bef264',
      textColor: '#365314',
    };
  });
  
  console.log('✅ Marcado período fértil:', fasesCiclo.periodoFertil.length, 'dias');

  // 4. DIA DA OVULAÇÃO (roxo completo - DESTAQUE)
  if (fasesCiclo.diaOvulacao) {
    marks[fasesCiclo.diaOvulacao] = {
      color: '#a78bfa', // Roxo médio mais visível
      textColor: '#ffffff', // Texto branco
      startingDay: false,
      endingDay: false,
      marked: true,
      dotColor: '#ffffff', // Ponto branco para contraste
    };
    
    console.log('✅ Marcado dia de ovulação:', fasesCiclo.diaOvulacao, marks[fasesCiclo.diaOvulacao]);
  }

  // 5. DIA SELECIONADO
  if (selectedDate && selectedDate !== '') {
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: '#fb923c', // Laranja para destaque
      selectedTextColor: '#ffffff',
    };
  }

  console.log('✅ Total de datas marcadas:', Object.keys(marks).length);

  return marks;
}

/**
 * Calcula informações do ciclo para exibição
 * @param {Object} fasesCiclo - Resultado do calcularFasesCiclo
 * @returns {Object} - Informações formatadas
 */
export function calcularInfoCiclo(fasesCiclo) {
  if (!fasesCiclo) {
    return null;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera as horas para comparação correta
  
  const proximaMenstruacao = new Date(fasesCiclo.proximoCicloInicio);
  proximaMenstruacao.setHours(0, 0, 0, 0);
  
  // Calcula dias até a próxima menstruação
  const diffTime = proximaMenstruacao - hoje;
  const diasAteProxima = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const hojeStr = formatarData(hoje);

  return {
    duracaoCiclo: fasesCiclo.duracaoCiclo,
    diasAteProxima: diasAteProxima > 0 ? diasAteProxima : 0,
    proximaMenstruacao: fasesCiclo.proximoCicloInicio,
    emPeriodoFertil: fasesCiclo.periodoFertil.includes(hojeStr),
    emMenstruacao: fasesCiclo.periodoMenstrual.includes(hojeStr),
    diaOvulacao: fasesCiclo.diaOvulacao === hojeStr,
  };
}