"use client";

import { useEffect, useState } from "react";
import { promoApi } from "@/entities/promo/api/promoApi";
import type { Promo } from "@/entities/promo/model/types";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { Text } from "@/shared/ui/Typography/Typography";
import { columns } from "./PromocodeList.columns";
import { mapPromoToPromocode } from "./PromocodeList.mapper";
import type { Promocode } from "./PromocodeList.types";

type PromocodeListProps = {
  isOpen: boolean;
  onClose: () => void;
  cityId?: number;
};

export const PromocodeList = ({ isOpen, onClose, cityId }: PromocodeListProps) => {
  const [promocodes, setPromocodes] = useState<Promocode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!cityId || cityId <= 0) {
      setPromocodes([]);
      setError("Для клиента не определён город");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setPromocodes([]);

    promoApi.list(cityId)
      .then((items: Promo[]) => {
        if (!cancelled) setPromocodes(items.map(mapPromoToPromocode));
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setPromocodes([]);
          setError(reason instanceof Error ? reason.message : "Не удалось загрузить промокоды");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cityId, isOpen]);

  return (
    <Modal title="Промокоды" isOpen={isOpen} onClose={onClose}>
      <div className="pt-1 px-4">
        {loading && <Text>Загрузка промокодов…</Text>}
        {!loading && error && <Text>{error}</Text>}
        {!loading && !error && promocodes.length === 0 && <Text>Нет доступных промокодов</Text>}
        {!loading && !error && promocodes.length > 0 && (
          <Table data={promocodes} columns={columns} height={296} width={800} rowHeight={56} headerHeight={52} variant="secondary"/>
        )}
      </div>
    </Modal>
  );
}
