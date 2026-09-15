export type OperatorMetrics = {
  period: {
    dateFrom: string;
    dateTo: string;
  };
  points: Array<{
    id: number;
    name: string;
  }>;
  orders: {
    ordersCount: number;
    revenue: number;
    averageCheck: number;
    deliveryCount: number;
    pickupCount: number;
    preorderCount: number;
    withPromoCount: number;
  };
  errors: {
    rowsCount: number;
    penaltySum: number;
  };
  overtime: {
    ordersCount: number;
    cookEarly: number;
    cookOnTime: number;
    cookLate: number;
    deliveryEarly: number;
    deliveryOnTime: number;
    deliveryLate: number;
    allGreen: number;
    allRed: number;
    latePercent: number;
  };
  promos: {
    total: number;
    items: Array<{
      id: number;
      name: string;
      createdAt: string;
      count: number;
      deleted: boolean;
    }>;
  };
};
