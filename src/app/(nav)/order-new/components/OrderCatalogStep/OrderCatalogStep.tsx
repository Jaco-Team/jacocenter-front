import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch"
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish"
import { Categories } from "@/widgets/Categories/ui/Categories/Categories"
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore"
import { useState } from "react"
import {
  mockCategories,
  mockDishes,
  mockSaucesUtensils,
  SAUCES_UTENSILS_CATEGORY_ID,
} from "@/app/(nav)/order-new/data/mocks"
import { ModalSaucesUtensils } from "@/features/Order/ModalSaucesUtensils/ModalSaucesUtensils"

export const OrderCatalogStep = () => {
  const addItem = useOrderStore((s) => s.addItem);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaucesModalOpen, setIsSaucesModalOpen] = useState(false);

  const filteredDishes = mockDishes.filter((d) => {
    const matchesCategory = selectedCategory
      ? d.categoryId === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? d.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const dishes = filteredDishes.map((d) => ({
    ...d,
    onClick: () => addItem({ id: d.id, name: d.name, price: d.price }),
  }));

  const handleCategorySelect = (id: string | number) => {
    const categoryId = String(id);
    if (categoryId === SAUCES_UTENSILS_CATEGORY_ID) {
      setIsSaucesModalOpen(true);
      return;
    }
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleSaucesDone = (
    items: { id: string; name: string; price: number; count: number }[],
  ) => {
    items.forEach((item) => {
      for (let i = 0; i < item.count; i += 1) {
        addItem({ id: item.id, name: item.name, price: item.price });
      }
    });
    setIsSaucesModalOpen(false);
  };

  return (
    <>
      <Categories
        items={mockCategories}
        selectedId={selectedCategory}
        onSelect={handleCategorySelect}
      />
      <div className="current-order__search">
        <InputSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск товара"
        />
      </div>
      <div className="current-order__cards">
        <CardsDish dishes={dishes} />
      </div>

      <ModalSaucesUtensils
        isOpen={isSaucesModalOpen}
        onClose={() => setIsSaucesModalOpen(false)}
        onSkip={() => setIsSaucesModalOpen(false)}
        onDone={handleSaucesDone}
        items={mockSaucesUtensils}
      />
    </>
  )
}
