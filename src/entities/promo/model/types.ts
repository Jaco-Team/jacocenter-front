import type { CartItemInput } from '@/entities/delivery/model/types';
export type Promo = { id: number; name: string; text: string; conditionText: string; cityId: number; dateFrom: string; dateTo: string };
export type PromoCheck = { valid: boolean; promo: Pick<Promo, 'id' | 'name' | 'text' | 'conditionText'> | null };
export type PromoEvaluation = { valid: boolean; code: string; promo: Promo; subtotal: number; discount: number; total: number; freeDrive: boolean; items: unknown[]; effect: unknown; writes: boolean };
export type PromoEvaluateInput = { code: string; cityId: number; pointId?: number; typeOrder: number; customerId?: number; phone?: string; items: CartItemInput[]; weekday?: number; time?: string };
