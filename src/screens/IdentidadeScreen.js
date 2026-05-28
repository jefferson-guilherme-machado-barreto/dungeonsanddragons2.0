import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SectionTitle, Field, StatBox, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

const STATS = [
  { key: 'str', label: 'FOR' },
  { key: 'dex', label: 'DES' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'SAB' },
  { key: 'cha', label: 'CAR' },
];

export default function IdentidadeScreen({ char, update, save, saved }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle>Identificação</SectionTitle>
      <View style={styles.row}>
        <Field label="Nome do Personagem" value={char.name} onChangeText={v => update('name', v)} style={{ flex: 2, marginRight: 8 }} />
        <Field label="Jogador" value={char.player} onChangeText={v => update('player', v)} style={{ flex: 1 }} />
      </View>
      <View style={styles.row}>
        <Field label="Raça" value={char.race} onChangeText={v => update('race', v)} style={{ flex: 1, marginRight: 8 }} />
        <Field label="Classe" value={char.charClass} onChangeText={v => update('charClass', v)} style={{ flex: 1, marginRight: 8 }} />
        <Field label="Nível" value={char.level} onChangeText={v => update('level', v)} keyboardType="numeric" style={{ flex: 0.5 }} inputStyle={{ textAlign: 'center', fontSize: 18, fontFamily: FONTS.bodySemi }} />
      </View>
      <View style={styles.row}>
        <Field label="Antecedente" value={char.background} onChangeText={v => update('background', v)} style={{ flex: 1, marginRight: 8 }} />
        <Field label="Alinhamento" value={char.alignment} onChangeText={v => update('alignment', v)} style={{ flex: 1 }} />
      </View>
      <View style={styles.row}>
        <Field label="Divindade" value={char.deity} onChangeText={v => update('deity', v)} style={{ flex: 1, marginRight: 8 }} />
        <Field label="Bônus de Proficiência" value={char.profBonus} onChangeText={v => update('profBonus', v)} keyboardType="numeric" style={{ flex: 1 }} inputStyle={{ textAlign: 'center' }} />
      </View>

      <View style={styles.inspRow}>
        <Text style={styles.inspLabel}>Inspiração</Text>
        <Switch
          value={char.inspiration}
          onValueChange={v => update('inspiration', v)}
          trackColor={{ false: COLORS.bgCard, true: COLORS.goldDark }}
          thumbColor={char.inspiration ? COLORS.gold : COLORS.textDim}
        />
      </View>

      <Divider />
      <SectionTitle>Atributos</SectionTitle>
      <View style={styles.statsGrid}>
        {STATS.map(s => (
          <StatBox
            key={s.key}
            label={s.label}
            value={char[s.key]}
            onChangeText={v => update(s.key, v)}
          />
        ))}
      </View>

      <Divider />
      <SaveButton onPress={save} />
      {saved ? <Text style={styles.savedMsg}>✦ Salvo! ✦</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: 'row', marginBottom: 4 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  inspRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  inspLabel: {
    fontFamily: FONTS.display,
    fontSize: 11,
    letterSpacing: 1,
    color: COLORS.textMuted,
  },
  savedMsg: {
    fontFamily: FONTS.display,
    fontSize: 11,
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 2,
  },
});
