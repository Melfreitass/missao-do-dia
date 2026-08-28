import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente de seleção de filtros de missões (Todas, Pendentes, Concluídas).
 */
export default function FilterButtons({
  selectedFilter,
  onSelectFilter,
  counts = { all: 0, pending: 0, completed: 0 },
}) {
  const filterOptions = [
    {
      id: 'ALL',
      label: 'Todas',
      icon: 'list-outline',
      count: counts.all,
    },
    {
      id: 'PENDING',
      label: 'Pendentes',
      icon: 'time-outline',
      count: counts.pending,
    },
    {
      id: 'COMPLETED',
      label: 'Concluídas',
      icon: 'checkmark-circle-outline',
      count: counts.completed,
    },
  ];

  return (
    <View style={styles.container}>
      {filterOptions.map((item) => {
        const isActive = selectedFilter === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={[styles.filterButton, isActive && styles.filterButtonActive]}
            onPress={() => onSelectFilter(item.id)}
          >
            <Ionicons
              name={item.icon}
              size={16}
              color={isActive ? '#FFFFFF' : '#4B5563'}
            />
            <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
              {item.label}
            </Text>
            <View style={[styles.badge, isActive && styles.badgeActive]}>
              <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                {item.count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterLabelActive: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  badgeTextActive: {
    color: '#FFFFFF',
  },
});
//fim