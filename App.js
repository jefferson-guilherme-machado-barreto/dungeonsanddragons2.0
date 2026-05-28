import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Cinzel_400Regular,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
  CrimsonPro_400Regular,
  CrimsonPro_400Regular_Italic,
  CrimsonPro_600SemiBold,
} from '@expo-google-fonts/crimson-pro';

import { loadCharacter, saveCharacter } from './src/storage';
import { COLORS, FONTS } from './src/theme';

import IdentidadeScreen from './src/screens/IdentidadeScreen';
import CombateScreen from './src/screens/CombateScreen';
import PericiasScreen from './src/screens/PericiasScreen';
import MagiasScreen from './src/screens/MagiasScreen';
import InventarioScreen from './src/screens/InventarioScreen';
import BiografiaScreen from './src/screens/BiografiaScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Identidade: '⚔',
  Combate: '🛡',
  Perícias: '🎲',
  Magias: '✨',
  Inventário: '🎒',
  Biografia: '📜',
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    CrimsonPro_400Regular,
    CrimsonPro_400Regular_Italic,
    CrimsonPro_600SemiBold,
  });

  const [char, setChar] = useState(null);
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    loadCharacter().then(setChar);
  }, []);

  // Auto-save 800ms after last change
  const update = useCallback((key, value) => {
    setChar(prev => {
      const next = { ...prev, [key]: value };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveCharacter(next);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }, 800);
      return next;
    });
  }, []);

  const save = useCallback(() => {
    if (!char) return;
    saveCharacter(char).then ? saveCharacter(char).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }) : (() => {
      saveCharacter(char);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    })();
  }, [char]);

  if (!fontsLoaded || !char) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.gold} size="large" />
        <Text style={styles.loadingText}>Carregando ficha...</Text>
      </View>
    );
  }

  const screenProps = { char, update, save, saved };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: COLORS.bgCard, borderBottomColor: COLORS.border, borderBottomWidth: 1 },
            headerTintColor: COLORS.gold,
            headerTitleStyle: { fontFamily: FONTS.display, letterSpacing: 2, fontSize: 14 },
            tabBarStyle: {
              backgroundColor: COLORS.bgCard,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              height: 56,
              paddingBottom: 6,
            },
            tabBarActiveTintColor: COLORS.gold,
            tabBarInactiveTintColor: COLORS.textDim,
            tabBarLabelStyle: { fontFamily: FONTS.display, fontSize: 8, letterSpacing: 1 },
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: focused ? 18 : 16, opacity: focused ? 1 : 0.5 }}>
                {TAB_ICONS[route.name]}
              </Text>
            ),
          })}
        >
          <Tab.Screen name="Identidade" children={() => <IdentidadeScreen {...screenProps} />} />
          <Tab.Screen name="Combate" children={() => <CombateScreen {...screenProps} />} />
          <Tab.Screen name="Perícias" children={() => <PericiasScreen {...screenProps} />} />
          <Tab.Screen name="Magias" children={() => <MagiasScreen {...screenProps} />} />
          <Tab.Screen name="Inventário" children={() => <InventarioScreen {...screenProps} />} />
          <Tab.Screen name="Biografia" children={() => <BiografiaScreen {...screenProps} />} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontFamily: 'System',
    color: COLORS.gold,
    fontSize: 14,
    letterSpacing: 2,
  },
});
