import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculateProgress } from '../utils/missionUtils';

/**
 * Componente visual de exibição do progresso geral das missões.
 * Apresenta barra preenchida, porcentagem e mensagem de conquista quando 100% for atingido.
 */
export default function ProgressBar({ missions = [] }) {
  const { total, completed, pending, percentage, isAllCompleted } = calculateProgress(missions);

  return (
    <View style={styles.card}>
      {/* Cabeçalho do Card */}
      <View style={styles.headerRow}>
        <View style={styles.titleWithIcon}>
          <Ionicons name="flame" size={22} color="#EA580C" />
          <Text style={styles.titleText}>
            {completed} de {total} {total === 1 ? 'missão concluída' : 'missões concluídas'}
          </Text>
        </View>
        <View style={styles.percentBadge}>
          <Text style={styles.percentText}>{percentage}%</Text>
        </View>
      </View>

      {/* Trilha e Barra de Progresso */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: isAllCompleted ? '#10B981' : '#2563EB',
            },
          ]}
        />
      </View>

      {/* Indicadores numéricos resumidos */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{pending}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>{completed}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
      </View>

      {/* Banner de Celebração quando 100% for atingido */}
      {isAllCompleted && (
        <View style={styles.celebrationBanner}>
          <Ionicons name="trophy" size={24} color="#F59E0B" />
          <View style={styles.celebrationContent}>
            <Text style={styles.celebrationTitle}>MISSÃO CUMPRIDA!</Text>
            <Text style={styles.celebrationSubtitle}>
              Parabéns! Você completou todas as missões de hoje!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  percentBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  track: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  celebrationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  celebrationContent: {
    flex: 1,
  },
  celebrationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#92400E',
  },
  celebrationSubtitle: {
    fontSize: 12,
    color: '#B45309',
    marginTop: 2,
  },
});