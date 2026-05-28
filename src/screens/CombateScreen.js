import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SectionTitle, Field, DeathDot, Divider, SaveButton } from '../components/UI';
import { COLORS, FONTS } from '../theme';

export default function CombateScreen({ char, update, save, saved }) {
  function updateAttack(idx, field, val) {
    const attacks = [...char.attacks];
    attacks[idx] = { ...attacks[idx], [field]: val };
    update('attacks', attacks);
  }
  function addAttack() {
    update('attacks', [...char.attacks, { id: Date.now().toString(), name: '', bonus: '', damage: '' }]);
  }
  function removeAttack(idx) {
    const attacks = char.attacks.filter((_, i) => i !== idx);
    update('attacks', attacks.length ? attacks : [{ id: '1', name: '', bonus: '', damage: '' }]);
  }
  function toggleDeath(type, idx) {
    const key = type === 'success' ? 'deathSuccess' : 'deathFail';
    const arr = [...char[key]];
    arr[idx] = !arr[idx];
    update(key, arr);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle>Pontos de Vida & Defesa</SectionTitle>
      <View style={styles.hpRow}>
        <View style={styles.hpBox}>
          <Text style={styles.hpLabel}>CA</Text>
          <TextInput style={styles.hpNum} value={char.ac} onChangeText={v => update('ac', v)} keyboardType="numeric" placeholder="10" placeholderTextColor={COLORS.textDim} textAlign="center" />
        </View>
        <View style={[styles.hpBox, { flex: 2 }]}>
          <Text style={styles.hpLabel}>PV Atual / Máximo</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={[styles.hpNum, { flex: 1 }]} value={char.hpCur} onChangeText={v => update('hpCur', v)} keyboardType="numeric" placeholder="0" placeholderTextColor={COLORS.textDim} textAlign="center" />
            <Text style={styles.slash}>/</Text>
            <TextInput style={[styles.hpNum, { flex: 1 }]} value={char.hpMax} onChangeText={v => update('hpMax', v)} keyboardType="numeric" placeholder="0" placeholderTextColor={COLORS.textDim} textAlign="center" />
          </View>
        </View>
        <View style={styles.hpBox}>
          <Text style={styles.hpLabel}>PV Temp.</Text>
          <TextInput style={styles.hpNum} value={char.hpTemp} onChangeText={v => update('hpTemp', v)} keyboardType="numeric" placeholder="0" placeholderTextColor={COLORS.textDim} textAlign="center" />
        </View>
      </View>
      <View style={styles.hpRow}>
        <View style={styles.hpBox}>
          <Text style={styles.hpLabel}>Iniciativa</Text>
          <TextInput style={styles.hpNum} value={char.initiative} onChangeText={v => update('initiative', v)} keyboardType="numeric" placeholder="+0" placeholderTextColor={COLORS.textDim} textAlign="center" />
        </View>
        <View style={styles.hpBox}>
          <Text style={styles.hpLabel}>Velocidade</Text>
          <TextInput style={styles.hpNum} value={char.speed} onChangeText={v => update('speed', v)} keyboardType="numeric" placeholder="30" placeholderTextColor={COLORS.textDim} textAlign="center" />
        </View>
      </View>

      <Divider />
      <SectionTitle>Dados de Vida</SectionTitle>
      <View style={styles.row}>
        <Field label="Total" value={char.hdTotal} onChangeText={v => update('hdTotal', v)} style={{ flex: 1, marginRight: 8 }} placeholder="3d10" />
        <Field label="Atual" value={char.hdCur} onChangeText={v => update('hdCur', v)} keyboardType="numeric" style={{ flex: 1, marginRight: 8 }} />
        <Field label="Tipo" value={char.hdType} onChangeText={v => update('hdType', v)} style={{ flex: 1 }} placeholder="d8" />
      </View>

      <Divider />
      <SectionTitle>Testes de Morte</SectionTitle>
      <View style={styles.deathRow}>
        <View>
          <Text style={styles.deathLabel}>Sucessos</Text>
          <View style={{ flexDirection: 'row' }}>
            {char.deathSuccess.map((v, i) => (
              <DeathDot key={i} type="success" active={v} onPress={() => toggleDeath('success', i)} />
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.deathLabel}>Falhas</Text>
          <View style={{ flexDirection: 'row' }}>
            {char.deathFail.map((v, i) => (
              <DeathDot key={i} type="fail" active={v} onPress={() => toggleDeath('fail', i)} />
            ))}
          </View>
        </View>
      </View>

      <Divider />
      <SectionTitle>Ataques & Magia</SectionTitle>
      <View style={[styles.row, { marginBottom: 6 }]}>
        <Text style={[styles.atkHeader, { flex: 2 }]}>Nome</Text>
        <Text style={[styles.atkHeader, { flex: 1, textAlign: 'center' }]}>Bônus</Text>
        <Text style={[styles.atkHeader, { flex: 2, textAlign: 'center' }]}>Dano / Tipo</Text>
        <View style={{ width: 28 }} />
      </View>
      {char.attacks.map((atk, idx) => (
        <View key={atk.id} style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
          <TextInput style={[styles.atkInput, { flex: 2 }]} value={atk.name} onChangeText={v => updateAttack(idx, 'name', v)} placeholder="Espada Longa" placeholderTextColor={COLORS.textDim} />
          <TextInput style={[styles.atkInput, { flex: 1, textAlign: 'center' }]} value={atk.bonus} onChangeText={v => updateAttack(idx, 'bonus', v)} placeholder="+5" placeholderTextColor={COLORS.textDim} />
          <TextInput style={[styles.atkInput, { flex: 2, textAlign: 'center' }]} value={atk.damage} onChangeText={v => updateAttack(idx, 'damage', v)} placeholder="1d8+3" placeholderTextColor={COLORS.textDim} />
          <TouchableOpacity onPress={() => removeAttack(idx)} style={styles.removeBtn}>
            <Text style={{ color: COLORS.red, fontSize: 18 }}>×</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={addAttack}>
        <Text style={styles.addBtnText}>+ Adicionar ataque</Text>
      </TouchableOpacity>

      <Divider />
      <SaveButton onPress={save} />
      {saved ? <Text style={styles.savedMsg}>✦ Salvo! ✦</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: 'row', gap: 6 },
  hpRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  hpBox: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  hpLabel: { fontFamily: FONTS.display, fontSize: 9, letterSpacing: 1, color: COLORS.red, marginBottom: 4 },
  hpNum: { fontFamily: FONTS.bodySemi, fontSize: 24, color: COLORS.text, width: '100%' },
  slash: { fontFamily: FONTS.body, fontSize: 20, color: COLORS.textDim, marginHorizontal: 4 },
  deathRow: { flexDirection: 'row', gap: 32, paddingVertical: 8 },
  deathLabel: { fontFamily: FONTS.display, fontSize: 9, letterSpacing: 1, color: COLORS.textDim, marginBottom: 6 },
  atkHeader: { fontFamily: FONTS.display, fontSize: 9, letterSpacing: 1, color: COLORS.textDim },
  atkInput: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    marginHorizontal: 2,
  },
  removeBtn: { width: 28, alignItems: 'center', justifyContent: 'center' },
  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  addBtnText: { fontFamily: FONTS.display, fontSize: 10, letterSpacing: 1, color: COLORS.red },
  savedMsg: { fontFamily: FONTS.display, fontSize: 11, color: COLORS.gold, textAlign: 'center', marginTop: 8, letterSpacing: 2 },
});
