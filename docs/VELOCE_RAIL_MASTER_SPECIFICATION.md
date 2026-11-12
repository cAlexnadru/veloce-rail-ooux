# VELOCE // RAIL — Master UX/OOUX Architecture, Material 3 Design System, IoT Prototyping & Pitch Specification (Phases 1–7)

> **Cloud Document Link:** [Open Styled Google Doc Specification](https://docs.google.com/document/d/1zOR19xR4WKmk8rKsT_dh0wvG9a-up2bDLVY9ClBnMP4/edit?usp=drivesdk)
> **Author:** Alexandru Chiujdea (`alexandruchiujdea.eu`) — Lead UX/UI & Visual Designer

---

## PHASE 1: UX Research & Object Discovery

### 1.1 Domain & Mental Model Alignment
- **The Issue:** Legacy rail ticketing applications (such as Trenitalia) mirror internal enterprise databases—splitting `PICO` reservations, `ViaggiaTreno` telemetry, and regional validation rules into disconnected silos—rather than how a passenger experiences a continuous trip.
- **The Fix:** Anchor the entire application around two distinct modes of the user's mental model:
  1. **Calm Discovery & Direct Purchase** (evaluating routes, fares, and seats on a sofa).
  2. **High-Urgency Live Transit HUD** (finding the confirmed track, validating regional tickets, tracking stops, and handling disruptions on a sunlit platform).
- **Literature Validation:**
  - *Richard Caddick & Steve Cable (Communicating the User Experience):* "A task model must identify how a system needs to behave to match user expectations... because things happen when a user wants them to and the information they are after can be found."
  - *Greg Nudelman (Designing Search: UX Strategies for eCommerce Success):* "During a search process, a person's ecommerce search role can change fluidly," requiring interfaces that let users "move fluidly between browsing and searching."

### 1.2 The 9 Core OOUX Domain Objects
1. **Journey (`Viaggio` / Macro Itinerary):** `journey_id`, origin/destination stations, scheduled departure/arrival, total duration, transfer count, $\text{CO}_2$ saved ($\text{kg}$), and `journey_status` (`ON_SCHEDULE`, `DELAYED`, `TIGHT_CONNECTION`, `MISSED_CONNECTION`, `PARTIALLY_CANCELLED`, `FULLY_CANCELLED`).
2. **Leg (`Tratta` / Continuous Transit Segment):** `train_number` (`HS 9614`), `transport_service_type` (High-Speed, Intercity, Regional), scheduled vs. actual timestamps, `delay_minutes`, and `scheduled_departure_platform` vs. `actual_departure_platform`.
3. **Station (`Stazione` / Physical Interchange):** `canonical_name` (`Florence Santa Maria Novella`), `shortName` (`Florence Central`), `exonym_aliases[]` (`"Florence"`, `"Florenz"`), amenities (`VIP Lounge`, `Mobility Assist`, `Free Wi-Fi`, `Baggage Storage`), and live Departure/Arrival Boards.
4. **Ticket & Fare Contract (`Biglietto`):** 6-character `pnr` (`M84K2P`), encrypted UIC 918.3 Aztec `qr_code_payload`, `tariff_base_type` (`Base Flex`, `Saver Semi-Flex`, `Super Saver`, `Regional Pass`), `service_level` (`Standard`, `Premium`, `Quiet Zone`, `Executive`), and `lifecycle_status` (`ISSUED`, `CHECKED_IN`, `USED`, `EXPIRED`, `MODIFIED`, `REFUNDED`).
5. **Digital Check-In (`Convalida Digitale`):** State-dependent regional ticket activation (`PENDING_WINDOW`, `AVAILABLE`, `AUTOMATICALLY_SCHEDULED`, `COMPLETED`, `OFFLINE_SIGNED`, `LOCKED`) with a rotating cryptographic anti-screenshot counter.
6. **Seat & Coach (`Posto e Carrozza`):** `coach_number`, `seat_number` (`11A`), leg-relative `seat_orientation` (`FORWARD_FACING`, `BACKWARD_FACING`), `window_alignment` (`TRUE_WINDOW`, `WALL_OBSTRUCTED`, `AISLE`), and hardware flags (`230V AC`, `USB-C`, `Wheelchair Berth`).
7. **Passenger Profile & Loyalty:** Guest vs. Veloce Gold Member identity, 10-second Passkey onboarding, saved companions, tokenized wallets (`Apple Pay`, `Google Pay`), and redeemable loyalty points (`-€15.00`).
8. **Ancillary Add-On:** `BIKE_SPACE (+€5)`, `PET_PASS (+€10)`, and `Wheelchair Assist` with rolling-stock compatibility validation.
9. **Disruption & Compensation Claim:** Automated EU Regulation 2021/782 delay calculation (`25%` at 60–119 min; `50%` at $\ge 120$ min) with 1-tap payout (`Voucher +10%`, `Card Refund`, `Loyalty Points`).

### 1.3 Hidden Edge-Case Objects Surfaced
- **Transfer Node:** Explicit intermediate wait time, cross-platform walking distance, elevator access, and Minimum Connect Time safety score (`< 8 min` flagged as `TIGHT_CONNECTION`).
- **Dynamic Track Object:** Decouples scheduled track from confirmed track (`<s>11</s> → TRACK 14 · Confirmed 10:48`).
- **Terminal Reversal Node:** Computes seat direction relative to each leg so $180^\circ$ terminal reversals at Florence Central (`FI_SMN`) or Rome Termini are previewed accurately.
- **Offline Cryptographic Check-In Token:** Locally signed hardware-clock token (`⚡ Offline Verified`) allowing legal boarding in rural tunnels with `0G` cellular coverage.

---

## PHASE 2: Branding, WCAG 2.2 AAA Color Tokens & Microcopy

### 2.1 Typography (`8x8px` Spatial Grid & Tabular Numerals)
- **Wordmark:** `Inter Black (900)` with `-0.04em` tracking (`VELOCE // RAIL`).
- **Headings (`Geist` with `font-variant-numeric: tabular-nums`):**
  - **Display HUD:** `36px–48px` / `Bold 700–800` (Track numbers & live countdowns).
  - **H1 Screen Title:** `24px–32px` / `SemiBold 600–800` (Full station titles & screen headers).
  - **H2 Object Header:** `20px–24px` / `SemiBold 600–800` (Journey departure/arrival times).
- **Functional UI (`Inter` with `tabular-nums`):**
  - **Body & Primary Buttons:** `14px–16px` / `Regular 400` & `Bold 700`.
  - **Captions & Telemetry Badges:** `11px–12px` / `SemiBold 600`.

### 2.2 Dual-Mode WCAG 2.2 AAA Color Matrix
| Semantic Role | Light Mode Token | Light Contrast | Dark Mode Token | Dark Contrast | Non-Color Redundancy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Brand / CTA** | `#446300` (Text `#FFFFFF`) | `7.1:1` (AAA) | `#BFFF00` (Text `#0A0C10`) | `15.8:1` (AAA) | High-salience pill shape + action verb |
| **App Canvas** | `#FFFFFF` / `#E6ECE0` | Base | `#0B0C0E` / `#07080A` | Base | N/A |
| **Elevated Card Surface** | `#F4F6F0` | Tonal tint | `#1A1D24` | Lifted slate | `1px` structural border |
| **Primary Text** | `#0A0C10` | `19.8:1` (AAA) | `#F4F6F0` | `17.1:1` (AAA) | Dynamic bolding on times/nouns |
| **Secondary Text** | `#434950` | `7.5:1` (AAA) | `#BEC5CE` | `7.4:1` (AAA) | Top-aligned persistent labels |
| **Validated / Live** | `#035E43` (`#BCECE0` bg) | `7.3:1` (AAA) | `#4ADE80` (`#003825` bg) | `10.8:1` (AAA) | Shield-Check icon (`✔`) + security wave |
| **Warning / Track Switch** | `#8A4B00` (`#FFDEA8` bg) | `7.0:1` (AAA) | `#FFCC4D` (`#422400` bg) | `11.2:1` (AAA) | Warning Triangle (`▲`) + `2px dashed` border |
| **Critical / Disruption** | `#9E0B22` (`#FFDAD9` bg) | `7.6:1` (AAA) | `#FF808B` (`#5C000E` bg) | `7.8:1` (AAA) | Octagon Stop (`■`) + `2px solid` border |

### 2.3 Brand Voice & Scannable English Microcopy Rules
1. **Front-Load Critical Data:** `09:20 · Track 4 (Confirmed) · To Florence Central`.
2. **Use Absolute Lifecycle Verbs:** `Paid · Ticket Valid` and `Checked In · Valid`.
3. **Ultra-Short Button Labels (2–3 Words):** `Buy Ticket`, `Show QR Code`, `Check In Now`, `Claim Refund`.
4. **Glanceable Error Recovery:** `■ Card Declined. Seat 11A held for 09:42. Use Apple Pay or retry card.`

---

## PHASE 3, 4 & 5: Component Architecture, IoT State Machine & Material 3 Motion

- **Progressive Disclosure Journey Cards (Hick's & Miller's Law):** Collapsed cards show strictly 4 data points (Times, Train Badges, Live Status Pill, Lowest Price). Expanding reveals the **2x2 Bento Fare Matrix**, **2x2 Service Class Grid**, and **Ancillary Chips** with generous padding and zero text clipping.
- **In-Bounds Coach & Seat Visualizer (`50x50px` Squircle Nodes):** Uses a responsive 2-column/3-column carriage selector grid and `rounded-[16px]` Material 3 squircle seat nodes with integrated window/wall bars (`teal` vs. `amber`), `⚡` power icons, and automatic passenger incrementing (`1 → 2 Adults`) when tapping a second seat.
- **Full Station Hierarchy on Live HUD:** Always renders both `FROM` (`Rome Termini Central` in smaller secondary text) and `TO DESTINATION` (`Milan Central Station` in full prominent display text) alongside the semantic JSX track switch badge (`11 → TRACK 14`).
- **Empty First-Time Buyer & Guest-vs-Member Flow:** Supports instant Guest checkout without forced registration while showcasing the 4 benefits of a free Veloce Account (automated EU delay refunds, seat memory, 5% cashback points, and cloud tunnel sync) via a 10-second Passkey modal.

---

## PHASE 6: Executive Pitch Summary

- **User Impact:** Reduces booking configuration steps from **8 to 2**, eliminates 15-minute session cart purges, prevents €50 rural tunnel check-in fines, and turns 20-minute delay claims into a single tap.
- **Business Impact:** Recaptures international tourist revenue via multilingual exonym search, recovers declined card checkouts with 1-tap wallet fallbacks, converts guests to loyalty members via Passkeys, and guarantees full **EN 301 549 / WCAG 2.2 AAA** legal compliance.