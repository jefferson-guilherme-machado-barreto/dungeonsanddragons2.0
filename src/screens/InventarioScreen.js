import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { SectionTitle, Field, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

const COINS = [
  { key: 'coinCp', label: 'PC', sub: 'Cobre' },
  { key: 'coinSp', label: 'PP', sub: 'Prata' },
  { key: 'coinEp', label: 'PE', sub: 'Electrum' },
  { key: 'coinGp', label: 'PO', sub: 'Ouro' },
  { key: 'coinPp', label: 'PP', sub: 'Platina' },
];

export default function InventarioScreen({ char, update, save, saved }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle>Moedas</SectionTitle>
      <View style={styles.coinsRow}>
        {COINS.map(c => (
          <View key={c.key} style={styles.coinBox}>
            <Text style={styles.coinLabel}>{c.label}</Text>
            <Text style={styles.coinSub}>{c.sub}</Text>
            <TextInput
              style={styles.coinInput}
              value={char[c.key]}
              onChangeText={v => update(c.key, v)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={COLORS.textDim}
              textAlign="center"
            />
          </View>
        ))}
      </View>

      <Divider />
      <SectionTitle>Equipamentos & Itens</SectionTitle>
      <Text style={styles.hint}>Um item por linha</Text>
      <TextInput
        style={styles.textarea}
        value={char.equipment}
        onChangeText={v => update('equipment', v)}
        multiline
        placeholder={'Espada Longa +1\nArmadura de Cota de Malha\nEscudo de Madeira\nMochila de Aventureiro\nTocha (10)\nRação de Viagem (5)'}
        placeholderTextColor={COLORS.textDim}
        textAlignVertical="top"
      />

      <Divider />
      <SectionTitle>Outros Pertences & Tesouros</SectionTitle>
      <TextInput
        style={[styles.textarea, { minHeight: 80 }]}
        value={char.otherTreasure}
        onChangeText={v => update('otherTreasure', v)}
        multiline
        placeholder="Amuleto da família, gemas, cartas especiais..."
        placeholderTextColor={COLORS.textDim}
        textAlignVertical="top"
      />

      <Divider />
      <SaveButton onPress={save} />
      {saved ? <Text style={styles.savedMsg}>✦ Salvo! ✦</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  coinsRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  coinBox: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  coinLabel: { fontFamily: FONTS.displayBold, fontSize: 14, color: COLORS.gold },
  coinSub: { fontFamily: FONTS.body, fontSize: 9, color: COLORS.textDim, marginBottom: 4 },
  coinInput: { fontFamily: FONTS.bodySemi, fontSize: 18, color: COLORS.text, width: '100%' },
  hint: { fontFamily: FONTS.bodyItalic, fontSize: 12, color: COLORS.textDim, marginBottom: 6 },
  textarea: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 10,
    minHeight: 120,
    lineHeight: 22,
    marginBottom: 8,
  },
  savedMsg: { fontFamily: FONTS.display, fontSize: 11, color: COLORS.gold, textAlign: 'center', marginTop: 8, letterSpacing: 2 },
});
