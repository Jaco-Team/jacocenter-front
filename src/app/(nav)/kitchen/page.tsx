import { HeaderKitchen } from "./components/HeaderKitchen/HeaderKitchen";
import { TableKitchen } from "./components/TableKitchen/TableKitchen";

export default function Kitchen () {
  return (
    <div className="h-full flex flex-col gap-4">
      <HeaderKitchen/>
      <TableKitchen/>
    </div>
  )
}