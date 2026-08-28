HomeScreen

import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Serviços e Utilitários
import { getMissions, saveMissions } from '../services/storage';
import { generateId, filterMissions, calculateProgress } from '../utils/missionUtils';
import { shareProgress, shareMission } from '../utils/shareUtils';

// Componentes da Interface
import ProgressBar from '../components/ProgressBar';
import FilterButtons from '../components/FilterButtons';
import MissionCard from '../components/MissionCard';
import MissionForm from '../components/MissionForm';
import EmptyState from '../components/EmptyState';

/**
 * Tela Principal do App "Missão do Dia"
 * Gerencia o estado de missões, CRUD completo, persistência e visualização.
 */
export default function HomeScreen() {
    // 1. Estados da Aplicação
    const [missions, setMissions] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMission, setEditingMission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // 2. Carregamento inicial das missões via useEffect
    useEffect(() => {
        loadMissionsFromStorage();
    }, []);

    /**
     * Busca as missões persistidas no AsyncStorage
     */
    async function loadMissionsFromStorage() {
        try {
            setLoading(true);
            const savedMissions = await getMissions();
            setMissions(savedMissions);
        } catch (error) {
            console.error(error);
            Alert.alert('Ops!', 'Não foi possível carregar suas missões.');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Salva o novo estado de missões localmente e no AsyncStorage
     */
    async function persistMissions(updatedMissions) {
        try {
            setMissions(updatedMissions);
            await saveMissions(updatedMissions);
        } catch (error) {
            console.error(error);
            Alert.alert('Ops!', 'Erro ao salvar as missões no armazenamento.');
        }
    }

    // ===================================
    // OPERAÇÕES DO CRUD
    // ===================================

    /**
     * CREATE: Cadastra uma nova missão
     */
    const handleCreateMission = async (formData) => {
        const newMission = {
            id: generateId(),
            titulo: formData.titulo,
            descricao: formData.descricao,
            categoria: formData.categoria,
            concluida: false,
            createdAt: new Date().toISOString(),
        };

        const updatedMissions = [newMission, ...missions];
        await persistMissions(updatedMissions);
        setIsFormVisible(false);
    };

    /**
     * UPDATE: Edita os dados de uma missão existente
     */
    const handleUpdateMission = async (formData) => {
        if (!editingMission) return;

        const updatedMissions = missions.map((mission) => {
            if (mission.id === editingMission.id) {
                return {
                    ...mission,
                    titulo: formData.titulo,
                    descricao: formData.descricao,
                    categoria: formData.categoria,
                };
            }
            return mission;
        });

        await persistMissions(updatedMissions);
        setEditingMission(null);
        setIsFormVisible(false);
    };

    /**
     * UPDATE (Status): Alterna entre concluída e pendente
     */
    const handleToggleComplete = async (id) => {
        let nowCompleted = false;

        const updatedMissions = missions.map((mission) => {
            if (mission.id === id) {
                const nextStatus = !mission.concluida;
                if (nextStatus) nowCompleted = true;
                return { ...mission, concluida: nextStatus };
            }
            return mission;
        });

        await persistMissions(updatedMissions);

        // Feedback visual amigável ao concluir
        if (nowCompleted) {
            setFeedbackMessage('Boa! Missão concluída com sucesso!');
            setTimeout(() => setFeedbackMessage(''), 2500);
        }
    };

    /**
     * DELETE: Remove uma missão após confirmação
     */
    const handleDeleteMission = async (id) => {
        const updatedMissions = missions.filter((mission) => mission.id !== id);
        await persistMissions(updatedMissions);
    };

    // ===================================
    // CONTROLES DE FORMULÁRIO E AÇÕES
    // ===================================

    const openCreateModal = () => {
        setEditingMission(null);
        setIsFormVisible(true);
    };

    const openEditModal = (mission) => {
        setEditingMission(mission);
        setIsFormVisible(true);
    };

    const closeModal = () => {
        setEditingMission(null);
        setIsFormVisible(false);
    };

    const handleFormSubmit = (formData) => {
        if (editingMission) {
            handleUpdateMission(formData);
        } else {
            handleCreateMission(formData);
        }
    };

    // ===================================
    // DADOS DERIVADOS E FILTROS
    // ===================================

    const displayedMissions = filterMissions(missions, selectedFilter);
    const { total, completed, pending } = calculateProgress(missions);

    return (
        <View style={styles.container}>
            {/* Cabeçalho do App */}
            <View style={styles.header}>
                <View style={styles.headerTitles}>
                    <View style={styles.titleRow}>
                        <Text style={styles.appTitle}>Missão do Dia</Text>
                        <Ionicons name="locate" size={22} color="#2563EB" />
                    </View>
                    <Text style={styles.appSubtitle}>Qual missão você vai cumprir hoje?</Text>
                </View>

                {/* Botão de Compartilhamento Geral */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.shareButton}
                    onPress={() => shareProgress(missions)}>
                    <Ionicons name="share-social-outline" size={20} color="#2563EB" />
                    <Text style={styles.shareText}>Progresso</Text>
                </TouchableOpacity>
            </View>

            {/* Banner de Feedback ao Concluir Missão */}
            {feedbackMessage ? (
                <View style={styles.feedbackToast}>
                    <Ionicons name="sparkles" size={18} color="#047857" />
                    <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                </View>
            ) : null}

            {/* Exibição de Carregamento Inicial */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.loadingText}>Carregando suas missões...</Text>
                </View>
            ) : (
                <FlatList
                    data={displayedMissions}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={
                        <>
                            {/* Barra de Progresso */}
                            <ProgressBar missions={missions} />

                            {/* Filtros de Seleção */}
                            <FilterButtons
                                selectedFilter={selectedFilter}
                                onSelectFilter={setSelectedFilter}
                                counts={{ all: total, pending, completed }}
                            />
                        </>
                    }
                    renderItem={({ item }) => (
                        <MissionCard
                            mission={item}
                            onToggleComplete={handleToggleComplete}
                            onEdit={openEditModal}
                            onDelete={handleDeleteMission}
                            onShare={shareMission}
                        />
                    )}
                    ListEmptyComponent={
                        <EmptyState filter={selectedFilter} onAddMission={openCreateModal} />
                    }
                />
            )}

            {/* Botão Flutuante (FAB) para Adicionar Missão */}
            <TouchableOpacity activeOpacity={0.85} style={styles.fab} onPress={openCreateModal}>
                <Ionicons name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Modal Reutilizável de Formulário (Criar / Editar) */}
            <MissionForm
                visible={isFormVisible}
                onClose={closeModal}
                onSubmit={handleFormSubmit}
                editingMission={editingMission}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerTitles: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    appSubtitle: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 2,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    shareText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563EB',
    },
    feedbackToast: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1FAE5',
        marginHorizontal: 16,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: '#A7F3D0',
    },
    feedbackText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#065F46',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    loadingText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: 90,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 20,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
});