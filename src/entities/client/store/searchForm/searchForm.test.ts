import { afterEach, describe, expect, it, vi } from "vitest";
import { customerApi } from "@/entities/customer/api/customerApi";
import { useSearchFormStore } from "./searchForm";

afterEach(() => {
  vi.restoreAllMocks();
  useSearchFormStore.setState({ phone: "", searched: false, loading: false, error: null, lookup: null, foundClientId: null });
});

describe("client search store", () => {
  it("loads a customer from the API and exposes the selected id", async () => {
    vi.spyOn(customerApi, "lookup").mockResolvedValue({ phone: "79990000000", registered: true, customer: { id: 8, name: "Иван", phone: "79990000000", registeredAt: null, email: null, active: true, spam: false, ordersCount: 2, ordersSum: 1000 }, lastOrder: null, lastOrderState: "", addresses: [] });
    useSearchFormStore.getState().setPhone("+7 (999) 000-00-00");
    await useSearchFormStore.getState().search();
    expect(useSearchFormStore.getState().foundClientId).toBe(8);
    expect(useSearchFormStore.getState().error).toBeNull();
  });

  it("keeps an API failure visible to the form", async () => {
    vi.spyOn(customerApi, "lookup").mockRejectedValue(new Error("Сервис недоступен"));
    useSearchFormStore.getState().setPhone("79990000000");
    await useSearchFormStore.getState().search();
    expect(useSearchFormStore.getState().searched).toBe(true);
    expect(useSearchFormStore.getState().error).toBe("Сервис недоступен");
  });
});
