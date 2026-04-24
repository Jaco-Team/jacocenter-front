import { SearchForm } from "@/widgets/clients/ui/SearchForm/SearchForm"
import { TableClients } from "@/widgets/clients/ui/TableClients/TableClients"

export default function Clients() {
  return (
    <div className="h-full flex flex-col gap-4">
      <SearchForm/>
      <TableClients/>
    </div>
  )
}