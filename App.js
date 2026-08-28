import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar as NativeStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';

/**
 * Ponto de entrada do aplicativo Missão do Dia.
 * Configura a barra de status e a área segura da tela.
 */
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight || 0 : 0,
  },
});