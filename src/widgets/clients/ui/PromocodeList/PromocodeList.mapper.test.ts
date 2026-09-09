import { describe, expect, it } from 'vitest';
import { mapPromoToPromocode } from './PromocodeList.mapper';

describe('mapPromoToPromocode', () => {
  it('maps an active API promo to the existing table view model', () => {
    expect(mapPromoToPromocode({
      id: 12,
      name: 'ЖАКО10',
      text: 'Скидка для гостей',
      conditionText: 'От 1000 рублей',
      cityId: 2,
      dateFrom: '2026-09-01',
      dateTo: '2026-09-30',
    })).toEqual({
      promocode: 'ЖАКО10',
      status: 'Активен',
      expiresAt: '2026-09-30',
      isApplied: false,
      description: 'От 1000 рублей',
    });
  });

  it('uses promo text when the API has no condition text', () => {
    expect(mapPromoToPromocode({
      id: 13,
      name: 'БОНУС',
      text: 'Подарок к заказу',
      conditionText: '',
      cityId: 2,
      dateFrom: '',
      dateTo: '',
    }).description).toBe('Подарок к заказу');
  });
});
