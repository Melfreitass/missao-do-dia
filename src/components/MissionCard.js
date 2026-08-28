import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryById } from '../constants/categories';
import { formatMissionDate } from '../utils/missionUtils';

/**
 * Componente de Card para visualização e ações individuais de uma missão.
 * Suporta alternar status de conclusão, abrir edição e solicitar exclusão com confirmação.
 */
export default function MissionCard({
  mission,
  onToggleComplete,
  onEdit,
  onDelete,
  onShare,
}) {
  const category = getCategoryById(mission.categoria);
  const isCompleted = mission.concluida;

  /**
   * Confirmação antes de excluir utilizando o Alert nativo.
   */
  const handleConfirmDelete = () => {
    Alert.alert(
      'Excluir missão',
      `Tem certeza que deseja excluir "${mission.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(mission.id),
        },
      ]
    );
  };

  return (
    <View style={[styles.card, isCompleted && styles.cardCompleted]}>
      {/* Barra lateral colorida da categoria */}
      <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />

      <View style={styles.contentContainer}>
        {/* Cabeçalho do Card: Categoria e Data */}
        <View style={styles.topRow}>
          <View style={[styles.categoryBadge, { backgroundColor: category.bgColor }]}>
            <Ionicons name={category.icon} size={14} color={category.color} />
            <Text style={[styles.categoryText, { color: category.color }]}>
              {category.label}
            </Text>
          </View>

          {mission.createdAt ? (
            <Text style={styles.dateText}>{formatMissionDate(mission.createdAt)}</Text>
          ) : null}
        </View>

        {/* Título da Missão */}
        <Text
          style={[styles.title, isCompleted && styles.titleCompleted]}
          numberOfLines={2}
        >
          {mission.titulo}
        </Text>

        {/* Descrição opcional */}
        {mission.descricao ? (
          <Text
            style={[styles.description, isCompleted && styles.descriptionCompleted]}
            numberOfLines={3}
          >
            {mission.descricao}
          </Text>
        ) : null}

        {/* Linha Inferior com Status e Botões de Ação */}
        <View style={styles.actionsRow}>
          {/* Badge de Status */}
          <View
            style={[
              styles.statusBadge,
              isCompleted ? styles.statusBadgeCompleted : styles.statusBadgePending,
            ]}
          >
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
              size={14}
              color={isCompleted ? '#059669' : '#D97706'}
            />
            <Text
              style={[
                styles.statusText,
                isCompleted ? styles.statusTextCompleted : styles.statusTextPending,
              ]}
            >
              {isCompleted ? 'Concluída' : 'Pendente'}
            </Text>
          </View>

          {/* Grupo de Botões (Concluir, Compartilhar, Editar, Excluir) */}
          <View style={styles.buttonsGroup}>
            {/* Botão Concluir / Desmarcar */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.actionBtn,
                isCompleted ? styles.completedBtn : styles.completeBtn,
              ]}
              onPress={() => onToggleComplete(mission.id)}
            >
              <Ionicons
                name={isCompleted ? 'arrow-undo-outline' : 'checkmark-outline'}
                size={18}
                color={isCompleted ? '#4B5563' : '#10B981'}
              />
            </TouchableOpacity>

            {/* Botão Compartilhar Missão */}
            {onShare ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.actionBtn, styles.shareBtn]}
                onPress={() => onShare(mission)}
              >
                <Ionicons name="share-social-outline" size={17} color="#7C3AED" />
              </TouchableOpacity>
            ) : null}

            {/* Botão Editar */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() => onEdit(mission)}
            >
              <Ionicons name="pencil-outline" size={18} color="#2563EB" />
            </TouchableOpacity>

            {/* Botão Excluir */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={handleConfirmDelete}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  cardCompleted: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    opacity: 0.88,
  },
  categoryIndicator: {
    width: 6,
  },
  contentContainer: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  titleCompleted: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 10,
  },
  descriptionCompleted: {
    color: '#9CA3AF',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  statusBadgePending: {
    backgroundColor: '#FFFBEB',
  },
  statusBadgeCompleted: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextPending: {
    color: '#B45309',
  },
  statusTextCompleted: {
    color: '#047857',
  },
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBtn: {
    backgroundColor: '#ECFDF5',
  },
  completedBtn: {
    backgroundColor: '#F3F4F6',
  },
  shareBtn: {
    backgroundColor: '#F5F3FF',
  },
  editBtn: {
    backgroundColor: '#EFF6FF',
  },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
  },
});

// fim