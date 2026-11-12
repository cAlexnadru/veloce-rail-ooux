# Veloce // Rail — OOUX & Material 3 Expressive Rail Ticketing Redesign

**Lead UX/UI & Visual Designer:** [Alexandru Chiujdea](https://alexandruchiujdea.eu)

A complete Object-Oriented UX (OOUX), Material Design 3 Expressive, and **WCAG 2.2 AAA / EN 301 549** compliant mobile and desktop rail ticketing redesign built to replace legacy European rail apps (Trenitalia case study).

## 🔗 Key Project Links
- 📄 **Full Master UX/OOUX Specification (Google Docs):** [Open Styled Google Doc (Phases 1–6)](https://docs.google.com/document/d/1zOR19xR4WKmk8rKsT_dh0wvG9a-up2bDLVY9ClBnMP4/edit?usp=drivesdk)
- 📘 **Offline Repository Master Spec:** [`docs/VELOCE_RAIL_MASTER_SPECIFICATION.md`](./docs/VELOCE_RAIL_MASTER_SPECIFICATION.md)
- 🧩 **Portfolio Case Study & Inline HTML Embed (`alexandruchiujdea.eu`):** [`docs/phase_7_portfolio_case_study.md`](./docs/phase_7_portfolio_case_study.md)
- ⚡ **Standalone Interactive Embed HTML:** [`public/embed/veloce-card-embed.html`](./public/embed/veloce-card-embed.html)
- 🚀 **Live Fullscreen Demo:** [alexandruchiujdea.eu/demos/veloce-rail](https://alexandruchiujdea.eu/demos/veloce-rail)

## ✨ Architectural Highlights
1. **9 Core OOUX Domain Objects:** Replaces linear wizards with direct manipulation across `Journey`, `Leg`, `TransferNode`, `Station`, `Ticket`, `DigitalCheckIn`, `Seat & Coach`, `PassengerProfile`, and `DisruptionClaim`.
2. **WCAG 2.2 AAA Dual-Mode Palette:** `7.1:1` Light Mode (`#446300` on `#FFFFFF` / `#F4F6F0`) and `15.8:1` Dark Mode (`#BFFF00` on `#0B0C0E` / `#1A1D24`), with tabular numerals (`tabular-nums`) and full Portrait ↔ 12-Column Landscape Split-View reflow (EN 301 549 Clause 11.1.3.4).
3. **Resilient IoT & Tunnel Check-In:** Supports **BLE Station Beacon Auto-Check-In**, **Optimistic Offline Cryptographic Signing (`⚡ Offline Verified`)**, 180° terminal train reversal previews (`Florence Central`), and 1-tap **EU 25% Delay Compensation Claims**.

## 🚀 Local Development
```bash
npm install
npm run dev
```

## 📦 Production Build
```bash
npm run build
```
