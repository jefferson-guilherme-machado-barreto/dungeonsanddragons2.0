import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'dnd_character_sheet_v1';

export const DEFAULT_STATE = {
  // Identidade
  name: '', player: '', race: '', charClass: '', level: '1',
  background: '', alignment: '', deity: '', profBonus: '2',
  inspiration: false,
  // Atributos
  str: '10', dex: '10', con: '10', int: '10', wis: '10', cha: '10',
  // Combate
  ac: '', hpCur: '', hpMax: '', hpTemp: '', initiative: '', speed: '30',
  hdTotal: '', hdCur: '', hdType: 'd8',
  deathSuccess: [false, false, false],
  deathFail: [false, false, false],
  // Ataques
  attacks: [
    { id: '1', name: '', bonus: '', damage: '' },
  ],
  // Proficiências
  skillsProf: {},
  savesProf: {},
  // Magias
  spellAbility: '', spellDC: '', spellAtk: '',
  spellsKnown: '',
  spellSlots: { 1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'' },
  // Inventário
  coinCp: '', coinSp: '', coinEp: '', coinGp: '', coinPp: '',
  equipment: '', otherTreasure: '',
  // Bio
  age: '', height: '', eyes: '', hair: '',
  traits: '', ideals: '', bonds: '', flaws: '',
  backstory: '', features: '',
};

export async function loadCharacter() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_STATE };
  }
}

export async function saveCharacter(state) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Save error', e);
  }
}
