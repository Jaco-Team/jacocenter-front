import { FiltersBlock } from "@/features/orders/ui/filtersBlock/FiltersBlock"
import { TableOrders } from "./components/TableOrders/TableOrders"
import { HeaderOrders } from "@/widgets/Header/ui/HeaderOrders/HeaderOrders"
import { cafeList, cities } from "./constants"

export default function Orders() {
  return (
    <div className="h-full flex flex-col gap-4">
      <HeaderOrders cities={cities}/>
      <FiltersBlock cafeList={cafeList}/>
      <TableOrders/>
    </div>
  )
}