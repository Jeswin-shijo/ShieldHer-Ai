# ShieldHer AI — Build Guide & Workflow Log

A women-safety app built in **Expo SDK 56 + expo-router + TypeScript**. The entire UI is built **static-first** (typed mock data, no backend) so the backend can be wired in later by swapping the data layer. This doc is the canonical reference for how it's structured, how it was built, and how to extend it.

> **Before writing code:** read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ (see `AGENTS.md`).

---

## 1. Tech stack & key SDK 56 facts

| Area | Choice / fact |
|---|---|
| Runtime | Expo SDK 56, React Native 0.85, React 19.2, Hermes v1, New Architecture (default) |
| Routing | `expo-router` (file-based, `src/app/`), typed routes enabled |
| Tabs | **JS `Tabs`** (not `NativeTabs`) — full neon styling + Android/iOS/web parity |
| Animation | `react-native-reanimated` 4 (+ `react-native-worklets`) |
| Icons | **Ionicons** everywhere (`@expo/vector-icons`); SF Symbols are an iOS-only upgrade via the `Icon` wrapper |
| Installed for the design | `expo-linear-gradient`, `expo-blur`, `expo-haptics`, `@expo/vector-icons` |
| ⚠️ Gotchas | `expo-av` is **removed** in 56 → use `expo-audio` / `expo-video`. `expo-maps` is alpha + dev-build-only → we use a styled `MapPlaceholder`. `expo-symbols` renders nothing on Android/web without a fallback (the `Icon` wrapper handles this). LinearGradient `start`/`end` only sets the *angle* on web. |

Platform target: **Android + iOS parity** (web works but is secondary).

---

## 2. Architecture

### Navigation tree (`src/app/`)
```
_layout.tsx              Root Stack (providers, StatusBar, dark content bg)
 (tabs)/_layout.tsx      5 JS tabs, neon styling
   index.tsx             Home Dashboard  (SOS hero, status, quick actions, share-with, score)
   protect.tsx           Protect hub     (grid of all 14 FeatureTiles + Premium banner)
   tracking.tsx          Live Tracking   (MapPlaceholder, location, share toggle, watchers)
   network.tsx           Network hub     (nearby map, broadcast, nearby/family/community previews)
   profile.tsx           Profile         (user, score, settings, premium CTA, value-prop, target users)
 sos.tsx                 SOS flow        (fullScreenModal: arming countdown -> Alert Sent checklist)
 fake-call.tsx           Fake Call       (fullScreenModal: incoming -> in-call)
 evidence.tsx            Live Evidence   (fullScreenModal: REC timer, audio/video, cloud)
 safety-timer.tsx        Safety Timer    (formSheet: setup -> countdown -> expired)
 voice-password.tsx      Voice Password  (formSheet: safe/duress phrases)
 onboarding.tsx          Onboarding      (paged slides + tagline + target users)
 features/
   danger-detection.tsx  secret-sos.tsx  safe-route.tsx  family-tracking.tsx
   nearby-network.tsx    police-report.tsx  travel-guardian.tsx  ai-chat.tsx
   offline-sos.tsx       safety-score.tsx  premium.tsx
```
- **Immersive/overlay** screens (sos, fake-call, evidence, safety-timer, voice-password) live at the app root and set their own `<Stack.Screen options={{ presentation: ... }} />`.
- **Informational** features live under `features/` and are pushed over the tabs; they use `<Screen scroll bottomTabInset={false}>` + `<ScreenHeader />`.
- Navigate via `navigate(routeString)` from `src/utils/nav.ts` (route fields in data are plain strings, cast to `Href` there so the data layer type-checks before route types are generated).

### Design tokens — `src/constants/theme.ts`
Dark-first neon. Original scaffold key names are preserved so `ThemedText`/`ThemedView`/tabs keep working.
- `Palette` / `Colors` — bg `#0A0712`, primary (pink) `#FF2D78`, secondary (violet) `#A12BFF`, accent cyan `#22D3EE`, danger `#FF1F4B`, success `#2BE89A`, warning `#FFB020`, + surfaces/text/borders.
- `Gradients` — `screenBackground`, `screenBackgroundAlert`, `brand`, `brandSoft`, `sosButton`, `sosArmed`, `card`, `cardElevated`, `success`, `aiFeature`, `route`, `premium`, `waveform` (each a tuple ready for `<LinearGradient colors={...}>`).
- `Glow` — shadow presets (`pink`/`purple`/`cyan`/`success`/`danger`/`warning`/`none`).
- `Radius`, `Spacing` (4pt scale: half/one/two/three/four/five/six), `Layout` (screenPadding/sectionGap/cardPadding), `Fonts`, `BottomTabInset`, `MaxContentWidth`, `BLURHASH`.

### Reusable primitives — `src/components/`
| Component | Purpose |
|---|---|
| `Screen` | Gradient bg + safe-area + padding wrapper (`scroll`, `variant`, `bottomTabInset`) |
| `ScreenHeader` | Custom back-chevron header (consistent across platforms) |
| `ThemedText` / `ThemedView` | Typed text scale (display/title/subtitle/heading/body/small/caption/code) + themed surfaces |
| `Icon` | Ionicons everywhere + optional `sf` SF-Symbol upgrade on iOS |
| `IconChip` | Rounded-square gradient backdrop holding an icon |
| `GradientButton` | Gradient/outline/ghost button with haptics + glow |
| `Card` / `GlassCard` | Opaque gradient card / frosted blur card (degrades on Android) |
| `Pill` | Status/label chips (solid/success/danger/warning/info/outline/ghost) |
| `StatusBadge` | Protected/scanning/alert/offline status capsule |
| `SectionHeader` | Eyebrow + title + optional "See all" action |
| `ListRow` | Leading icon/avatar + title/subtitle + trailing/value/chevron |
| `Avatar` / `AvatarStack` | expo-image avatar w/ blurhash + initials fallback; overlapping stack |
| `SosButton` | Hero circular SOS button (pulse rings + haptics) |
| `PulseRing` | Expanding/fading concentric rings (Reanimated) |
| `Waveform` | Animated audio bars (spectrum-colored) |
| `MapPlaceholder` | Styled dark street-grid map stand-in (pins + breadcrumb route) |
| `Segmented` | Segmented control (sensitivity, mode, duration, plans) |
| `RecordingDot` | Blinking REC indicator |
| `MetricRing` | Gradient donut ring with centered value (safety score) |
| `FeatureTile` | Grid tile linking to one of the 14 features |
| `ComingSoon` | Branded placeholder for unbuilt screens |

### Data layer — `src/data/*.ts` (the backend swap point)
Every screen imports typed fixtures; nothing is hardcoded in screens.
`user`, `contacts`, `status`, `quick-actions`, `features` (all 14), `sos`, `safety-score`, `tracking`, `danger-detection`, `fake-call`, `evidence`, `secret-sos`, `safe-route`, `family`, `network`, `report`, `travel`, `chat`, `offline`, `voice-password`, `premium`, `onboarding`.
Helpers in `src/utils/`: `nav.ts` (`navigate`/`replaceTo`/`goBack`), `time.ts` (`formatClock`/`relativeTime`/`timeLabel`).

---

## 3. Build phases (the workflow log)

Built as a vertical slice with a review checkpoint at the end of each phase.

| Phase | Delivered |
|---|---|
| **0 — Foundation** | Installed deps; rewrote theme tokens; built generic + animated primitives; replaced the starter scaffold with the 5-tab nav skeleton + `ComingSoon` placeholders; seeded `user`/`contacts`/`features`/`status`/`quick-actions`; deleted Expo welcome chrome. |
| **1 — Vertical slice** | `SosButton` primitive; **Home Dashboard**; **`/sos`** flow (arming countdown → Alert Sent checklist). Locked the visual language. |
| **2 — Core safety** | `ScreenHeader`, `MapPlaceholder`, `Segmented`, `RecordingDot`; **Live Tracking**, **AI Danger Detection**, **Live Evidence**, **Fake Call**, **Safety Timer**. |
| **3 — Feature breadth** | `MetricRing`, `FeatureTile`; data for all remaining features; **11 feature screens built in parallel via a workflow**; **Protect grid** wired to all 14 features. |
| **4 — Surround** | `onboarding` data; **Network hub**, **Profile** (incl. value-prop / target-users), **Onboarding** paged flow. |

Every phase ended green on: `npx tsc --noEmit`, `npx expo lint`, and `npx expo export --platform android`.

---

## 4. Multi-agent workflows used

We used the **Workflow tool** (deterministic JS orchestration over subagents) twice. Both ran in the background and returned structured results.

### A. Research workflow — *verify SDK 56 + derive the design system*
- **Phase "Docs":** ~7 agents fetched specific v56 doc pages (router, linear-gradient, blur, haptics, image, symbols, reanimated) in parallel via `WebFetch` and returned a structured fact sheet each (availability, install cmd, import, key API notes, gotchas).
- **Phase "Design":** one agent synthesized those facts + the brief into the concrete design system (color/gradient tokens, navigation tree, screen inventory, mock-data model).
- **Why:** the `AGENTS.md` mandate is to ground everything in the exact v56 docs; fanning out kept it fast and the findings drove every later decision.

### B. Phase-3 screen builder — *fan out 11 screens against fixed contracts*
- **Pattern:** `parallel()` over 11 screen specs; each agent **wrote one file** with the `Write` tool.
- **The key technique:** every agent got the *same* `REFERENCE` block — the exact prop API of all primitives, the theme tokens, the utils, and hard lint/tsc rules — plus a per-screen `spec` (file path, which data file to import, and a layout outline). This kept 11 independently-written screens consistent and compiling.
- **Result:** 11 screens written in ~83s; the only error was a pre-existing one in our own `FeatureTile`. The agents correctly flagged minor deviations (e.g. `ListRow` has no `divider` prop → manual hairline).
- **Lesson for next time:** when fanning out UI, give agents an exact **prop contract + data shapes + a skeleton + the lint rules**, and have them write files directly. Then verify centrally with tsc/lint/bundle and fix drift in one pass.

Workflow scripts are persisted per-run under the session directory (`.../workflows/scripts/`) and can be re-run with `Workflow({ scriptPath, resumeFromRunId })`.

---

## 5. Brand assets pipeline (app icon, adaptive icon, splash, favicon)

Source SVGs live in **`assets/brand/`** (the editable source of truth):
- `mark.svg` — the bare shield mark (transparent).
- `icon.svg` — full-bleed app icon (dark radial bg + pink halo + mark, slightly enlarged).
- `adaptive.svg` — mark scaled to **0.84** to stay inside Android's adaptive safe zone.
- `splash.svg` — mark + pink halo (transparent; the glow blends into the dark splash bg).

**The logo:** a neon pink→violet gradient shield protecting a white figure, with two AI "sparkles". Colors match the app theme.

**Rendering** (no system rasterizer needed — uses `@resvg/resvg-js` in a throwaway temp dir so project deps stay clean):
```bash
npm i --prefix /tmp/iconbuild @resvg/resvg-js
node /tmp/iconbuild/render.js   # reads assets/brand/*.svg -> writes assets/images/*.png
```
Outputs → `assets/images/`: `icon.png` (1024), `adaptive-icon-foreground.png` (1024), `splash-icon.png` (1024, tall w/ glow), `favicon.png` (96).

Wired in `app.json`: top-level `icon` (iOS uses it too — the old `ios.icon`/`assets/expo.icon` override was removed); `android.adaptiveIcon` (`backgroundColor: "#0A0712"` + the foreground); and the `expo-splash-screen` plugin (`image`, `imageWidth: 220`, `backgroundColor: "#0A0712"`).

To tweak the logo: edit the SVG(s) in `assets/brand/`, re-run the render command, done.

---

## 6. Verifying changes
```bash
npx tsc --noEmit -p tsconfig.json      # types
npx expo lint                          # eslint (incl. React Compiler rules)
npx expo export --platform android     # full bundle (validates the whole import graph, no device needed)
npx expo config --json >/dev/null      # validates app.json + asset paths
npx expo start                         # run on device/simulator (press i / a / w)
```
Note: `expo-env.d.ts` is normally auto-generated by `expo start`; it was created manually so tsc passes before the dev server runs (it's git-ignored / auto-managed — don't edit).

Common lint gotchas seen here: no unused imports/vars; apostrophes in **JSX text** must be `&apos;` but in **string props** use a literal `'`; never call `setState` synchronously in a `useEffect` body — do timer transitions inside the `setTimeout`/`setInterval` callback.

---

## 7. How to add a new screen (the convention)
1. Add typed fixtures to a `src/data/<name>.ts` (this is the future backend boundary).
2. Create the route file under `src/app/...` (feature = `src/app/features/<name>.tsx`; modal/sheet = `src/app/<name>.tsx` with its own `<Stack.Screen options>`).
3. Feature screens: `<Screen scroll bottomTabInset={false}>` → `<ScreenHeader title eyebrow />` → `<View style={{ gap: Layout.sectionGap }}>` of sections built from existing primitives. **Reuse primitives; don't invent component props.**
4. If it's one of the 14 features, it's already linked from the Protect grid via `src/data/features.ts`.
5. Verify with the commands in §6.

---

## 8. Next: backend wiring (not yet started)
The static UI is complete. The backend pass is contained:
1. Replace `src/data/*` fixtures with real services (auth, profile, contacts).
2. Wire verified SDK 56 APIs: `expo-location` (tracking / safe route), `expo-audio` (danger detection + evidence recording — **not** `expo-av`), `expo-notifications`, SMS, contacts.
3. Swap `MapPlaceholder` for a real map (`react-native-maps` or `expo-maps`) — isolated to one component.
