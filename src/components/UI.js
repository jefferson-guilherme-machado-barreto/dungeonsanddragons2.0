import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../theme';

export function SectionTitle({ children, style }) {
  return (
    <Text style={[styles.sectionTitle, style]}>{children}</Text>
  );
}

export function FieldLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function Field({ label, value, onChangeText, keyboardType = 'default', placeholder = '', multiline = false, style, inputStyle, center = false }) {
  return (
    <View style={[styles.fieldWrap, style]}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <TextInput
        style={[styles.input, center && { textAlign: 'center' }, multiline && { minHeight: 80, textAlignVertical: 'top' }, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textDim}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );
}

export function StatBox({ label, value, onChangeText }) {
  const score = parseInt(value) || 10;
  const mod = Math.floor((score - 10) / 2);
  const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
  return (
    <View style={styles.statBox}>
      <Text style={styles.statName}>{label}</Text>
      <TextInput
        style={styles.statScore}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        maxLength={2}
        textAlign="center"
      />
      <Text style={styles.statMod}>{modStr}</Text>
    </View>
  );
}

export function ProfDot({ active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.profDot, active && styles.profDotActive]} />
  );
}

export function DeathDot({ type, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.deathDot, active && (type === 'success' ? styles.dotSuccess : styles.dotFail)]}
    />
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

export function SaveButton({ onPress, label = '⚔  SALVAR  ⚔' }) {
  return (
    <TouchableOpacity style={styles.saveBtn} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.saveBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.red,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: FONTS.display,
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.textDim,
    marginBottom: 2,
  },
  fieldWrap: { marginBottom: 8 },
  input: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 2,
    backgroundColor: 'transparent',
  },
  statBox: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  statName: {
    fontFamily: FONTS.display,
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.red,
    marginBottom: 4,
  },
  statScore: {
    fontFamily: FONTS.bodySemi,
    fontSize: 28,
    color: COLORS.text,
    width: 50,
    borderBottomWidth: 0,
    paddingVertical: 0,
  },
  statMod: {
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
    color: COLORS.gold,
    marginTop: 2,
  },
  profDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    backgroundColor: 'transparent',
  },
  profDotActive: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
  deathDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    backgroundColor: 'transparent',
    marginRight: 4,
  },
  dotSuccess: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  dotFail: { backgroundColor: COLORS.danger, borderColor: COLORS.danger },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    opacity: 0.4,
    marginVertical: 12,
  },
  saveBtn: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    fontFamily: FONTS.display,
    fontSize: 13,
    letterSpacing: 3,
    color: COLORS.gold,
  },
});
