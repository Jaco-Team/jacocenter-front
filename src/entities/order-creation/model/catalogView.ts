import type { Catalog, CatalogCategory } from '@/entities/catalog/model/types';

export type CatalogCategoryOption = { id: string; name: string };
export type CatalogDishOption = { id: string; categoryId: string; name: string; price: number; description?: string };

export function mapCatalogCategories(category: CatalogCategory): CatalogCategoryOption {
  return { id: String(category.id), name: category.name };
}

export function mapCatalogDishes(catalog: Catalog): CatalogDishOption[] {
  return catalog.categories.flatMap((category) => category.products
    .filter((product) => product.available)
    .map((product) => ({
      id: String(product.id),
      categoryId: String(category.id),
      name: product.name,
      price: product.price,
      description: product.description || undefined,
    })));
}
