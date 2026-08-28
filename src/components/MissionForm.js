import { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, DEFAULT_CATEGORY_ID } from '../constants/categories';

/**
 * Formulário reutilizável para criação e edição de missões.
 * Exibido em formato de Modal com validação de campos obrigatórios.
 */
export default function MissionForm({
  visible,
  onClose,
  onSubmit,
  editingMission = null,
}) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState(DEFAULT_CATEGORY_ID);
  const [errorMessage, setErrorMessage] = useState('');

  // Preenche o formulário quando entra em modo de edição ou limpa quando novo
  useEffect(() => {
    if (editingMission) {
      setTitulo(editingMission.titulo || '');
      setDescricao(editingMission.descricao || '');
      setCategoria(editingMission.categoria || DEFAULT_CATEGORY_ID);
    } else {
      setTitulo('');
      setDescricao('');
      setCategoria(DEFAULT_CATEGORY_ID);
    }
    setErrorMessage('');
  }, [editingMission, visible]);

  const isEditing = Boolean(editingMission);

  /**
   * Valida os dados antes de submeter
   */
  const handleSave = () => {
    const trimmedTitle = titulo.trim();

    if (!trimmedTitle) {
      setErrorMessage('Por favor, informe o título da missão.');
      return;
    }

    setErrorMessage('');

    // Prepara o objeto da missão
    const missionData = {
      titulo: trimmedTitle,
      descricao: descricao.trim(),
      categoria: categoria,
    };

    onSubmit(missionData);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Cabeçalho do Modal */}
          <View style={styles.header}>
            <View style={styles.headerTitleGroup}>
              <Ionicons
                name={isEditing ? 'pencil' : 'rocket'}
                size={22}
                color="#2563EB"
              />
              <Text style={styles.headerTitle}>
                {isEditing ? 'Editar missão' : 'Nova missão'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            {/* Mensagem de Erro de Validação */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Campo: Título */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Título da missão <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errorMessage ? styles.inputError : null]}
                placeholder="Ex: Estudar JavaScript, Caminhar 30 min..."
                placeholderTextColor="#9CA3AF"
                value={titulo}
                onChangeText={(text) => {
                  setTitulo(text);
                  if (errorMessage) setErrorMessage('');
                }}
                maxLength={80}
              />
            </View>

            {/* Campo: Descrição */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Descrição (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Adicione detalhes, metas ou passos..."
                placeholderTextColor="#9CA3AF"
                value={descricao}
                onChangeText={setDescricao}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                maxLength={200}
              />
            </View>

            {/* Campo: Categoria */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoryChipsContainer}>
                {CATEGORIES.map((cat) => {
                  const isSelected = categoria === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      activeOpacity={0.7}
                      style={[
                        styles.categoryChip,
                        isSelected
                          ? { backgroundColor: cat.color, borderColor: cat.color }
                          : { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' },
                      ]}
                      onPress={() => setCategoria(cat.id)}
                    >
                      <Ionicons
                        name={cat.icon}
                        size={16}
                        color={isSelected ? '#FFFFFF' : cat.color}
                      />
                      <Text
                        style={[
                          styles.categoryChipText,
                          isSelected
                            ? { color: '#FFFFFF', fontWeight: '700' }
                            : { color: '#374151' },
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Botões de Ação do Rodapé */}
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelBtn}
              onPress={onClose}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.saveBtn}
              onPress={handleSave}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>
                {isEditing ? 'Salvar alterações' : 'Criar missão'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  scrollBody: {
    padding: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    gap: 6,
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '500',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  requiredMark: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  textArea: {
    minHeight: 80,
  },
  categoryChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  categoryChipText: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  saveBtn: {
    flex: 2,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});