# Blood Link — Mobile App (Expo + React Native)

An Expo (React Native) mobile application for the Blood Link project. The app uses Expo Router for navigation, React Query for data fetching, and integrates with Web3 via ethers.js for wallet connectivity and on-chain operations. Web features are supported via a parallel web entry.

Note: This README documents what is detectable from the codebase. Where details are unclear, TODO items have been added for the maintainers to fill in.

## Overview
- Stack: Expo SDK 54, React Native 0.81, React 19, TypeScript
- Router: expo-router (typed routes enabled)
- Web3: ethers.js, optional WalletConnect provider
- State/Networking: @tanstack/react-query, axios, zustand
- Media/Device: assorted Expo modules (camera, image picker, notifications, etc.)
- UI: react-native-reanimated, gesture-handler, vector-icons, lucide-react-native, moti, Skia
- Maps: react-native-maps, react-native-web-maps (web polyfill)
- Uploads: Uploadcare client

Entry points:
- Native/mobile: index.tsx → expo-router/entry → App.tsx wrapper
- Web: index.web.tsx → renderRootComponent(CreateApp)

The app directory layout follows Expo Router conventions under src/app/ with tabs, onboarding, connect-wallet, and profile creation flows.

## Requirements
- Node.js 18 or 20 (LTS) recommended
- npm (package-lock.json present) — project appears to use npm as the package manager
- Expo CLI (via npx is fine; global install optional)
- Platform SDKs as needed:
  - Android Studio + Android SDK for Android builds
  - Xcode for iOS builds (on macOS)

Optional (for builds):
- EAS CLI for cloud building and submission

## Getting Started
1. Install dependencies
   - npm install
2. Apply patches (handled automatically post-install via patch-package)
3. Create a .env file or add environment variables to app config
   - Expo reads env via EXPO_PUBLIC_* at runtime for client-side code

Run in development:
- Start the dev server (Metro) with Expo:
  - npx expo start
- Run on Android:
  - npx expo run:android
- Run on iOS (macOS):
  - npx expo run:ios
- Run on Web:
  - npx expo start --web

Build with EAS (optional):
- Install EAS CLI if needed: npm i -g eas-cli
- Configure/Log in: eas login
- Build (refer to eas.json profiles):
  - Development client: eas build --profile development
  - Preview: eas build --profile preview
  - Production: eas build --profile production

## Scripts
package.json scripts:
- postinstall: patch-package (applies local patches after install)

Commonly used npx expo commands (not declared as scripts):
- npx expo start — Start Metro bundler
- npx expo run:android — Build and run the app on Android
- npx expo run:ios — Build and run the app on iOS
- npx expo start --web — Run the web version
- npx expo prebuild — Generate platform native projects (if needed)

## Environment Variables
The code references the following environment variables (via process.env), generally expected to be available at runtime as EXPO_PUBLIC_* so they are exposed to the app. Populate them in your environment or via app.config/app.json if needed.

Detected keys:
- EXPO_PUBLIC_PROJECT_GROUP_ID — used for auth token keying and headers
- EXPO_PUBLIC_BASE_URL — first-party API base URL
- EXPO_PUBLIC_PROXY_BASE_URL — proxy base URL (used in auth webviews)
- EXPO_PUBLIC_HOST — host header used in various requests
- EXPO_PUBLIC_LOGS_ENDPOINT — remote logging endpoint
- EXPO_PUBLIC_CREATE_TEMP_API_KEY — auth token for logging endpoint
- EXPO_PUBLIC_UPLOADCARE_PUBLIC_KEY — Uploadcare public key
- EXPO_PUBLIC_BASE_CREATE_USER_CONTENT_URL — Upload/user content base URL
- EXPO_PUBLIC_GOOGLE_MAPS_API_KEY — Maps API key for web polyfill

Notes:
- These are referenced in files like src/__create/fetch.ts, src/utils/auth/*.jsx, src/utils/useUpload.js, and polyfills/web/maps.web.jsx.
- Ensure you prefix client-exposed variables with EXPO_PUBLIC_ for Expo runtime availability.

TODOs:
- Document any server-side secrets or build-time variables (if any). None detected here beyond EXPO_PUBLIC_*.

## Web3 Configuration
File: src/services/web3Service.js
- Uses ethers.providers.JsonRpcProvider with a hardcoded RPC_URL (Polygon Mumbai placeholder) and CHAIN_ID 80001.
- Contract addresses BLOOD_DONATION_CONTRACT and DONOR_BADGE_CONTRACT are placeholders.

Recommended actions:
- TODO: Move RPC_URL and CHAIN_ID to environment variables (e.g., EXPO_PUBLIC_RPC_URL, EXPO_PUBLIC_CHAIN_ID).
- TODO: Set deployed contract addresses via env (e.g., EXPO_PUBLIC_BLOOD_DONATION_CONTRACT, EXPO_PUBLIC_DONOR_BADGE_CONTRACT).
- TODO: Confirm WalletConnect configuration and supported chains.

## Project Structure
High-level directories and key files:
- App.tsx — Web wrapper and providers for the app
- index.tsx — Native entry point (registers expo-router entry, error handling)
- index.web.tsx — Web entry point (Skia load, renderRootComponent)
- app.json — Expo app config (plugins, icons, runtimeVersion)
- eas.json — EAS build profiles
- src/
  - app/ — Expo Router routes (tabs, onboarding, connect-wallet, create-profile)
  - services/ — API and Web3 service modules
  - utils/ — auth helpers, upload utility, stores
  - __create/ — polyfills, fetch wrapper, error boundaries
- polyfills/ — platform-specific polyfills (web/native)
- patches/ — patch-package patches (if any)
- assets/ — images and static assets

## Testing
- No test setup or test scripts were detected in this package.
- TODO: Add testing framework (e.g., Jest + @testing-library/react-native) and scripts (npm test) if required.

## Development Notes
- Routing: expo-router with typed routes enabled (see app.json experiments.typedRoutes)
- New Architecture: "newArchEnabled": true in app.json
- Android package (app.json): xyz.create.CreateExpoEnvironment (likely placeholder)
- Many Expo modules are enabled; ensure platform permissions are configured as needed (e.g., camera, notifications)

## Troubleshooting
- If you see missing environment variables errors, confirm your EXPO_PUBLIC_* vars are set.
- When running on web, ensure EXPO_PUBLIC_GOOGLE_MAPS_API_KEY is provided for map features.
- If patches fail after install, inspect the patches/ directory and rerun patch-package as needed.

## License
- No LICENSE file detected in this package.
- TODO: Add a LICENSE file and specify the license here.

## Acknowledgements
- Built with Expo, React Native, and expo-router.
- Uses ethers.js for blockchain interactions and Uploadcare for file uploads.