/**
 * Constantes de Categorias do App "Missão do Dia"
 * Cada categoria possui identificador único, nome exibido, ícone do Ionicons e cores temáticas.
 */

export const CATEGORIES = [
  {
    id: 'estudos',
    label: 'Estudos',
    icon: 'book-outline',
    color: '#2563EB', // Azul
    bgColor: '#EFF6FF',
  },
  {
    id: 'saude',
    label: 'Saúde',
    icon: 'fitness-outline',
    color: '#059669', // Verde
    bgColor: '#ECFDF5',
  },
  {
    id: 'lazer',
    label: 'Lazer',
    icon: 'game-controller-outline',
    color: '#7C3AED', // Roxo
    bgColor: '#F5F3FF',
  },
  {
    id: 'trabalho',
    label: 'Trabalho',
    icon: 'briefcase-outline',
    color: '#D97706', // Laranja
    bgColor: '#FFFBEB',
  },
  {
    id: 'casa',
    label: 'Casa',
    icon: 'home-outline',
    color: '#DB2777', // Rosa
    bgColor: '#FDF2F8',
  },
  {
    id: 'projetos',
    label: 'Projetos',
    icon: 'code-slash-outline',
    color: '#0891B2', // Ciano
    bgColor: '#ECFEFF',
  },
  {
    id: 'outros',
    label: 'Outros',
    icon: 'star-outline',
    color: '#4B5563', // Cinza escuro
    bgColor: '#F3F4F6',
  },
];

export const DEFAULT_CATEGORY_ID = 'estudos';

/**
 * Função utilitária para buscar os dados de uma categoria pelo ID
 * @param {string} categoryId 
 * @returns {object} Dados da categoria encontrada ou categoria padrão
 */
export function getCategoryById(categoryId) {
  const found = CATEGORIES.find((cat) => cat.id === categoryId);
  return found || CATEGORIES[0];
}