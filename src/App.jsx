import React, { useState, useEffect } from 'react';
import {
  Train,
  Search,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  OctagonAlert,
  Wifi,
  WifiOff,
  Bluetooth,
  Sun,
  Moon,
  Smartphone,
  Monitor,
  Check,
  X,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Accessibility,
  Bike,
  Dog,
  VolumeX,
  Clock,
  Wallet,
  CreditCard,
  UserPlus,
  Undo2,
  Bell,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Volume2,
  Luggage,
  Compass,
  Award,
  CheckCircle2,
  Layers,
  Maximize2,
  SlidersHorizontal,
  SignalHigh,
  BatteryCharging,
  ArrowLeftRight,
  UserCheck,
  User,
  KeyRound,
  Cloud,
  Gift
} from 'lucide-react';

// ============================================================================
// MOCK DATA & OOUX DOMAIN FIXTURES (100% Pure English Localization)
// ============================================================================

const STATIONS_DB = [
  {
    id: 'RM_TER',
    canonicalName: 'Rome Termini Central',
    shortName: 'Rome Termini',
    exonyms: ['Rome', 'Rome All Stations', 'Termini', 'Rome Central'],
    tier: 'MAJOR_HUB',
    salaBluCode: 'MA_RM01',
    amenities: ['VIP Lounge', 'Mobility Assist', 'Free Wi-Fi', 'Baggage Storage'],
    board: [
      { train: 'HS 9614', dest: 'Milan Central', time: '09:20', platform: '4', scheduledPlatform: '4', delay: 0, status: 'ON TIME' },
      { train: 'IC 588', dest: 'Trieste Central', time: '09:35', platform: '12', scheduledPlatform: '12', delay: 5, status: '+5 MIN' },
      { train: 'REG 12440', dest: 'Viterbo North', time: '09:42', platform: '21', scheduledPlatform: '21', delay: 0, status: 'ON TIME' },
      { train: 'HS 9518', dest: 'Turin Porta Nuova', time: '09:50', platform: '8', scheduledPlatform: '8', delay: 0, status: 'ON TIME' },
    ]
  },
  {
    id: 'FI_SMN',
    canonicalName: 'Florence Santa Maria Novella',
    shortName: 'Florence Central',
    exonyms: ['Florence', 'Florence Central', 'SMN', 'Tuscany Hub'],
    tier: 'MAJOR_HUB',
    salaBluCode: 'MA_FI01',
    isReversalTerminal: true,
    amenities: ['Executive Club', 'Mobility Assist', 'Baggage Storage', 'Free Wi-Fi'],
    board: [
      { train: 'HS 9614', dest: 'Milan Central', time: '11:00', platform: '14', scheduledPlatform: '11', delay: 7, status: 'TRACK SWITCH' },
      { train: 'REG 4032', dest: 'Milan Central', time: '11:15', platform: '12', scheduledPlatform: '12', delay: 0, status: 'CHECK-IN OPEN' },
      { train: 'REG 4036', dest: 'Milan Central', time: '11:45', platform: '9', scheduledPlatform: '9', delay: 0, status: 'ON TIME' },
      { train: 'HS 8509', dest: 'Rome Termini', time: '11:52', platform: '6', scheduledPlatform: '6', delay: 0, status: 'ON TIME' },
    ]
  },
  {
    id: 'MI_CEN',
    canonicalName: 'Milan Central Station',
    shortName: 'Milan Central',
    exonyms: ['Milan', 'Milan Central', 'Lombardy Hub', 'Milano'],
    tier: 'MAJOR_HUB',
    salaBluCode: 'MA_MI01',
    amenities: ['VIP Lounge', 'Mobility Assist', 'Free Wi-Fi', 'Baggage Storage'],
    board: [
      { train: 'HS 9523', dest: 'Naples Central', time: '13:10', platform: '7', scheduledPlatform: '7', delay: 0, status: 'ON TIME' },
      { train: 'EC 314', dest: 'Zurich Main Station', time: '13:25', platform: '15', scheduledPlatform: '15', delay: 0, status: 'ON TIME' },
      { train: 'REG 2104', dest: 'Bergamo Central', time: '13:32', platform: '19', scheduledPlatform: '19', delay: 0, status: 'ON TIME' },
    ]
  },
  {
    id: 'VE_SLU',
    canonicalName: 'Venice Santa Lucia Grand Canal',
    shortName: 'Venice Santa Lucia',
    exonyms: ['Venice', 'Venice Lagoon', 'Santa Lucia', 'Venice Island'],
    tier: 'MAJOR_HUB',
    salaBluCode: 'MA_VE01',
    amenities: ['VIP Lounge', 'Mobility Assist', 'Water Bus Pier', 'Baggage Storage'],
    board: [
      { train: 'HS 9411', dest: 'Rome Termini', time: '10:26', platform: '5', scheduledPlatform: '5', delay: 0, status: 'ON TIME' },
      { train: 'REG 3490', dest: 'Verona Main', time: '10:40', platform: '11', scheduledPlatform: '11', delay: 0, status: 'ON TIME' },
    ]
  }
];

const JOURNEY_OPTIONS = [
  {
    id: 'JRN_PRIMARY',
    depTime: '09:20',
    arrTime: '12:35',
    duration: '3h 15m',
    transfers: 1,
    transferStation: 'Florence Central',
    trains: ['HS 9614', 'REG 4032'],
    baseLowest: 39.90,
    co2Saved: 18.4,
    isPrimary: true,
    tag: 'Fastest Multi-Train'
  },
  {
    id: 'JRN_DIRECT',
    depTime: '09:50',
    arrTime: '12:48',
    duration: '2h 58m',
    transfers: 0,
    transferStation: 'Direct',
    trains: ['HS 9518'],
    baseLowest: 52.00,
    co2Saved: 19.1,
    isPrimary: false,
    tag: 'Direct High-Speed'
  }
];

const FARE_TIERS = [
  {
    id: 'SUPER_ECONOMY',
    label: 'SUPER SAVER',
    basePrice: 39.90,
    flexRule: '✕ Non-refundable',
    changeRule: '✕ Fixed ticket',
    badge: 'Lowest Price'
  },
  {
    id: 'ECONOMY',
    label: 'SAVER SEMI-FLEX',
    basePrice: 54.50,
    flexRule: '✕ Non-refundable',
    changeRule: 'Δ Change + fare diff',
    badge: 'Popular'
  },
  {
    id: 'BASE',
    label: 'FULL FLEXIBLE',
    basePrice: 79.00,
    flexRule: '✓ 80% Cash Refund',
    changeRule: '✓ Free time changes',
    badge: 'Flexible'
  },
  {
    id: 'ORDINARIA',
    label: 'REGIONAL PASS',
    basePrice: 0.00,
    includedLabel: 'Included Leg 2',
    flexRule: '✓ Fixed rate',
    changeRule: '✓ Free train swap',
    badge: 'Leg 2'
  }
];

const SERVICE_LEVELS = [
  { id: 'STANDARD', label: 'Standard', delta: 0, coach: 5, icon: null },
  { id: 'PREMIUM', label: 'Premium', delta: 12, coach: 4, icon: null },
  { id: 'BUSINESS_SILENZIO', label: 'Quiet Zone', delta: 24, coach: 3, icon: 'quiet' },
  { id: 'EXECUTIVE', label: 'Executive', delta: 65, coach: 1, icon: 'sparkles' }
];

const COACHES = [
  { number: 1, name: 'Executive', tag: 'Swivel · Dining', type: 'EXECUTIVE' },
  { number: 2, name: 'Business', tag: 'Spacious 2+1', type: 'BUSINESS' },
  { number: 3, name: 'Quiet Coach', tag: 'Quiet Zone 🔕', type: 'SILENZIO', quiet: true },
  { number: 4, name: 'Dining Car', tag: 'Cafe & Bistro ☕', type: 'BISTRO' },
  { number: 5, name: 'Standard', tag: 'Wheelchair ♿', type: 'PRM', prm: true },
];

const ACCOUNT_BENEFITS = [
  {
    id: 'REFUND',
    title: 'Instant Automated Delay Refunds',
    desc: 'Receive 25%–50% EU delay payouts automatically to your bank card or +10% bonus voucher without filling out forms.'
  },
  {
    id: 'MEMORY',
    title: '1-Tap Companion & Seat Memory',
    desc: 'Remembers your window, forward-facing, and Quiet Zone seat preferences plus family co-travelers.'
  },
  {
    id: 'POINTS',
    title: '5% Cashback in Loyalty Points',
    desc: 'Earn Veloce Gold points on every High-Speed and Regional ticket—redeemable for instant €15+ discounts.'
  },
  {
    id: 'CLOUD',
    title: 'Offline Cloud Pass & Watch Sync',
    desc: 'Syncs encrypted offline check-in tokens across phones and smartwatches even in rural mountain tunnels.'
  }
];

const INITIAL_SEATS_COACH_3 = [
  { id: '10A', row: 10, col: 'A', pos: 'LEFT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'BACKWARD', table: true, status: 'OCCUPIED', power: true },
  { id: '10B', row: 10, col: 'B', pos: 'LEFT_AISLE', windowType: 'AISLE', baseDir: 'BACKWARD', table: true, status: 'AVAILABLE', power: true },
  { id: '10D', row: 10, col: 'D', pos: 'RIGHT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'BACKWARD', table: true, status: 'AVAILABLE', power: true },
  { id: '11A', row: 11, col: 'A', pos: 'LEFT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'FORWARD', table: true, status: 'AVAILABLE', power: true },
  { id: '11B', row: 11, col: 'B', pos: 'LEFT_AISLE', windowType: 'AISLE', baseDir: 'FORWARD', table: true, status: 'AVAILABLE', power: true },
  { id: '11D', row: 11, col: 'D', pos: 'RIGHT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'FORWARD', table: true, status: 'OCCUPIED', power: true },
  { id: '12A', row: 12, col: 'A', pos: 'LEFT_WINDOW', windowType: 'WALL_OBSTRUCTED', baseDir: 'FORWARD', table: false, status: 'AVAILABLE', power: true },
  { id: '12B', row: 12, col: 'B', pos: 'LEFT_AISLE', windowType: 'AISLE', baseDir: 'FORWARD', table: false, status: 'OCCUPIED', power: true },
  { id: '12D', row: 12, col: 'D', pos: 'RIGHT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'FORWARD', table: false, status: 'AVAILABLE', power: true },
  { id: '13A', row: 13, col: 'A', pos: 'LEFT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'FORWARD', table: false, status: 'AVAILABLE', power: true },
  { id: '13B', row: 13, col: 'B', pos: 'LEFT_AISLE', windowType: 'AISLE', baseDir: 'FORWARD', table: false, status: 'AVAILABLE', power: true },
  { id: '13D', row: 13, col: 'D', pos: 'RIGHT_WINDOW', windowType: 'TRUE_WINDOW', baseDir: 'FORWARD', table: false, status: 'AVAILABLE', power: true, prmBerth: true },
];

export default function App() {
  // --------------------------------------------------------------------------
  // 1. MATERIAL 3 VIEWPORT, THEME, ACCOUNT & FLOATING LAB STATE
  // --------------------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(true); // Dark (#BFFF00 on #0B0C0E) or Light (#446300 on #FFFFFF)
  const [viewportMode, setViewportMode] = useState('ANDROID_PORTRAIT'); // 'ANDROID_PORTRAIT' | 'ANDROID_LANDSCAPE' | 'DESKTOP_M3'
  const [showM3Specs, setShowM3Specs] = useState(false); // Decluttered by default; toggleable in Lab Pill
  const [showLabDrawer, setShowLabDrawer] = useState(false); // Sleek Floating Lab Pill Drawer

  const [iotNetwork, setIotNetwork] = useState('ONLINE'); // 'ONLINE' | 'BLE_BEACON' | 'OFFLINE_TUNNEL'
  // telemetryState includes 'EMPTY' so the user can showcase buying a ticket from scratch!
  const [telemetryState, setTelemetryState] = useState('PLATFORM_SWITCH'); // 'EMPTY' | 'ON_SCHEDULE' | 'PLATFORM_SWITCH' | 'MISSED_CONNECTION' | 'DELAY_CLAIM'
  const [accountMode, setAccountMode] = useState('MEMBER'); // 'MEMBER' | 'GUEST'
  const [showAccountSheet, setShowAccountSheet] = useState(false); // Modal / Drawer explaining Guest vs Account benefits & instant sign-up
  const [signupEmail, setSignupEmail] = useState('alex.traveler@velocerail.com');

  const [activeTab, setActiveTab] = useState('DISCOVERY'); // 'DISCOVERY' | 'HUD_WALLET' | 'TABELLONE'
  const [emptyWallet, setEmptyWallet] = useState(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);

  // Container Transform & Celebration Morph States
  const [activeContainerSheet, setActiveContainerSheet] = useState(null); // 'SEAT_MAP' | 'QR_MODAL' | null
  const [bookingConfirmedMorph, setBookingConfirmedMorph] = useState(false); // M3 Expressive Checkout Celebration
  const [checkinAnimating, setCheckinAnimating] = useState(false); // Multi-stage Check-in Morph

  // Screen Reader (ARIA Live) & Haptic Telemetry Log
  const [a11yLogs, setA11yLogs] = useState([
    { id: 1, type: 'polite', text: 'Veloce Rail M3 ready. WCAG 2.2 AAA 7.1:1+ contrast verified.', time: '10:48:02' }
  ]);

  const announceA11y = (text, politeness = 'polite', hapticPattern = 10) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate && hapticPattern) {
        navigator.vibrate(hapticPattern);
      }
    } catch (e) {
      // Ignore hardware vibration restrictions in sandboxed environments
    }
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setA11yLogs(prev => [{ id: Date.now() + Math.random(), type: politeness, text, time: timeStr }, ...prev.slice(0, 3)]);
  };

  // --------------------------------------------------------------------------
  // 2. DISCOVERY & OOUX BOOKING STATE (Progressive Disclosure)
  // --------------------------------------------------------------------------
  const [originQuery, setOriginQuery] = useState('Rome Termini');
  const [destQuery, setDestQuery] = useState('Milan Central');
  const [selectedOrigin, setSelectedOrigin] = useState(STATIONS_DB[0]);
  const [selectedDest, setSelectedDest] = useState(STATIONS_DB[2]);
  const [activeStationDropdown, setActiveStationDropdown] = useState(null); // 'ORIGIN' | 'DEST' | null
  const [boardStation, setBoardStation] = useState(STATIONS_DB[1]); // Default Florence Central for Live Board
  const [strictFilterZeroMatch, setStrictFilterZeroMatch] = useState(false);

  // Progressive Disclosure: Which Journey Card is Expanded (Hick's & Miller's Law)
  const [expandedJourneyId, setExpandedJourneyId] = useState('JRN_PRIMARY'); // 'JRN_PRIMARY' | 'JRN_DIRECT' | null

  // Journey & Fare Selection
  const [selectedFareTier, setSelectedFareTier] = useState('ECONOMY');
  const [selectedServiceLevel, setSelectedServiceLevel] = useState('BUSINESS_SILENZIO');
  const [ancillaries, setAncillaries] = useState({
    bike: false,
    pet: false,
    salaBlu: false
  });
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);

  // Coach & Seat Visualizer State
  const [selectedCoach, setSelectedCoach] = useState(3);
  const [selectedSeats, setSelectedSeats] = useState(['11A']);
  const [passengerCount, setPassengerCount] = useState(1);
  const [autoAddedCompanionBanner, setAutoAddedCompanionBanner] = useState(false);
  const [reversalPreviewLeg, setReversalPreviewLeg] = useState('LEG_1'); // 'LEG_1' | 'LEG_2_REVERSED'
  const [seatHoldSeconds, setSeatHoldSeconds] = useState(588); // 09:48 countdown
  const [seatHoldExpired, setSeatHoldExpired] = useState(false);

  // Checkout & Payment Recovery State
  const [simulateCardDecline, setSimulateCardDecline] = useState(false);
  const [paymentErrorActive, setPaymentErrorActive] = useState(false);

  // --------------------------------------------------------------------------
  // 3. ACTIVE TRAVEL HUD, DIGITAL CHECK-IN & DISRUPTION STATE
  // --------------------------------------------------------------------------
  const [checkinState, setCheckinState] = useState('AVAILABLE'); // 'AVAILABLE' | 'COMPLETED' | 'OFFLINE_SIGNED'
  const [smartBeaconEnabled, setSmartBeaconEnabled] = useState(true);
  const [leg2TrainNumber, setLeg2TrainNumber] = useState('REG 4032');
  const [leg2DepartureTime, setLeg2DepartureTime] = useState('11:15');
  const [leg2Platform, setLeg2Platform] = useState('12');
  const [rebookedAlternate, setRebookedAlternate] = useState(false);
  const [arrivalReminderSet, setArrivalReminderSet] = useState(false);
  const [showStopsLeg1, setShowStopsLeg1] = useState(false);

  // Aztec QR Anti-Screenshot 1Hz Clock
  const [cryptoTick, setCryptoTick] = useState(0);
  const [liveClock, setLiveClock] = useState('10:48:32');

  // EU Disruption Claim State
  const [selectedPayoutMode, setSelectedPayoutMode] = useState('VOUCHER'); // 'VOUCHER' | 'CARD' | 'POINTS'
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // --------------------------------------------------------------------------
  // TIMERS & IOT AUTOMATION HOOKS
  // --------------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoTick(t => (t + 1) % 9999);
      const now = new Date();
      setLiveClock(now.toTimeString().split(' ')[0]);
      setSeatHoldSeconds(prev => {
        if (prev <= 1) {
          setSeatHoldExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // BLE Station Beacon Auto-Check-In Effect
  useEffect(() => {
    if (iotNetwork === 'BLE_BEACON' && smartBeaconEnabled && checkinState === 'AVAILABLE') {
      setCheckinAnimating(true);
      setTimeout(() => {
        setCheckinAnimating(false);
        setCheckinState('COMPLETED');
        announceA11y(
          'Bluetooth Station Beacon detected at Florence Central. Auto-checked in for REG 4032.',
          'assertive',
          [15, 40, 15]
        );
      }, 360);
    }
  }, [iotNetwork, smartBeaconEnabled, checkinState]);

  const triggerSkeletonLoad = () => {
    setIsLoadingSkeleton(true);
    announceA11y('Searching live routes and track telemetry (0-CLS M3 skeleton)...', 'polite', 10);
    setTimeout(() => {
      setIsLoadingSkeleton(false);
      announceA11y('Routes updated with live platform telemetry.', 'polite', 10);
    }, 450);
  };

  const formatHoldTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Price Calculation (Applies €15 Loyalty Points Discount if Member & Toggled)
  const currentFareObj = FARE_TIERS.find(f => f.id === selectedFareTier) || FARE_TIERS[1];
  const currentServiceObj = SERVICE_LEVELS.find(s => s.id === selectedServiceLevel) || SERVICE_LEVELS[2];
  const singleTicketPrice = currentFareObj.basePrice + currentServiceObj.delta;
  const ancillaryTotal = (ancillaries.bike ? 5 : 0) + (ancillaries.pet ? 10 : 0);
  const pointsDiscount = accountMode === 'MEMBER' && useLoyaltyPoints ? 15 : 0;
  const totalCartPrice = Math.max(0, (singleTicketPrice * passengerCount) + ancillaryTotal - pointsDiscount);

  const isWalletEmptyState = emptyWallet || telemetryState === 'EMPTY';

  // Swap Origin & Destination with Spring Feedback
  const handleSwapStations = () => {
    const tempSt = selectedOrigin;
    const tempQ = originQuery;
    setSelectedOrigin(selectedDest);
    setOriginQuery(destQuery);
    setSelectedDest(tempSt);
    setDestQuery(tempQ);
    triggerSkeletonLoad();
    announceA11y(`Swapped route: ${selectedDest.shortName} to ${selectedOrigin.shortName}.`);
  };

  // Direct Manipulation Seat Handler
  const handleSeatClick = (seat) => {
    if (seat.status === 'OCCUPIED') {
      announceA11y(`Seat ${seat.id} is occupied. Choose an open squircle seat.`, 'polite', 20);
      return;
    }

    if (seatHoldExpired) {
      setSeatHoldExpired(false);
      setSeatHoldSeconds(600);
    }

    if (selectedSeats.includes(seat.id)) {
      if (selectedSeats.length === 1) {
        announceA11y(`Seat ${seat.id} remains locked. At least 1 seat required.`, 'polite', 10);
        return;
      }
      const updated = selectedSeats.filter(id => id !== seat.id);
      setSelectedSeats(updated);
      setPassengerCount(updated.length);
      setAutoAddedCompanionBanner(false);
      announceA11y(`Deselected Seat ${seat.id}. Passengers: ${updated.length}.`, 'polite', 10);
    } else {
      const updated = [...selectedSeats, seat.id];
      setSelectedSeats(updated);
      setSeatHoldSeconds(600);
      if (updated.length > passengerCount) {
        setPassengerCount(updated.length);
        setAutoAddedCompanionBanner(true);
        announceA11y(
          `Selected Coach ${selectedCoach} Seat ${seat.id}. Auto-incremented to ${updated.length} Adults (+Companion Emma).`,
          'polite',
          [10, 30, 10]
        );
      } else {
        announceA11y(`Selected Coach ${selectedCoach} Seat ${seat.id}, held for 10m.`, 'polite', 10);
      }
    }
  };

  const handleUndoCompanionSeat = () => {
    setSelectedSeats(prev => [prev[0]]);
    setPassengerCount(1);
    setAutoAddedCompanionBanner(false);
    announceA11y('Reverted to 1 Adult and 1 seat.', 'polite', 10);
  };

  // Celebratory M3 Expressive Checkout Morph -> Live Travel HUD
  const handleCheckout = (bypassError = false) => {
    if (simulateCardDecline && !bypassError) {
      setPaymentErrorActive(true);
      announceA11y('Card Declined. Seat 11A held. Use Apple Pay or another card.', 'assertive', [30, 50, 30]);
      return;
    }
    setPaymentErrorActive(false);
    setEmptyWallet(false);
    if (telemetryState === 'EMPTY') {
      setTelemetryState('ON_SCHEDULE');
    }
    setActiveContainerSheet(null);
    setBookingConfirmedMorph(true);
    announceA11y(
      `Paid · Ticket Valid (Booking M84K2P · Coach ${selectedCoach} Seat ${selectedSeats.join(', ')}). Opening Live HUD...`,
      'assertive',
      [15, 40, 15]
    );
    setTimeout(() => {
      setBookingConfirmedMorph(false);
      setActiveTab('HUD_WALLET');
    }, 950);
  };

  // Multi-Stage M3 Expressive Check-In Animation
  const handleExecuteCheckIn = () => {
    setCheckinAnimating(true);
    setTimeout(() => {
      setCheckinAnimating(false);
      if (iotNetwork === 'OFFLINE_TUNNEL') {
        setCheckinState('OFFLINE_SIGNED');
        announceA11y(
          'Checked In (Offline Verified). Cryptographic token signed via device clock at 11:12.',
          'assertive',
          [15, 40, 15]
        );
      } else {
        setCheckinState('COMPLETED');
        announceA11y(
          `Checked In · Valid for ${leg2TrainNumber}. Anti-screenshot wave active.`,
          'assertive',
          [15, 40, 15]
        );
      }
    }, 340);
  };

  const handleSwapMissedConnection = () => {
    setLeg2TrainNumber('REG 4036');
    setLeg2DepartureTime('11:45');
    setLeg2Platform('9');
    setRebookedAlternate(true);
    setTelemetryState('ON_SCHEDULE');
    setCheckinState('COMPLETED');
    announceA11y(
      'Swapped free to REG 4036 (11:45 · Platform 9). Ticket auto-validated.',
      'assertive',
      [15, 40, 15]
    );
  };

  const isFlorenceTypo =
    originQuery.toLowerCase().includes('florenzce') ||
    destQuery.toLowerCase().includes('florenzce') ||
    destQuery.toLowerCase().includes('florenc');

  // --------------------------------------------------------------------------
  // MATERIAL DESIGN 3 TONAL SURFACE & COLOR TOKENS (WCAG 2.2 AAA Grounded)
  // --------------------------------------------------------------------------
  const m3 = {
    surface: darkMode ? 'bg-[#0B0C0E] text-[#F4F6F0]' : 'bg-[#FFFFFF] text-[#0A0C10]',
    surfaceDim: darkMode ? 'bg-[#07080A] text-[#F4F6F0]' : 'bg-[#E6ECE0] text-[#0A0C10]',
    surfaceContainerLowest: darkMode ? 'bg-[#08090B]' : 'bg-[#FFFFFF]',
    surfaceContainerLow: darkMode
      ? 'bg-[#13151A] border border-[#252932] text-[#F4F6F0]'
      : 'bg-[#F8FAF3] border border-[#DCE3D3] text-[#0A0C10]',
    surfaceContainer: darkMode
      ? 'bg-[#1A1D24] border border-[#2D323E] text-[#F4F6F0]'
      : 'bg-[#F4F6F0] border border-[#D5DDD0] text-[#0A0C10]',
    surfaceContainerHigh: darkMode
      ? 'bg-[#232730] border border-[#363C4A] text-[#F4F6F0]'
      : 'bg-[#EBF0E4] border border-[#C6D1BE] text-[#0A0C10]',
    surfaceContainerHighest: darkMode
      ? 'bg-[#2D323D] text-[#F4F6F0]'
      : 'bg-[#E1E7D8] text-[#0A0C10]',
    heroGradient: darkMode
      ? 'bg-gradient-to-br from-[#1A1D24] via-[#1E260D] to-[#122623] border border-[#324A00]'
      : 'bg-gradient-to-br from-[#F4F6F0] via-[#EBF5D0] to-[#DCF5EF] border border-[#B8D870]',
    primaryBtn: darkMode
      ? 'bg-[#BFFF00] text-[#0A0C10] hover:brightness-105 font-bold shadow-sm'
      : 'bg-[#446300] text-[#FFFFFF] hover:brightness-110 font-bold shadow-sm',
    primaryContainer: darkMode
      ? 'bg-[#324A00] text-[#D8F890] border border-[#BFFF00]/50'
      : 'bg-[#D8F890] text-[#111F00] border border-[#446300]/40',
    primarySelectedCard: darkMode
      ? 'bg-[#253600] text-[#F4F6F0] border-2 border-[#BFFF00]'
      : 'bg-[#E5F9B6] text-[#0A0C10] border-2 border-[#446300]',
    secondaryContainer: darkMode
      ? 'bg-[#28301C] text-[#DCE6C9] border border-[#3E4A2C]'
      : 'bg-[#E2E8D5] text-[#151B0C] border border-[#C2CCB0]',
    tertiaryContainer: darkMode
      ? 'bg-[#003B34] text-[#8CF5E3] border border-[#2DD4BF]/40'
      : 'bg-[#C8F0E8] text-[#00201C] border border-[#0D9488]/40',
    outlinedBtn: darkMode
      ? 'bg-[#13151A] border border-[#8E96A0] text-[#F4F6F0] hover:bg-[#232730]'
      : 'bg-[#FFFFFF] border border-[#5B636A] text-[#0A0C10] hover:bg-[#EBF0E4]',
    onSurface: darkMode ? 'text-[#F4F6F0]' : 'text-[#0A0C10]',
    onSurfaceVariant: darkMode ? 'text-[#BEC5CE]' : 'text-[#434950]',
    validContainer: darkMode
      ? 'bg-[#003825] border-2 border-[#4ADE80] text-[#86EFAC]'
      : 'bg-[#BCECE0] border-2 border-[#035E43] text-[#022C20]',
    warningContainer: darkMode
      ? 'bg-[#422400] border-2 border-dashed border-[#FFCC4D] text-[#FFDE8A]'
      : 'bg-[#FFDEA8] border-2 border-dashed border-[#8A4B00] text-[#3B1E00]',
    errorContainer: darkMode
      ? 'bg-[#5C000E] border-2 border-[#FF808B] text-[#FFD9DC]'
      : 'bg-[#FFDAD9] border-2 border-[#9E0B22] text-[#410006]',
    focusRing: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284C7]'
  };

  // Optional Inline M3 Spec Callout Badge
  const M3SpecBadge = ({ label }) => {
    if (!showM3Specs) return null;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight uppercase shrink-0 ${m3.tertiaryContainer}`}
      >
        <Sparkles className="w-2.5 h-2.5" />
        <span>{label}</span>
      </span>
    );
  };

  // ============================================================================
  // RENDER REUSABLE COACH & SEAT VISUALIZER (Zero-Overflow 412px Geometry)
  // ============================================================================
  const renderCoachSeatVisualizer = (isFullscreenSheet = false) => (
    <section
      aria-label="Material 3 Eurostar-Style Coach and Seat Visualizer"
      className={`rounded-[28px] p-3.5 sm:p-5 ${m3.surfaceContainer} flex flex-col gap-3 m3-container-enter`}
    >
      {/* Top Header with Container Transform Expand/Collapse */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-heading text-base sm:text-lg font-bold tracking-tight truncate">
              Coach {selectedCoach} · Seat Map
            </h2>
            <M3SpecBadge label="Squircle→Pill" />
          </div>
          <p className={`text-[11px] font-medium truncate ${m3.onSurfaceVariant}`}>
            48×48px targets · Tap 2nd seat to add companion
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* 10-Minute Hold Lock Timer Pill */}
          <div
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums flex items-center gap-1 ${
              seatHoldExpired ? m3.errorContainer : m3.validContainer
            }`}
          >
            <Clock className="w-3 h-3 shrink-0" />
            <span>{seatHoldExpired ? '00:00' : formatHoldTime(seatHoldSeconds)}</span>
          </div>

          <button
            onClick={() => {
              const nextState = activeContainerSheet === 'SEAT_MAP' ? null : 'SEAT_MAP';
              setActiveContainerSheet(nextState);
              announceA11y(
                nextState
                  ? 'Expanded Coach Visualizer via M3 Container Transform.'
                  : 'Confirmed seat selection.'
              );
            }}
            aria-label={isFullscreenSheet ? 'Confirm Seat Selection' : 'Expand Seat Map Fullscreen'}
            className={`min-h-[40px] px-3 rounded-full flex items-center justify-center gap-1 text-xs font-bold m3-spring-btn ${
              isFullscreenSheet ? m3.primaryBtn : m3.secondaryContainer
            }`}
          >
            {isFullscreenSheet ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Zero Cart Purge Seat Hold Expiration Recovery Banner */}
      {seatHoldExpired && (
        <div
          role="alert"
          className={`p-3 rounded-[20px] flex flex-wrap items-center justify-between gap-2 m3-container-enter ${m3.errorContainer}`}
        >
          <div className="text-xs min-w-0">
            <span className="font-bold">■ Seat {selectedSeats.join(', ')} Hold Expired.</span> Still open in Coach {selectedCoach}.
          </div>
          <button
            onClick={() => {
              setSeatHoldExpired(false);
              setSeatHoldSeconds(600);
              announceA11y(`Re-locked Seat ${selectedSeats.join(', ')} for 10 minutes.`);
            }}
            className={`min-h-[38px] px-3 py-1 rounded-full font-bold text-xs m3-spring-btn shrink-0 ${m3.primaryBtn}`}
          >
            Re-Lock Seat
          </button>
        </div>
      )}

      {/* Architectural Edge Case #1: M3 Sliding Segmented Switcher for Terminal Reversal (FI_SMN) */}
      <div className={`p-2.5 rounded-[20px] flex flex-col gap-2 ${m3.surfaceContainerHigh}`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />
            <span>Terminal Reversal (Florence Central 180° Flip)</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Leg Direction Preview">
          <button
            onClick={() => {
              setReversalPreviewLeg('LEG_1');
              announceA11y('Leg 1 Rome to Florence: Seat 11A faces Forward.');
            }}
            className={`min-h-[46px] px-3 py-1.5 text-xs font-semibold text-left m3-spring-btn ${
              reversalPreviewLeg === 'LEG_1'
                ? `rounded-[18px] ${m3.primarySelectedCard}`
                : `rounded-[14px] ${m3.surfaceContainerLow}`
            }`}
          >
            <div className="font-bold">▲ Rome → Florence</div>
            <div className={`text-[10px] ${m3.onSurfaceVariant}`}>11A = Forward</div>
          </button>

          <button
            onClick={() => {
              setReversalPreviewLeg('LEG_2_REVERSED');
              announceA11y('Post-Florence reversal: Train flips 180 degrees.');
            }}
            className={`min-h-[46px] px-3 py-1.5 text-xs font-semibold text-left m3-spring-btn ${
              reversalPreviewLeg === 'LEG_2_REVERSED'
                ? `rounded-[18px] ${m3.primarySelectedCard}`
                : `rounded-[14px] ${m3.surfaceContainerLow}`
            }`}
          >
            <div className="font-bold">▼ Post-Florence</div>
            <div className={`text-[10px] ${m3.onSurfaceVariant}`}>Flips 180° Back</div>
          </button>
        </div>
      </div>

      {/* M3 Responsive Carriage Selector Grid (Zero Out-of-Bounds Clipping) */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        role="tablist"
        aria-label="Carriages"
      >
        {COACHES.map((c, idx) => {
          const active = selectedCoach === c.number;
          return (
            <button
              key={c.number}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setSelectedCoach(c.number);
                announceA11y(`Selected Coach ${c.number}: ${c.name}.`);
              }}
              className={`min-h-[54px] px-3 py-2 text-xs font-semibold flex flex-col items-start justify-between overflow-hidden m3-spring-btn ${
                idx === COACHES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
              } ${
                active
                  ? `rounded-[16px] ${m3.primarySelectedCard}`
                  : `rounded-[14px] ${m3.surfaceContainerLow}`
              }`}
            >
              <div className="flex items-center justify-between w-full gap-1">
                <span className="font-bold tabular-nums">Coach {c.number}</span>
                {active && (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${m3.primaryBtn}`}
                  >
                    ✓
                  </span>
                )}
              </div>
              <span className={`text-[10px] leading-snug text-left ${m3.onSurfaceVariant}`}>
                {c.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Non-Color Redundancy Legend (EN 301 549 Clause 11.1.4.1) */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px] px-1 font-semibold">
        <div className="flex items-center gap-1">
          <span className={`w-4 h-4 rounded-[6px] border flex items-center justify-center font-bold ${m3.surfaceContainerLow}`}>
            ▲
          </span>
          <span>Open</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-4 h-4 rounded-[6px] flex items-center justify-center font-bold ${m3.primaryBtn}`}>
            ✓
          </span>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-[5px] border border-dashed hatch-occupied flex items-center justify-center font-bold opacity-75">
            ✕
          </span>
          <span>Taken</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
          <span>Window · ⚡ 230V</span>
        </div>
      </div>

      {/* Organic Fuselage Container (Strictly Fits 412px Android Width with 0 Overflow) */}
      <div className={`p-3 rounded-[22px] ${m3.surfaceContainerLow} flex flex-col gap-2`}>
        {/* Direction of Travel Pill Header */}
        <div
          className={`py-2 px-3.5 rounded-full text-xs font-bold flex items-center justify-between gap-2 ${
            reversalPreviewLeg === 'LEG_1' ? m3.secondaryContainer : m3.warningContainer
          }`}
        >
          <span className="flex items-center gap-1.5">
            {reversalPreviewLeg === 'LEG_1' ? (
              <>
                <ArrowUp className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                <span>Heading to Florence Central</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                <span>Reversed 180° at Florence</span>
              </>
            )}
          </span>
          {selectedCoach === 3 && (
            <span className="flex items-center gap-1 shrink-0 text-[11px]">
              <VolumeX className="w-3.5 h-3.5" />
              <span>Quiet Zone</span>
            </span>
          )}
        </div>

        {/* Top Carriage Fixtures */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
          <div className={`py-1.5 px-2.5 rounded-[12px] border border-dashed flex items-center justify-center gap-1.5 ${m3.onSurfaceVariant}`}>
            <Luggage className="w-3.5 h-3.5 shrink-0" />
            <span>Luggage & Bike</span>
          </div>
          <div className={`py-1.5 px-2.5 rounded-[12px] border border-dashed flex items-center justify-center gap-1.5 ${m3.onSurfaceVariant}`}>
            <Accessibility className="w-3.5 h-3.5 shrink-0" />
            <span>Accessible Restroom ♿</span>
          </div>
        </div>

        {/* Seat Matrix Grid (48x48px hit targets with clean M3 Squircle geometry) */}
        {[10, 11, 12, 13].map(rowNum => {
          const rowSeats = INITIAL_SEATS_COACH_3.filter(s => s.row === rowNum);
          const leftWindow = rowSeats.find(s => s.col === 'A');
          const leftAisle = rowSeats.find(s => s.col === 'B');
          const rightSingle = rowSeats.find(s => s.col === 'D');

          const renderSeatNode = (seat) => {
            if (!seat) return null;
            const isSelected = selectedSeats.includes(seat.id);
            const isOccupied = seat.status === 'OCCUPIED';
            const facesForward =
              (seat.baseDir === 'FORWARD' && reversalPreviewLeg === 'LEG_1') ||
              (seat.baseDir === 'BACKWARD' && reversalPreviewLeg === 'LEG_2_REVERSED');

            return (
              <button
                key={seat.id}
                type="button"
                aria-disabled={isOccupied}
                aria-pressed={isSelected}
                aria-label={`Coach ${selectedCoach}, Seat ${seat.id}, ${
                  seat.windowType === 'TRUE_WINDOW'
                    ? 'True Window'
                    : seat.windowType === 'WALL_OBSTRUCTED'
                    ? 'Wall Obstructed'
                    : 'Aisle'
                }, ${facesForward ? 'Forward' : 'Backward'}, 230V AC, ${
                  isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'
                }`}
                onClick={() => handleSeatClick(seat)}
                className={`relative min-w-[50px] min-h-[50px] w-[50px] h-[50px] px-1.5 py-1 flex flex-col items-center justify-between overflow-hidden m3-spring-btn ${m3.focusRing} ${
                  isSelected
                    ? `rounded-[16px] ${m3.primaryBtn} ring-2 ${darkMode ? 'ring-[#F4F6F0]' : 'ring-[#0A0C10]'} shadow-md`
                    : isOccupied
                    ? 'rounded-[12px] hatch-occupied border border-dashed border-slate-500 opacity-55 cursor-not-allowed'
                    : `rounded-[14px] hover:rounded-[16px] ${m3.surfaceContainerHigh} border hover:border-current`
                }`}
              >
                {/* True Window vs Wall Indicator Bar inside Seat Footprint */}
                {seat.col === 'A' && (
                  <span
                    className={`absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full ${
                      seat.windowType === 'TRUE_WINDOW' ? 'bg-teal-400' : 'bg-amber-500'
                    }`}
                  />
                )}
                {seat.col === 'D' && (
                  <span className="absolute right-1 top-2.5 bottom-2.5 w-1 rounded-full bg-teal-400" />
                )}

                <span className="text-[9px] font-bold leading-none">
                  {isOccupied ? '✕' : isSelected ? '✓' : facesForward ? '▲' : '▼'}
                </span>

                <span className="font-heading text-xs font-extrabold tabular-nums leading-none">
                  {seat.id}
                </span>

                <div className="flex items-center gap-0.5 text-[8px] leading-none opacity-90">
                  {seat.power && <span>⚡</span>}
                  {seat.prmBerth && <span>♿</span>}
                </div>
              </button>
            );
          };

          return (
            <React.Fragment key={rowNum}>
              {rowNum === 11 && (
                <div className="flex items-center justify-between gap-2 my-0.5 px-1">
                  <div className={`flex-1 h-4 rounded-full ${m3.secondaryContainer} flex items-center justify-center text-[9px] font-bold uppercase tracking-wider`}>
                    Vis-à-Vis Table · 230V
                  </div>
                  <div className="w-8" />
                  <div className={`w-12 h-4 rounded-full ${m3.secondaryContainer} flex items-center justify-center text-[9px] font-bold uppercase tracking-wider`}>
                    Table
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  {renderSeatNode(leftWindow)}
                  {renderSeatNode(leftAisle)}
                </div>
                <div className="w-8 text-center font-heading text-[11px] font-bold tabular-nums opacity-45">
                  R{rowNum}
                </div>
                <div className="flex justify-end">
                  {renderSeatNode(rightSingle)}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* M3 Snackbar for Direct Manipulation Companion Auto-Increment */}
      {autoAddedCompanionBanner && (
        <div
          role="status"
          className={`p-3 rounded-[18px] flex items-center justify-between gap-2 m3-container-enter ${m3.validContainer}`}
        >
          <div className="text-xs min-w-0">
            <span className="font-bold">
              ✓ Seat {selectedSeats[selectedSeats.length - 1]} Locked.
            </span>{' '}
            Added 2nd Adult (Companion Emma).
          </div>
          <button
            onClick={handleUndoCompanionSeat}
            className={`min-h-[36px] px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 shrink-0 m3-spring-btn ${m3.outlinedBtn}`}
          >
            <Undo2 className="w-3 h-3" />
            <span>Undo</span>
          </button>
        </div>
      )}
    </section>
  );

  // ============================================================================
  // MAIN APPLICATION CONTENT (Uncluttered Progressive Disclosure & M3 Motion)
  // ============================================================================
  const isLandscapeSplit = viewportMode === 'ANDROID_LANDSCAPE' || viewportMode === 'DESKTOP_M3';

  const renderAppContent = () => (
    <div className="flex flex-col gap-3.5 pb-6">
      {/* =====================================================================
          TAB 1: DISCOVER & BOOK (Hick's & Miller's Law Progressive Disclosure)
      ====================================================================== */}
      {activeTab === 'DISCOVERY' && (
        <div
          className={
            isLandscapeSplit
              ? 'grid grid-cols-12 gap-5 items-start'
              : 'flex flex-col gap-3.5'
          }
        >
          {/* LEFT PANE (7 Cols in Split / Full in Portrait) */}
          <div className={isLandscapeSplit ? 'col-span-7 flex flex-col gap-3.5' : 'flex flex-col gap-3.5'}>
            {/* M3 EXPRESSIVE SEARCH CARD (With Account vs. Guest Switcher) */}
            <section
              aria-label="M3 Expressive Station Search"
              className={`p-4 rounded-[28px] ${m3.heroGradient} flex flex-col gap-3 shadow-sm`}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      style={{ letterSpacing: '-0.04em' }}
                      className="font-ui font-black text-base sm:text-lg tracking-tighter"
                    >
                      VELOCE <span className={darkMode ? 'text-[#BFFF00]' : 'text-[#446300]'}>//</span> RAIL
                    </span>
                    <M3SpecBadge label="AAA 7.1:1" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAccountSheet(true)}
                    className={`text-[11px] font-bold flex items-center gap-1 mt-0.5 underline ${m3.onSurfaceVariant}`}
                  >
                    {accountMode === 'MEMBER' ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Veloce Gold · 2,450 Pts (View Perks)</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Guest Mode · See 4 Account Perks →</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Passenger Counter Chip */}
                <button
                  onClick={() => {
                    const next = passengerCount === 1 ? 2 : 1;
                    setPassengerCount(next);
                    if (next === 2 && selectedSeats.length === 1) {
                      setSelectedSeats(['11A', '11B']);
                    } else if (next === 1) {
                      setSelectedSeats(['11A']);
                    }
                    announceA11y(`Passengers set to ${next} Adult${next > 1 ? 's' : ''}.`);
                  }}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 m3-spring-btn ${m3.surfaceContainerLow}`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="tabular-nums">
                    {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'}
                  </span>
                </button>
              </div>

              {/* Guest Mode Transparency & Account Value Banner */}
              {accountMode === 'GUEST' && (
                <div
                  className={`p-3 rounded-[20px] flex items-center justify-between gap-2.5 m3-container-enter ${m3.surfaceContainerLow}`}
                >
                  <div className="text-xs min-w-0">
                    <span className="font-bold block">Booking as Guest (No Login Required)</span>
                    <span className={`text-[11px] ${m3.onSurfaceVariant}`}>
                      Create a free account to unlock auto-refunds & €15 point discounts.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAccountSheet(true)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 m3-spring-btn ${m3.primaryContainer}`}
                  >
                    Why Sign In?
                  </button>
                </div>
              )}

              {/* Persistent Top-Aligned <label> Station Inputs + Swap Button (Clause 4.1.2) */}
              <div className="flex flex-col gap-2 relative">
                {/* Origin Combobox */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="m3-origin-input"
                    className={`text-[11px] font-bold px-2 ${m3.onSurfaceVariant}`}
                  >
                    From Station (Try "Rome", "Milan", "Venice")
                  </label>
                  <div className="relative">
                    <input
                      id="m3-origin-input"
                      type="text"
                      role="combobox"
                      aria-expanded={activeStationDropdown === 'ORIGIN'}
                      value={originQuery}
                      onFocus={() => setActiveStationDropdown('ORIGIN')}
                      onChange={(e) => {
                        setOriginQuery(e.target.value);
                        setActiveStationDropdown('ORIGIN');
                      }}
                      className={`w-full min-h-[46px] pl-4 pr-12 py-2 rounded-full font-semibold text-xs sm:text-sm ${m3.surfaceContainerLow} ${m3.focusRing}`}
                    />
                    {activeStationDropdown === 'ORIGIN' && (
                      <div
                        role="listbox"
                        className={`absolute left-0 right-0 top-12 z-30 rounded-[24px] shadow-2xl p-2 ${m3.surfaceContainerHigh} m3-container-enter`}
                      >
                        <div className="flex justify-between items-center px-3 py-1 text-[11px] font-bold">
                          <span className={m3.onSurfaceVariant}>Select Departure Station</span>
                          <button
                            onClick={() => setActiveStationDropdown(null)}
                            className="underline px-2 py-0.5"
                          >
                            Close
                          </button>
                        </div>
                        {STATIONS_DB.map(st => (
                          <button
                            key={st.id}
                            role="option"
                            onClick={() => {
                              setSelectedOrigin(st);
                              setOriginQuery(st.shortName);
                              setActiveStationDropdown(null);
                              triggerSkeletonLoad();
                            }}
                            className={`w-full min-h-[46px] p-2.5 rounded-[16px] text-left flex items-center justify-between gap-2 mb-1 m3-spring-btn ${m3.surfaceContainerLow}`}
                          >
                            <span className="font-bold text-xs">{st.canonicalName}</span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${m3.primaryContainer}`}>
                              {st.shortName}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating M3 Swap Stations Button */}
                <button
                  type="button"
                  onClick={handleSwapStations}
                  aria-label="Swap Origin and Destination Stations"
                  className={`self-end -my-3 mr-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md m3-spring-btn ${m3.primaryBtn}`}
                >
                  <ArrowLeftRight className="w-4 h-4 rotate-90" />
                </button>

                {/* Destination Combobox */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="m3-dest-input"
                    className={`text-[11px] font-bold px-2 ${m3.onSurfaceVariant}`}
                  >
                    To Station (Try "Florence" or typo "Florenzce")
                  </label>
                  <div className="relative">
                    <input
                      id="m3-dest-input"
                      type="text"
                      role="combobox"
                      aria-expanded={activeStationDropdown === 'DEST'}
                      value={destQuery}
                      onFocus={() => setActiveStationDropdown('DEST')}
                      onChange={(e) => {
                        setDestQuery(e.target.value);
                        setActiveStationDropdown('DEST');
                      }}
                      className={`w-full min-h-[46px] px-4 py-2 rounded-full font-semibold text-xs sm:text-sm ${m3.surfaceContainerLow} ${m3.focusRing}`}
                    />
                    {activeStationDropdown === 'DEST' && (
                      <div
                        role="listbox"
                        className={`absolute left-0 right-0 top-12 z-30 rounded-[24px] shadow-2xl p-2 ${m3.surfaceContainerHigh} m3-container-enter`}
                      >
                        <div className="flex justify-between items-center px-3 py-1 text-[11px] font-bold">
                          <span className={m3.onSurfaceVariant}>Select Arrival Station</span>
                          <button
                            onClick={() => setActiveStationDropdown(null)}
                            className="underline px-2 py-0.5"
                          >
                            Close
                          </button>
                        </div>
                        {STATIONS_DB.map(st => (
                          <button
                            key={st.id}
                            role="option"
                            onClick={() => {
                              setSelectedDest(st);
                              setDestQuery(st.shortName);
                              setActiveStationDropdown(null);
                              triggerSkeletonLoad();
                            }}
                            className={`w-full min-h-[46px] p-2.5 rounded-[16px] text-left flex items-center justify-between gap-2 mb-1 m3-spring-btn ${m3.surfaceContainerLow}`}
                          >
                            <span className="font-bold text-xs">{st.canonicalName}</span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${m3.primaryContainer}`}>
                              {st.shortName}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Typo Tolerance Suggestion Pill */}
              {isFlorenceTypo && (
                <div
                  role="status"
                  className={`p-3 rounded-[18px] flex flex-wrap items-center justify-between gap-2 m3-container-enter ${m3.warningContainer}`}
                >
                  <div className="text-xs min-w-0">
                    <span className="font-bold">No match "{destQuery}".</span> Did you mean{' '}
                    <strong className="underline">Florence Central</strong>?
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDest(STATIONS_DB[1]);
                      setDestQuery('Florence Central');
                      setActiveStationDropdown(null);
                      announceA11y('Resolved typo to Florence Santa Maria Novella.');
                    }}
                    className={`min-h-[36px] px-3.5 py-1 rounded-full font-bold text-xs m3-spring-btn shrink-0 ${m3.primaryBtn}`}
                  >
                    Use Florence
                  </button>
                </div>
              )}
            </section>

            {/* Partial-Match Zero-Result Recovery Banner */}
            {strictFilterZeroMatch && (
              <div
                role="alert"
                className={`p-3.5 rounded-[22px] flex items-center justify-between gap-2 m3-container-enter ${m3.warningContainer}`}
              >
                <div className="text-xs min-w-0">
                  <p className="font-bold">▲ No Direct Executive Trains After 21:00.</p>
                  <p className="opacity-90">Showing closest Quiet Zone & High-Speed routes:</p>
                </div>
                <button
                  onClick={() => setStrictFilterZeroMatch(false)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-bold text-xs shrink-0 m3-spring-btn ${m3.primaryBtn}`}
                >
                  Reset
                </button>
              </div>
            )}

            {/* ZERO-CLS M3 TONAL SKELETON SHIMMER */}
            {isLoadingSkeleton ? (
              <div
                aria-busy="true"
                className={`p-4 rounded-[28px] ${m3.surfaceContainer} flex flex-col gap-3 animate-pulse`}
              >
                <div className="flex justify-between items-center">
                  <div className="h-7 w-36 rounded-full bg-current opacity-15" />
                  <div className="h-7 w-20 rounded-full bg-current opacity-15" />
                </div>
                <div className="h-16 w-full rounded-[20px] bg-current opacity-10" />
              </div>
            ) : (
              /* PROGRESSIVE DISCLOSURE JOURNEY LIST (Hick's Law & Miller's Law: Max 4 Data Points When Collapsed) */
              <div className="flex flex-col gap-3">
                {JOURNEY_OPTIONS.map((jrn) => {
                  const isExpanded = expandedJourneyId === jrn.id;
                  const displayPrice = jrn.isPrimary
                    ? totalCartPrice
                    : (jrn.baseLowest + currentServiceObj.delta) * passengerCount;

                  return (
                    <article
                      key={jrn.id}
                      aria-label={`Journey ${jrn.depTime} to ${jrn.arrTime}`}
                      className={`rounded-[28px] transition-all duration-300 ${
                        isExpanded
                          ? `${m3.surfaceContainer} ring-2 ${darkMode ? 'ring-[#BFFF00]/60' : 'ring-[#446300]/60'} shadow-lg`
                          : `${m3.surfaceContainerLow} hover:brightness-105`
                      } p-4 flex flex-col gap-3`}
                    >
                      {/* COLLAPSED SUMMARY HEADER (Strictly 4 Scannable Data Points) */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onClick={() => {
                          setExpandedJourneyId(isExpanded ? null : jrn.id);
                          announceA11y(
                            isExpanded
                              ? `Collapsed journey ${jrn.depTime}.`
                              : `Expanded ${jrn.depTime} journey fares and class options.`
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedJourneyId(isExpanded ? null : jrn.id);
                          }
                        }}
                        className="flex items-center justify-between gap-2 cursor-pointer select-none min-w-0"
                      >
                        {/* 1. Front-Loaded Times & Duration + 2. Train Badges */}
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="font-heading text-xl sm:text-2xl font-extrabold tabular-nums tracking-tight">
                              {jrn.depTime} → {jrn.arrTime}
                            </h2>
                            {/* 3. Status Pill */}
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full tabular-nums ${
                                jrn.isPrimary && telemetryState !== 'ON_SCHEDULE' && telemetryState !== 'EMPTY'
                                  ? m3.warningContainer
                                  : m3.validContainer
                              }`}
                            >
                              {jrn.isPrimary && telemetryState !== 'ON_SCHEDULE' && telemetryState !== 'EMPTY'
                                ? '▲ +7m Feeder'
                                : '● On Time'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap text-xs font-semibold tabular-nums">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#9E0B22] text-white text-[10px] font-bold">
                              {jrn.trains[0]}
                            </span>
                            {jrn.trains[1] && (
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m3.primaryContainer}`}>
                                +{jrn.trains[1]}
                              </span>
                            )}
                            <span className={m3.onSurfaceVariant}>
                              · {jrn.duration} · {jrn.transfers === 0 ? 'Direct' : `1 Transfer (${jrn.transferStation})`}
                            </span>
                          </div>
                        </div>

                        {/* 4. Lowest Price CTA Pill */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <span className={`text-[10px] font-bold uppercase block ${m3.onSurfaceVariant}`}>
                              {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'}
                            </span>
                            <span className="font-heading text-lg sm:text-xl font-extrabold tabular-nums">
                              €{displayPrice.toFixed(2)}
                            </span>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                              isExpanded ? `${m3.primaryBtn} rotate-180` : m3.secondaryContainer
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* EXPANDED SELECTION DRAWER (Staggered M3 Accordion) */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-current/10 flex flex-col gap-4 m3-container-enter">
                          {/* Modular Leg Timeline Strip */}
                          <div className={`p-3.5 rounded-[20px] flex flex-col gap-2 text-xs ${m3.surfaceContainerLow}`}>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-bold tabular-nums">
                                09:20 {selectedOrigin.shortName} → 10:55 Florence Central
                              </span>
                              <span className={`font-semibold shrink-0 tabular-nums ${m3.onSurfaceVariant}`}>
                                Coach {selectedCoach} · Seat {selectedSeats.join(', ')}
                              </span>
                            </div>

                            {jrn.transfers > 0 && (
                              <>
                                <div
                                  className={`px-3 py-1.5 rounded-[12px] text-[11px] font-bold flex items-center justify-between gap-2 ${
                                    telemetryState === 'PLATFORM_SWITCH' ? m3.warningContainer : m3.secondaryContainer
                                  }`}
                                >
                                  <span>
                                    {telemetryState === 'PLATFORM_SWITCH'
                                      ? '▲ 6m Transfer · Track 14 → 12'
                                      : '⇄ 20m Transfer · Track 11 → 12'}
                                  </span>
                                  <span className="shrink-0 tabular-nums">Elevator ♿</span>
                                </div>

                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <span className="font-bold tabular-nums">
                                    {leg2DepartureTime} Florence Central → 12:35 {selectedDest.shortName}
                                  </span>
                                  <span className={`font-semibold shrink-0 ${m3.onSurfaceVariant}`}>
                                    Regional Check-In Leg
                                  </span>
                                </div>
                              </>
                            )}
                          </div>

                          {/* 1. 4-Tier Fare Matrix (Roomy 2x2 Bento Grid with generous padding) */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">1. Fare Flexibility</span>
                              <M3SpecBadge label="2x2 Bento Matrix" />
                            </div>
                            <div
                              role="radiogroup"
                              aria-label="Fare Tariff Matrix"
                              className="grid grid-cols-2 gap-2.5"
                            >
                              {FARE_TIERS.map(tier => {
                                const isSelected = selectedFareTier === tier.id;
                                const isOrdinaria = tier.id === 'ORDINARIA';
                                return (
                                  <button
                                    key={tier.id}
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => {
                                      if (!isOrdinaria) {
                                        setSelectedFareTier(tier.id);
                                        announceA11y(`Selected ${tier.label} fare.`);
                                      }
                                    }}
                                    className={`min-h-[82px] p-3.5 text-left flex flex-col justify-between overflow-hidden m3-spring-btn ${
                                      isSelected
                                        ? `rounded-[22px] ${m3.primarySelectedCard}`
                                        : isOrdinaria
                                        ? `rounded-[18px] ${m3.surfaceContainerLow} opacity-80`
                                        : `rounded-[18px] ${m3.surfaceContainerLow}`
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-1.5 w-full">
                                      <span className="font-heading text-[11px] font-bold tracking-tight leading-snug">
                                        {tier.label}
                                      </span>
                                      {isSelected && (
                                        <span
                                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${m3.primaryBtn}`}
                                        >
                                          ✓
                                        </span>
                                      )}
                                    </div>

                                    <div className="my-1">
                                      {isOrdinaria ? (
                                        <span className="text-xs font-bold block">Included Leg 2</span>
                                      ) : (
                                        <span className="font-heading text-base sm:text-lg font-extrabold tabular-nums">
                                          €{(tier.basePrice + currentServiceObj.delta).toFixed(2)}
                                        </span>
                                      )}
                                    </div>

                                    <div className={`text-[10px] leading-snug ${m3.onSurfaceVariant}`}>
                                      {tier.changeRule}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 2. Service Class Selector (SCREENSHOT 2 FIX: Roomy 2x2 Bento Grid with generous padding so labels NEVER overflow) */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">2. Service Class</span>
                              <span className={`text-[11px] font-medium ${m3.onSurfaceVariant}`}>
                                Coach {selectedCoach} assigned
                              </span>
                            </div>
                            <div
                              role="radiogroup"
                              aria-label="Service Class Level"
                              className="grid grid-cols-2 gap-2.5"
                            >
                              {SERVICE_LEVELS.map(lvl => {
                                const active = selectedServiceLevel === lvl.id;
                                return (
                                  <button
                                    key={lvl.id}
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => {
                                      setSelectedServiceLevel(lvl.id);
                                      setSelectedCoach(lvl.coach);
                                      announceA11y(`Selected ${lvl.label}, Coach ${lvl.coach}.`);
                                    }}
                                    className={`min-h-[58px] px-4 py-3 text-left flex items-center justify-between gap-2 overflow-hidden m3-spring-btn ${
                                      active
                                        ? `rounded-[22px] ${m3.primarySelectedCard}`
                                        : `rounded-[18px] ${m3.surfaceContainerLow}`
                                    }`}
                                  >
                                    <div className="flex flex-col min-w-0">
                                      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm leading-snug">
                                        {lvl.icon === 'quiet' && <VolumeX className="w-3.5 h-3.5 shrink-0" />}
                                        {lvl.icon === 'sparkles' && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
                                        <span>{lvl.label}</span>
                                      </div>
                                      <span className={`text-[11px] tabular-nums mt-0.5 ${m3.onSurfaceVariant}`}>
                                        {lvl.delta === 0 ? 'Included' : `+€${lvl.delta}`}
                                      </span>
                                    </div>

                                    {active && (
                                      <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${m3.primaryBtn}`}
                                      >
                                        ✓
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 3. Add-On Services & Fullscreen Seat Visualizer Trigger (Generous Padding) */}
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold">3. Seat & Add-On Options</span>
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => {
                                  setAncillaries(a => ({ ...a, bike: !a.bike }));
                                  announceA11y(`Bike Space ${!ancillaries.bike ? 'Added (+€5)' : 'Removed'}.`);
                                }}
                                className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${
                                  ancillaries.bike ? m3.primarySelectedCard : m3.surfaceContainerLow
                                }`}
                              >
                                <Bike className="w-3.5 h-3.5 shrink-0" />
                                <span>Bike Space +€5</span>
                              </button>

                              <button
                                onClick={() => {
                                  setAncillaries(a => ({ ...a, pet: !a.pet }));
                                  announceA11y(`Pet Pass ${!ancillaries.pet ? 'Added (+€10)' : 'Removed'}.`);
                                }}
                                className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${
                                  ancillaries.pet ? m3.primarySelectedCard : m3.surfaceContainerLow
                                }`}
                              >
                                <Dog className="w-3.5 h-3.5 shrink-0" />
                                <span>Pet Pass +€10</span>
                              </button>

                              <button
                                onClick={() => {
                                  setAncillaries(a => ({ ...a, salaBlu: !a.salaBlu }));
                                  announceA11y(`Mobility Assist ${!ancillaries.salaBlu ? 'Requested' : 'Removed'}.`);
                                }}
                                className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${
                                  ancillaries.salaBlu ? m3.primarySelectedCard : m3.surfaceContainerLow
                                }`}
                              >
                                <Accessibility className="w-3.5 h-3.5 shrink-0" />
                                <span>Wheelchair Assist</span>
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              {/* Container Transform Button for Full-Screen SVG Seat Map */}
                              <button
                                onClick={() => {
                                  setActiveContainerSheet('SEAT_MAP');
                                  announceA11y('Opened Fullscreen SVG Coach Visualizer.');
                                }}
                                className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 m3-spring-btn ${m3.tertiaryContainer}`}
                              >
                                <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                                <span>Coach {selectedCoach} · Seat {selectedSeats.join(', ')} (Change Seat)</span>
                              </button>

                              {/* Member Loyalty Points Redemption Pill */}
                              {accountMode === 'MEMBER' ? (
                                <button
                                  onClick={() => {
                                    setUseLoyaltyPoints(!useLoyaltyPoints);
                                    announceA11y(
                                      !useLoyaltyPoints
                                        ? 'Applied 1,500 Gold Points (-€15.00 discount).'
                                        : 'Removed points discount.'
                                    );
                                  }}
                                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${
                                    useLoyaltyPoints ? m3.validContainer : m3.surfaceContainerLow
                                  }`}
                                >
                                  <Gift className="w-3.5 h-3.5 shrink-0" />
                                  <span>{useLoyaltyPoints ? '✓ -€15 Points Applied' : 'Redeem Pts (-€15)'}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setShowAccountSheet(true)}
                                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${m3.surfaceContainerLow}`}
                                >
                                  <KeyRound className="w-3.5 h-3.5 shrink-0" />
                                  <span>Sign In to Save €15</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Glanceable Payment Error Banner */}
                          {paymentErrorActive && (
                            <div
                              role="alert"
                              className={`p-3.5 rounded-[20px] flex flex-col gap-2 m3-container-enter ${m3.errorContainer}`}
                            >
                              <div className="flex items-start gap-2 text-xs">
                                <OctagonAlert className="w-4 h-4 shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-bold tabular-nums">
                                    ■ Card Declined. Seat {selectedSeats.join(', ')} held for {formatHoldTime(seatHoldSeconds)}.
                                  </p>
                                  <p>Try Apple Pay or another card immediately.</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleCheckout(true)}
                                  className={`min-h-[42px] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 m3-spring-btn ${m3.primaryBtn}`}
                                >
                                  <Wallet className="w-3.5 h-3.5" />
                                  <span>Use Apple Pay</span>
                                </button>
                                <button
                                  onClick={() => handleCheckout(true)}
                                  className={`min-h-[42px] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 m3-spring-btn ${m3.outlinedBtn}`}
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                  <span>Retry Card</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Primary M3 Pill Checkout Row (Fitts's Law Large Targets) */}
                          <div className="grid grid-cols-2 gap-2.5 pt-1">
                            <button
                              onClick={() => handleCheckout(false)}
                              className={`min-h-[50px] px-4 py-2.5 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 m3-spring-btn ${m3.primaryBtn}`}
                            >
                              <span className="tabular-nums">Buy Ticket · €{displayPrice.toFixed(2)}</span>
                              <ArrowRight className="w-4 h-4 shrink-0" />
                            </button>

                            <button
                              onClick={() => handleCheckout(true)}
                              className={`min-h-[50px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 m3-spring-btn ${m3.secondaryContainer}`}
                            >
                              <Wallet className="w-4 h-4 shrink-0" />
                              <span>1-Tap Express Pay</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT PANE (Only visible side-by-side in Landscape Split / Desktop M3 Rail) */}
          {isLandscapeSplit && (
            <div className="col-span-5">
              {renderCoachSeatVisualizer(false)}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: LIVE TRAVEL HUD, ANIMATED TELEMETRY & DIGITAL CHECK-IN
      ====================================================================== */}
      {activeTab === 'HUD_WALLET' && (
        <>
          {isWalletEmptyState ? (
            <section
              aria-label="Empty Ticket Wallet - First Time Buyer State"
              className={`p-6 sm:p-8 rounded-[32px] ${m3.surfaceContainer} text-center flex flex-col items-center gap-4 max-w-md mx-auto m3-container-enter`}
            >
              <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center ${m3.primaryContainer}`}>
                <Train className="w-8 h-8" />
              </div>
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${m3.onSurfaceVariant}`}>
                  {accountMode === 'MEMBER' ? 'Veloce Gold Wallet' : 'Guest Pass Wallet'}
                </span>
                <h1 className="font-heading text-2xl font-bold mt-0.5">No Active Tickets Yet.</h1>
                <p className={`text-xs sm:text-sm mt-1.5 ${m3.onSurfaceVariant}`}>
                  Buy a ticket in under 15 seconds—with or without an account. Your live track telemetry and digital check-in will appear right here.
                </p>
              </div>

              {/* 1-Tap Quick Route Chip */}
              <button
                onClick={() => {
                  setSelectedOrigin(STATIONS_DB[0]);
                  setOriginQuery('Rome Termini');
                  setSelectedDest(STATIONS_DB[2]);
                  setDestQuery('Milan Central');
                  setExpandedJourneyId('JRN_PRIMARY');
                  setActiveTab('DISCOVERY');
                  announceA11y('Loaded popular route: Rome Termini to Milan Central.');
                }}
                className={`w-full min-h-[46px] px-4 py-2.5 rounded-[18px] text-xs font-bold flex items-center justify-between gap-2 m3-spring-btn ${m3.surfaceContainerLow}`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#BFFF00] shrink-0" />
                  <span>Quick Route: Rome Termini → Milan Central</span>
                </span>
                <span className="underline shrink-0">€39.90 →</span>
              </button>

              <div className="flex flex-wrap justify-center gap-2.5 w-full">
                <button
                  onClick={() => {
                    setExpandedJourneyId('JRN_PRIMARY');
                    setActiveTab('DISCOVERY');
                    announceA11y('Switched to Explore to buy your first ticket.');
                  }}
                  className={`flex-1 min-h-[48px] px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm m3-spring-btn ${m3.primaryBtn}`}
                >
                  Buy First Ticket
                </button>
                <button
                  onClick={() => {
                    setEmptyWallet(false);
                    setTelemetryState('PLATFORM_SWITCH');
                    announceA11y('Imported demo booking M84K2P.');
                  }}
                  className={`min-h-[48px] px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm m3-spring-btn ${m3.outlinedBtn}`}
                >
                  Load Demo Pass
                </button>
              </div>

              {/* Guest vs Account Comparison Card Inside Empty State */}
              <div className={`w-full p-4 rounded-[22px] text-left flex flex-col gap-2 ${m3.surfaceContainerLow}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    {accountMode === 'MEMBER' ? (
                      <>
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        <span>Signed In: Veloce Gold Member</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 text-amber-400" />
                        <span>Using as Guest (No Account)</span>
                      </>
                    )}
                  </span>
                  <button
                    onClick={() => setShowAccountSheet(true)}
                    className="text-xs font-bold underline"
                  >
                    {accountMode === 'MEMBER' ? 'View Perks' : 'Compare Benefits'}
                  </button>
                </div>
                <p className={`text-[11px] leading-relaxed ${m3.onSurfaceVariant}`}>
                  {accountMode === 'MEMBER'
                    ? 'Auto-delay payouts, companion seat memory, and 2,450 loyalty points (-€15 discount) are active.'
                    : 'Guests can buy tickets immediately. Create a free account anytime for automatic EU delay refunds & 5% cashback points.'}
                </p>
              </div>
            </section>
          ) : (
            <div
              className={
                isLandscapeSplit
                  ? 'grid grid-cols-12 gap-5 items-start'
                  : 'flex flex-col gap-3.5'
              }
            >
              {/* LEFT PANE (5 Cols in Split): Expressive Hero Boarding Pass & Animated SVG Route Telemetry */}
              <div className={isLandscapeSplit ? 'col-span-5 flex flex-col gap-3.5' : 'flex flex-col gap-3.5'}>
                {/* Automated EU 25% Delay Claim Banner */}
                {telemetryState === 'DELAY_CLAIM' && (
                  <section
                    role="alert"
                    className={`p-4 rounded-[28px] ${m3.errorContainer} flex flex-col gap-3 m3-container-enter`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          EU Reg 2021/782 · Auto-Verified
                        </span>
                        <h2 className="font-heading text-base sm:text-lg font-bold tabular-nums mt-0.5">
                          ■ +65 Min Delay · €{(totalCartPrice * 0.25).toFixed(2)} Refund Ready.
                        </h2>
                      </div>
                      <Award className="w-5 h-5 shrink-0" />
                    </div>

                    {!claimSubmitted ? (
                      <>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'VOUCHER', label: 'Voucher +10%', val: `€${(totalCartPrice * 0.275).toFixed(2)}` },
                            { id: 'CARD', label: 'Card Refund', val: `€${(totalCartPrice * 0.25).toFixed(2)}` },
                            { id: 'POINTS', label: 'Loyalty Pts', val: '+450 Pts' }
                          ].map(mode => (
                            <button
                              key={mode.id}
                              onClick={() => setSelectedPayoutMode(mode.id)}
                              className={`min-h-[48px] p-2.5 text-left text-xs font-semibold m3-spring-btn ${
                                selectedPayoutMode === mode.id
                                  ? `rounded-[18px] ${m3.primarySelectedCard}`
                                  : `rounded-[14px] ${m3.surfaceContainerLow}`
                              }`}
                            >
                              <div className="font-bold tabular-nums">{mode.val}</div>
                              <div className="text-[10px] opacity-80">{mode.label}</div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setClaimSubmitted(true);
                            announceA11y('Refund Claim Paid! Voucher deposited to wallet.', 'assertive', [15, 40, 15]);
                          }}
                          className={`min-h-[46px] w-full py-2 px-4 rounded-full font-bold text-xs sm:text-sm m3-spring-btn ${m3.primaryBtn}`}
                        >
                          Claim Refund
                        </button>
                      </>
                    ) : (
                      <div className={`p-3 rounded-[16px] font-bold text-xs ${m3.validContainer}`}>
                        ✔ Paid · Credit Added to Wallet (Code: VELOCE-994X)
                      </div>
                    )}
                  </section>
                )}

                {/* M3 EXPRESSIVE HERO TICKET CARD (SCREENSHOT 1 FIX: Full FROM & TO Station Names + Proper JSX Track Badge) */}
                <section
                  aria-label="Active Boarding Pass HUD"
                  className={`p-4 sm:p-5 rounded-[32px] ${m3.heroGradient} flex flex-col gap-3.5 shadow-sm`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                        iotNetwork === 'OFFLINE_TUNNEL'
                          ? m3.warningContainer
                          : m3.tertiaryContainer
                      }`}
                    >
                      {iotNetwork === 'ONLINE' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <Wifi className="w-3 h-3" />
                          <span>Live 5G · Rail GPS</span>
                        </>
                      )}
                      {iotNetwork === 'BLE_BEACON' && (
                        <>
                          <span className="w-2 h-2 rounded-full bg-teal-300 animate-ping" />
                          <Bluetooth className="w-3 h-3" />
                          <span>Station Beacon (Florence)</span>
                        </>
                      )}
                      {iotNetwork === 'OFFLINE_TUNNEL' && (
                        <>
                          <WifiOff className="w-3 h-3" />
                          <span>⚡ Offline Tunnel · Signed</span>
                        </>
                      )}
                    </span>

                    <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${m3.surfaceContainerLow}`}>
                      BOOKING: M84K2P
                    </span>
                  </div>

                  {/* SCREENSHOT 1 FIX: Both FROM (smaller) and TO (main display) shown in FULL without truncation + Clean JSX Track Badge */}
                  <div className="flex items-start justify-between gap-3 py-1">
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider block ${m3.onSurfaceVariant}`}>
                        PAID · TICKET VALID
                      </span>

                      {/* FROM Station Displayed in Full (Smaller Secondary Display) */}
                      <div className={`text-xs sm:text-sm font-bold leading-snug break-words ${m3.onSurfaceVariant}`}>
                        <span className="uppercase text-[10px] tracking-wider opacity-80 mr-1.5">FROM</span>
                        <span className={m3.onSurface}>{selectedOrigin.canonicalName}</span>
                      </div>

                      {/* TO Station Displayed in Full (Prominent Main Display - Zero Truncation) */}
                      <div className="mt-0.5">
                        <span className={`uppercase text-[10px] font-extrabold tracking-wider block ${m3.onSurfaceVariant}`}>
                          TO DESTINATION
                        </span>
                        <h1 className="font-heading text-xl sm:text-2xl font-extrabold leading-tight break-words">
                          {selectedDest.canonicalName}
                        </h1>
                      </div>

                      <p className={`text-xs font-semibold tabular-nums mt-1 ${m3.onSurfaceVariant}`}>
                        Coach {selectedCoach} · Seat {selectedSeats.join(', ')} · {currentServiceObj.label}
                      </p>
                    </div>

                    {/* M3 Expressive Organic Platform Badge with Fixed JSX Strikethrough (Zero Raw HTML Strings) */}
                    <div
                      key={telemetryState}
                      className={`px-3.5 py-2.5 rounded-[24px] text-center shrink-0 shadow-sm m3-flip-badge ${
                        telemetryState === 'PLATFORM_SWITCH'
                          ? m3.warningContainer
                          : m3.primaryContainer
                      }`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1">
                        {telemetryState === 'PLATFORM_SWITCH' ? (
                          <>
                            <span className="line-through opacity-75">11</span>
                            <span>→ TRACK</span>
                          </>
                        ) : (
                          <span>TRACK</span>
                        )}
                      </span>
                      <span
                        style={{ fontSize: '36px', lineHeight: '40px' }}
                        className="font-heading font-extrabold tabular-nums block mt-0.5"
                      >
                        {telemetryState === 'PLATFORM_SWITCH' ? '14' : '4'}
                      </span>
                    </div>
                  </div>

                  {/* LIVE ANIMATED SVG TRAIN TELEMETRY PROGRESS TRACK */}
                  <div className={`p-3.5 rounded-[20px] ${m3.surfaceContainerLow} flex flex-col gap-1.5`}>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider flex-wrap">
                      <span>09:20 {selectedOrigin.shortName}</span>
                      <span className={darkMode ? 'text-[#BFFF00]' : 'text-[#446300]'}>
                        ● HS 9614 In Transit (240 km/h)
                      </span>
                      <span>12:35 {selectedDest.shortName}</span>
                    </div>
                    <div className="relative h-5 flex items-center">
                      <svg viewBox="0 0 300 20" className="w-full h-5 overflow-visible">
                        <line x1="10" y1="10" x2="290" y2="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
                        <line
                          x1="10"
                          y1="10"
                          x2="150"
                          y2="10"
                          stroke={darkMode ? '#BFFF00' : '#446300'}
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <circle cx="10" cy="10" r="4" fill={darkMode ? '#BFFF00' : '#446300'} />
                        <circle cx="165" cy="10" r="5" fill={telemetryState === 'PLATFORM_SWITCH' ? '#FFCC4D' : '#94A3B8'} />
                        <circle cx="290" cy="10" r="4" fill="currentColor" fillOpacity="0.4" />
                        <g className="m3-train-glide">
                          <circle cx="120" cy="10" r="9" fill={darkMode ? '#BFFF00' : '#446300'} fillOpacity="0.28" />
                          <circle cx="120" cy="10" r="5" fill={darkMode ? '#BFFF00' : '#446300'} />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Container Transform Trigger -> Fullscreen 100% Brightness Aztec QR */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setActiveContainerSheet('QR_MODAL');
                        announceA11y(
                          'Container Transform: Expanded UIC 918.3 Aztec QR Code at 100% brightness.',
                          'polite',
                          [15, 40, 15]
                        );
                      }}
                      className={`min-h-[48px] w-full py-2.5 px-5 rounded-full text-sm flex items-center justify-center gap-2 m3-spring-btn ${m3.primaryBtn}`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Show QR Code</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setActiveContainerSheet('SEAT_MAP');
                          announceA11y('Opened Coach 3 Seat Visualizer.');
                        }}
                        className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-bold m3-spring-btn ${m3.surfaceContainerLow}`}
                      >
                        View Coach {selectedCoach}
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('DISCOVERY');
                          announceA11y('Opened Ticket Change options.');
                        }}
                        className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-bold m3-spring-btn ${m3.surfaceContainerLow}`}
                      >
                        Change Ticket
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT PANE (7 Cols in Split): Modular Leg Cards & Regional Digital Check-In */}
              <div className={isLandscapeSplit ? 'col-span-7 flex flex-col gap-3.5' : 'flex flex-col gap-3.5'}>
                {/* LEG 1: HIGH-SPEED 1000 */}
                <article
                  aria-label="Leg 1 High-Speed Express"
                  className={`p-4 rounded-[28px] ${m3.surfaceContainer} flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9E0B22] text-white tabular-nums">
                        HS 9614 · Leg 1
                      </span>
                      <span className={`text-xs font-semibold ${m3.onSurfaceVariant}`}>
                        Reserved Seat
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setArrivalReminderSet(!arrivalReminderSet);
                        announceA11y(
                          !arrivalReminderSet
                            ? '10-minute arrival push alert set for Florence Central.'
                            : 'Stop alert removed.'
                        );
                      }}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${
                        arrivalReminderSet ? m3.validContainer : m3.surfaceContainerLow
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{arrivalReminderSet ? '✓ Alert On' : 'Arrival Alert'}</span>
                    </button>
                  </div>

                  {/* Front-Loaded Microcopy */}
                  <div>
                    <p className="font-heading text-base sm:text-lg font-bold tabular-nums">
                      09:20 · Track 4 (Confirmed) · To Florence Central
                    </p>
                    <p className={`text-xs font-medium tabular-nums ${m3.onSurfaceVariant}`}>
                      Scheduled 10:55 · Live{' '}
                      <strong className="font-bold">
                        {telemetryState === 'ON_SCHEDULE' ? '10:55 (On Time)' : '11:02 (+7 Min)'}
                      </strong>
                    </p>
                  </div>

                  {/* Live Platform Switch Banner */}
                  {telemetryState === 'PLATFORM_SWITCH' && (
                    <div
                      role="alert"
                      className={`p-3 rounded-[18px] flex items-start gap-2 m3-flip-badge ${m3.warningContainer}`}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="text-xs tabular-nums">
                        <span className="font-bold">
                          ⚠ Track Changed: <span className="line-through opacity-75">Track 11</span> → Track 14
                        </span>{' '}
                        · Confirmed 10:48.
                      </div>
                    </div>
                  )}

                  {/* Progressive Disclosure Intermediate Stops */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs font-bold tabular-nums ${m3.onSurfaceVariant}`}>
                      Coach {selectedCoach} · Seat {selectedSeats.join(', ')} · Forward ▲
                    </span>
                    <button
                      onClick={() => setShowStopsLeg1(!showStopsLeg1)}
                      className={`text-xs font-bold flex items-center gap-1 underline ${m3.onSurface}`}
                    >
                      <span>{showStopsLeg1 ? 'Hide Stops' : '2 Intermediate Stops'}</span>
                      {showStopsLeg1 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {showStopsLeg1 && (
                    <div className={`p-3 rounded-[16px] flex flex-col gap-1.5 text-xs tabular-nums m3-container-enter ${m3.surfaceContainerLow}`}>
                      <div className="flex justify-between opacity-70">
                        <span>✓ 09:20 {selectedOrigin.shortName}</span>
                        <span>Track 4</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>● 10:22 Bologna Central</span>
                        <span>Track 17</span>
                      </div>
                      <div className="flex justify-between">
                        <span>○ 11:02 Florence Central</span>
                        <span>Track {telemetryState === 'PLATFORM_SWITCH' ? '14' : '11'}</span>
                      </div>
                    </div>
                  )}
                </article>

                {/* TRANSFER NODE / MISSED CONNECTION AUTO-RECOVERY */}
                {telemetryState === 'MISSED_CONNECTION' && !rebookedAlternate ? (
                  <div
                    role="alert"
                    className={`p-4 rounded-[28px] flex flex-col gap-2.5 m3-container-enter ${m3.errorContainer}`}
                  >
                    <div className="flex items-start gap-2">
                      <OctagonAlert className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading text-sm sm:text-base font-bold tabular-nums">
                          ■ Connection Missed at Florence Central.
                        </h3>
                        <p className="text-xs mt-0.5">
                          Board next train free: <strong className="tabular-nums">REG 4036 at 11:45 (Track 9)</strong>.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSwapMissedConnection}
                      className={`min-h-[44px] px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 m3-spring-btn ${m3.primaryBtn}`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Swap to REG 4036 (Free)</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className={`px-4 py-2.5 rounded-full flex items-center justify-between gap-2 text-xs font-bold tabular-nums ${
                      telemetryState === 'PLATFORM_SWITCH' ? m3.warningContainer : m3.secondaryContainer
                    }`}
                  >
                    <span>
                      {telemetryState === 'PLATFORM_SWITCH'
                        ? `▲ 6m Transfer · Track 14 → ${leg2Platform} · Walk Fast`
                        : `⇄ ${rebookedAlternate ? '43m Transfer (Swapped)' : '20m Transfer'} · Track 11 → ${leg2Platform}`}
                    </span>
                    <button
                      onClick={() => {
                        setBoardStation(STATIONS_DB[1]);
                        setActiveTab('TABELLONE');
                      }}
                      className="underline shrink-0"
                    >
                      Station Board →
                    </button>
                  </div>
                )}

                {/* LEG 2: REGIONAL EXPRESS + ANIMATED DIGITAL CHECK-IN */}
                <article
                  aria-label="Leg 2 Regional Digital Check-In"
                  className={`p-4 rounded-[28px] ${m3.surfaceContainer} flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tabular-nums ${m3.primaryContainer}`}>
                      {leg2TrainNumber} · Leg 2
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        checkinState === 'AVAILABLE' ? m3.warningContainer : m3.validContainer
                      }`}
                    >
                      {checkinState === 'AVAILABLE' && '▲ Not Checked In'}
                      {checkinState === 'COMPLETED' && '✔ Checked In · Valid'}
                      {checkinState === 'OFFLINE_SIGNED' && '⚡ Offline Verified'}
                    </span>
                  </div>

                  <div>
                    <p className="font-heading text-base sm:text-lg font-bold tabular-nums">
                      {leg2DepartureTime} · Track {leg2Platform} · To {selectedDest.shortName}
                    </p>
                    <p className={`text-xs font-medium ${m3.onSurfaceVariant}`}>
                      Open seating (2nd Class) · Digital Check-In required
                    </p>
                  </div>

                  {/* M3 Digital Check-In Sub-Container with Animated Security Wave */}
                  <div
                    className={`p-3.5 rounded-[20px] flex flex-col gap-2.5 transition-all duration-300 ${
                      checkinState === 'AVAILABLE' ? m3.surfaceContainerLow : m3.validContainer
                    }`}
                  >
                    {checkinState === 'AVAILABLE' ? (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold">
                            Validate before {leg2DepartureTime} departure
                          </span>
                          <span className={`text-[10px] font-mono ${m3.onSurfaceVariant}`}>
                            {iotNetwork === 'OFFLINE_TUNNEL' ? '⚡ Offline Ready' : 'Beacon Ready'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={handleExecuteCheckIn}
                            disabled={checkinAnimating}
                            className={`min-h-[44px] flex-1 px-4 py-2 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 m3-spring-btn ${m3.primaryBtn}`}
                          >
                            {checkinAnimating ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Signing Token...</span>
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-4 h-4" />
                                <span>
                                  {iotNetwork === 'OFFLINE_TUNNEL' ? 'Check In (Offline Sign)' : 'Check In Now'}
                                </span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setSmartBeaconEnabled(!smartBeaconEnabled);
                              announceA11y(`Smart Station Beacon ${!smartBeaconEnabled ? 'ON' : 'OFF'}.`);
                            }}
                            className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 m3-spring-btn ${m3.outlinedBtn}`}
                          >
                            <Bluetooth className="w-3.5 h-3.5" />
                            <span>Beacon: {smartBeaconEnabled ? 'ON' : 'OFF'}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 m3-container-enter">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            <div className="text-xs tabular-nums min-w-0">
                              <div className="font-bold">
                                {checkinState === 'OFFLINE_SIGNED'
                                  ? `⚡ Offline Signed · ${leg2TrainNumber}`
                                  : `✔ Checked In · ${leg2TrainNumber}`}
                              </div>
                              <div className="text-[11px] opacity-90">
                                {checkinState === 'OFFLINE_SIGNED'
                                  ? 'Clock Verified 11:12:08 · Syncs on 5G'
                                  : `Live Token: ${liveClock} · #${(1000 + cryptoTick).toString(16).toUpperCase()}`}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setCheckinState('AVAILABLE');
                              announceA11y('Check-in undone prior to departure.');
                            }}
                            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 m3-spring-btn ${m3.outlinedBtn}`}
                          >
                            <Undo2 className="w-3 h-3" />
                            <span>Undo</span>
                          </button>
                        </div>

                        {/* Live Animated Anti-Screenshot Security Shimmer Bar */}
                        <div className="h-1.5 w-full rounded-full overflow-hidden bg-black/20">
                          <div className="h-full w-full m3-security-wave" />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </div>
          )}
        </>
      )}

      {/* =====================================================================
          TAB 3: STATION LIVE BOARD (100% English Departures Monitor)
      ====================================================================== */}
      {activeTab === 'TABELLONE' && (
        <section
          aria-label="Station Live Departures Monitor"
          className={`p-4 sm:p-5 rounded-[32px] ${m3.surfaceContainer} flex flex-col gap-3.5 m3-container-enter`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${m3.onSurfaceVariant}`}>
                Live Station Departures · Hub {boardStation.id}
              </span>
              <h1 className="font-heading text-xl sm:text-2xl font-extrabold mt-0.5">
                {boardStation.canonicalName}
              </h1>
            </div>

            {/* Station Switcher Pills */}
            <div className="flex flex-wrap gap-1.5">
              {STATIONS_DB.map(st => (
                <button
                  key={st.id}
                  onClick={() => {
                    setBoardStation(st);
                    announceA11y(`Switched Station Board to ${st.canonicalName}.`);
                  }}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold m3-spring-btn ${
                    boardStation.id === st.id ? m3.primaryBtn : m3.surfaceContainerLow
                  }`}
                >
                  {st.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {boardStation.amenities.map(am => (
              <span key={am} className={`text-[11px] px-3 py-1 rounded-full font-semibold ${m3.secondaryContainer}`}>
                {am}
              </span>
            ))}
          </div>

          {/* Departures Matrix with Kinetic Flip-Board Track Badges */}
          <div className="flex flex-col gap-2">
            <div className={`grid grid-cols-12 text-[10px] font-bold uppercase px-3 py-1 ${m3.onSurfaceVariant}`}>
              <span className="col-span-3">Train</span>
              <span className="col-span-4">Destination</span>
              <span className="col-span-2">Time</span>
              <span className="col-span-3 text-right">Track</span>
            </div>
            {boardStation.board.map(row => {
              const isTrackSwitch = row.status === 'TRACK SWITCH' && telemetryState === 'PLATFORM_SWITCH';
              return (
                <div
                  key={`${row.train}-${telemetryState}`}
                  className={`grid grid-cols-12 items-center p-3 rounded-[18px] text-xs font-semibold tabular-nums ${m3.surfaceContainerLow}`}
                >
                  <span className="col-span-3 font-extrabold">{row.train}</span>
                  <span className="col-span-4 pr-1">{row.dest}</span>
                  <span className="col-span-2">{row.time}</span>
                  <span className="col-span-3 text-right font-heading font-extrabold">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full m3-flip-badge ${
                        isTrackSwitch ? m3.warningContainer : m3.primaryContainer
                      }`}
                    >
                      {isTrackSwitch ? (
                        <span>
                          <span className="line-through opacity-75">{row.scheduledPlatform}</span> → {row.platform}
                        </span>
                      ) : (
                        `Track ${row.platform}`
                      )}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );

  // ============================================================================
  // CONTAINER TRANSFORM OVERLAYS (Seat Map, 100% Brightness QR, Account Sheet)
  // ============================================================================
  const renderContainerTransformOverlays = () => (
    <>
      {/* Celebratory M3 Expressive Booking Confirmed Overlay */}
      {bookingConfirmedMorph && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className={`p-6 rounded-[36px] max-w-xs w-full text-center flex flex-col items-center gap-3 shadow-2xl m3-container-enter ${m3.surfaceContainerHigh}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${m3.primaryBtn}`}>
              <CheckCircle2 className="w-9 h-9 animate-bounce" />
            </div>
            <h2 className="font-heading text-xl font-extrabold">Booking Confirmed!</h2>
            <p className="text-xs font-bold tabular-nums opacity-85">
              Booking: M84K2P · Coach {selectedCoach} · Seat {selectedSeats.join(', ')}
            </p>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${m3.validContainer}`}>
              Opening Live Travel HUD...
            </span>
          </div>
        </div>
      )}

      {/* Fullscreen Container Transform: Guest vs. Member Account Benefits & Instant Sign-Up Sheet */}
      {showAccountSheet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Account and Guest Mode Benefits"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className={`max-w-md w-full my-auto p-5 rounded-[32px] flex flex-col gap-4 shadow-2xl m3-container-enter ${m3.surfaceContainerHigh}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m3.primaryContainer}`}>
                  {accountMode === 'MEMBER' ? <UserCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${m3.onSurfaceVariant}`}>
                    Identity & Loyalty Mode
                  </span>
                  <h2 className="font-heading text-lg font-extrabold">
                    {accountMode === 'MEMBER' ? 'Veloce Gold Member' : 'Guest vs. Free Account'}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setShowAccountSheet(false)}
                aria-label="Close Account Modal"
                className={`w-9 h-9 rounded-full flex items-center justify-center m3-spring-btn ${m3.surfaceContainerLow}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Mode Switcher inside Modal */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-[20px] bg-black/20">
              <button
                onClick={() => {
                  setAccountMode('GUEST');
                  setUseLoyaltyPoints(false);
                  announceA11y('Switched to Guest Mode (No Account).');
                }}
                className={`min-h-[42px] px-3 py-1.5 rounded-[14px] text-xs font-bold flex items-center justify-center gap-1.5 m3-spring-btn ${
                  accountMode === 'GUEST' ? m3.primaryBtn : m3.onSurfaceVariant
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Use Without Account</span>
              </button>
              <button
                onClick={() => {
                  setAccountMode('MEMBER');
                  announceA11y('Signed in to Veloce Gold Account.');
                }}
                className={`min-h-[42px] px-3 py-1.5 rounded-[14px] text-xs font-bold flex items-center justify-center gap-1.5 m3-spring-btn ${
                  accountMode === 'MEMBER' ? m3.primaryBtn : m3.onSurfaceVariant
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Use With Account</span>
              </button>
            </div>

            {/* Why We Allow Guest Mode + 4 Benefits of Creating an Account */}
            <div className={`p-3.5 rounded-[20px] text-xs ${m3.surfaceContainerLow}`}>
              <p className="font-bold">
                ✓ Zero Forced Registration: Buy any train ticket as a Guest in 1 tap.
              </p>
              <p className={`text-[11px] mt-0.5 ${m3.onSurfaceVariant}`}>
                However, creating a free Veloce Account in 10 seconds unlocks 4 automatic travel upgrades:
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {ACCOUNT_BENEFITS.map((b, idx) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-[18px] flex items-start gap-3 ${m3.surfaceContainer}`}
                >
                  <span className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${m3.primaryContainer}`}>
                    {idx + 1}
                  </span>
                  <div className="text-xs">
                    <div className="font-bold">{b.title}</div>
                    <div className={`text-[11px] leading-snug mt-0.5 ${m3.onSurfaceVariant}`}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* How to Create an Account / Sign In in 10 Seconds */}
            {accountMode === 'GUEST' ? (
              <div className={`p-3.5 rounded-[22px] flex flex-col gap-2.5 ${m3.primaryContainer}`}>
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Create Free Account in 10 Seconds
                </span>
                <input
                  type="email"
                  aria-label="Email address for quick account creation"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={`w-full min-h-[42px] px-3.5 py-1.5 rounded-full text-xs font-semibold ${m3.surfaceContainerLow}`}
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setAccountMode('MEMBER');
                      setUseLoyaltyPoints(true);
                      setShowAccountSheet(false);
                      announceA11y('Account created via Passkey! 2,450 Gold Points & -€15 discount unlocked.', 'assertive', [15, 40, 15]);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 m3-spring-btn ${m3.primaryBtn}`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>1-Tap Passkey</span>
                  </button>
                  <button
                    onClick={() => {
                      setAccountMode('MEMBER');
                      setShowAccountSheet(false);
                      announceA11y('Signed in with Google Wallet.');
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 m3-spring-btn ${m3.outlinedBtn}`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Google / Apple</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-3.5 rounded-[20px] flex items-center justify-between gap-2 ${m3.validContainer}`}>
                <div className="text-xs">
                  <span className="font-bold block">✔ Signed In · Alex Traveler (Gold)</span>
                  <span className="text-[11px] opacity-90">2,450 Points available · Auto-refunds active</span>
                </div>
                <button
                  onClick={() => setShowAccountSheet(false)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold m3-spring-btn ${m3.primaryBtn}`}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Container Transform: Seat Map */}
      {activeContainerSheet === 'SEAT_MAP' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Coach and Seat Map"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="max-w-md w-full my-auto">
            {renderCoachSeatVisualizer(true)}
          </div>
        </div>
      )}

      {/* Fullscreen Container Transform: 100% Brightness UIC 918.3 Aztec QR with Optical Scanner Sweep */}
      {activeContainerSheet === 'QR_MODAL' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aztec QR Code Inspection"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Forced Pure White #FFFFFF Container for Optical Scanner Reliability */}
          <div className="bg-[#FFFFFF] text-[#0A0C10] border-4 border-[#BFFF00] rounded-[36px] max-w-sm w-full p-5 flex flex-col gap-3.5 shadow-2xl m3-container-enter">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#BCECE0] text-[#022C20] border border-[#035E43] text-xs font-bold flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                <span>☀ 100% Brightness Lock</span>
              </span>
              <button
                onClick={() => setActiveContainerSheet(null)}
                aria-label="Close QR Modal"
                className="min-w-[40px] min-h-[40px] rounded-full border-2 border-[#0A0C10] flex items-center justify-center font-bold m3-spring-btn hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#434950]">
                UIC 918.3 Cryptographic Pass
              </p>
              <h2 className="font-heading text-xl font-extrabold tabular-nums mt-0.5">
                BOOKING: M84K2P · {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'}
              </h2>
              <p className="text-xs font-bold text-[#434950] tabular-nums mt-0.5">
                HS 9614 (Coach {selectedCoach}, Seat {selectedSeats.join(', ')}) + {leg2TrainNumber}
              </p>
            </div>

            {/* Aztec Barcode with Animated Optical Laser Sweep */}
            <div className="relative mx-auto p-3.5 bg-[#FFFFFF] border-2 border-[#0A0C10] rounded-[24px] flex flex-col items-center overflow-hidden">
              <div className="m3-laser-sweep" />
              <svg
                viewBox="0 0 120 120"
                className="w-44 h-44"
                role="img"
                aria-label="Aztec 2D Barcode for PNR M84K2P"
              >
                <rect width="120" height="120" fill="#FFFFFF" />
                <rect x="36" y="36" width="48" height="48" fill="#0A0C10" />
                <rect x="42" y="42" width="36" height="36" fill="#FFFFFF" />
                <rect x="48" y="48" width="24" height="24" fill="#0A0C10" />
                <rect x="54" y="54" width="12" height="12" fill="#FFFFFF" />
                <rect x="57" y="57" width="6" height="6" fill="#0A0C10" />
                {Array.from({ length: 14 }).map((_, r) =>
                  Array.from({ length: 14 }).map((__, c) => {
                    if (r >= 3 && r <= 10 && c >= 3 && c <= 10) return null;
                    const bit = (r * 17 + c * 31 + cryptoTick) % 3 === 0;
                    if (!bit) return null;
                    return (
                      <rect
                        key={`${r}-${c}`}
                        x={8 + c * 7.5}
                        y={8 + r * 7.5}
                        width="6"
                        height="6"
                        fill="#0A0C10"
                      />
                    );
                  })
                )}
              </svg>

              <div className="mt-2.5 w-full px-3 py-1 rounded-full bg-[#0A0C10] text-[#BFFF00] text-[11px] font-bold tabular-nums flex items-center justify-between">
                <span>TOKEN #{(4096 + cryptoTick).toString(16).toUpperCase()}</span>
                <span>{liveClock}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  announceA11y('Added ticket to Google Wallet.');
                  setActiveContainerSheet(null);
                }}
                className="min-h-[44px] px-3 py-2 rounded-full bg-[#446300] text-[#FFFFFF] font-bold text-xs flex items-center justify-center gap-1.5 m3-spring-btn"
              >
                <Wallet className="w-4 h-4" />
                <span>Google Wallet</span>
              </button>
              <button
                onClick={() => setActiveContainerSheet(null)}
                className="min-h-[44px] px-3 py-2 rounded-full border-2 border-[#0A0C10] text-[#0A0C10] font-bold text-xs m3-spring-btn"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // ============================================================================
  // M3 BOTTOM NAVIGATION BAR (For Mobile Portrait - 100% English Labels)
  // ============================================================================
  const renderM3BottomNavigationBar = () => (
    <nav
      aria-label="Material 3 Bottom Navigation Bar"
      className={`border-t px-3 py-1.5 flex items-center justify-around ${m3.surfaceContainerHigh}`}
    >
      {[
        { id: 'DISCOVERY', label: 'Explore', icon: Search },
        { id: 'HUD_WALLET', label: 'Live HUD', icon: QrCode, badge: !isWalletEmptyState ? '2' : null },
        { id: 'TABELLONE', label: 'Live Board', icon: Compass }
      ].map(item => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              announceA11y(`Navigated to ${item.label}.`);
            }}
            className="flex flex-col items-center gap-0.5 py-1 min-w-[72px] m3-spring-btn group"
          >
            {/* M3 64x32px Active Pill Indicator */}
            <div
              className={`relative w-16 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                active ? `${m3.primaryContainer} scale-105` : 'group-hover:bg-current/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.badge && (
                <span className={`absolute -top-1 right-2 px-1.5 rounded-full text-[10px] font-extrabold ${m3.primaryBtn}`}>
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[11px] font-bold ${active ? m3.onSurface : m3.onSurfaceVariant}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${m3.surfaceDim} font-ui flex flex-col relative`}>
      {/* Material 3 Expressive Spring Physics & Keyframe Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@600;700;800&family=Inter:wght@400;500;600;700;900&display=swap');
        .font-heading { font-family: 'Geist', 'Inter', system-ui, sans-serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .m3-spring-btn {
          transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-radius 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      background-color 150ms cubic-bezier(0.2, 0, 0, 1);
        }
        .m3-spring-btn:active {
          transform: scale(0.94);
        }
        @keyframes m3ContainerExpand {
          0% { opacity: 0; transform: scale(0.93) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .m3-container-enter {
          animation: m3ContainerExpand 260ms cubic-bezier(0.2, 0, 0, 1) forwards;
        }
        @keyframes m3FlipIn {
          0% { transform: perspective(400px) rotateX(-65deg) scale(0.92); opacity: 0.3; }
          100% { transform: perspective(400px) rotateX(0deg) scale(1); opacity: 1; }
        }
        .m3-flip-badge {
          animation: m3FlipIn 360ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes m3TrainPulse {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(18px); }
        }
        .m3-train-glide {
          animation: m3TrainPulse 3.2s ease-in-out infinite;
        }
        @keyframes m3SecurityWave {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .m3-security-wave {
          background: linear-gradient(90deg, #BFFF00, #2DD4BF, #4ADE80, #BFFF00);
          background-size: 200% 100%;
          animation: m3SecurityWave 2.2s linear infinite;
        }
        @keyframes m3LaserSweep {
          0%, 100% { top: 8%; opacity: 0.75; }
          50% { top: 84%; opacity: 0.95; }
        }
        .m3-laser-sweep {
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #446300, #BFFF00, #446300, transparent);
          box-shadow: 0 0 8px #446300;
          animation: m3LaserSweep 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        .hatch-occupied {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            rgba(148, 163, 184, 0.28) 5px,
            rgba(148, 163, 184, 0.28) 10px
          );
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* =====================================================================
          SLEEK FLOATING M3 LAB & TELEMETRY SIMULATOR PILL (Eliminates Top Clutter)
      ====================================================================== */}
      <div className="fixed top-3 right-3 z-40 flex flex-col items-end gap-2">
        <div
          role="toolbar"
          aria-label="Material 3 Viewport and Lab Controls"
          className={`px-2 py-1.5 rounded-full shadow-xl flex items-center gap-1 text-xs ${m3.surfaceContainerHigh}`}
        >
          {/* Viewport Switcher */}
          {[
            { id: 'ANDROID_PORTRAIT', label: 'Mobile', icon: Smartphone },
            { id: 'ANDROID_LANDSCAPE', label: 'Split', icon: Layers },
            { id: 'DESKTOP_M3', label: 'Desktop', icon: Monitor }
          ].map(vp => {
            const Icon = vp.icon;
            const active = viewportMode === vp.id;
            return (
              <button
                key={vp.id}
                onClick={() => {
                  setViewportMode(vp.id);
                  announceA11y(`Viewport: ${vp.label}.`);
                }}
                className={`min-h-[32px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 m3-spring-btn ${
                  active ? m3.primaryBtn : 'opacity-80 hover:opacity-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{vp.label}</span>
              </button>
            );
          })}

          <div className="h-4 w-[1px] bg-current opacity-20 mx-0.5" />

          {/* Theme Switcher */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              announceA11y(`Theme: ${!darkMode ? 'Dark (#BFFF00)' : 'Light (#446300)'}.`);
            }}
            aria-label="Toggle Light or Dark Theme"
            className={`min-h-[32px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 m3-spring-btn ${m3.secondaryContainer}`}
          >
            {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Toggle Lab Drawer */}
          <button
            onClick={() => setShowLabDrawer(!showLabDrawer)}
            aria-expanded={showLabDrawer}
            className={`min-h-[32px] px-3 py-1 rounded-full font-bold flex items-center gap-1 m3-spring-btn ${
              showLabDrawer ? m3.primaryBtn : m3.tertiaryContainer
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Lab</span>
          </button>
        </div>

        {/* Floating M3 Popover Drawer for IoT, Telemetry, Empty State & Account Login */}
        {showLabDrawer && (
          <div
            role="region"
            aria-label="IoT and Live Dispatch Simulator"
            className={`w-76 sm:w-84 p-4 rounded-[28px] shadow-2xl flex flex-col gap-3 text-xs m3-container-enter ${m3.surfaceContainerHigh}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm">UX & IoT State Simulator</span>
              <button
                onClick={() => setShowLabDrawer(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-current/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. IoT Network Selector */}
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-bold uppercase ${m3.onSurfaceVariant}`}>
                1. Station / Tunnel IoT Signal
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'ONLINE', label: '5G Live', icon: Wifi },
                  { id: 'BLE_BEACON', label: 'Beacon', icon: Bluetooth },
                  { id: 'OFFLINE_TUNNEL', label: 'Tunnel 0G', icon: WifiOff }
                ].map(net => {
                  const Icon = net.icon;
                  return (
                    <button
                      key={net.id}
                      onClick={() => {
                        setIotNetwork(net.id);
                        announceA11y(`IoT Network: ${net.label}.`);
                      }}
                      className={`min-h-[38px] px-2.5 py-1.5 rounded-full font-bold flex items-center justify-center gap-1 text-[11px] m3-spring-btn ${
                        iotNetwork === net.id ? m3.primaryBtn : m3.surfaceContainerLow
                      }`}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span>{net.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Live Dispatch State (Now includes EMPTY for First-Time Ticket Purchase Flow) */}
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-bold uppercase ${m3.onSurfaceVariant}`}>
                2. Live Dispatch State (Includes Empty)
              </span>
              <select
                aria-label="Live Dispatch Scenario"
                value={telemetryState}
                onChange={(e) => {
                  const val = e.target.value;
                  setTelemetryState(val);
                  setRebookedAlternate(false);
                  if (val === 'EMPTY') {
                    setEmptyWallet(true);
                    setActiveTab('HUD_WALLET');
                  } else {
                    setEmptyWallet(false);
                  }
                  announceA11y(`Dispatch state set to ${val}.`, 'assertive');
                }}
                className={`min-h-[40px] px-3.5 py-2 rounded-full font-bold text-xs ${m3.surfaceContainerLow}`}
              >
                <option value="EMPTY">○ Empty (Buy First Ticket Flow)</option>
                <option value="ON_SCHEDULE">● On Schedule (Normal Transit)</option>
                <option value="PLATFORM_SWITCH">⚠ Track Switch (11→14) + 6m Transfer</option>
                <option value="MISSED_CONNECTION">■ Missed Connection (Free Swap)</option>
                <option value="DELAY_CLAIM">■ +65m Delay (EU 25% Claim)</option>
              </select>
            </div>

            {/* 3. Account vs. Guest Mode Toggle */}
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-bold uppercase ${m3.onSurfaceVariant}`}>
                3. Account vs. Guest Experience
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setAccountMode('GUEST');
                    setUseLoyaltyPoints(false);
                    announceA11y('Switched to Guest Mode (No Account).');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] flex items-center justify-center gap-1 m3-spring-btn ${
                    accountMode === 'GUEST' ? m3.primaryBtn : m3.surfaceContainerLow
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Guest (No Login)</span>
                </button>
                <button
                  onClick={() => {
                    setAccountMode('MEMBER');
                    announceA11y('Switched to Logged-In Gold Member.');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] flex items-center justify-center gap-1 m3-spring-btn ${
                    accountMode === 'MEMBER' ? m3.primaryBtn : m3.surfaceContainerLow
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Member (Gold)</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setShowAccountSheet(true);
                  setShowLabDrawer(false);
                }}
                className={`mt-1 min-h-[36px] px-3 py-1 rounded-full font-bold text-[11px] underline ${m3.secondaryContainer}`}
              >
                Open Account Benefits & Sign-Up Modal →
              </button>
            </div>

            {/* 4. Edge-Case Stress Tests */}
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-bold uppercase ${m3.onSurfaceVariant}`}>
                4. Edge-Case Stress Tests
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setSeatHoldSeconds(0);
                    setSeatHoldExpired(true);
                    announceA11y('Simulated 00:00 seat hold expiration.', 'assertive');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] m3-spring-btn ${m3.surfaceContainerLow}`}
                >
                  Expire Seat Hold
                </button>

                <button
                  onClick={() => setSimulateCardDecline(!simulateCardDecline)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] m3-spring-btn ${
                    simulateCardDecline ? m3.errorContainer : m3.surfaceContainerLow
                  }`}
                >
                  {simulateCardDecline ? '■ Decline: ON' : 'Decline Card'}
                </button>

                <button
                  onClick={() => setStrictFilterZeroMatch(!strictFilterZeroMatch)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] m3-spring-btn ${
                    strictFilterZeroMatch ? m3.warningContainer : m3.surfaceContainerLow
                  }`}
                >
                  0-Match Recovery
                </button>

                <button
                  onClick={() => setShowM3Specs(!showM3Specs)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-full font-bold text-[11px] m3-spring-btn ${
                    showM3Specs ? m3.tertiaryContainer : m3.surfaceContainerLow
                  }`}
                >
                  M3 Specs: {showM3Specs ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          VIEWPORT SHELL: ANDROID DEVICE FRAME vs FULLSCREEN M3 DESKTOP RAIL
      ====================================================================== */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        {viewportMode === 'ANDROID_PORTRAIT' && (
          /* 1. ANDROID MOBILE PORTRAIT DEVICE FRAME (412px x 820px) - Fits 100% in view */
          <div
            className={`w-full max-w-[412px] h-[820px] max-h-[92vh] rounded-[44px] border-[6px] ${
              darkMode ? 'border-[#2D323D]' : 'border-[#333842]'
            } shadow-2xl overflow-hidden flex flex-col relative ${m3.surface}`}
          >
            {/* Android Status Bar + Camera Cutout */}
            <div className={`px-6 pt-2.5 pb-1.5 flex items-center justify-between text-[11px] font-bold select-none shrink-0 ${m3.surfaceContainerLow}`}>
              <span className="tabular-nums">10:48</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700" title="Android Front Camera" />
              <div className="flex items-center gap-1.5">
                <SignalHigh className="w-3.5 h-3.5" />
                <span>5G</span>
                <BatteryCharging className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable Mobile Viewport Body */}
            <main className="flex-1 overflow-y-auto px-3.5 pt-3 no-scrollbar">
              {renderAppContent()}
            </main>

            {/* Sticky M3 Bottom Navigation Bar */}
            <div className="shrink-0">
              {renderM3BottomNavigationBar()}
              {/* Android Gesture Navigation Pill */}
              <div className={`py-1.5 flex justify-center ${m3.surfaceContainerHigh}`}>
                <div className="w-28 h-1 rounded-full bg-current opacity-40" />
              </div>
            </div>
          </div>
        )}

        {viewportMode === 'ANDROID_LANDSCAPE' && (
          /* 2. ANDROID LANDSCAPE SPLIT VIEW FRAME (980px x 540px - EN 301 549 Clause 11.1.3.4) */
          <div
            className={`w-full max-w-[980px] h-[560px] max-h-[88vh] rounded-[40px] border-[6px] ${
              darkMode ? 'border-[#2D323D]' : 'border-[#333842]'
            } shadow-2xl overflow-hidden flex flex-row relative ${m3.surface}`}
          >
            {/* Left Compact M3 Navigation Rail inside Android Landscape */}
            <aside className={`w-20 border-r py-4 flex flex-col items-center justify-between shrink-0 ${m3.surfaceContainerLow}`}>
              <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center font-black ${m3.primaryBtn}`}>
                <Train className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'DISCOVERY', label: 'Explore', icon: Search },
                  { id: 'HUD_WALLET', label: 'Live HUD', icon: QrCode },
                  { id: 'TABELLONE', label: 'Board', icon: Compass }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="flex flex-col items-center gap-1 m3-spring-btn"
                    >
                      <div className={`w-12 h-8 rounded-full flex items-center justify-center ${active ? m3.primaryContainer : ''}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] font-mono opacity-60">10:48</span>
            </aside>

            <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
              {renderAppContent()}
            </main>
          </div>
        )}

        {viewportMode === 'DESKTOP_M3' && (
          /* 3. FULLSCREEN M3 CANONICAL DESKTOP / TABLET LAYOUT (m3.material.io style) */
          <div className={`w-full max-w-7xl min-h-[86vh] rounded-[36px] overflow-hidden flex flex-col md:flex-row border shadow-xl ${m3.surface}`}>
            {/* M3 Left Navigation Rail + Extended FAB */}
            <aside
              aria-label="Material 3 Navigation Rail"
              className={`md:w-24 border-b md:border-b-0 md:border-r p-3 md:py-6 flex md:flex-col items-center justify-between gap-4 shrink-0 ${m3.surfaceContainerLow}`}
            >
              <div className="flex md:flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shadow-sm ${m3.primaryBtn}`}>
                  <Train className="w-6 h-6" />
                </div>

                {/* M3 QR Quick Extended FAB Icon */}
                <button
                  onClick={() => setActiveContainerSheet('QR_MODAL')}
                  title="Show Aztec QR Code (100% Brightness)"
                  className={`w-12 h-12 rounded-[18px] flex items-center justify-center m3-spring-btn ${m3.tertiaryContainer}`}
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>

              {/* Rail Destinations */}
              <div className="flex md:flex-col items-center gap-4">
                {[
                  { id: 'DISCOVERY', label: 'Explore', icon: Search },
                  { id: 'HUD_WALLET', label: 'Live HUD', icon: QrCode, badge: !isWalletEmptyState ? '2' : null },
                  { id: 'TABELLONE', label: 'Live Board', icon: Compass }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        announceA11y(`Switched to ${item.label}.`);
                      }}
                      className="flex flex-col items-center gap-1 m3-spring-btn group"
                    >
                      <div
                        className={`relative w-14 h-8 rounded-full flex items-center justify-center transition-all ${
                          active ? m3.primaryContainer : 'group-hover:bg-current/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.badge && (
                          <span className={`absolute -top-1 right-1 px-1.5 rounded-full text-[10px] font-extrabold ${m3.primaryBtn}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:flex flex-col items-center gap-1 text-[10px] font-mono opacity-75">
                <span>AAA 7.1:1</span>
                <span>M3 Rail</span>
              </div>
            </aside>

            {/* Canonical Multi-Pane Main Body */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {renderAppContent()}
            </main>
          </div>
        )}
      </div>

      {/* Container Transform Fullscreen Modals */}
      {renderContainerTransformOverlays()}

      {/* Non-Overlapping TalkBack / VoiceOver & Haptic Live Log Pill */}
      <aside
        aria-live="polite"
        aria-atomic="true"
        className={`fixed bottom-3 left-3 z-30 max-w-[260px] sm:max-w-xs px-3 py-1.5 rounded-full shadow-xl border flex items-center gap-2 text-[11px] pointer-events-none ${m3.surfaceContainerHigh}`}
      >
        <Volume2 className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
        <span className="truncate font-semibold">{a11yLogs[0]?.text}</span>
      </aside>
    </div>
  );
}