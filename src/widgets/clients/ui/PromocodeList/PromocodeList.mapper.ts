import type { Promo } from '@/entities/promo/model/types';
import type { Promocode } from './PromocodeList.types';

/** Converts the API's active promo contract to the existing client-table view model. */
export function mapPromoToPromocode(promo: Promo): Promocode {
  return {
    promocode: promo.name,
    status: 'Активен',
    expiresAt: promo.dateTo,
    isApplied: false,
    description: promo.conditionText || promo.text,
  };
}
