import { NavPanel } from "@/widgets/NavPanel/ui/NavPanel";
import { HeaderKitchen } from "./components/HeaderKitchen/HeaderKitchen";
import { TableKitchen } from "./components/TableKitchen/TableKitchen";

export default function Kitchen () {
  return (
    <div className="flex">
      <NavPanel/>
      <div className="py-3 px-4 flex flex-col gap-4 flex-1 min-w-0">
        <HeaderKitchen/>
        <TableKitchen/>
      </div>
    </div>
  )
}