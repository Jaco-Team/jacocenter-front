import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch"
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish"
import { Categories } from "@/widgets/Categories/ui/Categories/Categories"
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore"
import { useState } from "react"
import { mockCategories, mockDishes } from "@/app/currentOrder/mocks"

export const OrderCatalogStep = () => {
  const addItem = useOrderStore((s) => s.addItem);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDishes = selectedCategory
    ? mockDishes.filter((d) => d.categoryId === selectedCategory)
    : mockDishes;

  const dishes = filteredDishes.map((d) => ({
    ...d,
    onClick: () => addItem({ id: d.id, name: d.name, price: d.price }),
  }));

  return (
    <>
      <Categories
        items={mockCategories}
        selectedId={selectedCategory}
        onSelect={(id) => setSelectedCategory(String(id))}
      />
      <div className="current-order__search">
        <InputSearch
          options={mockDishes}
          onSelect={(d) => addItem(d)}
        />
      </div>
      <div className="current-order__cards">
        <CardsDish dishes={dishes} />
      </div>
    </>
  )
}