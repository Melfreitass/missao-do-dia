import { Share, Alert } from 'react-native';
import { getCategoryById } from './constants/categories';
import { calculateProgress } from './missionUtils';

/**
 * Monta o texto formatado para o compartilhamento de UMA missão específica.
 * @param {object} mission - Objeto da missão selecionada
 * @returns {string} Mensagem formatada
 */
export function generateSingleMissionShareText(mission) {
  if (!mission) return '';

  const category = getCategoryById(mission.categoria);
  const status = mission.concluida ? 'Concluída' : 'Em andamento';

  let text = 'MISSÃO DO DIA\n\n';
  text += `Missão: ${mission.titulo}\n`;
  text += `Categoria: ${category.label}\n`;

  if (mission.descricao) {
    text += `Descrição: ${mission.descricao}\n`;
  }

  text += `Status: ${status}\n\n`;
  text += 'Desafio lançado! Qual será a sua missão hoje?';

  return text;
}

/**
 * Dispara o compartilhamento nativo para a missão escolhida pelo usuário.
 * @param {object} mission - Missão a compartilhar
 * @returns {Promise<void>}
 */
export async function shareMission(mission) {
  if (!mission) return;

  try {
    const message = generateSingleMissionShareText(mission);

    await Share.share({
      title: `Missão do Dia: ${mission.titulo}`,
      message: message,
    });
  } catch (error) {
    console.error('Erro ao compartilhar missão:', error);
    Alert.alert('Ops!', 'Não foi possível compartilhar a missão.');
  }
}

/**
 * Monta o texto formatado com o resumo geral.
 */
export function generateShareText(missions = []) {
  if (missions.length === 0) {
    return 'Missão do Dia: Nenhuma missão cadastrada ainda.';
  }

  const { total, completed } = calculateProgress(missions);

  const missionLines = missions
    .map((m) => {
      const statusText = m.concluida ? '[Concluída]' : '[Pendente]';

      return `${statusText} ${m.titulo}`;
    })
    .join('\n');

  return `MEU PROGRESSO — MISSÃO DO DIA

${completed} de ${total} missões concluídas!

${missionLines}

Desafio lançado! Qual será a sua missão hoje?`;
}

/**
 * Dispara o diálogo nativo com o progresso geral.
 */
export async function shareProgress(missions = []) {
  if (missions.length === 0) {
    Alert.alert(
      'Nenhuma missão',
      'Cadastre ao menos uma missão antes de compartilhar seu progresso!'
    );
    return;
  }

  try {
    const message = generateShareText(missions);

    await Share.share({
      title: 'Meu Progresso - Missão do Dia',
      message: message,
    });
  } catch (error) {
    console.error('Erro ao compartilhar progresso:', error);
    Alert.alert(
      'Ops!',
      'Não foi possível abrir o compartilhamento.'
    );
  }
}