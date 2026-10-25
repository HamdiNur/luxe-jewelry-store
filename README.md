# LUXE — Luxury Jewelry & Watch E-Commerce App

**LUXE** is a premium mobile shopping application built with **React Native** and **Expo**. Designed with a minimalist, Scandinavian-inspired editorial aesthetic, the app offers an ultra-luxurious browsing experience for high-end jewelry, fine timepieces, and exclusive membership rewards.

---

## ✨ Features

- **Editorial Visual Experience**: High-resolution, square 1:1 product photography with soft studio lighting and ivory/champagne aesthetics.
- **Categorized Catalog**: Fine rings, necklaces, earrings, bracelets, and luxury watches.
- **Modular Asset Architecture**: Decoupled asset registries (`images.ts`, `collections.ts`, `products.ts`) for clean scaling and asset management.
- **Premium Membership Tier**: Integrated subscription plan cards (`PlanCard`, `BenefitRow`) and automated member discount logic on the cart screen.
- **Interactive UI Components**: Horizonally scrollable collection rows, dynamic section headers with brand logo support, and smooth screen transitions using `expo-image` and `expo-linear-gradient`.

---

## 📁 Project Structure

```text
luxe/
├── assets/
│   └── products/          # High-res 1:1 product photography & logos
├── app/
│   └── (tabs)/            # Main app navigation & cart screen
└── src/
    ├── components/        # Reusable UI components (CollectionsRow, PlanCard, etc.)
    ├── data/              # Decoupled data models (products, collections, images, plans)
    ├── types/             # TypeScript type definitions
    └── utils/             # Pricing calculations & member discount helpers

    🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

Expo Go app on iOS/Android or an emulator

Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/luxe.git](https://github.com/your-username/luxe.git)
cd luxe
Install dependencies:

Bash
npm install
Start the development server:

Bash
npx expo start
Run on mobile or emulator:

Scan the QR code using Expo Go (Android) or the Camera App (iOS).

🛠️ Tech Stack
Framework: React Native / Expo

Styling: Tailwind CSS / NativeWind

Icons & Images: expo-image, expo-linear-gradient

Language: TypeScript