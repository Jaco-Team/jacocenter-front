import { mockCities } from "@/app/currentOrder/mocks"
import { Button } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip"
import "./HeaderNewOrder.style.css";
import { useOrderStore } from "@/store/orderStore"
import { SelectTown } from "@/shared/ui/SelectTown/SelectTown"
import { InputPhone } from "@/features/Inputs/ui/InputPhone/InputPhone"

export const HeaderNewOrder = () => {
  const {
    city,
    phone,
    promocode,
    setCity,
    setPhone,
    setPromocode,
  } = useOrderStore();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    //добавить поиск
  };
  
  return (
    <form onSubmit={handleSubmit} className="current-order__header">
      <SelectTown value={city} options={mockCities} onSelect={setCity} className="current-order__header-city"/>

      <div className="current-order__header-phone">
        <InputPhone
          value={phone}
          onChange={setPhone}
          placeholder="999 999-99-99"
        />
      </div>

      <div className="current-order__header-promocode">
        <div className="current-order__header-promocode-input">
          <Input
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
            placeholder="Промокод"
          />
        </div>
        <Tooltip
          content="Введите промокод для получения скидки"
          placement="bottom"
        >
          <button type="button" className="current-order__header-tooltip-btn">?</button>
        </Tooltip>
      </div>

      <Button type="submit" variant="base" theme="primary" className="!w-[76px] !h-[44px]">
        Найти
      </Button>
    </form>
  )
}