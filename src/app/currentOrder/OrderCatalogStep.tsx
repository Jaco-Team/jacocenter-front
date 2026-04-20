import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch"
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish"
import { Categories } from "@/widgets/Categories/ui/Categories/Categories"
import { mockCategories, mockDishes } from "./mocks"
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore"
import { useState } from "react"

export const OrderCatalogStep = () => {
  const addItem = useOrderStore((s) => s.addItem);
  const [selectedCategory, setSelectedCategory] = useState< string | number | null >(null);

  return (
    <>
      <Categories
        items={mockCategories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="current-order__search">
        <InputSearch
          options={mockDishes}
          onSelect={(d) => addItem(d)}
        />
      </div>
      <CardsDish
        dishes={mockDishes.map((d) => ({
          ...d,
          onClick: () =>
            addItem({ id: d.id, name: d.name, price: d.price }),
        }))}
      />
    </>
  )
}