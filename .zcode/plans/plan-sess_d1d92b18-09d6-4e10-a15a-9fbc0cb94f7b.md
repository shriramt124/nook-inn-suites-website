## Goal
Replace the current flat `price` model with your occupancy-based rate card (Single base + Double supplement + Breakfast/person + Extra-person charge), and wire it through the room cards, the rooms listing, and the booking form's live pricing engine.

## Confirmed rate model (per night, per room)
| Room | Single base | Double supp. | Breakfast/person | Extra person |
|------|-----------|-------------|------------------|--------------|
| Comfort Room | 2200 | +200 | 300 | +500 |
| Premium Room | 2500 | +200 | 300 | +500 |
| Suite (Family Suite) | 2800 | +200 | 300 | +500 |
| Cottage Room | 2300 | +200 | 300 | +500 |

Nightly formula: `base + (guests≥2 ? 200 : 0) + (max(guests−2,0) × 500) + (guests × 300)`

## Step 1 — Data model (`src/types/index.ts`)
Extend the `Room` interface with a structured pricing object (keep `price` as the single-base value for backwards-compat with sorting/cards):
- `price: number` → now means **single-occupancy base**
- add `pricing: { base: number; doubleSupplement: number; breakfastPerPerson: number; extraPerson: number }`

## Step 2 — Room data (`src/constants/data.ts`)
Update each of the 4 rooms:
- Comfort Room → `price: 2200` + pricing block
- Premium Room → `price: 2500` + pricing block
- Family Suite → `price: 2800` (this is the "Suite" rate) + pricing block; update description to reflect it's the Suite
- Cottage Room → `price: 2300` + pricing block
- Add a shared `EXTRA_PERSON_RATE = 500` and breakfast `300` constant for clarity.

## Step 3 — Pricing helper (`src/lib/utils.ts`)
Add a pure function `calculateRoomRate(room, adults, children)` returning a breakdown object:
`{ base, doubleSupplement, breakfast, extraPerson, perNight, breakdown lines[] }`
Logic: 1 adult = base only; 2 adults = base + supplement; 3+ adults = base + supplement + (extra−1)×500; breakfast = (adults+children)×300. Children count as persons for breakfast and extra-person math (capped by room maxGuests).

## Step 4 — Room cards (`src/components/shared/RoomCard.tsx`)
- Headline shows `formatPrice(room.price)` = single base, label stays "Rates starting at / night".
- Add a small sub-line under the price: "Single occupancy · +₹200 double · +₹300 breakfast/pp · +₹500 extra guest" so the rate card is visible on the card.

## Step 5 — Rooms listing compare modal (`src/app/rooms/page.tsx`)
- "Starting Price" row → show single base.
- Add a second row "Occupancy Rates" showing the breakdown (base / double / breakfast / extra) so the comparison table reflects the full card.
- Sort-by-price still works against `price` (base).

## Step 6 — Booking form pricing engine (`src/components/booking/BookingForm.tsx`)
This is the core change. Replace the flat `baseTotal = price × nights × rooms` logic with occupancy-aware math:
- Watch `adults` and `children` (already in the form).
- Use `calculateRoomRate(room, adults, children)` → `perNight`.
- `baseTotal = perNight × nights × roomsCount`.
- Keep existing coupon (LUXURY10 / WELCOME500) and 12% tax logic on the new subtotal.
- Update the **pricing summary panel** (right column) to show itemized lines: Room base, Double supplement, Extra-person charge, Breakfast (×N persons), then Nights × Rooms, subtotal, discount, tax, grand total.
- Update the **success/invoice breakdown** (post-submit) to show the same itemized lines instead of just `room rate`.
- Update the room-type select label to show single base price.

## Step 7 — Booking email API (`src/app/api/booking/route.ts`)
Pass the new breakdown (base, double, extra-person, breakfast) to the email so the hotel & guest invoices reflect the occupancy-based total. The `pricing` object already flows through; I'll surface the new line items in the `pricingBlock` table.

## Step 8 — Verify
- `npm run build` (turbopack) to confirm types compile.
- Manually trace: Comfort, 1 adult, 2 nights, 1 room → `(2200 + 300) × 2 = ₹5,000` + tax. Comfort, 3 adults → `(2200+200+500+900) = ₹3,800/night`.

## Out of scope (no change)
- Testimonials, Gallery, Facilities, FAQ, Contact, Hero, About, WhyChooseUs — none reference room prices.
- No new room is added (Suite maps to Family Suite per your choice).

## Files changed (8)
1. `src/types/index.ts` — add `pricing` to `Room`
2. `src/constants/data.ts` — new rates
3. `src/lib/utils.ts` — `calculateRoomRate` helper
4. `src/components/shared/RoomCard.tsx` — base price + sub-line
5. `src/app/rooms/page.tsx` — compare modal rates row
6. `src/components/booking/BookingForm.tsx` — occupancy pricing engine + itemized UI
7. `src/app/api/booking/route.ts` — email breakdown
8. (optional) `src/components/home/FeaturedRooms.tsx` — no logic change needed, cards inherit new display