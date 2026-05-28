import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { SectionTitle, Field, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

const SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MagiasScreen({ char, update, save, saved }) {
  function updateSlot(level, val) {
    update('spellSlots', { ...char.spellSlots, [level]: val });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle>Informações de Magia</SectionTitle>
      <View style={styles.row}>
        <Field label="Habilidade de Magia" value={char.spellAbility} onChangeText={v => update('spellAbility', v)} style={{ flex: 2, marginRight: 8 }} placeholder="Sabedoria..." />
        <Field label="CD de Magia" value={char.spellDC} onChangeText={v => update('spellDC', v)} keyboardType="numeric" style={{ flex: 1, marginRight: 8 }} placeholder="13" inputStyle={{ textAlign: 'center' }} />
        <Field label="Bônus de Ataque" value={char.spellAtk} onChangeText={v => update('spellAtk', v)} style={{ flex: 1 }} placeholder="+5" inputStyle={{ textAlign: 'center' }} />
      </View>

      <Divider />
      <SectionTitle>Espaços de Magia</SectionTitle>
      <View style={styles.slotsGrid}>
        {SLOTS.map(lvl => (
          <View key={lvl} style={styles.slotBox}>
            <Text style={styles.slotLabel}>Nív. {lvl}</Text>
            <TextInput
              style={styles.slotInput}
              value={char.spellSlots[lvl]}
              onChangeText={v => updateSlot(lvl, v)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={COLORS.textDim}
              textAlign="center"
            />
          </View>
        ))}
      </View>

      <Divider />
      <SectionTitle>Magias Conhecidas / Preparadas</SectionTitle>
      <Text style={styles.hint}>Liste suas magias separadas por linha</Text>
      <TextInput
        style={styles.textarea}
        value={char.spellsKnown}
        onChangeText={v => update('spellsKnown', v)}
        multiline
        placeholder={'Cantrips: Chama Sagrada, Luz...\nNível 1: Curar Ferimentos, Escudo da Fé...\nNível 2: Auxílio, Silêncio...'}
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
  row: { flexDirection: 'row' },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  slotBox: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    minWidth: 56,
  },
  slotLabel: { fontFamily: FONTS.display, fontSize: 9, letterSpacing: 1, color: COLORS.red, marginBottom: 4 },
  slotInput: { fontFamily: FONTS.bodySemi, fontSize: 20, color: COLORS.text, width: 40 },
  hint: { fontFamily: FONTS.bodyItalic, fontSize: 12, color: COLORS.textDim, marginBottom: 8 },
  textarea: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 10,
    minHeight: 160,
    lineHeight: 22,
  },
  savedMsg: { fontFamily: FONTS.display, fontSize: 11, color: COLORS.gold, textAlign: 'center', marginTop: 8, letterSpacing: 2 },
});
