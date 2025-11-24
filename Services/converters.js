/**
 * Converte o objeto birthday { day, month, year } para Date
 * @param {Object} birthday - { day: 13, month: 'julho', year: 2003 }
 * @returns {Date}
 */
export function converterBirthdayParaDate(birthday) {
  const meses = {
    'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3,
    'maio': 4, 'junho': 5, 'julho': 6, 'agosto': 7,
    'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
  };

  const { day, month, year } = birthday;
  const monthIndex = meses[month.toLowerCase()];

  return new Date(year, monthIndex, day);
}

/**
 * Converte o nome do método contraceptivo para o enum do backend
 * @param {string} methodName - Ex: "Pílula Combinada", "DIU de cobre"
 * @returns {string} - Enum do backend: "PILULA", "DIU", etc
 */
export function converterMethodParaEnum(methodName) {
  const mapping = {
    'Pílula Combinada': 'PILULA',
    'Pílula de Progesterona': 'PILULA',
    'DIU de cobre': 'DIU',
    'Injeção': 'INJECAO',
    'Adesivo Cutâneo': 'ADESIVO',
    'Anel Vaginal': 'ANEL',
    'Implante subdérmico (Implanon)': 'IMPLANTE',
    'implante subdérmico (Implanon)': 'IMPLANTE',
    'Nenhum': 'NENHUM',
  };

  return mapping[methodName] || 'NENHUM';
}

/**
 * Converte número de dias sem pausa para o enum IntervaloPilula do backend
 * @param {number} days - Número de dias sem pausa
 * @returns {string} - "VINTE_UM_POR_SETE", "VINTE_QUATRO_POR_QUATRO", "CONTINUA"
 */
export function converterDaysParaEnum(days) {
  // Mapeia os dias para os enums corretos do backend
  switch (days) {
    case 7:
      return 'VINTE_UM_POR_SETE';  // 21 dias de pílula + 7 de pausa
    case 4:
      return 'VINTE_QUATRO_POR_QUATRO';  // 24 dias de pílula + 4 de pausa
    case 0:
      return 'CONTINUA';  // Uso contínuo (sem pausa)
    default:
      // Se for outro valor, tenta mapear baseado na lógica
      if (days >= 7) {
        return 'VINTE_UM_POR_SETE';
      } else if (days >= 4) {
        return 'VINTE_QUATRO_POR_QUATRO';
      } else {
        return 'CONTINUA';
      }
  }
}