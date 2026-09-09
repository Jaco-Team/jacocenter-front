import type { OrderDraft, OrderDraftInput, OrderCreationContext, OrderCreationLine, ValidatedCart } from '../model/types';
import { orderCreationApi } from './orderCreationApi';

export class OrderCreationWorkflowError extends Error {
  readonly code: string;
  readonly cart?: ValidatedCart;

  constructor(code: string, message: string, cart?: ValidatedCart) {
    super(message);
    this.name = 'OrderCreationWorkflowError';
    this.code = code;
    this.cart = cart;
  }
}

type SubmitOrderInput = OrderDraftInput & OrderCreationContext & {
  items: OrderCreationLine[];
  idempotencyKey?: string;
};

const idempotencyKey = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  return `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

/** Runs the durable server-side order state machine. Local totals are never authoritative. */
export async function submitOrder(input: SubmitOrderInput): Promise<OrderDraft> {
  const cart = await orderCreationApi.replaceCart({
    cityId: input.cityId,
    pointId: input.pointId,
    typeOrder: input.typeOrder,
    streetId: input.streetId,
    promoCode: input.promoCode,
    customerId: input.customerId,
    phone: input.phone,
    items: input.items,
  });

  if (!cart.valid || cart.items.length === 0) {
    throw new OrderCreationWorkflowError('CART_INVALID', 'Корзина не прошла проверку сервера', cart);
  }

  const draft = await orderCreationApi.createDraft(input);
  const validation = await orderCreationApi.validateDraft(draft.id);
  if (!validation.valid) {
    await orderCreationApi.cancelDraft(draft.id).catch(() => undefined);
    throw new OrderCreationWorkflowError('DRAFT_INVALID', 'Черновик заказа больше недействителен', validation.order.cart);
  }

  return orderCreationApi.confirmDraft(validation.order.id, input.idempotencyKey ?? idempotencyKey());
}
