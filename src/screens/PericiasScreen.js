import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SectionTitle, ProfDot, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

const SAVES = [
  { key: 'Força', attr: 'str' }, { key: 'Destreza', attr: 'dex' },
  { key: 'Constituição', attr: 'con' }, { key: 'Inteligência', attr: 'int' },
  { key: 'Sabedoria', attr: 'wis' }, { key: 'Carisma', attr: 'cha' },
];

const SKILLS = [
  { key: 'Acrobacia', attr: 'dex' }, { key: 'Arcanismo', attr: 'int' },
  { key: 'Atletismo', attr: 'str' }, { key: 'Atuação', attr: 'cha' },
  { key: 'Enganação', attr: 'cha' }, { key: 'Furtividade', attr: 'dex' },
  { key: 'História', attr: 'int' }, { key: 'Intimidação', attr: 'cha' },
  { key: 'Intuição', attr: 'wis' }, { key: 'Investigação', attr: 'int' },
  { key: 'Lidar c/ Animais', attr: 'wis' }, { key: 'Medicina', attr: 'wis' },
  { key: 'Natureza', attr: 'int' }, { key: 'Percepção', attr: 'wis' },
  { key: 'Persuasão', attr: 'cha' }, { key: 'Prestidigitação', attr: 'dex' },
  { key: 'Religião', attr: 'int' }, { key: 'Sobrevivência', attr: 'wis' },
];

const ATTR_LABEL = { str: 'FOR', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };

function getMod(char, attr) {
  const score = parseInt(char[attr]) || 10;
  return Math.floor((score - 10) / 2);
}
function fmtMod(m) { return m >= 0 ? `+${m}` : `${m}`; }

export default function PericiasSalvasScreen({ char, update, save, saved }) {
  const prof = parseInt(char.profBonus) || 2;

  function toggleSkill(key) {
    update('skillsProf', { ...char.skillsProf, [key]: !char.skillsProf[key] });
  }
  function toggleSave(key) {
    update('savesProf', { ...char.savesProf, [key]: !char.savesProf[key] });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle>Testes de Resistência</SectionTitle>
      {SAVES.map(s => {
        const base = getMod(char, s.attr);
        const isProficient = char.savesProf[s.key];
        const total = base + (isProficient ? prof : 0);
        return (
          <View key={s.key} style={styles.row}>
            <ProfDot active={isProficient} onPress={() => toggleSave(s.key)} />
            <Text style={styles.skillName}>{s.key}</Text>
            <Text style={styles.attrTag}>{ATTR_LABEL[s.attr]}</Text>
            <Text style={[styles.val, isProficient && styles.valProf]}>{fmtMod(total)}</Text>
          </View>
        );
      })}

      <Divider />
      <SectionTitle>Perícias</SectionTitle>
      {SKILLS.map(s => {
        const base = getMod(char, s.attr);
        const isProficient = char.skillsProf[s.key];
        const total = base + (isProficient ? prof : 0);
        return (
          <View key={s.key} style={styles.row}>
            <ProfDot active={isProficient} onPress={() => toggleSkill(s.key)} />
            <Text style={styles.skillName}>{s.key}</Text>
            <Text style={styles.attrTag}>{ATTR_LABEL[s.attr]}</Text>
            <Text style={[styles.val, isProficient && styles.valProf]}>{fmtMod(total)}</Text>
          </View>
        );
      })}

      <Divider />
      <SaveButton onPress={save} />
      {saved ? <Text style={styles.savedMsg}>✦ Salvo! ✦</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.bgCard,
  },
  skillName: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.text, flex: 1 },
  attrTag: { fontFamily: FONTS.display, fontSize: 9, color: COLORS.textDim, letterSpacing: 1, width: 28, textAlign: 'center' },
  val: { fontFamily: FONTS.bodySemi, fontSize: 14, color: COLORS.textMuted, width: 32, textAlign: 'right' },
  valProf: { color: COLORS.gold },
  savedMsg: { fontFamily: FONTS.display, fontSize: 11, color: COLORS.gold, textAlign: 'center', marginTop: 8, letterSpacing: 2 },
});
