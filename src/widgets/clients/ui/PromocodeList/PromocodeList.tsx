import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { Column } from "@/shared/ui/Table/Table.types";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";
import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { Promocode } from "./PromocodeList.types";

const promocodesData: Promocode[]  = [
  {
    promocode: "Супер жор в день рождения Again!",
    status: "Активен",
    expiresAt: "2026-02-21",
    isApplied: false,
    description: "Промокод действует до 21.02.2026 при заказе новинок из меню: пицца Сливочный лосось, сет Карнавал, ролл Парусник",
  },
  {
    promocode: "Супер жор в день рождения!",
    status: "Активен",
    expiresAt: "2026-02-15",
    isApplied: false,
    description: "Промокод действует до 15.02.2026 при заказе от 949 р.",
  },
  {
    promocode: "Хрюк",
    status: "Не действителен",
    expiresAt: "2025-12-15",
    isApplied: false,
    description: "Акция действует с понедельника по пятницу на доставку, самовывоз и заказы в кафе до 15.12.2025 г.",
  },
  {
    promocode: "Трям с друзьями!",
    status: "Использован",
    expiresAt: "2025-09-20",
    isApplied: true,
    description: "Акция действует ежедневно до 20.09.2025 г. на доставку, самовывоз и заказы в кафе",
  },
];

const columns: Column<Promocode>[] = [
  { 
    key: 'promocode',
    title: 'Промокод',
    width: 288,
    render: (value: string, row: Promocode) => (
      <div className="flex items-center gap-1 w-full pl-3 pr-1">
        <button type="button" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-transform active:scale-80" onClick={() => navigator.clipboard.writeText(value)}>
          <Image src="/icons/orders.svg" alt="Скопировать промокод" height={15} width={15}/>
        </button>
        <Text className="flex-1 text-left">{value}</Text>
        <Tooltip content={row.description}>
          <button type="button" className="group w-10 h-10 flex items-center justify-center cursor-pointer">
            <Image src="/icons/info-base.svg" alt="Информация об условиях промокода" height={20} width={20} className="group-hover:hidden"/>
            <Image src="/icons/info-hover.svg" alt="Информация об условиях промокода" height={20} width={20} className="hidden group-hover:block"/>
          </button>
        </Tooltip>
      </div>
    )
  },
  { 
    key: 'status', 
    title: 'Статус', 
    width: 168, 
    render: (value: string) => (<Text className={value === "Активен" ? "text-primary" : ""}>{value}</Text>)
  },
  { 
    key: 'expiresAt', 
    title: 'Срок действия', 
    width: 168, 
    render: (value: string) => <Text>до {new Date(value).toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
  },
  { 
    key: 'isApplied', 
    title: 'Применён', 
    width: 168, 
    render: (value) => <Text>{value ? "Да" : "Нет"}</Text>,
  },
];

export const PromocodeList = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal title="Промокоды" isOpen={isOpen} onClose={onClose}>
      <div className="pt-1 px-4">
        <Table data={promocodesData} columns={columns} height={296} width={800} rowHeight={56} headerHeight={52} variant="secondary"/>
      </div>
    </Modal>
  );
}