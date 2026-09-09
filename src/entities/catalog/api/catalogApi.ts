import { apiRequest } from '@/shared/api/http';
import type {
  Allergen,
  Catalog,
  CatalogCategory,
  CatalogItem,
  CatalogProduct,
  FreeCatalogItem,
  ProductRelation,
} from '@/entities/catalog/model/types';

type AllergenDto = { id: number; name: string; additional_name: string | null };
type RelationDto = { type: number; count: number; max_count: number; is_add: boolean };
type ProductDto = {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string | null;
  type: number;
  available: boolean;
  info_weight?: string | null;
  info_weight_dop?: string | null;
  nutrition?: {
    protein: number | null;
    fat: number | null;
    carbohydrates: number | null;
    kkal: number | null;
  };
  allergens?: AllergenDto[];
  possible_allergens?: AllergenDto[];
  relation?: RelationDto;
};
type CategoryDto = { id: number; name: string; parent_id: number; products: ProductDto[] };
type FreeItemDto = {
  parent_item_id: number;
  item: ProductDto;
  count: number;
  max_count: number;
  is_add: boolean;
};
type CatalogDto = {
  city: { id: number; name: string };
  categories: CategoryDto[];
  free_items: FreeItemDto[];
};
type CatalogResponse = { st: true; data: CatalogDto };
type CatalogItemResponse = { st: true; data: { item: ProductDto & {
  nutrition: NonNullable<ProductDto['nutrition']>;
  info_weight: string | null;
  info_weight_dop: string | null;
  items: ProductDto[];
  allergens: AllergenDto[];
  possible_allergens: AllergenDto[];
} } };

const numberOrNull = (value: number | null | undefined): number | null =>
  value === null || value === undefined ? null : Number(value);

function mapAllergen(dto: AllergenDto): Allergen {
  return {
    id: Number(dto.id),
    name: String(dto.name ?? ''),
    additionalName: dto.additional_name ?? null,
  };
}

function mapRelation(dto: RelationDto): ProductRelation {
  return {
    type: Number(dto.type),
    count: Number(dto.count),
    maxCount: Number(dto.max_count),
    isAdd: Boolean(dto.is_add),
  };
}

export function mapCatalogProduct(dto: ProductDto): CatalogProduct {
  return {
    id: Number(dto.id),
    name: String(dto.name ?? ''),
    description: String(dto.description ?? ''),
    price: Number(dto.price),
    weight: dto.weight ?? null,
    type: Number(dto.type),
    available: dto.available !== false,
    infoWeight: dto.info_weight ?? undefined,
    infoWeightAdditional: dto.info_weight_dop ?? undefined,
    nutrition: dto.nutrition
      ? {
          protein: numberOrNull(dto.nutrition.protein),
          fat: numberOrNull(dto.nutrition.fat),
          carbohydrates: numberOrNull(dto.nutrition.carbohydrates),
          kkal: numberOrNull(dto.nutrition.kkal),
        }
      : undefined,
    allergens: dto.allergens?.map(mapAllergen),
    possibleAllergens: dto.possible_allergens?.map(mapAllergen),
    relation: dto.relation ? mapRelation(dto.relation) : undefined,
  };
}

function mapCategory(dto: CategoryDto): CatalogCategory {
  return {
    id: Number(dto.id),
    name: String(dto.name ?? ''),
    parentId: Number(dto.parent_id),
    products: dto.products.map(mapCatalogProduct),
  };
}

function mapFreeItem(dto: FreeItemDto): FreeCatalogItem {
  return {
    parentItemId: Number(dto.parent_item_id),
    item: mapCatalogProduct(dto.item),
    count: Number(dto.count),
    maxCount: Number(dto.max_count),
    isAdd: Boolean(dto.is_add),
  };
}

export function mapCatalog(dto: CatalogDto): Catalog {
  return {
    city: { id: Number(dto.city.id), name: String(dto.city.name ?? '') },
    categories: dto.categories.map(mapCategory),
    freeItems: dto.free_items.map(mapFreeItem),
  };
}

function query(cityId: number, pointId?: number) {
  const params = new URLSearchParams({ city_id: String(cityId) });
  if (pointId !== undefined) params.set('point_id', String(pointId));
  return params.toString();
}

export const catalogApi = {
  async get(cityId: number, pointId?: number): Promise<Catalog> {
    const response = await apiRequest<CatalogResponse>(`/catalog?${query(cityId, pointId)}`, {
      method: 'GET',
    });
    return mapCatalog(response.data);
  },

  async getItem(cityId: number, itemId: number, pointId?: number): Promise<CatalogItem> {
    const response = await apiRequest<CatalogItemResponse>(
      `/catalog/items/${itemId}?${query(cityId, pointId)}`,
      { method: 'GET' },
    );
    const product = mapCatalogProduct(response.data.item);
    return {
      ...product,
      nutrition: {
        protein: numberOrNull(response.data.item.nutrition.protein),
        fat: numberOrNull(response.data.item.nutrition.fat),
        carbohydrates: numberOrNull(response.data.item.nutrition.carbohydrates),
        kkal: numberOrNull(response.data.item.nutrition.kkal),
      },
      infoWeight: response.data.item.info_weight ?? null,
      infoWeightAdditional: response.data.item.info_weight_dop ?? null,
      items: response.data.item.items.map(mapCatalogProduct),
      allergens: response.data.item.allergens.map(mapAllergen),
      possibleAllergens: response.data.item.possible_allergens.map(mapAllergen),
    };
  },
};

