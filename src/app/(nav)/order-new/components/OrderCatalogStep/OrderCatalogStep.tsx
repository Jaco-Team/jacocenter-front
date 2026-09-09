import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch"
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish"
import { Categories } from "@/widgets/Categories/ui/Categories/Categories"
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore"
import { useState } from "react"
import { useEffect } from "react"
import { catalogApi } from "@/entities/catalog/api/catalogApi"
import { citiesApi } from "@/entities/city/api/citiesApi"
import { mapCatalogCategories, mapCatalogDishes } from "@/entities/order-creation/model/catalogView"
import { ModalSaucesUtensils } from "@/features/order/ModalSaucesUtensils/ModalSaucesUtensils"
import { mockSaucesUtensils, SAUCES_UTENSILS_CATEGORY_ID } from "@/app/(nav)/order-new/data/mocks"
import { Text } from "@/shared/ui/Typography/Typography"

export const OrderCatalogStep = () => {
  const addItem = useOrderStore((s) => s.addItem);
  const city = useOrderStore((s) => s.city);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaucesModalOpen, setIsSaucesModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [catalogDishes, setCatalogDishes] = useState<{ id: string; categoryId: string; name: string; price: number; description?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    citiesApi.list()
      .then(async (cities) => {
        const selectedCity = cities.find((item) => item.name === city) ?? cities[0];
        if (!selectedCity) throw new Error("Город недоступен оператору");
        return catalogApi.get(selectedCity.id);
      })
      .then((catalog) => {
        if (cancelled) return;
        setCategories(catalog.categories.map(mapCatalogCategories));
          setCatalogDishes(mapCatalogDishes(catalog));
        setSelectedCategory(null);
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setCategories([]);
          setCatalogDishes([]);
          setError(reason instanceof Error ? reason.message : "Не удалось загрузить каталог");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [city]);

  const filteredDishes = catalogDishes.filter((d) => {
    const matchesCategory = selectedCategory ? d.categoryId === selectedCategory : true;
    const matchesSearch = searchQuery ? d.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) : true;
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
      {loading ? <Text>Загрузка каталога…</Text> : error ? <Text>{error}</Text> : <Categories items={categories} selectedId={selectedCategory} onSelect={handleCategorySelect} />}
      <div className="current-order__search">
        <InputSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск товара"
        />
      </div>
      <div className="current-order__cards"><CardsDish dishes={filteredDishes} /></div>

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
