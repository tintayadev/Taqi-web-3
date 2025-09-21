# 🏔️ Taqi Tourism - Web3 Travel Platform

Una plataforma de turismo descentralizada construida en Base que combina exploración del mundo real con tecnología blockchain, NFTs y Farcaster.

## 🌟 Características

- **🎨 NFTs de Artefactos Culturales**: Colecciona NFTs únicos de lugares que visitas
- **🗺️ Rutas Gamificadas**: Completa rutas y gana puntos y créditos
- **🎉 Eventos Sociales**: Participa en eventos culturales y conoce otros viajeros
- **💰 Sistema de Créditos**: Gana y gasta créditos TAQI por actividades
- **📱 Integración Farcaster**: Comparte tus logros en Farcaster
- **🔗 Base Network**: Construido en Base para transacciones rápidas y económicas

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** con **TypeScript**
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos

### Web3
- **Wagmi** + **Viem** para interacciones blockchain
- **Base Sepolia** (testnet) / **Base** (mainnet)
- **MetaMask**, **Coinbase Wallet**, **WalletConnect**

### Smart Contracts
- **Solidity 0.8.24**
- **OpenZeppelin** para contratos estándar
- **Hardhat** para desarrollo y despliegue

### Social
- **Farcaster** para social media descentralizado
- **Neynar API** para integración con Farcaster

## 🚀 Instalación y Configuración

### 1. Clonar y Instalar Dependencias

```bash
git clone <tu-repo>
cd taqi
npm install
```

### 2. Configurar Variables de Entorno

Copia `env.example` a `.env` y configura:

```bash
cp env.example .env
```

Edita `.env` con tus claves:

```env
# Web3 Configuration
VITE_WALLETCONNECT_PROJECT_ID=tu_walletconnect_project_id

# Neynar API (Farcaster)
VITE_NEYNAR_API_KEY=tu_neynar_api_key
VITE_NEYNAR_SIGNER_UUID=tu_neynar_signer_uuid

# Hardhat Configuration
PRIVATE_KEY=tu_private_key_para_deployment
BASESCAN_API_KEY=tu_basescan_api_key
```

### 3. Obtener Claves API

#### WalletConnect
1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Crea un proyecto y obtén tu Project ID

#### Neynar (Farcaster)
1. Ve a [Neynar](https://neynar.com/)
2. Crea una cuenta y obtén tu API key
3. Crea un signer para publicar casts

#### Base Sepolia
1. Obtén ETH de testnet en [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. Obtén tu private key de MetaMask

### 4. Compilar y Desplegar Contratos

```bash
# Compilar contratos
npm run compile

# Desplegar a Base Sepolia
npm run deploy
```

Después del despliegue, actualiza las direcciones de contratos en:
- `src/config/web3.ts`
- Variables de entorno

### 5. Ejecutar la Aplicación

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build
```

## 📱 Uso de la Aplicación

### 1. Conectar Wallet
- Haz clic en "Connect Wallet" en el header
- Selecciona MetaMask, Coinbase Wallet, o WalletConnect
- Asegúrate de estar en Base Sepolia

### 2. Crear Perfil
- Después de conectar tu wallet, crea tu perfil de viajero
- Elige un nombre de usuario único

### 3. Explorar Rutas
- Ve a la sección "Routes"
- Completa rutas para ganar puntos y NFTs
- Cada ruta completada te da créditos TAQI

### 4. Participar en Eventos
- Ve a la sección "Events"
- Únete a eventos culturales
- Gana NFTs de participación

### 5. Coleccionar NFTs
- Ve a la sección "NFTs"
- Ve tus artefactos culturales coleccionados
- Comparte en Farcaster

## 🏗️ Arquitectura de Contratos

### TaqiCredits (ERC20)
- Token de créditos para la plataforma
- Se gana completando rutas y eventos
- Se puede gastar en servicios premium

### TaqiNFT (ERC721)
- NFTs de artefactos culturales
- Categorías: Artifact, Achievement, Route, Event
- Metadata incluye ubicación, puntos, rareza

### TaqiTourism
- Contrato principal que gestiona toda la lógica
- Maneja perfiles de usuario, rutas, eventos
- Coordina recompensas entre contratos

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # Linting
npm run compile      # Compilar contratos
npm run deploy       # Desplegar contratos
npm run test         # Tests de contratos
```

## 🌐 Redes Soportadas

- **Base Sepolia** (84532) - Testnet
- **Base** (8453) - Mainnet

## 📚 Recursos

- [Base Documentation](https://docs.base.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Neynar API](https://docs.neynar.com/)
- [OpenZeppelin](https://docs.openzeppelin.com/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🎯 Roadmap

- [ ] Integración con más redes (Polygon, Arbitrum)
- [ ] Marketplace de NFTs
- [ ] Sistema de reputación
- [ ] Integración con más redes sociales
- [ ] App móvil
- [ ] Realidad aumentada para rutas

---

**¡Explora el mundo, colecciona recuerdos, construye tu legado en Web3! 🌍✨**