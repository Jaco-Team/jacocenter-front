import { SearchForm } from "@/widgets/clients/ui/SearchForm/SearchForm"
import { TableClients } from "@/widgets/clients/ui/TableClients/TableClients"
import { NavPanel } from "@/widgets/NavPanel/ui/NavPanel"

export default function Clients() {
  return (
    <div className="flex gap-4 h-screen">
      <NavPanel/>
      <div className="flex-1 min-w-0 min-h-0 pt-3 flex flex-col gap-4 pb-9 pr-4">
        <SearchForm/>
        <TableClients/>
      </div>
    </div>
  )
}