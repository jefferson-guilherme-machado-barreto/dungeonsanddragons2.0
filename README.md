# ⚔ Ficha D&D — App React Native (Expo)

Aplicativo de ficha de personagem para Dungeons & Dragons 5ª Edição.
Dados salvos automaticamente a cada alteração.

---

## Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [Git](https://git-scm.com) (opcional)
- Conta gratuita em [expo.dev](https://expo.dev) (para gerar o APK)

---

## Instalar e rodar localmente

```bash
# 1. Entre na pasta do projeto
cd dnd-sheet

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) para testar no celular.

---

## Gerar APK (Android)

### Opção A — Build na nuvem (recomendado, grátis)

```bash
# 1. Instale o EAS CLI
npm install -g eas-cli

# 2. Faça login na sua conta Expo
eas login

# 3. Configure o projeto (só na primeira vez)
eas build:configure

# 4. Gere o APK
eas build --platform android --profile preview
```

Após alguns minutos, o link para baixar o `.apk` aparece no terminal e em [expo.dev/builds](https://expo.dev/builds).

### Opção B — Build local (precisa do Android SDK)

```bash
# Precisa do Android Studio instalado
npx expo run:android
```

---

## Funcionalidades

| Aba         | Conteúdo                                                  |
|-------------|-----------------------------------------------------------|
| Identidade  | Nome, raça, classe, nível, atributos (FOR/DES/CON/INT/SAB/CAR) |
| Combate     | CA, PV, iniciativa, velocidade, dados de vida, testes de morte, ataques |
| Perícias    | Proficiências em perícias e testes de resistência (bônus automáticos) |
| Magias      | CD de magia, espaços por nível, lista de magias           |
| Inventário  | Moedas (PC/PP/PE/PO/PP), equipamentos, tesouros           |
| Biografia   | Aparência, personalidade, ideais, vínculos, defeitos, backstory |

**Auto-save:** os dados são salvos automaticamente 800ms após cada alteração.
O botão ⚔ SALVAR força o salvamento imediato.

---

## Estrutura do projeto

```
dnd-sheet/
├── App.js                  ← Entrada, navegação, auto-save
├── src/
│   ├── theme.js            ← Cores e fontes
│   ├── storage.js          ← AsyncStorage (persistência local)
│   ├── components/
│   │   └── UI.js           ← Componentes reutilizáveis
│   └── screens/
│       ├── IdentidadeScreen.js
│       ├── CombateScreen.js
│       ├── PericiasScreen.js
│       ├── MagiasScreen.js
│       ├── InventarioScreen.js
│       └── BiografiaScreen.js
├── app.json                ← Config Expo
├── eas.json                ← Config build APK
└── package.json
```
