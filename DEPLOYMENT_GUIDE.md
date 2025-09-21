# 🚀 Guía de Despliegue - Taqi Tourism

## 📋 Resumen

Tu proyecto **Taqi Tourism** ha sido migrado exitosamente a Web3 con las siguientes características:

✅ **Frontend**: React + TypeScript + Wagmi + Viem  
✅ **Smart Contracts**: Solidity con OpenZeppelin  
✅ **Red**: Base Sepolia (testnet)  
✅ **Social**: Integración con Farcaster  
✅ **Wallets**: MetaMask, Coinbase Wallet, WalletConnect  

## 🎯 Estado Actual

### ✅ Completado
- [x] Migración a TypeScript
- [x] Integración Web3 (Wagmi + Viem)
- [x] Configuración Base Sepolia
- [x] Smart contracts creados
- [x] UI actualizada con funcionalidades Web3
- [x] Integración Farcaster
- [x] Conexión de wallets
- [x] Error `process is not defined` solucionado

### ⏳ Pendiente
- [ ] Despliegue de contratos (usar Remix IDE)
- [ ] Configurar variables de entorno
- [ ] Obtener claves API

## 🚀 Despliegue Rápido (Recomendado para Hackathon)

### Opción 1: Remix IDE (Más Fácil)

1. **Ve a [Remix IDE](https://remix.ethereum.org/)**

2. **Crea un nuevo workspace** y copia los contratos:
   - `contracts/TaqiCredits.sol`
   - `contracts/TaqiNFT.sol` 
   - `contracts/TaqiTourism.sol`

3. **Instala dependencias en Remix**:
   - Ve a "File Manager" → "Dependencies"
   - Instala: `@openzeppelin/contracts`

4. **Compila los contratos**:
   - Ve a "Solidity Compiler"
   - Selecciona versión 0.8.24
   - Compila cada contrato

5. **Despliega en Base Sepolia**:
   - Ve a "Deploy & Run Transactions"
   - Conecta MetaMask a Base Sepolia
   - Despliega en este orden:
     1. `TaqiCredits`
     2. `TaqiNFT` 
     3. `TaqiTourism` (con direcciones de los otros dos)

### Opción 2: Hardhat (Avanzado)

Si prefieres usar Hardhat, necesitarás resolver los conflictos de dependencias:

```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json

# Reinstalar con versión específica
npm install hardhat@2.19.4 --legacy-peer-deps
npm install @nomicfoundation/hardhat-toolbox@4.0.0 --legacy-peer-deps
npm install --legacy-peer-deps

# Compilar
npx hardhat compile
```

## 🔧 Configuración Post-Despliegue

### 1. Actualizar Direcciones de Contratos

Después del despliegue, actualiza `src/config/web3.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  TAQI_CREDITS: "0x...", // Dirección del contrato TaqiCredits
  TAQI_NFT: "0x...",     // Dirección del contrato TaqiNFT
  TAQI_TOURISM: "0x...", // Dirección del contrato TaqiTourism
};
```

### 2. Configurar Variables de Entorno

Crea archivo `.env`:

```env
# Web3 Configuration
VITE_WALLETCONNECT_PROJECT_ID=tu_project_id

# Neynar API (Farcaster)
VITE_NEYNAR_API_KEY=tu_api_key
VITE_NEYNAR_SIGNER_UUID=tu_signer_uuid
```

### 3. Obtener Claves API

#### WalletConnect
1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Crea proyecto → Copia Project ID

#### Neynar (Farcaster)
1. Ve a [Neynar](https://neynar.com/)
2. Crea cuenta → Obtén API key
3. Crea signer para publicar casts

#### Base Sepolia ETH
1. Ve a [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. Obtén ETH de testnet

## 🎮 Cómo Usar la Aplicación

### 1. Conectar Wallet
- Abre la aplicación
- Haz clic en "Connect Wallet"
- Selecciona MetaMask/Coinbase Wallet
- Asegúrate de estar en Base Sepolia

### 2. Crear Perfil
- Después de conectar, crea tu perfil de viajero
- Elige un nombre de usuario único

### 3. Explorar Funcionalidades
- **Rutas**: Completa rutas para ganar puntos y NFTs
- **Eventos**: Participa en eventos culturales
- **NFTs**: Ve tus artefactos coleccionados
- **Farcaster**: Comparte logros en redes sociales

## 🏗️ Arquitectura de Contratos

### TaqiCredits (ERC20)
- Token de créditos para la plataforma
- Se gana completando actividades
- Se puede gastar en servicios premium

### TaqiNFT (ERC721)
- NFTs de artefactos culturales
- Categorías: Artifact, Achievement, Route, Event
- Metadata incluye ubicación, puntos, rareza

### TaqiTourism
- Contrato principal que gestiona toda la lógica
- Maneja perfiles, rutas, eventos
- Coordina recompensas entre contratos

## 🎯 Para la Hackathon

### Presentación Sugerida
1. **Demo en vivo**: Conecta wallet → Crea perfil → Completa ruta
2. **Muestra NFTs**: Ve los NFTs generados
3. **Integración social**: Comparte en Farcaster
4. **Explica la tecnología**: Base + Wagmi + Farcaster

### Puntos Clave a Destacar
- ✅ **Stack completo Web3**: Frontend + Smart contracts + Social
- ✅ **Base Network**: Transacciones rápidas y económicas
- ✅ **Farcaster Integration**: Social media descentralizado
- ✅ **Gamificación**: Sistema de puntos y NFTs
- ✅ **Turismo + Web3**: Caso de uso real y escalable

## 🚨 Solución de Problemas

### Error "process is not defined"
✅ **Solucionado**: Configurado Vite con polyfills

### Error de compilación Hardhat
- Usa Remix IDE para despliegue rápido
- O resuelve conflictos de dependencias

### Wallet no conecta
- Verifica que estés en Base Sepolia
- Actualiza MetaMask
- Prueba con Coinbase Wallet

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica que las direcciones de contratos sean correctas
3. Asegúrate de tener ETH en Base Sepolia
4. Verifica las variables de entorno

---

**¡Tu proyecto está listo para la hackathon! 🎉**

**Stack implementado**: ✅ Base + Farcaster + TypeScript/React + Solidity + Wagmi

