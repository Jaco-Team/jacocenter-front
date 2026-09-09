import { Button } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip"
import "./HeaderNewOrder.style.css";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore"
import { SelectTown } from "@/shared/ui/SelectTown/SelectTown"
import { InputPhone } from "@/features/Inputs/ui/InputPhone/InputPhone"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Text } from "@/shared/ui/Typography/Typography";
import { citiesApi } from "@/entities/city/api/citiesApi";
import { promoApi } from "@/entities/promo/api/promoApi";

export const HeaderNewOrder = () => {
  const {
    city,
    phone,
    promocode,
    setCity,
    setPhone,
    setPromocode,
  } = useOrderStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [cityId, setCityId] = useState<number | null>(null);
  const [promoDescription, setPromoDescription] = useState<string | null>(null);
  const [promoValid, setPromoValid] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    citiesApi.list().then((cities) => {
      if (cancelled) return;
      setCityOptions(cities.map((item) => item.name));
      const selected = cities.find((item) => item.name === city) ?? cities[0];
      if (selected) {
        setCityId(selected.id);
        if (selected.name !== city) setCity(selected.name);
      }
    }).catch(() => {
      if (!cancelled) setCityOptions([]);
    });
    return () => { cancelled = true; };
  }, [city, setCity]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!promocode.trim() || cityId === null) {
      setPromoValid(null);
      setPromoDescription(null);
      return;
    }
    void promoApi.check(promocode.trim(), cityId).then((result) => {
      setPromoValid(result.valid);
      setPromoDescription(result.promo?.text || result.promo?.conditionText || null);
    }).catch(() => {
      setPromoValid(false);
      setPromoDescription(null);
    });
  };

  const handlePromocodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
    setPromoValid(null);
    setPromoDescription(null);
    if (isSubmitted) setIsSubmitted(false);
  };

  const promocodeInfo = !promocode
    ? "Здесь появится информация об условиях действия промокода."
    : promoDescription
      ? promoDescription
      : "Промокод не найден";

  const promocodeError = isSubmitted && promocode && promoValid === false ? "Промокод не найден" : undefined;

  const phoneInfo = "Введите номер телефона клиента";

  return (
    <form onSubmit={handleSubmit} className="current-order__header">
      <div className="current-order__header-row">
        <SelectTown value={city} options={cityOptions} onSelect={(value) => { setCity(value); setPromoValid(null); setPromoDescription(null); }} className="current-order__header-city"/>

        <div className="current-order__header-phone">
          <InputPhone
            value={phone}
            onChange={setPhone}
            placeholder="999 999-99-99"
          />
          <Tooltip content={phoneInfo} placement="bottom">
            <button type="button" className="current-order__header-info-btn" aria-label="Информация">
              <Image src="/icons/info-base.svg" alt="" width={20} height={20} />
            </button>
          </Tooltip>
        </div>

        <Button type="submit" variant="base" theme="primary" className="current-order__header-button">
          Найти
        </Button>
      </div>

      <div className="current-order__header-promocode">
        <div className="current-order__header-promocode-input">
          <Input
            value={promocode}
            onChange={handlePromocodeChange}
            placeholder="Промокод"
            error={promocodeError}
          />
          {promocode && (<ClearButton onClick={() => setPromocode("")} className="top-[2px] right-0"/>)}
        </div>
        <div className="current-order__header-info">
          <Text variant="label-s-regular-12" className="current-order__header-info-text">
            {promocodeInfo}
          </Text>
          <Tooltip content={promocodeInfo} placement="bottom">
            <button type="button" className="current-order__header-info-btn" aria-label="Информация">
              <Image src="/icons/info-base.svg" alt="" width={20} height={20} />
            </button>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`absolute flex items-center justify-center cursor-pointer w-10 h-10 ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);
