export type Allergen = {
  id: number;
  name: string;
  additionalName: string | null;
};

export type ProductRelation = {
  type: number;
  count: number;
  maxCount: number;
  isAdd: boolean;
};

export type CatalogProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string | null;
  type: number;
  available: boolean;
  infoWeight?: string | null;
  infoWeightAdditional?: string | null;
  nutrition?: {
    protein: number | null;
    fat: number | null;
    carbohydrates: number | null;
    kkal: number | null;
  };
  allergens?: Allergen[];
  possibleAllergens?: Allergen[];
  relation?: ProductRelation;
};

export type CatalogCategory = {
  id: number;
  name: string;
  parentId: number;
  products: CatalogProduct[];
};

export type FreeCatalogItem = {
  parentItemId: number;
  item: CatalogProduct;
  count: number;
  maxCount: number;
  isAdd: boolean;
};

export type Catalog = {
  city: { id: number; name: string };
  categories: CatalogCategory[];
  freeItems: FreeCatalogItem[];
};

export type CatalogItem = CatalogProduct & {
  nutrition: {
    protein: number | null;
    fat: number | null;
    carbohydrates: number | null;
    kkal: number | null;
  };
  infoWeight: string | null;
  infoWeightAdditional: string | null;
  items: CatalogProduct[];
  allergens: Allergen[];
  possibleAllergens: Allergen[];
};

