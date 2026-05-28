import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { SectionTitle, Field, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

export default function BiografiaScreen({ char, update, save, saved }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle>Aparência</SectionTitle>
      <View style={styles.row}>
        <Field label="Idade" value={char.age} onChangeText={v => update('age', v)} style={{ flex: 1, marginRight: 8 }} placeholder="35 anos" />
        <Field label="Altura / Peso" value={char.height} onChangeText={v => update('height', v)} style={{ flex: 1.5 }} placeholder="1,80m / 82kg" />
      </View>
      <View style={styles.row}>
        <Field label="Olhos" value={char.eyes} onChangeText={v => update('eyes', v)} style={{ flex: 1, marginRight: 8 }} placeholder="Castanho" />
        <Field label="Cabelo / Pele" value={char.hair} onChangeText={v => update('hair', v)} style={{ flex: 1.5 }} placeholder="Preto / Moreno" />
      </View>

      <Divider />
      <SectionTitle>Personalidade & Filosofia</SectionTitle>
      <Field label="Traços de Personalidade" value={char.traits} onChangeText={v => update('traits', v)} multiline placeholder="Sou sempre pontual e nunca deixo um amigo para trás..." />
      <Field label="Ideais" value={char.ideals} onChangeText={v => update('ideals', v)} multiline placeholder="A liberdade das pessoas importa mais do que qualquer lei..." />
      <Field label="Vínculos" value={char.bonds} onChangeText={v => update('bonds', v)} multiline placeholder="Devo a vida a meu mestre e juro proteger seu legado..." />
      <Field label="Defeitos" value={char.flaws} onChangeText={v => update('flaws', v)} multiline placeholder="Confio demais nas pessoas e me deixo enganar facilmente..." />

      <Divider />
      <SectionTitle>História</SectionTitle>
      <Field label="Backstory" value={char.backstory} onChangeText={v => update('backstory', v)} multiline placeholder="Nascido em uma família de ferreiros no vilarejo de Pedra Alta..." inputStyle={{ minHeight: 120 }} />

      <Divider />
      <SectionTitle>Traços Raciais, de Classe & Notas</SectionTitle>
      <Field label="" value={char.features} onChangeText={v => update('features', v)} multiline placeholder={'Sentidos Aguçados\nResistência Anã\nAtaque Extra\nSegundo Fôlego: 1d10+5...'} inputStyle={{ minHeight: 100 }} />

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
  savedMsg: { fontFamily: FONTS.display, fontSize: 11, color: COLORS.gold, textAlign: 'center', marginTop: 8, letterSpacing: 2 },
});
