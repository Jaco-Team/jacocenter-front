"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { ModalSaucesUtensilsProps } from "./ModalSaucesUtensils.types";
import "./ModalSaucesUtensils.style.css";

export const ModalSaucesUtensils = ({
  isOpen,
  onClose,
  onSkip,
  onDone,
  items,
}: ModalSaucesUtensilsProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      setCounts({});
    }
  }, [isOpen]);

  const getCount = (id: string) => counts[id] ?? 0;

  const increase = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const decrease = (id: string) => {
    setCounts((prev) => {
      const next = (prev[id] ?? 0) - 1;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleDone = () => {
    const selected = items
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        count: getCount(item.id),
      }))
      .filter((item) => item.count > 0);
    onDone(selected);
  };

  const formatPrice = (value: number) =>
    value.toLocaleString("ru-RU", { maximumFractionDigits: 0 });

  return (
    <Modal title="Соусы. Приправы. Приборы" isOpen={isOpen} onClose={onClose}>
      <div className="modal-sauces">
        <Text variant="label-s-regular-12" className="modal-sauces__hint">
          Не забудьте добавить соусы, приправы и приборы
        </Text>

        <div className="modal-sauces__list">
          {items.map((item) => {
            const count = getCount(item.id);
            return (
              <div key={item.id} className="modal-sauces__row">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="modal-sauces__image"
                  />
                ) : (
                  <div className="modal-sauces__image" aria-hidden>
                    {item.name.slice(0, 1)}
                  </div>
                )}

                <div className="modal-sauces__info">
                  <Text variant="body-m-medium-16" className="modal-sauces__name">
                    {item.name}
                  </Text>
                  <Text variant="label-s-regular-12" className="modal-sauces__price">
                    {formatPrice(item.price)} ₽
                  </Text>
                </div>

                <div className="modal-sauces__counter">
                  <button
                    type="button"
                    className="modal-sauces__counter-btn"
                    onClick={() => decrease(item.id)}
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <div
                    className={
                      count > 0
                        ? "modal-sauces__count modal-sauces__count--active"
                        : "modal-sauces__count"
                    }
                  >
                    {count}
                  </div>
                  <button
                    type="button"
                    className="modal-sauces__counter-btn"
                    onClick={() => increase(item.id)}
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-sauces__actions">
          <Button variant="base" theme="secondary" className="button" onClick={onSkip}>
            <Text>Пропустить</Text>
          </Button>
          <Button variant="base" theme="primary" className="button" onClick={handleDone}>
            <Text variant="body-m-medium-16">Готово</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
