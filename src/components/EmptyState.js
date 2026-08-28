import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente exibido quando a lista de missões está vazia.
 */
export default function EmptyState({ filter = 'ALL', onAddMission }) {
  // Ajusta o texto e ícone de acordo com o contexto do filtro
  let title = 'Nenhuma missão por aqui!';
  let description = 'Crie sua primeira missão e comece o desafio agora mesmo.';
  let showButton = true;

  if (filter === 'PENDING') {
    title = 'Tudo em dia!';
    description = 'Você não possui missões pendentes no momento.';
    showButton = false;
  } else if (filter === 'COMPLETED') {
    title = 'Nenhuma missão concluída';
    description = 'Marque suas tarefas como concluídas para vê-las aqui.';
    showButton = false;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="rocket-outline" size={48} color="#2563EB" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {showButton && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}
          onPress={onAddMission}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Criar primeira missão</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 24,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
// fim
