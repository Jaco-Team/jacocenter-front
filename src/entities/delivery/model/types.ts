export type City = { id: number; name: string };
export type Point = { id: number; cityId: number; name: string; base: string; address: string; latitude: number | null; longitude: number | null };
export type DeliveryStreet = { id: number; pointId: number; zoneId?: number; name: string; home: string; xy: string; delivery?: { sumDiv: number; freeDrive: boolean } };
export type DeliveryZone = { pointId: number; pointName: string; streets: DeliveryStreet[] };
export type AddressValidation = { valid: boolean; cityId?: number; street?: string; home?: string; entrance?: string; code?: string };
export type CartItemInput = { itemId: number; quantity: number; unitPrice?: number; modifiers?: Array<{ itemId: number; quantity: number }> };
export type PreorderSlot = { start: string | null; end: string | null; value: string | number; disabled: boolean; label?: string };
export type PreorderSlots = { valid: boolean; date: string; pointId: number; typeOrder: number; slots: PreorderSlot[]; code?: string };
